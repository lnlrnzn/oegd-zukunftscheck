export interface ProcessBenchmark {
  processId: number;
  prozess: string;
  nationalAvgScore: number;
  analogAnteil: number;
}

export interface BenchmarkSummary {
  source: string;
  averageOverallScore: number;
  benchmarks: ProcessBenchmark[];
}

/**
 * EvalDiGe 2024 Referenzdaten — Bundesdurchschnittliche Digitalisierungsgrade
 * pro Kernprozess im ÖGD. Score 0-2 Skala (0=digital, 2=analog).
 * analogAnteil = Anteil der GÄ, die diesen Prozess überwiegend analog betreiben.
 */
export const EVALIDGE_BENCHMARKS: BenchmarkSummary = {
  source: "EvalDiGe 2024",
  averageOverallScore: 14.2,
  benchmarks: [
    { processId: 1, prozess: "Amtsärztliche Begutachtungen", nationalAvgScore: 1.6, analogAnteil: 72 },
    { processId: 2, prozess: "Einstellungsuntersuchungen", nationalAvgScore: 1.4, analogAnteil: 58 },
    { processId: 3, prozess: "Medizinalstatistik / Berichtswesen", nationalAvgScore: 1.2, analogAnteil: 42 },
    { processId: 4, prozess: "Hygieneüberwachung / -begehungen", nationalAvgScore: 1.5, analogAnteil: 65 },
    { processId: 5, prozess: "Schulärztliche Gutachten", nationalAvgScore: 1.7, analogAnteil: 78 },
    { processId: 6, prozess: "Einschulungsuntersuchungen", nationalAvgScore: 1.3, analogAnteil: 48 },
    { processId: 7, prozess: "Zahnärztliche Reihenuntersuchungen", nationalAvgScore: 1.8, analogAnteil: 85 },
    { processId: 8, prozess: "Meldepflichtige Erkrankungen (IfSG)", nationalAvgScore: 0.8, analogAnteil: 18 },
    { processId: 9, prozess: "Todesbescheinigungen / Leichenschau", nationalAvgScore: 1.9, analogAnteil: 92 },
    { processId: 10, prozess: "Krisenmanagement (PsychKG / Katastrophenschutz)", nationalAvgScore: 1.5, analogAnteil: 62 },
  ],
};

export function getUserScoreForProcess(
  processId: number,
  answers: Record<number, number>
): number {
  return answers[processId] ?? 0;
}

export function compareWithBenchmark(
  answers: Record<number, number>
): { processId: number; prozess: string; userScore: number; avgScore: number; besser: boolean }[] {
  return EVALIDGE_BENCHMARKS.benchmarks.map((b) => {
    const userScore = getUserScoreForProcess(b.processId, answers);
    return {
      processId: b.processId,
      prozess: b.prozess,
      userScore,
      avgScore: b.nationalAvgScore,
      besser: userScore < b.nationalAvgScore,
    };
  });
}
