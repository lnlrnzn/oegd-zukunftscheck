"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "./kpi-card";
import { NarrativeBox } from "./narrative-box";
import { EVALIDGE_BENCHMARKS } from "@/lib/benchmarks";
import { aggregateToolCategories, getMostCommonCategory, getUniqueToolCount } from "@/lib/tools";
import { MonitorX, Wrench, BarChart3 } from "lucide-react";

const AnalogProcessChart = dynamic(
  () => import("./charts/analog-process-chart").then((m) => ({ default: m.AnalogProcessChart })),
  { ssr: false, loading: () => <div className="h-[320px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);
const ToolCategoryChart = dynamic(
  () => import("./charts/tool-category-chart").then((m) => ({ default: m.ToolCategoryChart })),
  { ssr: false, loading: () => <div className="h-[220px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);

export function TabDigital() {
  const analogData = useMemo(
    () => EVALIDGE_BENCHMARKS.benchmarks.map((b) => ({ prozess: b.prozess, analogAnteil: b.analogAnteil })),
    []
  );

  const avgAnalog = useMemo(() => {
    const sum = EVALIDGE_BENCHMARKS.benchmarks.reduce((s, b) => s + b.analogAnteil, 0);
    return Math.round(sum / EVALIDGE_BENCHMARKS.benchmarks.length);
  }, []);

  const toolCategories = useMemo(() => aggregateToolCategories(), []);
  const mostCommon = useMemo(() => getMostCommonCategory(), []);
  const uniqueTools = useMemo(() => getUniqueToolCount(), []);

  const mostDigital = useMemo(() => {
    const sorted = [...EVALIDGE_BENCHMARKS.benchmarks].sort((a, b) => a.analogAnteil - b.analogAnteil);
    return sorted[0]?.prozess ?? "";
  }, []);

  const leastDigital = useMemo(() => {
    const sorted = [...EVALIDGE_BENCHMARKS.benchmarks].sort((a, b) => b.analogAnteil - a.analogAnteil);
    return sorted[0]?.prozess ?? "";
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <KPICard
          label="Ø Analog-Anteil"
          value={avgAnalog}
          suffix="%"
          icon={<MonitorX className="h-3.5 w-3.5" />}
          accent="red"
          subtitle="Kernprozesse (EvalDiGe)"
          delay={0.2}
        />
        <KPICard
          label="Häufigste Tool-Kategorie"
          value={toolCategories[0]?.count ?? 0}
          icon={<Wrench className="h-3.5 w-3.5" />}
          accent="blue"
          subtitle={mostCommon}
          delay={0.3}
        />
        <KPICard
          label="Digitale Tools erfasst"
          value={uniqueTools}
          icon={<BarChart3 className="h-3.5 w-3.5" />}
          accent="green"
          subtitle="PDT-Toolregister ÖGD"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">Analog-Anteil pro Kernprozess</CardTitle>
            <p className="text-[11px] text-muted-foreground">
              % der Gesundheitsämter mit überwiegend analoger Bearbeitung
            </p>
          </CardHeader>
          <CardContent><AnalogProcessChart data={analogData} /></CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">Tool-Kategorien im ÖGD</CardTitle>
            <p className="text-[11px] text-muted-foreground">Verteilung digitaler Werkzeuge nach Oberkategorie</p>
          </CardHeader>
          <CardContent><ToolCategoryChart data={toolCategories} /></CardContent>
        </Card>
      </div>

      <NarrativeBox source="EvalDiGe 2024 (n=375), PDT-Toolregister ÖGD">
        Laut EvalDiGe 2024 laufen durchschnittlich <strong className="text-red-400">{avgAnalog}% der Kernprozesse noch analog</strong>.
        Am häufigsten digitalisiert: <strong className="text-green-400">{mostDigital}</strong>.
        Am seltensten: <strong className="text-red-400">{leastDigital}</strong>.
        Im PDT-Toolregister sind <strong className="text-blue-300">{uniqueTools} verschiedene digitale Werkzeuge</strong> erfasst,
        die häufigste Kategorie ist „{mostCommon}".
      </NarrativeBox>
    </div>
  );
}
