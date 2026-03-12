export const DEFAULT_ASSUMPTIONS = {
  retirementHorizonYears: 8,
  retirementRateOf55Plus: 0.85,
  hoursPerWeekPerAnalogProcess: 6,
  digitalizationSavingsFactor: 0.65,
  hoursPerWeekPerTeilweiseProcess: 3,
  teilweiseSavingsFactor: 0.35,
  workingWeeksPerYear: 46,
  annualFTEHours: 1700,
};

export interface ROIResult {
  retiredVZAE: number;
  retiredPercent: number;
  weeklyHoursSaved: number;
  annualHoursSaved: number;
  fteEquivalentSaved: number;
  anteil55plus: number;
  anzahl55plus: number;
  vzaeGesamt: number;
  analogCount: number;
  teilweiseCount: number;
}

export interface ROIInput {
  anteil55plus: number;
  anzahl55plus: number;
  vzaeGesamt: number;
  analogCount: number;
  teilweiseCount: number;
}

export function calculateROI(
  input: ROIInput,
  assumptions = DEFAULT_ASSUMPTIONS
): ROIResult {
  const {
    retirementRateOf55Plus,
    hoursPerWeekPerAnalogProcess,
    digitalizationSavingsFactor,
    hoursPerWeekPerTeilweiseProcess,
    teilweiseSavingsFactor,
    workingWeeksPerYear,
    annualFTEHours,
  } = assumptions;

  // Rentenwelle
  const retiredVZAE = input.anzahl55plus * retirementRateOf55Plus;
  const retiredPercent =
    input.vzaeGesamt > 0 ? (retiredVZAE / input.vzaeGesamt) * 100 : 0;

  // Stunden gespart durch Digitalisierung
  const analogHoursSaved =
    input.analogCount * hoursPerWeekPerAnalogProcess * digitalizationSavingsFactor;
  const teilweiseHoursSaved =
    input.teilweiseCount *
    hoursPerWeekPerTeilweiseProcess *
    teilweiseSavingsFactor;
  const weeklyHoursSaved = analogHoursSaved + teilweiseHoursSaved;
  const annualHoursSaved = weeklyHoursSaved * workingWeeksPerYear;

  // VZÄ-Äquivalent
  const fteEquivalentSaved = annualHoursSaved / annualFTEHours;

  return {
    retiredVZAE: Math.round(retiredVZAE * 10) / 10,
    retiredPercent: Math.round(retiredPercent * 10) / 10,
    weeklyHoursSaved: Math.round(weeklyHoursSaved * 10) / 10,
    annualHoursSaved: Math.round(annualHoursSaved),
    fteEquivalentSaved: Math.round(fteEquivalentSaved * 10) / 10,
    anteil55plus: input.anteil55plus,
    anzahl55plus: input.anzahl55plus,
    vzaeGesamt: input.vzaeGesamt,
    analogCount: input.analogCount,
    teilweiseCount: input.teilweiseCount,
  };
}
