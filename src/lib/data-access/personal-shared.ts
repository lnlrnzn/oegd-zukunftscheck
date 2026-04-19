export type PersonalEbene = "deutschland" | "bundesland" | "raumordnungsregion";
export type PersonalDimension =
  | "nach_alter"
  | "nach_personengruppe"
  | "nach_beschaeftigungsverhaeltnis"
  | "nach_beschaeftigungsart"
  | "nach_beruf"
  | "nach_taetigkeitsbereich"
  | "nach_abschluss";

export const PERSONAL_DIMENSIONS: { id: PersonalDimension; label: string }[] = [
  { id: "nach_alter", label: "Alter" },
  { id: "nach_beruf", label: "Berufsgruppe" },
  { id: "nach_taetigkeitsbereich", label: "Tätigkeitsbereich" },
  { id: "nach_abschluss", label: "Abschluss" },
  { id: "nach_beschaeftigungsverhaeltnis", label: "Beschäftigungsverhältnis" },
  { id: "nach_beschaeftigungsart", label: "Beschäftigungsart" },
  { id: "nach_personengruppe", label: "Personengruppe" },
];

export interface PersonalRow {
  region: string;
  ebene: PersonalEbene;
  bundesland: string | null;
  dimension: PersonalDimension;
  kategorie: string;
  jahr: "2023" | "2024";
  insgesamt: number | null;
  maennlich: number | null;
  weiblich: number | null;
}
