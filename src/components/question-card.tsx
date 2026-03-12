"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Monitor, ArrowLeftRight, FileText } from "lucide-react";
import type { Question } from "@/lib/questions";

interface QuestionCardProps {
  question: Question;
  answer: number | undefined;
  onAnswer: (value: number) => void;
  questionNumber: number;
  total: number;
}

const OPTION_CONFIG = [
  {
    icon: Monitor,
    color: "text-oegd-green",
    selectedBg: "bg-oegd-green-light",
    selectedBorder: "border-oegd-green",
    tag: "Digital",
    tagBg: "bg-oegd-green-light text-oegd-green",
  },
  {
    icon: ArrowLeftRight,
    color: "text-oegd-yellow",
    selectedBg: "bg-oegd-yellow-light",
    selectedBorder: "border-oegd-yellow",
    tag: "Teilweise",
    tagBg: "bg-oegd-yellow-light text-oegd-yellow",
  },
  {
    icon: FileText,
    color: "text-oegd-red",
    selectedBg: "bg-oegd-red-light",
    selectedBorder: "border-oegd-red",
    tag: "Analog",
    tagBg: "bg-oegd-red-light text-oegd-red",
  },
];

export function QuestionCard({
  question,
  answer,
  onAnswer,
  questionNumber,
  total,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border-0 shadow-black/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-oegd-blue">
            Frage {questionNumber}/{total}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i < questionNumber
                    ? "bg-oegd-blue"
                    : i === questionNumber
                      ? "bg-oegd-blue/40"
                      : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
        <h2 className="text-lg font-bold text-oegd-navy leading-snug tracking-tight">
          {question.prozess}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {question.frage}
        </p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={answer !== undefined ? String(answer) : undefined}
          onValueChange={(v) => onAnswer(Number(v))}
          className="space-y-3"
        >
          {question.optionen.map((opt, idx) => {
            const config = OPTION_CONFIG[idx];
            const isSelected = answer === opt.wert;

            return (
              <label
                key={opt.wert}
                htmlFor={`q${question.id}-${opt.wert}`}
                className={`option-card flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer ${
                  isSelected
                    ? `selected ${config.selectedBorder} ${config.selectedBg}`
                    : "border-border/60 bg-white"
                }`}
              >
                <RadioGroupItem
                  value={String(opt.wert)}
                  id={`q${question.id}-${opt.wert}`}
                  className="mt-0.5 shrink-0"
                />
                <span className="flex-1 min-w-0 text-sm leading-relaxed font-normal">
                  {opt.label}
                </span>
                <span
                  className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.tagBg}`}
                  aria-hidden="true"
                >
                  {config.tag}
                </span>
              </label>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
