export interface YearGenderData {
  insgesamt: number | null;
  maennlich: number | null;
  weiblich: number | null;
}

export interface YearPair {
  "2023": YearGenderData;
  "2024": YearGenderData;
}

export interface RegionData {
  name: string;
  bundesland: string | null;
  typ: "deutschland" | "bundesland" | "raumordnungsregion";
  daten: {
    nach_alter: Record<string, YearPair>;
    nach_personengruppe: Record<string, YearPair>;
    nach_beschaeftigungsverhaeltnis: Record<string, YearPair>;
    nach_beschaeftigungsart: Record<string, YearPair>;
    nach_beruf: Record<string, YearPair>;
    nach_taetigkeitsbereich: Record<string, YearPair>;
    nach_abschluss: Record<string, YearPair>;
  };
}

export interface RegionenJSON {
  beschreibung: string;
  quelle: string;
  filter: { behoerdentyp: string; darstellung: string };
  regionen: RegionData[];
}

export interface BundeslandBerufsgruppen {
  aerzte_zahnaerzte_vzae: number;
  aerzte_anteil_pct: number;
  fachpersonal_vzae: number;
  fachpersonal_anteil_pct: number;
  verwaltung_vzae: number;
  verwaltung_anteil_pct: number;
}

export interface BundeslandBefristung {
  unbefristet_vzae: number;
  unbefristet_anteil_pct: number;
  befristet_vzae: number;
  befristet_anteil_pct: number;
}

export interface BundeslandDaten {
  region: string;
  vorgaben_vzae: number;
  ist_besetzt_vzae_2024: number;
  uebererfuellung_vzae: number;
  uebererfuellung_pct: number;
  ebene: {
    untere_gesundheitsbehoerde_vzae: number;
    landesstellen_vzae: number;
  };
  befristung: BundeslandBefristung;
  aufgabenbereiche: Record<string, number>;
  berufsgruppen: BundeslandBerufsgruppen;
}

export interface PersonalaufbauJSON {
  beschreibung: string;
  quelle: string;
  hinweis: string;
  laender: BundeslandDaten[];
  gesamt_de: BundeslandDaten;
}
