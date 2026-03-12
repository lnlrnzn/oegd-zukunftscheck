"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "./kpi-card";
import { NarrativeBox } from "./narrative-box";
import type { RegionData } from "@/lib/data";
import { berechneKennzahlen } from "@/lib/regions";
import {
  getEinwohnerForRegion,
  computeVzaePro100k,
  getBundeslandBenchmark,
  getNationalBenchmark,
  buildScatterData,
} from "@/lib/statistik";
import { ArrowLeftRight, Target, Globe } from "lucide-react";

const BLComparisonChart = dynamic(
  () => import("./charts/bl-comparison-chart").then((m) => ({ default: m.BLComparisonChart })),
  { ssr: false, loading: () => <div className="h-[280px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);
const VzaePerCapitaScatter = dynamic(
  () => import("./charts/vzae-per-capita-scatter").then((m) => ({ default: m.VzaePerCapitaScatter })),
  { ssr: false, loading: () => <div className="h-[280px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);
const Anteil55PlusScatter = dynamic(
  () => import("./charts/anteil-55plus-scatter").then((m) => ({ default: m.Anteil55PlusScatter })),
  { ssr: false, loading: () => <div className="h-[280px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);

interface TabRegionalProps {
  region: RegionData;
}

export function TabRegional({ region }: TabRegionalProps) {
  const k = useMemo(() => berechneKennzahlen(region), [region]);
  const einwohner = useMemo(() => getEinwohnerForRegion(region.name), [region.name]);
  const vzaePro100k = useMemo(() => computeVzaePro100k(k.vzaeGesamt2024, einwohner), [k, einwohner]);

  const blBenchmark = useMemo(() => getBundeslandBenchmark(k.blName), [k.blName]);
  const natBenchmark = useMemo(() => getNationalBenchmark(), []);

  const blVzaePro100k = blBenchmark?.vzae_pro_100k_einwohner ?? natBenchmark.vzae_pro_100k_einwohner;
  const natVzaePro100k = natBenchmark.vzae_pro_100k_einwohner;
  const bl55plus = blBenchmark?.anteil_55plus_pct ?? natBenchmark.anteil_55plus_pct;
  const nat55plus = natBenchmark.anteil_55plus_pct;

  const comparisonData = useMemo(() => [
    { metric: "VZÄ/100k", region: Math.round(vzaePro100k * 10) / 10, bundesland: blVzaePro100k, bund: natVzaePro100k },
    { metric: "55+ Anteil (%)", region: Math.round(k.anteil55plus * 10) / 10, bundesland: bl55plus, bund: nat55plus },
    { metric: "Veränderung (%)", region: Math.round(k.veraenderungPct * 10) / 10, bundesland: Math.round(k.veraenderungPct * 10) / 10, bund: 1.3 },
  ], [vzaePro100k, blVzaePro100k, natVzaePro100k, k, bl55plus, nat55plus]);

  const scatterDataAll = useMemo(() => buildScatterData(), []);

  const scatterVzae = useMemo(() =>
    scatterDataAll.map((d) => ({
      name: d.name,
      einwohner: d.einwohner,
      vzaePro100k: d.vzaePro100k,
      highlighted: d.name === region.name,
    })),
    [scatterDataAll, region.name]
  );

  const scatter55plus = useMemo(() =>
    scatterDataAll.map((d) => ({
      name: d.name,
      anteil55plus: d.anteil55plus,
      veraenderungPct: d.veraenderungPct,
      highlighted: d.name === region.name,
    })),
    [scatterDataAll, region.name]
  );

  const aboveAvgVzae = vzaePro100k > natVzaePro100k;
  const above55plus = k.anteil55plus > nat55plus;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <KPICard
          label="Region VZÄ/100k"
          value={Math.round(vzaePro100k * 10) / 10}
          icon={<Target className="h-3.5 w-3.5" />}
          accent="blue"
          subtitle={`BL: ${blVzaePro100k} · Bund: ${natVzaePro100k}`}
          delay={0.2}
          decimals={1}
        />
        <KPICard
          label="Region 55+ Anteil"
          value={Math.round(k.anteil55plus * 10) / 10}
          suffix="%"
          icon={<ArrowLeftRight className="h-3.5 w-3.5" />}
          accent="red"
          subtitle={`BL: ${bl55plus}% · Bund: ${nat55plus}%`}
          delay={0.3}
          decimals={1}
        />
        <KPICard
          label="Bundesdurchschnitt"
          value={natVzaePro100k}
          suffix=" VZÄ/100k"
          icon={<Globe className="h-3.5 w-3.5" />}
          accent="green"
          subtitle={`55+: ${nat55plus}% · Analog: ${natBenchmark.digitalisierungsgrad.stufe_0_pct}%`}
          delay={0.4}
          decimals={1}
        />
      </div>

      {/* Grouped comparison */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-oegd-navy">Region vs. Bundesland vs. Bund</CardTitle>
          <p className="text-[11px] text-muted-foreground">Kennzahlen im Dreiervergleich</p>
        </CardHeader>
        <CardContent><BLComparisonChart data={comparisonData} /></CardContent>
      </Card>

      {/* Scatter plots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">VZÄ pro 100k vs. Bevölkerung</CardTitle>
            <p className="text-[11px] text-muted-foreground">Jeder Punkt = 1 Raumordnungsregion</p>
          </CardHeader>
          <CardContent><VzaePerCapitaScatter data={scatterVzae} /></CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">55+ Anteil vs. VZÄ-Veränderung</CardTitle>
            <p className="text-[11px] text-muted-foreground">Altersstruktur und Personalentwicklung</p>
          </CardHeader>
          <CardContent><Anteil55PlusScatter data={scatter55plus} /></CardContent>
        </Card>
      </div>

      <NarrativeBox source="GBE-Bund 2024, Benchmarking-Durchschnitte 2024">
        <strong className="text-white">{region.name}</strong> hat{" "}
        <strong className="text-blue-300">{vzaePro100k.toFixed(1)} VZÄ pro 100.000 Einwohner</strong> —{" "}
        {aboveAvgVzae
          ? <>das liegt über dem Bundesdurchschnitt von {natVzaePro100k}.</>
          : <>das liegt unter dem Bundesdurchschnitt von {natVzaePro100k}.</>
        }{" "}
        Der 55+ Anteil beträgt <strong className={above55plus ? "text-red-400" : "text-green-400"}>
          {k.anteil55plus.toFixed(1)}%
        </strong>{" "}
        {above55plus
          ? <>(über dem Bund: {nat55plus}%) — überdurchschnittlicher Handlungsdruck.</>
          : <>(unter dem Bund: {nat55plus}%) — vergleichsweise stabile Altersstruktur.</>
        }
      </NarrativeBox>
    </div>
  );
}
