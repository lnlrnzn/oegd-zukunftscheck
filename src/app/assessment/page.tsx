"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RegionSelector } from "@/components/region-selector";
import { RegionDashboard } from "@/components/region-dashboard";
import { QuestionCard } from "@/components/question-card";
import { ResultScreen } from "@/components/result-screen";
import { getRegionByName } from "@/lib/regions";
import { questions } from "@/lib/questions";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ClipboardCheck,
  Shield,
  RotateCcw,
} from "lucide-react";
import type { RegionData } from "@/lib/data";

type Step = "region" | "dashboard" | `frage-${number}` | "ergebnis";

function getQuestionIndex(step: Step): number | null {
  if (typeof step === "string" && step.startsWith("frage-")) {
    return parseInt(step.split("-")[1], 10);
  }
  return null;
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

export default function AssessmentPage() {
  const [step, setStep] = useState<Step>("region");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [region, setRegion] = useState<RegionData | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleRegionSelect = useCallback((name: string) => {
    setSelectedRegion(name);
    const r = getRegionByName(name);
    if (r) setRegion(r);
  }, []);

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAnswer = useCallback(
    (questionId: number, value: number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));

      // Auto-advance after brief visual feedback delay
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = setTimeout(() => {
        // Find current question index from the id
        const qIdx = questions.findIndex((q) => q.id === questionId);
        if (qIdx >= 0 && qIdx < questions.length - 1) {
          setDirection(1);
          setStep(`frage-${qIdx + 1}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (qIdx === questions.length - 1) {
          setDirection(1);
          setStep("ergebnis");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 400);
    },
    []
  );

  const questionIndex = getQuestionIndex(step);
  const currentQuestion =
    questionIndex !== null ? questions[questionIndex] : null;

  const totalSteps = 2 + questions.length;
  let currentStepNum = 0;
  if (step === "region") currentStepNum = 0;
  else if (step === "dashboard") currentStepNum = 1;
  else if (questionIndex !== null) currentStepNum = 2 + questionIndex;
  else if (step === "ergebnis") currentStepNum = totalSteps;
  const progressValue = (currentStepNum / totalSteps) * 100;

  const goTo = (nextStep: Step, dir: number) => {
    setDirection(dir);
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    if (step === "region" && region) {
      goTo("dashboard", 1);
    } else if (step === "dashboard") {
      goTo("frage-0", 1);
    } else if (questionIndex !== null) {
      if (questionIndex < questions.length - 1) {
        goTo(`frage-${questionIndex + 1}`, 1);
      } else {
        goTo("ergebnis", 1);
      }
    }
  };

  const goBack = () => {
    if (step === "dashboard") {
      goTo("region", -1);
    } else if (step === "ergebnis") {
      goTo(`frage-${questions.length - 1}`, -1);
    } else if (questionIndex !== null) {
      if (questionIndex === 0) {
        goTo("dashboard", -1);
      } else {
        goTo(`frage-${questionIndex - 1}`, -1);
      }
    }
  };

  const restart = () => {
    setAnswers({});
    setSelectedRegion("");
    setRegion(null);
    goTo("region", -1);
  };

  const canGoNext = () => {
    if (step === "region") return !!region;
    if (step === "dashboard") return true;
    if (questionIndex !== null && currentQuestion) {
      return answers[currentQuestion.id] !== undefined;
    }
    return false;
  };

  const stepLabel = (() => {
    if (step === "region") return "Region auswählen";
    if (step === "dashboard") return "Personaldaten";
    if (questionIndex !== null)
      return `Frage ${questionIndex + 1} von ${questions.length}`;
    if (step === "ergebnis") return "Ihre Auswertung";
    return "";
  })();

  return (
    <main className="min-h-screen bg-muted/30 bg-dot-pattern">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-header border-b">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-oegd-navy hover:text-oegd-blue transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-oegd-blue flex items-center justify-center">
                <Shield className="h-3 w-3 text-white" />
              </div>
              <span className="hidden sm:inline">ÖGD Zukunftscheck</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">
                {stepLabel}
              </span>
              {step !== "ergebnis" ? (
                <span className="text-xs text-oegd-blue font-semibold tabular-nums">
                  {Math.round(progressValue)}%
                </span>
              ) : null}
            </div>
          </div>
          {step !== "ergebnis" ? (
            <Progress value={progressValue} className="h-1.5" />
          ) : (
            <div className="h-1.5 w-full rounded-full bg-oegd-green" />
          )}
        </div>
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Region Select */}
          {step === "region" && (
            <motion.div
              key="region"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-oegd-blue-light border border-oegd-blue/10">
                  <MapPin className="h-7 w-7 text-oegd-blue" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight">
                  Wählen Sie Ihre Region
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                  Wählen Sie die Raumordnungsregion Ihres Gesundheitsamtes, um
                  Ihre regionalen Personaldaten zu sehen.
                </p>
              </div>
              <div className="flex justify-center">
                <RegionSelector
                  value={selectedRegion}
                  onChange={handleRegionSelect}
                />
              </div>
              {region && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <Button
                    onClick={goNext}
                    size="lg"
                    className="px-8 shadow-lg shadow-oegd-blue/15"
                  >
                    Weiter zum Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Dashboard */}
          {step === "dashboard" && region && (
            <motion.div
              key="dashboard"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-oegd-blue">
                  Regionsdaten
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight">
                  {region.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Aktueller Stand — Regionales
                  Gesundheitspersonalmonitoring (2024)
                </p>
              </div>
              <RegionDashboard region={region} />
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={goBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Region ändern
                </Button>
                <Button
                  onClick={goNext}
                  size="lg"
                  className="px-8 shadow-lg shadow-oegd-blue/15 gap-2"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Digitalisierungsgrad prüfen
                </Button>
              </div>
            </motion.div>
          )}

          {/* Questions */}
          {questionIndex !== null && currentQuestion && (
            <motion.div
              key={`frage-${questionIndex}`}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8"
            >
              <QuestionCard
                question={currentQuestion}
                answer={answers[currentQuestion.id]}
                onAnswer={(v) => handleAnswer(currentQuestion.id, v)}
                questionNumber={questionIndex + 1}
                total={questions.length}
              />
              <div className="flex justify-between max-w-2xl mx-auto">
                <Button variant="outline" onClick={goBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </Button>
                <Button
                  onClick={goNext}
                  disabled={!canGoNext()}
                  size="lg"
                  className="shadow-lg shadow-oegd-blue/15 gap-2"
                >
                  {questionIndex < questions.length - 1
                    ? "Nächste Frage"
                    : "Auswertung anzeigen"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Result */}
          {step === "ergebnis" && (
            <motion.div
              key="ergebnis"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8"
            >
              <ResultScreen answers={answers} regionName={selectedRegion} />
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={goBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Antworten prüfen
                </Button>
                <Button variant="outline" onClick={restart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Neu starten
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
