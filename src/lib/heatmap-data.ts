import einwohnerRaw from "../../data/einwohnerzahlen_kreise.json";
import {
  getRegionByName,
  getBundeslandDaten,
  berechneKennzahlen,
  type RegionKennzahlen,
} from "./regions";

interface EinwohnerKreis {
  ags: string;
  name: string;
  einwohner: number;
  flaeche_km2: number;
  ror_name: string;
  bundesland: string;
}

const einwohnerData = einwohnerRaw as EinwohnerKreis[];

export type HeatmapMetric = "vzaePer100k" | "paktErfuellung" | "anteil55plus";

export interface MetricMeta {
  id: HeatmapMetric;
  label: string;
  shortLabel: string;
  mobileLabel: string;
  unit: string;
  source: "ROR" | "Bundesland";
  sourceLabel: string;
  description: string;
  higherIsBetter: boolean;
  formatValue: (value: number) => string;
}

export const HEATMAP_METRICS: Record<HeatmapMetric, MetricMeta> = {
  vzaePer100k: {
    id: "vzaePer100k",
    label: "Personal pro 100.000 Einwohner",
    shortLabel: "VZÄ / 100.000 EW",
    mobileLabel: "VZÄ / 100k",
    unit: "VZÄ",
    source: "ROR",
    sourceLabel: "Erhebung: Raumordnungsregion",
    description: "Vollzeitäquivalente im ÖGD je 100.000 Einwohner (2024)",
    higherIsBetter: true,
    formatValue: (v) => v.toFixed(1),
  },
  paktErfuellung: {
    id: "paktErfuellung",
    label: "Pakt-ÖGD-Erfüllung",
    shortLabel: "Pakt-Erfüllung",
    mobileLabel: "Pakt",
    unit: "%",
    source: "Bundesland",
    sourceLabel: "Erhebung: Bundesland",
    description: "Übererfüllung der Pakt-Vorgaben (2024, in %)",
    higherIsBetter: true,
    formatValue: (v) => `${v > 0 ? "+" : ""}${v.toFixed(1)} %`,
  },
  anteil55plus: {
    id: "anteil55plus",
    label: "Anteil Personal 55+",
    shortLabel: "Anteil 55+",
    mobileLabel: "55+",
    unit: "%",
    source: "ROR",
    sourceLabel: "Erhebung: Raumordnungsregion",
    description: "Anteil der Beschäftigten ab 55 Jahren (Altersrisiko, 2024)",
    higherIsBetter: false,
    formatValue: (v) => `${v.toFixed(1)} %`,
  },
};

export interface KreisDatum {
  ags: string;
  kreisName: string;
  rorName: string;
  bundesland: string;
  value: number | null;
  einwohner: number;
}

interface RorAggregat {
  vzaeGesamt2024: number;
  einwohnerSumme: number;
  kennzahlen: RegionKennzahlen | null;
}

function normalizeBundesland(bl: string | null | undefined): string {
  if (!bl) return "";
  if (bl === "Niedersachsen und Bremen") return "Niedersachsen";
  return bl;
}

let rorAggregateCache: Map<string, RorAggregat> | null = null;

function getRorAggregate(): Map<string, RorAggregat> {
  if (rorAggregateCache) return rorAggregateCache;

  const einwohnerByRor = new Map<string, number>();
  for (const kreis of einwohnerData) {
    einwohnerByRor.set(
      kreis.ror_name,
      (einwohnerByRor.get(kreis.ror_name) ?? 0) + kreis.einwohner,
    );
  }

  const aggregate = new Map<string, RorAggregat>();
  for (const [rorName, einwohnerSumme] of einwohnerByRor) {
    const region = getRegionByName(rorName);
    const kennzahlen = region ? berechneKennzahlen(region) : null;
    aggregate.set(rorName, {
      vzaeGesamt2024: kennzahlen?.vzaeGesamt2024 ?? 0,
      einwohnerSumme,
      kennzahlen,
    });
  }

  rorAggregateCache = aggregate;
  return aggregate;
}

export function buildKreisData(metric: HeatmapMetric): Map<string, KreisDatum> {
  const rorAggregate = getRorAggregate();
  const result = new Map<string, KreisDatum>();

  for (const kreis of einwohnerData) {
    const agg = rorAggregate.get(kreis.ror_name);
    const value = computeMetric(metric, kreis, agg);
    result.set(kreis.ags, {
      ags: kreis.ags,
      kreisName: kreis.name,
      rorName: kreis.ror_name,
      bundesland: kreis.bundesland,
      einwohner: kreis.einwohner,
      value,
    });
  }

  return result;
}

function computeMetric(
  metric: HeatmapMetric,
  kreis: EinwohnerKreis,
  agg: RorAggregat | undefined,
): number | null {
  if (metric === "vzaePer100k") {
    if (!agg || agg.einwohnerSumme <= 0) return null;
    return (agg.vzaeGesamt2024 / agg.einwohnerSumme) * 100_000;
  }
  if (metric === "anteil55plus") {
    return agg?.kennzahlen?.anteil55plus ?? null;
  }
  if (metric === "paktErfuellung") {
    const blDaten = getBundeslandDaten(normalizeBundesland(kreis.bundesland));
    return blDaten?.uebererfuellung_pct ?? null;
  }
  return null;
}

export function quintileBreaks(values: number[]): number[] {
  const sorted = [...values].filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return [0, 0, 0, 0];
  const at = (q: number) => {
    const idx = Math.floor(q * (sorted.length - 1));
    return sorted[Math.max(0, Math.min(sorted.length - 1, idx))];
  };
  return [at(0.2), at(0.4), at(0.6), at(0.8)];
}

export function assertKreisCoverage(agsInMap: Iterable<string>): {
  matched: number;
  missing: string[];
} {
  const mapSet = new Set(agsInMap);
  const missing: string[] = [];
  for (const kreis of einwohnerData) {
    if (!mapSet.has(kreis.ags)) missing.push(kreis.ags);
  }
  return { matched: einwohnerData.length - missing.length, missing };
}
