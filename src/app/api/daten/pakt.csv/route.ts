import { getPaktGesamt, getPaktLaender, type PaktRow } from "@/lib/data-access/pakt";
import { DATASET_META } from "@/lib/data-access/meta";
import { toCSV, type CsvColumn } from "@/lib/data-access/export-utils";
import { csvResponse } from "../_shared";

export const dynamic = "force-static";

const COLUMNS: CsvColumn<PaktRow>[] = [
  { key: "kuerzel", label: "Kürzel", accessor: (r) => r.kuerzel },
  { key: "bundesland", label: "Bundesland", accessor: (r) => r.bundesland },
  { key: "vorgabenVzae", label: "Vorgabe VZÄ", accessor: (r) => r.vorgabenVzae },
  { key: "istBesetztVzae2024", label: "Ist-Besetzung 2024", accessor: (r) => r.istBesetztVzae2024 },
  { key: "uebererfuellungVzae", label: "Übererfüllung VZÄ", accessor: (r) => r.uebererfuellungVzae },
  { key: "uebererfuellungPct", label: "Übererfüllung %", accessor: (r) => r.uebererfuellungPct },
  { key: "untereGesundheitsbehoerdeVzae", label: "Untere GB VZÄ", accessor: (r) => r.untereGesundheitsbehoerdeVzae },
  { key: "landesstellenVzae", label: "Landesstellen VZÄ", accessor: (r) => r.landesstellenVzae },
  { key: "unbefristetVzae", label: "Unbefristet VZÄ", accessor: (r) => r.unbefristetVzae },
  { key: "unbefristetAnteilPct", label: "Unbefristet %", accessor: (r) => r.unbefristetAnteilPct },
  { key: "befristetVzae", label: "Befristet VZÄ", accessor: (r) => r.befristetVzae },
  { key: "befristetAnteilPct", label: "Befristet %", accessor: (r) => r.befristetAnteilPct },
  { key: "aerzteVzae", label: "Ärzte VZÄ", accessor: (r) => r.aerzteVzae },
  { key: "fachpersonalVzae", label: "Fachpersonal VZÄ", accessor: (r) => r.fachpersonalVzae },
  { key: "verwaltungVzae", label: "Verwaltung VZÄ", accessor: (r) => r.verwaltungVzae },
];

export function GET() {
  const rows = [getPaktGesamt(), ...getPaktLaender()];
  return csvResponse(toCSV(rows, COLUMNS), DATASET_META.pakt.filename);
}
