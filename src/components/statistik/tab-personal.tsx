"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "./kpi-card";
import { NarrativeBox } from "./narrative-box";
import type { RegionData } from "@/lib/data";
import { berechneKennzahlen } from "@/lib/regions";
import { getEinwohnerForRegion, computeVzaePro100k } from "@/lib/statistik";
import { Users, Clock, UserCheck } from "lucide-react";

const AgeStructureChart = dynamic(
  () => import("./charts/age-structure-chart").then((m) => ({ default: m.AgeStructureChart })),
  { ssr: false, loading: () => <div className="h-[240px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);
const ProfessionMixChart = dynamic(
  () => import("./charts/profession-mix-chart").then((m) => ({ default: m.ProfessionMixChart })),
  { ssr: false, loading: () => <div className="h-[200px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);

const AGE_KEYS = [
  { key: "Unter 25 Jahre", label: "<25" },
  { key: "25 Jahre bis unter 35 Jahre", label: "25–34" },
  { key: "35 Jahre bis unter 45 Jahre", label: "35–44" },
  { key: "45 Jahre bis unter 55 Jahre", label: "45–54" },
  { key: "55 Jahre bis unter 65 Jahre", label: "55–64" },
];

interface TabPersonalProps {
  region: RegionData;
}

export function TabPersonal({ region }: TabPersonalProps) {
  const k = useMemo(() => berechneKennzahlen(region), [region]);
  const einwohner = useMemo(() => getEinwohnerForRegion(region.name), [region.name]);
  const vzaePro100k = useMemo(() => computeVzaePro100k(k.vzaeGesamt2024, einwohner), [k, einwohner]);

  const ageData = useMemo(() => {
    const alter = region.daten.nach_alter;
    const key65 = Object.keys(alter).find((k) => k.startsWith("65 Jahre"));
    return [
      ...AGE_KEYS.map(({ key, label }) => ({
        name: label,
        vzae: alter[key]?.["2024"]?.insgesamt ?? 0,
        is55plus: label.startsWith("55") || label.startsWith("65"),
      })),
      ...(key65 ? [{ name: "65+", vzae: alter[key65]?.["2024"]?.insgesamt ?? 0, is55plus: true }] : []),
    ];
  }, [region]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <KPICard
          label="VZÄ Gesamt"
          value={k.vzaeGesamt2024}
          icon={<Users className="h-3.5 w-3.5" />}
          accent="blue"
          subtitle={`${k.veraenderung >= 0 ? "+" : ""}${k.veraenderungPct.toFixed(1)}% gg. 2023`}
          delay={0.2}
        />
        <KPICard
          label="Anteil 55+"
          value={Math.round(k.anteil55plus)}
          suffix="%"
          icon={<Clock className="h-3.5 w-3.5" />}
          accent="red"
          subtitle={`${k.anzahl55plus.toLocaleString("de-DE")} Personen`}
          delay={0.3}
        />
        <KPICard
          label="VZÄ / 100.000 EW"
          value={Math.round(vzaePro100k * 10) / 10}
          icon={<UserCheck className="h-3.5 w-3.5" />}
          accent="green"
          subtitle={einwohner > 0 ? `${(einwohner / 1000).toFixed(0)}k Einwohner` : "Bundesdurchschnitt"}
          delay={0.4}
          decimals={1}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">Altersstruktur</CardTitle>
            <p className="text-[11px] text-muted-foreground">VZÄ nach Altersgruppen 2024 — <span className="text-oegd-red font-medium">rot = 55+</span></p>
          </CardHeader>
          <CardContent><AgeStructureChart data={ageData} /></CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">Berufsmix</CardTitle>
            <p className="text-[11px] text-muted-foreground">VZÄ nach Berufsgruppen 2024</p>
          </CardHeader>
          <CardContent>
            <ProfessionMixChart aerzte={k.berufsmix.aerzte} fachpersonal={k.berufsmix.fachpersonal} verwaltung={k.berufsmix.verwaltung} />
          </CardContent>
        </Card>
      </div>

      {/* Narrative */}
      <NarrativeBox source="GBE-Bund 2024, Stichtag 31.12.2024">
        <strong className="text-white">{region.name}</strong> hat{" "}
        <strong className="text-white">{k.vzaeGesamt2024.toLocaleString("de-DE")} VZÄ</strong>.{" "}
        <strong className="text-red-400">{k.anteil55plus.toFixed(0)}% sind über 55</strong> — das sind{" "}
        {k.anzahl55plus.toLocaleString("de-DE")} Personen, die in den nächsten Jahren in Rente gehen.
        {einwohner > 0 && (
          <> Pro 100.000 Einwohner stehen <strong className="text-blue-300">{vzaePro100k.toFixed(1)} VZÄ</strong> zur Verfügung.</>
        )}
      </NarrativeBox>
    </div>
  );
}
