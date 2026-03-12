"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculateROI, DEFAULT_ASSUMPTIONS } from "@/lib/roi";
import type { RegionKennzahlen } from "@/lib/regions";
import {
  Users,
  Clock,
  Zap,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

interface ROICalculatorProps {
  kennzahlen: RegionKennzahlen;
  analogCount: number;
  teilweiseCount: number;
  regionName: string;
}

export function ROICalculator({
  kennzahlen,
  analogCount,
  teilweiseCount,
  regionName,
}: ROICalculatorProps) {
  const [showAssumptions, setShowAssumptions] = useState(false);

  // Memoize ROI calculation (rerender-memo)
  const roi = useMemo(() => calculateROI({
    anteil55plus: kennzahlen.anteil55plus,
    anzahl55plus: kennzahlen.anzahl55plus,
    vzaeGesamt: kennzahlen.vzaeGesamt2024,
    analogCount,
    teilweiseCount,
  }), [kennzahlen, analogCount, teilweiseCount]);

  // Memoize metrics array to prevent child re-allocation (rerender-memo-with-default-value)
  const metrics = useMemo(() => [
    {
      icon: Users,
      value: `${Math.round(roi.anteil55plus)}%`,
      label: "Personal 55+",
      desc: `${Math.round(roi.anzahl55plus)} von ${Math.round(roi.vzaeGesamt)} VZÄ in Ihrer Region`,
      color: "text-oegd-red",
      bg: "bg-oegd-red-light",
    },
    {
      icon: Clock,
      value: `~${Math.round(roi.retiredVZAE)}`,
      label: "VZÄ in Rente bis 2032",
      desc: `${roi.retiredPercent}% des aktuellen Personals`,
      color: "text-oegd-yellow",
      bg: "bg-oegd-yellow-light",
    },
    {
      icon: Zap,
      value: `${roi.weeklyHoursSaved}h`,
      label: "Einsparung pro Woche",
      desc: `durch Digitalisierung von ${analogCount + teilweiseCount} Prozessen`,
      color: "text-oegd-blue",
      bg: "bg-oegd-blue-light",
    },
    {
      icon: TrendingDown,
      value: `${roi.fteEquivalentSaved}`,
      label: "VZÄ-Äquivalent frei",
      desc: `${roi.annualHoursSaved} Stunden/Jahr eingespart`,
      color: "text-oegd-green",
      bg: "bg-oegd-green-light",
    },
  ], [roi, analogCount, teilweiseCount]);

  // Stable toggle callback (rerender-functional-setstate)
  const toggleAssumptions = useCallback(() => {
    setShowAssumptions(prev => !prev);
  }, []);

  return (
    <Card className="border-0 shadow-md bg-white animate-fade-in delay-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-oegd-blue to-blue-700 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-oegd-navy">
              ROI-Prognose: Digitalisierung
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Region {regionName} — Was Digitalisierung konkret bringt
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key insight */}
        <div className="rounded-xl bg-gradient-to-r from-oegd-blue-light to-oegd-blue-mid p-4 border border-oegd-blue/10">
          <p className="text-sm text-oegd-navy leading-relaxed">
            In Ihrer Region sind <strong className="text-oegd-red">{Math.round(roi.anteil55plus)}%</strong> des
            Personals 55+. Bis 2032 gehen ca. <strong className="text-oegd-red">
            {Math.round(roi.retiredVZAE)} VZÄ</strong> in Rente.
            {analogCount > 0 ? (
              <> Bei Digitalisierung der <strong className="text-oegd-blue">{analogCount} analogen
              Prozesse</strong> sparen Sie ca. <strong className="text-oegd-green">
              {roi.weeklyHoursSaved} Std/Woche</strong> — das entspricht{" "}
              <strong className="text-oegd-green">{roi.fteEquivalentSaved} VZÄ</strong> ohne Neueinstellung.</>
            ) : null}
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border/40 p-3.5 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
                </div>
              </div>
              <p className={`text-xl font-bold ${m.color} tabular-nums`}>
                {m.value}
              </p>
              <p className="text-xs font-semibold text-oegd-navy mt-0.5">
                {m.label}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Assumptions toggle */}
        <div className="pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAssumptions}
            className="text-xs text-muted-foreground hover:text-oegd-navy gap-1.5 px-2 h-7"
          >
            <Info className="h-3 w-3" />
            Annahmen & Methodik
            {showAssumptions ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </Button>
          {showAssumptions ? (
            <div className="mt-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground space-y-1 animate-fade-in">
              <p>Rentenzeithorizont: {DEFAULT_ASSUMPTIONS.retirementHorizonYears} Jahre (bis 2032)</p>
              <p>Renteneintritt 55+: {DEFAULT_ASSUMPTIONS.retirementRateOf55Plus * 100}%</p>
              <p>Zeitaufwand pro analogem Prozess: {DEFAULT_ASSUMPTIONS.hoursPerWeekPerAnalogProcess} Std/Woche</p>
              <p>Einsparung bei Digitalisierung: {DEFAULT_ASSUMPTIONS.digitalizationSavingsFactor * 100}%</p>
              <p>Zeitaufwand teilweise digital: {DEFAULT_ASSUMPTIONS.hoursPerWeekPerTeilweiseProcess} Std/Woche</p>
              <p>Einsparung teilweise: {DEFAULT_ASSUMPTIONS.teilweiseSavingsFactor * 100}%</p>
              <p className="pt-1 text-[10px] italic">
                Quellen: EvalDiGe 2024, McKinsey Public Sector, Destatis Gesundheitspersonalrechnung
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
