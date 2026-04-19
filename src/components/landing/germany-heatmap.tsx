"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import { scaleQuantile } from "d3-scale";
import type { Feature, GeoJsonProperties, Geometry } from "geojson";
import type {
  Topology,
  GeometryCollection as TopoGeometryCollection,
} from "topojson-specification";
import {
  HEATMAP_METRICS,
  buildKreisData,
  quintileBreaks,
  type HeatmapMetric,
  type KreisDatum,
  type MetricMeta,
} from "@/lib/heatmap-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type KreisFeature = Feature<Geometry, GeoJsonProperties> & {
  rsmKey?: string;
  properties: {
    ags: string;
    name: string;
    bundesland: string;
    type: string;
  } | null;
};

type BundeslandFeature = Feature<Geometry, GeoJsonProperties>;

interface MapData {
  landkreise: KreisFeature[];
  bundeslaender: BundeslandFeature[];
}

interface KreisVisual {
  ags: string;
  bundesland: string;
  fill: string;
  ariaLabel: string;
}

const PALETTE_POS = ["#dc2626", "#f97316", "#facc15", "#65a30d", "#15803d"] as const;
const PALETTE_NEG = ["#15803d", "#65a30d", "#facc15", "#f97316", "#dc2626"] as const;
const NEUTRAL = "#e2e8f0";
const PROJECTION_CONFIG = { center: [10.45, 51.2] as [number, number], scale: 2700 };
const MAP_WIDTH = 520;
const MAP_HEIGHT = 620;

const DEFAULT_PATH_STYLE = {
  outline: "none",
  transition: "fill 260ms ease-out, opacity 200ms ease-out",
} as const;
const HOVER_PATH_STYLE = {
  outline: "none",
  stroke: "#0f172a",
  strokeWidth: 1.4,
  cursor: "pointer",
  filter: "drop-shadow(0 2px 4px rgba(15,23,42,0.18))",
  transition: "stroke-width 160ms ease-out, filter 200ms ease-out",
} as const;
const PRESSED_PATH_STYLE = { outline: "none" } as const;

const MESH_STYLE = {
  default: { outline: "none", pointerEvents: "none" as const },
  hover: { outline: "none", pointerEvents: "none" as const },
  pressed: { outline: "none", pointerEvents: "none" as const },
};

export function GermanyHeatmap() {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState<HeatmapMetric>("vzaePer100k");
  const [hoveredAgs, setHoveredAgs] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/geo/landkreise.topo.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const topo = (await res.json()) as Topology;
        const landkreiseObj = topo.objects.landkreise as TopoGeometryCollection;
        const fc = feature(topo, landkreiseObj);
        const landkreiseFeatures =
          "features" in fc
            ? (fc.features as KreisFeature[])
            : ([fc as unknown as KreisFeature]);

        const bundesObj = topo.objects.bundeslaender as TopoGeometryCollection | undefined;
        const bundesFc = bundesObj ? feature(topo, bundesObj) : null;
        const bundeslaenderFeatures =
          bundesFc && "features" in bundesFc
            ? (bundesFc.features as BundeslandFeature[])
            : bundesFc
              ? [bundesFc as unknown as BundeslandFeature]
              : [];

        if (!cancelled)
          setMapData({ landkreise: landkreiseFeatures, bundeslaender: bundeslaenderFeatures });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const kreisData = useMemo(() => buildKreisData(metric), [metric]);
  const metricMeta = HEATMAP_METRICS[metric];

  const { colorScale, quintiles, palette } = useMemo(() => {
    const values: number[] = [];
    for (const d of kreisData.values()) {
      if (d.value !== null && Number.isFinite(d.value)) values.push(d.value);
    }
    const pal = metricMeta.higherIsBetter ? PALETTE_POS : PALETTE_NEG;
    const scale = scaleQuantile<string>().domain(values).range([...pal]);
    return { colorScale: scale, quintiles: quintileBreaks(values), palette: pal };
  }, [kreisData, metricMeta.higherIsBetter]);

  const visualsByAgs = useMemo(() => {
    const map = new Map<string, KreisVisual>();
    for (const [ags, datum] of kreisData) {
      const fill =
        datum.value !== null && Number.isFinite(datum.value)
          ? colorScale(datum.value)
          : NEUTRAL;
      map.set(ags, {
        ags,
        bundesland: datum.bundesland,
        fill,
        ariaLabel: datum.value !== null && Number.isFinite(datum.value)
          ? `${datum.kreisName}: ${metricMeta.formatValue(datum.value)} ${metricMeta.unit}`
          : datum.kreisName,
      });
    }
    return map;
  }, [kreisData, colorScale, metricMeta]);

  const hoveredBundesland = hoveredAgs ? visualsByAgs.get(hoveredAgs)?.bundesland ?? null : null;
  const activeDatum = hoveredAgs ? kreisData.get(hoveredAgs) ?? null : null;

  const schedulePositionUpdate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const tip = tooltipRef.current;
      const container = containerRef.current;
      if (!tip || !container) return;
      const containerWidth = container.clientWidth;
      const tipWidth = tip.offsetWidth;
      const x = Math.min(posRef.current.x + 14, containerWidth - tipWidth - 8);
      const y = Math.max(posRef.current.y - tip.offsetHeight - 12, 8);
      tip.style.transform = `translate3d(${Math.max(8, x)}px, ${y}px, 0)`;
    });
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      posRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      schedulePositionUpdate();
    },
    [schedulePositionUpdate],
  );

  const handleCellEnter = useCallback(
    (ags: string) => setHoveredAgs(ags),
    [],
  );
  const handleCellLeave = useCallback(() => setHoveredAgs(null), []);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const hasTooltip = !!hoveredAgs && !!activeDatum;

  return (
    <div className="rounded-[1rem] border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-base md:text-lg font-semibold text-oegd-navy">
            {metricMeta.label}
          </h3>
          <p className="text-xs md:text-sm text-slate-600">{metricMeta.description}</p>
        </div>
        <Tabs
          value={metric}
          onValueChange={(v) => setMetric(v as HeatmapMetric)}
          className="w-full md:w-auto md:flex-none"
        >
          <TabsList className="flex w-full md:w-auto">
            {Object.values(HEATMAP_METRICS).map((m) => (
              <TabsTrigger
                key={m.id}
                value={m.id}
                className="flex-1 md:flex-none text-[11px] md:text-sm px-2 md:px-3"
                aria-label={m.shortLabel}
              >
                <span className="md:hidden">{m.mobileLabel}</span>
                <span className="hidden md:inline">{m.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div
        ref={containerRef}
        className="relative mt-4 w-full"
        onPointerMove={handlePointerMove}
        onPointerLeave={handleCellLeave}
        data-hovered-bl={hoveredBundesland ?? ""}
      >
        {error && (
          <div className="flex h-[480px] items-center justify-center text-sm text-red-600">
            Karte konnte nicht geladen werden: {error}
          </div>
        )}
        {!error && !mapData && (
          <div className="aspect-[520/620] w-full max-w-[820px] mx-auto animate-pulse rounded-xl bg-slate-100" />
        )}
        {mapData && (
          <div className="mx-auto w-full max-w-[820px]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={PROJECTION_CONFIG}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="heatmap-svg h-auto w-full select-none"
              style={{ filter: "drop-shadow(0 2px 6px rgba(15,23,42,0.08))" }}
            >
              <Geographies geography={{ type: "FeatureCollection", features: mapData.landkreise }}>
                {({ geographies }) => (
                  <KreisLayer
                    geographies={geographies}
                    visualsByAgs={visualsByAgs}
                    onEnter={handleCellEnter}
                    onLeave={handleCellLeave}
                  />
                )}
              </Geographies>

              {mapData.bundeslaender.length > 0 && (
                <Geographies
                  geography={{ type: "FeatureCollection", features: mapData.bundeslaender }}
                >
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="none"
                        stroke="rgba(15,23,42,0.55)"
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        style={MESH_STYLE}
                      />
                    ))
                  }
                </Geographies>
              )}
            </ComposableMap>
          </div>
        )}

        <div
          ref={tooltipRef}
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute left-0 top-0 z-20 min-w-[210px] max-w-[280px] rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm will-change-transform transition-opacity duration-150"
          style={{ opacity: hasTooltip ? 1 : 0, transform: "translate3d(-9999px, -9999px, 0)" }}
        >
          {activeDatum && (
            <>
              <div className="font-semibold text-oegd-navy">{activeDatum.kreisName}</div>
              <div className="text-slate-500">{activeDatum.bundesland}</div>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <span className="text-slate-600">{metricMeta.shortLabel}</span>
                <span className="font-semibold text-oegd-navy tabular-nums">
                  {activeDatum.value !== null && Number.isFinite(activeDatum.value)
                    ? metricMeta.formatValue(activeDatum.value)
                    : "—"}
                </span>
              </div>
              <div className="mt-2 border-t border-slate-100 pt-1.5 text-[11px] text-slate-400">
                {metricMeta.sourceLabel}
                {metricMeta.source === "ROR" && ` · ${activeDatum.rorName}`}
              </div>
            </>
          )}
        </div>
      </div>

      <Legend palette={palette} breaks={quintiles} metricMeta={metricMeta} />
      <p className="mt-3 text-[11px] text-slate-400">
        Kartengrundlage © GeoBasis-DE / BKG (abgeleitet). Daten: GBE-Bund, Pakt ÖGD.
      </p>
    </div>
  );
}

interface KreisLayerProps {
  geographies: Array<{
    rsmKey: string;
    properties?: GeoJsonProperties;
  }>;
  visualsByAgs: Map<string, KreisVisual>;
  onEnter: (ags: string) => void;
  onLeave: () => void;
}

const KreisLayer = memo(function KreisLayer({
  geographies,
  visualsByAgs,
  onEnter,
  onLeave,
}: KreisLayerProps) {
  return (
    <>
      {geographies.map((geo) => {
        const props = geo.properties as KreisFeature["properties"];
        const ags = props?.ags ?? "";
        const visual = visualsByAgs.get(ags);
        const fill = visual?.fill ?? NEUTRAL;
        return (
          <Geography
            key={geo.rsmKey}
            geography={geo as unknown as Parameters<typeof Geography>[0]["geography"]}
            fill={fill}
            stroke="#ffffff"
            strokeWidth={0.35}
            role="img"
            aria-label={visual?.ariaLabel ?? props?.name ?? "Landkreis"}
            tabIndex={-1}
            data-ags={ags}
            data-bl={props?.bundesland ?? ""}
            style={{
              default: DEFAULT_PATH_STYLE,
              hover: { ...HOVER_PATH_STYLE, fill },
              pressed: { ...PRESSED_PATH_STYLE, fill },
            }}
            onMouseEnter={() => onEnter(ags)}
            onMouseLeave={onLeave}
            onFocus={() => onEnter(ags)}
            onBlur={onLeave}
          />
        );
      })}
    </>
  );
});

interface LegendProps {
  palette: readonly string[];
  breaks: number[];
  metricMeta: MetricMeta;
}

function Legend({ palette, breaks, metricMeta }: LegendProps) {
  const labels = useMemo(() => {
    if (breaks.length < 4) return palette.map(() => "");
    const [b1, b2, b3, b4] = breaks;
    const fmt = metricMeta.formatValue;
    return [
      `< ${fmt(b1)}`,
      `${fmt(b1)}–${fmt(b2)}`,
      `${fmt(b2)}–${fmt(b3)}`,
      `${fmt(b3)}–${fmt(b4)}`,
      `> ${fmt(b4)}`,
    ];
  }, [breaks, metricMeta, palette]);

  return (
    <div
      className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-600"
      role="img"
      aria-label={`Skala in 5 Quintilen für ${metricMeta.label}`}
    >
      <span className="text-slate-500">
        {metricMeta.higherIsBetter ? "schlechter" : "besser"}
      </span>
      <div className="flex items-center gap-1.5">
        {palette.map((color, i) => (
          <div key={color} className="flex flex-col items-center gap-1">
            <span
              className="block h-3 w-8 md:w-10 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] tabular-nums text-slate-500">{labels[i]}</span>
          </div>
        ))}
      </div>
      <span className="text-slate-500">
        {metricMeta.higherIsBetter ? "besser" : "schlechter"}
      </span>
    </div>
  );
}
