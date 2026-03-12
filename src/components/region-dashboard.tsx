"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/magicui/number-ticker";
import type { RegionData } from "@/lib/data";
import { berechneKennzahlen } from "@/lib/regions";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Building2,
  ShieldCheck,
} from "lucide-react";

// bundle-dynamic-imports: Recharts is heavy (~200kB), lazy-load chart components
const AgeChart = dynamic(
  () => import("./age-chart").then((m) => ({ default: m.AgeChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] flex items-center justify-center text-xs text-muted-foreground">
        Diagramm wird geladen…
      </div>
    ),
  }
);
const ProfessionChart = dynamic(
  () => import("./profession-chart").then((m) => ({ default: m.ProfessionChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[180px] flex items-center justify-center text-xs text-muted-foreground">
        Diagramm wird geladen…
      </div>
    ),
  }
);

interface RegionDashboardProps {
  region: RegionData;
}

export function RegionDashboard({ region }: RegionDashboardProps) {
  const k = berechneKennzahlen(region);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* VZÄ Gesamt */}
        <Card className="kpi-blue border-0 shadow-sm card-hover animate-fade-in delay-1">
          <CardContent className="p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-oegd-blue-light flex items-center justify-center">
                <Users className="h-3.5 w-3.5 text-oegd-blue" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                VZÄ 2024
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-oegd-navy tabular-nums">
              <NumberTicker value={k.vzaeGesamt2024} delay={0.2} />
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
              {k.veraenderung >= 0 ? (
                <TrendingUp className="h-3 w-3 text-oegd-green shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-oegd-red shrink-0" />
              )}
              <span className={k.veraenderung >= 0 ? "text-oegd-green" : "text-oegd-red"}>
                {k.veraenderung >= 0 ? "+" : ""}
                {k.veraenderungPct.toFixed(1)}%
              </span>
              <span className="text-muted-foreground">gg. 2023</span>
            </p>
          </CardContent>
        </Card>

        {/* Altersstruktur 55+ */}
        <Card className="kpi-red border-0 shadow-sm card-hover animate-fade-in delay-2">
          <CardContent className="p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-oegd-red-light flex items-center justify-center">
                <Clock className="h-3.5 w-3.5 text-oegd-red" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Rentenwelle
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-oegd-red tabular-nums">
              <NumberTicker value={Math.round(k.anteil55plus)} delay={0.3} />%
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              sind 55+ ({k.anzahl55plus.toLocaleString("de-DE")}&nbsp;VZÄ)
            </p>
          </CardContent>
        </Card>

        {/* Pakt-Übererfüllung */}
        <Card className="kpi-green border-0 shadow-sm card-hover animate-fade-in delay-3">
          <CardContent className="p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-oegd-green-light flex items-center justify-center">
                <Building2 className="h-3.5 w-3.5 text-oegd-green" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Pakt ({k.blName})
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-oegd-navy tabular-nums">
              +<NumberTicker value={Math.round(k.blPaktUebererfuellung)} delay={0.4} />%
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              über Pakt-Vorgabe
            </p>
          </CardContent>
        </Card>

        {/* Unbefristet */}
        <Card className="kpi-yellow border-0 shadow-sm card-hover animate-fade-in delay-4">
          <CardContent className="p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-oegd-yellow-light flex items-center justify-center">
                <ShieldCheck className="h-3.5 w-3.5 text-oegd-yellow" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Unbefristet
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-oegd-navy tabular-nums">
              <NumberTicker value={k.blUnbefristetAnteil} delay={0.5} />%
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              des Pakt-Personals ({k.blName})
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm animate-fade-in delay-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">
              Altersstruktur
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              VZÄ nach Altersgruppen 2024 —{" "}
              <span className="text-oegd-red font-medium">rot = 55+</span>
            </p>
          </CardHeader>
          <CardContent>
            <AgeChart region={region} />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm animate-fade-in delay-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">
              Berufsmix
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              VZÄ nach Berufsgruppen 2024
            </p>
          </CardHeader>
          <CardContent>
            <ProfessionChart
              aerzte={k.berufsmix.aerzte}
              fachpersonal={k.berufsmix.fachpersonal}
              verwaltung={k.berufsmix.verwaltung}
            />
          </CardContent>
        </Card>
      </div>

      {/* Narrative */}
      <Card className="bg-oegd-navy border-0 shadow-lg animate-fade-in delay-5">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="shrink-0 w-1 rounded-full bg-oegd-blue" />
            <p className="text-sm text-slate-300 leading-relaxed overflow-wrap-anywhere">
              <strong className="text-white">
                {region.name}
              </strong>{" "}
              hat{" "}
              <strong className="text-white">
                {k.vzaeGesamt2024.toLocaleString("de-DE")} VZÄ
              </strong>
              .{" "}
              <strong className="text-red-400">
                {k.anteil55plus.toFixed(0)}% sind über 55
              </strong>{" "}
              — in 10 Jahren fehlen diese Stellen.
              {k.blName && (
                <>
                  {" "}
                  {k.blName} hat die Pakt-Vorgaben um{" "}
                  {k.blPaktUebererfuellung.toFixed(0)}% übererfüllt, davon{" "}
                  {k.blUnbefristetAnteil}% unbefristet.
                </>
              )}{" "}
              Die Bundesförderung läuft aus.{" "}
              <strong className="text-blue-300">
                Digitalisierung ist der Hebel.
              </strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
