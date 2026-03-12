import { questions } from "./questions";

export type Stufe = "gut" | "handlungsbedarf" | "dringend";

export interface ScoreResult {
  total: number;
  maxTotal: number;
  stufe: Stufe;
  stufenLabel: string;
  stufenFarbe: string;
  analogeProzesse: string[];
  teilweiseDigitaleProzesse: string[];
}

export function calculateScore(answers: Record<number, number>): ScoreResult {
  let total = 0;
  const analogeProzesse: string[] = [];
  const teilweiseDigitaleProzesse: string[] = [];

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer !== undefined) {
      total += answer;
      if (answer === 2) {
        analogeProzesse.push(q.prozess);
      } else if (answer === 1) {
        teilweiseDigitaleProzesse.push(q.prozess);
      }
    }
  }

  let stufe: Stufe;
  let stufenLabel: string;
  let stufenFarbe: string;

  if (total <= 6) {
    stufe = "gut";
    stufenLabel = "Gut aufgestellt";
    stufenFarbe = "text-oegd-green";
  } else if (total <= 13) {
    stufe = "handlungsbedarf";
    stufenLabel = "Handlungsbedarf erkennbar";
    stufenFarbe = "text-oegd-yellow";
  } else {
    stufe = "dringend";
    stufenLabel = "Dringender Handlungsbedarf";
    stufenFarbe = "text-oegd-red";
  }

  return {
    total,
    maxTotal: 20,
    stufe,
    stufenLabel,
    stufenFarbe,
    analogeProzesse,
    teilweiseDigitaleProzesse,
  };
}
