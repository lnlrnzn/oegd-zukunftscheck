import type { RegionData, BundeslandDaten } from "./data";
import {
  getRaumordnungsregionen,
  getDeutschland,
  getGroupedRegions,
  berechneKennzahlen,
  getBundeslandDaten,
  getGesamtDE,
  type RegionKennzahlen,
} from "./regions";
import rorMapping from "../../data/ror_landkreis_mapping.json";
import benchmarkingData from "../../data/benchmarking_durchschnitte.json";

interface RORMapping {
  ror_name: string;
  ror_id: string;
  bundesland: string;
  einwohner_gesamt: number;
  landkreise: { ags: string; name: string; einwohner: number }[];
}

const rorMappingTyped = rorMapping as RORMapping[];

export interface BundeslandBenchmark {
  name: string;
  digitalisierungsgrad: { stufe_0_pct: number; durchschnitts_score: number };
  anteil_55plus_pct: number;
  vzae_pro_100k_einwohner: number;
}

const blBenchmarks = benchmarkingData.bundeslaender as BundeslandBenchmark[];
const deBenchmark = benchmarkingData.deutschland as {
  anteil_55plus_pct: number;
  vzae_pro_100k_einwohner: number;
  digitalisierungsgrad: { stufe_0_pct: number; durchschnitts_score: number };
};

/** Get population for a given ROR region (or total for Deutschland) */
export function getEinwohnerForRegion(regionName: string): number {
  if (regionName === "Deutschland") return getEinwohnerDeutschland();
  const match = rorMappingTyped.find((r) => r.ror_name === regionName);
  return match?.einwohner_gesamt ?? 0;
}

/** Get population for a Bundesland (sum of all ROR in that BL) */
export function getEinwohnerForBundesland(bundesland: string): number {
  return rorMappingTyped
    .filter((r) => r.bundesland === bundesland)
    .reduce((sum, r) => sum + r.einwohner_gesamt, 0);
}

/** Get total population for Germany */
export function getEinwohnerDeutschland(): number {
  return rorMappingTyped.reduce((sum, r) => sum + r.einwohner_gesamt, 0);
}

/** Compute VZÄ per 100k inhabitants */
export function computeVzaePro100k(vzae: number, einwohner: number): number {
  if (einwohner === 0) return 0;
  return (vzae / einwohner) * 100_000;
}

/** Aggregate VZÄ data for a given Bundesland by summing all ROR regions in it */
export function aggregateByBundesland(bundesland: string): RegionKennzahlen | null {
  const regions = getRaumordnungsregionen().filter(
    (r) => normalizeBL(r.bundesland) === bundesland
  );
  if (regions.length === 0) return null;

  let vzae2024 = 0;
  let vzae2023 = 0;
  let anzahl55plus = 0;
  let aerzte = 0;
  let fachpersonal = 0;
  let verwaltung = 0;

  for (const region of regions) {
    const k = berechneKennzahlen(region);
    vzae2024 += k.vzaeGesamt2024;
    vzae2023 += k.vzaeGesamt2023;
    anzahl55plus += k.anzahl55plus;
    aerzte += k.berufsmix.aerzte;
    fachpersonal += k.berufsmix.fachpersonal;
    verwaltung += k.berufsmix.verwaltung;
  }

  const veraenderung = vzae2024 - vzae2023;
  const veraenderungPct = vzae2023 > 0 ? (veraenderung / vzae2023) * 100 : 0;
  const anteil55plus = vzae2024 > 0 ? (anzahl55plus / vzae2024) * 100 : 0;

  const blDaten = getBundeslandDaten(bundesland);

  return {
    vzaeGesamt2024: vzae2024,
    vzaeGesamt2023: vzae2023,
    veraenderung,
    veraenderungPct,
    anteil55plus,
    anzahl55plus,
    berufsmix: { aerzte, fachpersonal, verwaltung },
    blPaktUebererfuellung: blDaten?.uebererfuellung_pct ?? 0,
    blUnbefristetAnteil: blDaten?.befristung.unbefristet_anteil_pct ?? 0,
    blName: bundesland,
  };
}

/** Compute national averages from Deutschland region */
export function computeNationalAverages(): RegionKennzahlen {
  const de = getDeutschland();
  return berechneKennzahlen(de);
}

/** Get all Bundesland Pakt data sorted by VZÄ-Zuwachs (Übererfüllung) */
export function getAllBundeslaenderPakt(): BundeslandDaten[] {
  const gesamtDE = getGesamtDE();
  // get all laender from personalaufbau
  const grouped = getGroupedRegions();
  const result: BundeslandDaten[] = [];
  for (const g of grouped) {
    const bl = getBundeslandDaten(g.bundesland);
    if (bl) result.push(bl);
  }
  return result;
}

/** Rank a Bundesland among all BL by Übererfüllung */
export function rankBundesland(bundesland: string): { rank: number; total: number } {
  const all = getAllBundeslaenderPakt();
  const sorted = [...all].sort((a, b) => b.uebererfuellung_pct - a.uebererfuellung_pct);
  const rank = sorted.findIndex((bl) => {
    const blName = BL_KUERZEL_TO_NAME[bl.region];
    return blName === bundesland;
  });
  return { rank: rank >= 0 ? rank + 1 : 0, total: sorted.length };
}

/** Get BL benchmark data (from benchmarking_durchschnitte.json) */
export function getBundeslandBenchmark(bundesland: string): BundeslandBenchmark | undefined {
  return blBenchmarks.find((bl) => bl.name === bundesland);
}

/** Get national benchmark */
export function getNationalBenchmark() {
  return deBenchmark;
}

/** Get all BL benchmarks for comparison charts */
export function getAllBundeslandBenchmarks(): BundeslandBenchmark[] {
  return blBenchmarks;
}

/** Filter regions by Bundesland */
export function filterRegionsByBundesland(bundesland: string): RegionData[] {
  return getRaumordnungsregionen().filter(
    (r) => normalizeBL(r.bundesland) === bundesland
  );
}

/** Get area (km²) for ROR region from einwohnerzahlen */
export function getAreaForRegion(regionName: string): number {
  const match = rorMappingTyped.find((r) => r.ror_name === regionName);
  if (!match) return 0;
  // approximate: we don't have area per ROR directly, use population density proxy
  return match.einwohner_gesamt; // placeholder — scatter will use einwohner as proxy for density
}

/** Compute population density (einwohner / km² not available, use einwohner as proxy) */
export function getPopulationDensityProxy(regionName: string): number {
  return getEinwohnerForRegion(regionName);
}

/** Build scatter data: all ROR regions with VZÄ/100k and population */
export function buildScatterData(): {
  name: string;
  bundesland: string;
  vzaePro100k: number;
  einwohner: number;
  anteil55plus: number;
  veraenderungPct: number;
}[] {
  const regions = getRaumordnungsregionen();
  return regions.map((r) => {
    const k = berechneKennzahlen(r);
    const einwohner = getEinwohnerForRegion(r.name);
    return {
      name: r.name,
      bundesland: normalizeBL(r.bundesland),
      vzaePro100k: computeVzaePro100k(k.vzaeGesamt2024, einwohner),
      einwohner,
      anteil55plus: k.anteil55plus,
      veraenderungPct: k.veraenderungPct,
    };
  });
}

// Helpers
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

function normalizeBL(bl: string | null): string {
  if (!bl) return "";
  if (bl === "Niedersachsen und Bremen") return "Niedersachsen";
  return bl;
}
