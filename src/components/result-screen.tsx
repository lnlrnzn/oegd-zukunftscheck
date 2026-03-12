"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { calculateScore } from "@/lib/scoring";
import { questions } from "@/lib/questions";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Monitor,
  ArrowLeftRight,
  FileText,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";

interface ResultScreenProps {
  answers: Record<number, number>;
  regionName: string;
}

export function ResultScreen({ answers, regionName }: ResultScreenProps) {
  const result = calculateScore(answers);
  const [submitted, setSubmitted] = useState(false);

  const stufeIcon =
    result.stufe === "gut" ? (
      <CheckCircle2 className="h-14 w-14 text-oegd-green" />
    ) : result.stufe === "handlungsbedarf" ? (
      <AlertTriangle className="h-14 w-14 text-oegd-yellow" />
    ) : (
      <XCircle className="h-14 w-14 text-oegd-red" />
    );

  const stufeGradient =
    result.stufe === "gut"
      ? "score-gradient-green"
      : result.stufe === "handlungsbedarf"
        ? "score-gradient-yellow"
        : "score-gradient-red";

  const beamColor =
    result.stufe === "gut"
      ? { from: "#059669", to: "#34d399" }
      : result.stufe === "handlungsbedarf"
        ? { from: "#d97706", to: "#fbbf24" }
        : { from: "#dc2626", to: "#f87171" };

  // Count by category
  const digitalCount = questions.filter((q) => answers[q.id] === 0).length;
  const teilweiseCount = result.teilweiseDigitaleProzesse.length;
  const analogCount = result.analogeProzesse.length;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Score Card */}
      <Card className={`relative overflow-hidden ${stufeGradient} border-0 shadow-lg`}>
        <CardContent className="p-8 md:p-10 text-center">
          <div className="flex justify-center mb-5">{stufeIcon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight mb-1">
            {result.stufenLabel}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Region: {regionName}
          </p>
          <div className="inline-flex items-baseline gap-1">
            <span className={`text-5xl md:text-6xl font-bold tabular-nums ${result.stufenFarbe}`}>
              <NumberTicker value={result.total} delay={0.2} />
            </span>
            <span className="text-xl text-muted-foreground font-normal">
              /{result.maxTotal}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            0 = vollständig digital &middot; 20 = vollständig analog
          </p>
        </CardContent>
        <BorderBeam
          size={300}
          duration={8}
          colorFrom={beamColor.from}
          colorTo={beamColor.to}
        />
      </Card>

      {/* Summary Badges */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in delay-1">
        <div className="text-center p-4 rounded-xl bg-oegd-green-light/50 border border-oegd-green/10">
          <Monitor className="h-5 w-5 text-oegd-green mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-oegd-green tabular-nums">
            {digitalCount}
          </p>
          <p className="text-[11px] text-muted-foreground font-medium">
            Digital
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-oegd-yellow-light/50 border border-oegd-yellow/10">
          <ArrowLeftRight className="h-5 w-5 text-oegd-yellow mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-oegd-yellow tabular-nums">
            {teilweiseCount}
          </p>
          <p className="text-[11px] text-muted-foreground font-medium">
            Teilweise
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-oegd-red-light/50 border border-oegd-red/10">
          <FileText className="h-5 w-5 text-oegd-red mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-oegd-red tabular-nums">
            {analogCount}
          </p>
          <p className="text-[11px] text-muted-foreground font-medium">
            Analog
          </p>
        </div>
      </div>

      {/* Detail breakdown */}
      {(result.analogeProzesse.length > 0 ||
        result.teilweiseDigitaleProzesse.length > 0) && (
        <Card className="border-0 shadow-sm animate-fade-in delay-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-oegd-navy">
              Detailauswertung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {result.analogeProzesse.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-oegd-red flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-oegd-red" />
                  Überwiegend analog ({result.analogeProzesse.length})
                </h3>
                <div className="space-y-2">
                  {result.analogeProzesse.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-3 text-sm p-2.5 rounded-lg bg-oegd-red-light/30"
                    >
                      <FileText className="h-3.5 w-3.5 text-oegd-red shrink-0" />
                      <span className="text-foreground/80">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.teilweiseDigitaleProzesse.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-oegd-yellow flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-oegd-yellow" />
                  Teilweise digital ({result.teilweiseDigitaleProzesse.length})
                </h3>
                <div className="space-y-2">
                  {result.teilweiseDigitaleProzesse.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-3 text-sm p-2.5 rounded-lg bg-oegd-yellow-light/30"
                    >
                      <ArrowLeftRight className="h-3.5 w-3.5 text-oegd-yellow shrink-0" />
                      <span className="text-foreground/80">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <Separator className="my-2" />

      <Card className="border-0 shadow-md bg-white animate-fade-in delay-3">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg bg-oegd-blue-light flex items-center justify-center">
              <Mail className="h-4 w-4 text-oegd-blue" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-oegd-navy">
                Ergebnisse besprechen?
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Wir zeigen Ihnen, wo Digitalisierung den größten Hebel bietet.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-6 animate-fade-in-scale">
              <CheckCircle2 className="h-12 w-12 text-oegd-green mx-auto mb-3" />
              <p className="font-semibold text-oegd-navy">Vielen Dank!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Wir melden uns zeitnah bei Ihnen.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Dr. Max Mustermann"
                    required
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="amt" className="text-xs font-medium">
                    Gesundheitsamt
                  </Label>
                  <Input
                    id="amt"
                    name="organization"
                    autoComplete="organization"
                    placeholder="GA Musterstadt"
                    required
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">
                    E-Mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="m.mustermann@musterstadt.de"
                    required
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="telefon" className="text-xs font-medium">
                    Telefon (optional)
                  </Label>
                  <Input
                    id="telefon"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+49 ..."
                    className="h-10"
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full shadow-lg shadow-oegd-blue/15 gap-2"
              >
                Ergebnisse besprechen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
