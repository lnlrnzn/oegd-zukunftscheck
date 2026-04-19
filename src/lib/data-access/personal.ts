import "server-only";
import regionenRaw from "../../../data/gbe_regionen_vollzeitaequivalente.json";
import type { RegionenJSON, RegionData, YearPair } from "../data";
import type {
  PersonalDimension,
  PersonalEbene,
  PersonalRow,
} from "./personal-shared";

export type { PersonalDimension, PersonalEbene, PersonalRow } from "./personal-shared";
export { PERSONAL_DIMENSIONS } from "./personal-shared";

const data = regionenRaw as unknown as RegionenJSON;

export interface PersonalFilter {
  ebene?: PersonalEbene;
  bundesland?: string;
  region?: string;
  dimension?: PersonalDimension;
  jahr?: "2023" | "2024";
}

function normalizeBundesland(bl: string | null): string | null {
  if (!bl) return null;
  if (bl === "Niedersachsen und Bremen") return "Niedersachsen";
  return bl;
}

function regionMatches(region: RegionData, filter: PersonalFilter): boolean {
  if (filter.ebene && region.typ !== filter.ebene) return false;
  if (filter.region && region.name !== filter.region) return false;
  if (filter.bundesland) {
    const bl = normalizeBundesland(region.bundesland);
    if (bl !== filter.bundesland) return false;
  }
  return true;
}

export function listPersonal(filter: PersonalFilter = {}): PersonalRow[] {
  const dimension = filter.dimension ?? "nach_alter";
  const rows: PersonalRow[] = [];

  for (const region of data.regionen) {
    if (!regionMatches(region, filter)) continue;
    const dim = region.daten[dimension];
    if (!dim) continue;

    for (const [kategorie, yearPair] of Object.entries(dim)) {
      const yp = yearPair as YearPair;
      for (const jahr of ["2023", "2024"] as const) {
        if (filter.jahr && filter.jahr !== jahr) continue;
        const values = yp[jahr];
        rows.push({
          region: region.name,
          ebene: region.typ,
          bundesland: normalizeBundesland(region.bundesland),
          dimension,
          kategorie,
          jahr,
          insgesamt: values?.insgesamt ?? null,
          maennlich: values?.maennlich ?? null,
          weiblich: values?.weiblich ?? null,
        });
      }
    }
  }

  return rows;
}

export function personalRegionen(): { name: string; typ: PersonalEbene }[] {
  return data.regionen
    .map((r) => ({ name: r.name, typ: r.typ }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
}

export function personalBundeslaender(): string[] {
  return [
    ...new Set(
      data.regionen
        .map((r) => normalizeBundesland(r.bundesland))
        .filter((b): b is string => !!b),
    ),
  ].sort((a, b) => a.localeCompare(b, "de"));
}
