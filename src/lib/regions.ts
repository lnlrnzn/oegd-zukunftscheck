import regionenRaw from "../../data/gbe_regionen_vollzeitaequivalente.json";
import personalaufbauRaw from "../../data/personalaufbau_bundeslaender.json";
import type {
  RegionenJSON,
  RegionData,
  PersonalaufbauJSON,
  BundeslandDaten,
} from "./data";

const regionenData = regionenRaw as unknown as RegionenJSON;
const personalaufbauData = personalaufbauRaw as unknown as PersonalaufbauJSON;

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

export interface GroupedRegions {
  bundesland: string;
  regionen: { name: string; index: number }[];
}

function normalizeBundesland(bl: string | null): string {
  if (!bl) return "";
  if (bl === "Niedersachsen und Bremen") return "Niedersachsen";
  return bl;
}

export function getAllRegions(): RegionData[] {
  return regionenData.regionen;
}

export function getRaumordnungsregionen(): RegionData[] {
  return regionenData.regionen.filter((r) => r.typ === "raumordnungsregion");
}

export function getRegionByName(name: string): RegionData | undefined {
  return regionenData.regionen.find((r) => r.name === name);
}

export function getDeutschland(): RegionData {
  return regionenData.regionen.find((r) => r.typ === "deutschland")!;
}

export function getGroupedRegions(): GroupedRegions[] {
  const rorRegions = getRaumordnungsregionen();
  const groups: Map<string, { name: string; index: number }[]> = new Map();

  const blOrder = [
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Nordrhein-Westfalen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  for (const bl of blOrder) {
    groups.set(bl, []);
  }

  rorRegions.forEach((r, i) => {
    const bl = normalizeBundesland(r.bundesland);
    if (!groups.has(bl)) {
      groups.set(bl, []);
    }
    groups.get(bl)!.push({ name: r.name, index: i });
  });

  return blOrder
    .filter((bl) => (groups.get(bl)?.length ?? 0) > 0)
    .map((bl) => ({
      bundesland: bl,
      regionen: groups.get(bl)!.sort((a, b) => a.name.localeCompare(b.name, "de")),
    }));
}

export function getBundeslandDaten(
  regionBundesland: string | null
): BundeslandDaten | undefined {
  if (!regionBundesland) return undefined;
  const normalized = normalizeBundesland(regionBundesland);

  // Find BL Kürzel from name
  const kuerzel = Object.entries(BL_KUERZEL_TO_NAME).find(
    ([, name]) => name === normalized
  )?.[0];

  if (!kuerzel) return undefined;
  return personalaufbauData.laender.find((l) => l.region === kuerzel);
}

export function getGesamtDE(): BundeslandDaten {
  return personalaufbauData.gesamt_de;
}

export interface RegionKennzahlen {
  vzaeGesamt2024: number;
  vzaeGesamt2023: number;
  veraenderung: number;
  veraenderungPct: number;
  anteil55plus: number;
  anzahl55plus: number;
  berufsmix: {
    aerzte: number;
    fachpersonal: number;
    verwaltung: number;
  };
  blPaktUebererfuellung: number;
  blUnbefristetAnteil: number;
  blName: string;
}

export function berechneKennzahlen(region: RegionData): RegionKennzahlen {
  const alter = region.daten.nach_alter;
  const beruf = region.daten.nach_beruf;

  const vzae2024 = alter["Insgesamt"]?.["2024"]?.insgesamt ?? 0;
  const vzae2023 = alter["Insgesamt"]?.["2023"]?.insgesamt ?? 0;
  const veraenderung = vzae2024 - vzae2023;
  const veraenderungPct = vzae2023 > 0 ? (veraenderung / vzae2023) * 100 : 0;

  // 55+ = "55 Jahre bis unter 65 Jahre" + "65 Jahre und älter"
  const key55 = Object.keys(alter).find((k) => k.startsWith("55 Jahre"));
  const key65 = Object.keys(alter).find((k) => k.startsWith("65 Jahre"));
  const val55 = key55 ? alter[key55]?.["2024"]?.insgesamt ?? 0 : 0;
  const val65 = key65 ? alter[key65]?.["2024"]?.insgesamt ?? 0 : 0;
  const anzahl55plus = val55 + val65;
  const anteil55plus = vzae2024 > 0 ? (anzahl55plus / vzae2024) * 100 : 0;

  // Berufsmix
  const aerztKey = Object.keys(beruf).find((k) =>
    k.includes("rztinnen") || k.includes("rzte")
  );
  const aerzte =
    aerztKey && aerztKey !== "Insgesamt"
      ? beruf[aerztKey]?.["2024"]?.insgesamt ?? 0
      : 0;
  const fachpersonal = beruf["Fachpersonal"]?.["2024"]?.insgesamt ?? 0;
  const verwaltung =
    beruf["Verwaltungspersonal"]?.["2024"]?.insgesamt ?? 0;

  // BL Daten
  const blDaten = getBundeslandDaten(region.bundesland);
  const blPaktUebererfuellung = blDaten?.uebererfuellung_pct ?? 0;
  const blUnbefristetAnteil = blDaten?.befristung.unbefristet_anteil_pct ?? 0;
  const blName = normalizeBundesland(region.bundesland);

  return {
    vzaeGesamt2024: vzae2024,
    vzaeGesamt2023: vzae2023,
    veraenderung,
    veraenderungPct,
    anteil55plus,
    anzahl55plus,
    berufsmix: { aerzte, fachpersonal, verwaltung },
    blPaktUebererfuellung,
    blUnbefristetAnteil,
    blName,
  };
}
