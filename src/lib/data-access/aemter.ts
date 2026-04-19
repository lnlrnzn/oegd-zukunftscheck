import "server-only";
import aemterRaw from "../../../data/gesundheitsaemter_verzeichnis.json";

export interface Gesundheitsamt {
  id: string;
  name: string;
  landkreis: string;
  landkreis_ags: string;
  bundesland: string;
  bundesland_kuerzel: string;
  raumordnungsregion: string;
  adresse: { strasse: string; plz: string; ort: string } | null;
  telefon: string | null;
  email: string | null;
}

const ALL_AEMTER = aemterRaw as Gesundheitsamt[];

export interface AemterFilter {
  bundesland?: string;
  ags?: string;
  query?: string;
}

export function listAemter(filter: AemterFilter = {}): Gesundheitsamt[] {
  const q = filter.query?.trim().toLowerCase();
  return ALL_AEMTER.filter((amt) => {
    if (filter.bundesland && amt.bundesland !== filter.bundesland) return false;
    if (filter.ags && amt.landkreis_ags !== filter.ags) return false;
    if (q) {
      const hay = [
        amt.name,
        amt.landkreis,
        amt.bundesland,
        amt.raumordnungsregion,
        amt.adresse?.ort,
        amt.adresse?.plz,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function aemterCount(): number {
  return ALL_AEMTER.length;
}

export function aemterBundeslaender(): string[] {
  return [...new Set(ALL_AEMTER.map((a) => a.bundesland))].sort((a, b) =>
    a.localeCompare(b, "de"),
  );
}
