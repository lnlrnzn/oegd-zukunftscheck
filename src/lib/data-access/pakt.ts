import "server-only";
import personalRaw from "../../../data/personalaufbau_bundeslaender.json";
import type { PersonalaufbauJSON, BundeslandDaten } from "../data";

const data = personalRaw as unknown as PersonalaufbauJSON;

const BL_KUERZEL_TO_NAME: Record<string, string> = {
  BW: "Baden-Württemberg",
  BY: "Bayern",
  BE: "Berlin",
  BB: "Brandenburg",
  HB: "Bremen",
  HH: "Hamburg",
  HE: "Hessen",
  MV: "Mecklenburg-Vorpommern",
  NS: "Niedersachsen",
  NRW: "Nordrhein-Westfalen",
  RP: "Rheinland-Pfalz",
  SL: "Saarland",
  SN: "Sachsen",
  ST: "Sachsen-Anhalt",
  SH: "Schleswig-Holstein",
  TH: "Thüringen",
};

export interface PaktRow {
  kuerzel: string;
  bundesland: string;
  vorgabenVzae: number;
  istBesetztVzae2024: number;
  uebererfuellungVzae: number;
  uebererfuellungPct: number;
  untereGesundheitsbehoerdeVzae: number;
  landesstellenVzae: number;
  unbefristetVzae: number;
  unbefristetAnteilPct: number;
  befristetVzae: number;
  befristetAnteilPct: number;
  aerzteVzae: number;
  fachpersonalVzae: number;
  verwaltungVzae: number;
}

function mapLand(entry: BundeslandDaten): PaktRow {
  return {
    kuerzel: entry.region,
    bundesland: BL_KUERZEL_TO_NAME[entry.region] ?? entry.region,
    vorgabenVzae: entry.vorgaben_vzae,
    istBesetztVzae2024: entry.ist_besetzt_vzae_2024,
    uebererfuellungVzae: entry.uebererfuellung_vzae,
    uebererfuellungPct: entry.uebererfuellung_pct,
    untereGesundheitsbehoerdeVzae: entry.ebene.untere_gesundheitsbehoerde_vzae,
    landesstellenVzae: entry.ebene.landesstellen_vzae,
    unbefristetVzae: entry.befristung.unbefristet_vzae,
    unbefristetAnteilPct: entry.befristung.unbefristet_anteil_pct,
    befristetVzae: entry.befristung.befristet_vzae,
    befristetAnteilPct: entry.befristung.befristet_anteil_pct,
    aerzteVzae: entry.berufsgruppen.aerzte_zahnaerzte_vzae,
    fachpersonalVzae: entry.berufsgruppen.fachpersonal_vzae,
    verwaltungVzae: entry.berufsgruppen.verwaltung_vzae,
  };
}

export function getPaktLaender(): PaktRow[] {
  return data.laender
    .map(mapLand)
    .sort((a, b) => a.bundesland.localeCompare(b.bundesland, "de"));
}

export function getPaktGesamt(): PaktRow {
  return { ...mapLand(data.gesamt_de), kuerzel: "DE", bundesland: "Deutschland" };
}
