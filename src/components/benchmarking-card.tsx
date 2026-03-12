import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compareWithBenchmark, EVALIDGE_BENCHMARKS } from "@/lib/benchmarks";
import { BarChart3 } from "lucide-react";

interface BenchmarkingCardProps {
  answers: Record<number, number>;
}

const SCORE_LABELS = ["Digital", "Teilweise", "Analog"] as const;
const SCORE_COLORS = {
  0: "text-oegd-green",
  1: "text-oegd-yellow",
  2: "text-oegd-red",
} as const;

export function BenchmarkingCard({ answers }: BenchmarkingCardProps) {
  const comparison = compareWithBenchmark(answers);
  const besserCount = comparison.filter((c) => c.besser).length;

  return (
    <Card className="border-0 shadow-md bg-white animate-fade-in delay-3">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-oegd-navy">
              Benchmarking: Ihr Amt vs. Bundesdurchschnitt
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quelle: {EVALIDGE_BENCHMARKS.source} (n=375 Gesundheitsämter)
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Summary */}
        <div className="rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-4 border border-purple-100">
          <p className="text-sm text-oegd-navy leading-relaxed">
            Ihre Ergebnisse liegen in{" "}
            <strong className="text-violet-700">{besserCount} von 10</strong> Bereichen
            besser als der Bundesdurchschnitt.
            {besserCount <= 3 && (
              <span className="text-oegd-red"> Deutliches Optimierungspotenzial vorhanden.</span>
            )}
            {besserCount > 3 && besserCount <= 7 && (
              <span className="text-oegd-yellow"> Einige Bereiche mit Verbesserungspotenzial.</span>
            )}
            {besserCount > 7 && (
              <span className="text-oegd-green"> Sie liegen deutlich über dem Durchschnitt.</span>
            )}
          </p>
        </div>

        {/* Process comparison bars */}
        <div className="space-y-2.5">
          {comparison.map((c) => {
            const userPct = (c.userScore / 2) * 100;
            const avgPct = (c.avgScore / 2) * 100;
            const userLabel = SCORE_LABELS[c.userScore as 0 | 1 | 2] || "—";
            const userColor = SCORE_COLORS[c.userScore as 0 | 1 | 2] || "text-muted-foreground";

            return (
              <div key={c.processId} className="group">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-oegd-navy truncate pr-2 max-w-[65%]">
                    {c.prozess}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] tabular-nums shrink-0">
                    <span className={`font-semibold ${userColor}`}>
                      {userLabel}
                    </span>
                    <span className="text-muted-foreground">
                      vs. {c.avgScore.toFixed(1)}
                    </span>
                    {c.besser && (
                      <span className="text-oegd-green font-bold text-[9px]">
                        BESSER
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-5 rounded-md bg-muted/50 overflow-hidden">
                  {/* National average bar (background) */}
                  <div
                    className="absolute inset-y-0 left-0 bg-oegd-slate/15 rounded-md transition-all duration-500"
                    style={{ width: `${avgPct}%` }}
                  />
                  {/* User score bar (foreground) */}
                  <div
                    className={`absolute inset-y-0 left-0 rounded-md transition-all duration-700 ${
                      c.besser
                        ? "bg-gradient-to-r from-oegd-green/60 to-oegd-green/40"
                        : c.userScore === 2
                          ? "bg-gradient-to-r from-oegd-red/60 to-oegd-red/40"
                          : "bg-gradient-to-r from-oegd-yellow/60 to-oegd-yellow/40"
                    }`}
                    style={{ width: `${userPct}%` }}
                  />
                  {/* Average marker line */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-oegd-navy/40"
                    style={{ left: `${avgPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm bg-oegd-blue/50" />
            <span>Ihr Ergebnis</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm bg-oegd-slate/20" />
            <span>Bundesdurchschnitt</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-0.5 h-3 bg-oegd-navy/40" />
            <span>Bundesschnitt-Linie</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
