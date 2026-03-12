"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "./kpi-card";
import { NarrativeBox } from "./narrative-box";
import type { RegionData } from "@/lib/data";
import { berechneKennzahlen, getBundeslandDaten } from "@/lib/regions";
import { getAllBundeslaenderPakt, rankBundesland } from "@/lib/statistik";
import { FileText, Medal, TrendingUp } from "lucide-react";

const BL_KUERZEL: Record<string, string> = {
  BW: "Baden-Württemberg", BY: "Bayern", BE: "Berlin", BB: "Brandenburg",
  HB: "Bremen", HH: "Hamburg", HE: "Hessen", MV: "Mecklenburg-Vorpommern",
  NS: "Niedersachsen", NRW: "Nordrhein-Westfalen", RP: "Rheinland-Pfalz",
  SL: "Saarland", SN: "Sachsen", ST: "Sachsen-Anhalt", SH: "Schleswig-Holstein", TH: "Thüringen",
};

const BLRankingChart = dynamic(
  () => import("./charts/bl-ranking-chart").then((m) => ({ default: m.BLRankingChart })),
  { ssr: false, loading: () => <div className="h-[400px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);
const BefristungBLChart = dynamic(
  () => import("./charts/befristung-bl-chart").then((m) => ({ default: m.BefristungBLChart })),
  { ssr: false, loading: () => <div className="h-[280px] flex items-center justify-center text-xs text-muted-foreground">Diagramm wird geladen…</div> }
);

interface TabPaktProps {
  region: RegionData;
}

export function TabPakt({ region }: TabPaktProps) {
  const k = useMemo(() => berechneKennzahlen(region), [region]);
  const blDaten = useMemo(() => getBundeslandDaten(region.bundesland), [region.bundesland]);
  const isNational = !k.blName;
  const ranking = useMemo(() => (isNational ? { rank: 0, total: 0 } : rankBundesland(k.blName)), [k.blName, isNational]);

  const befristetPct = blDaten ? blDaten.befristung.befristet_anteil_pct : 0;

  const rankingData = useMemo(() => {
    const all = getAllBundeslaenderPakt();
    return all.map((bl) => {
      const name = BL_KUERZEL[bl.region] ?? bl.region;
      return {
        name,
        value: bl.uebererfuellung_pct,
        highlighted: name === k.blName,
      };
    });
  }, [k.blName]);

  const befristungData = useMemo(() => {
    const all = getAllBundeslaenderPakt();
    return all.map((bl) => {
      const name = BL_KUERZEL[bl.region] ?? bl.region;
      return {
        name,
        befristetPct: bl.befristung.befristet_anteil_pct,
        highlighted: name === k.blName,
      };
    });
  }, [k.blName]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <KPICard
          label="Befristungsquote"
          value={befristetPct}
          suffix="%"
          icon={<FileText className="h-3.5 w-3.5" />}
          accent="red"
          subtitle={isNational ? "Bundesweit — Pakt-Personal" : `${k.blName} — Pakt-Personal`}
          delay={0.2}
        />
        {isNational ? (
          <KPICard
            label="Bundesländer"
            value={ranking.total || 16}
            icon={<Medal className="h-3.5 w-3.5" />}
            accent="yellow"
            subtitle="im Pakt-Vergleich"
            delay={0.3}
          />
        ) : (
          <KPICard
            label="Rang im BL-Vergleich"
            value={ranking.rank}
            suffix={` von ${ranking.total}`}
            icon={<Medal className="h-3.5 w-3.5" />}
            accent="yellow"
            subtitle={`${k.blName} — nach Übererfüllung`}
            delay={0.3}
          />
        )}
        <KPICard
          label="VZÄ-Veränderung"
          value={Math.round(k.veraenderungPct * 10) / 10}
          suffix="%"
          prefix={k.veraenderungPct >= 0 ? "+" : ""}
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          accent="green"
          subtitle="2023 → 2024"
          delay={0.4}
          decimals={1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">Pakt-Übererfüllung nach Bundesland</CardTitle>
            <p className="text-[11px] text-muted-foreground">VZÄ über Pakt-Vorgabe in %</p>
          </CardHeader>
          <CardContent><BLRankingChart data={rankingData} /></CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-oegd-navy">Befristungsquote nach Bundesland</CardTitle>
            <p className="text-[11px] text-muted-foreground">Anteil befristeter Pakt-Stellen in %</p>
          </CardHeader>
          <CardContent><BefristungBLChart data={befristungData} /></CardContent>
        </Card>
      </div>

      <NarrativeBox source="Pakt ÖGD Monitoring 2024">
        Der Pakt ÖGD hat seit 2020 bundesweit Milliarden investiert.{" "}
        {isNational ? (
          <>
            Die Bundesförderung läuft Ende 2026 aus.{" "}
            <strong className="text-red-400">{befristetPct}% der Pakt-Stellen sind befristet</strong> — ein Risiko für die Nachhaltigkeit.
            Wählen Sie ein Bundesland, um regionale Details zu sehen.
          </>
        ) : (
          <>
            <strong className="text-white">{k.blName}</strong> hat die Pakt-Vorgaben um{" "}
            <strong className="text-blue-300">{k.blPaktUebererfuellung.toFixed(0)}%</strong> übererfüllt.{" "}
            <strong className="text-red-400">{befristetPct}% der Pakt-Stellen sind befristet</strong> — ein Risiko für die
            Nachhaltigkeit, da die Bundesförderung Ende 2026 ausläuft.{" "}
            {k.blUnbefristetAnteil >= 90
              ? <><strong className="text-green-400">{k.blUnbefristetAnteil}% sind unbefristet</strong> — eine gute Ausgangslage.</>
              : <>Nur {k.blUnbefristetAnteil}% sind unbefristet — hier besteht Handlungsbedarf.</>
            }
          </>
        )}
      </NarrativeBox>
    </div>
  );
}
