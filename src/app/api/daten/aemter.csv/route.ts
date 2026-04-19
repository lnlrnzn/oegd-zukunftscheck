import { NextRequest } from "next/server";
import { listAemter, type Gesundheitsamt } from "@/lib/data-access/aemter";
import { DATASET_META } from "@/lib/data-access/meta";
import { toCSV, type CsvColumn } from "@/lib/data-access/export-utils";
import { csvResponse } from "../_shared";

export const dynamic = "force-dynamic";

const COLUMNS: CsvColumn<Gesundheitsamt>[] = [
  { key: "id", label: "ID", accessor: (r) => r.id },
  { key: "name", label: "Name", accessor: (r) => r.name },
  { key: "landkreis", label: "Landkreis", accessor: (r) => r.landkreis },
  { key: "landkreis_ags", label: "AGS", accessor: (r) => r.landkreis_ags },
  { key: "bundesland", label: "Bundesland", accessor: (r) => r.bundesland },
  { key: "raumordnungsregion", label: "Raumordnungsregion", accessor: (r) => r.raumordnungsregion },
  { key: "strasse", label: "Straße", accessor: (r) => r.adresse?.strasse ?? "" },
  { key: "plz", label: "PLZ", accessor: (r) => r.adresse?.plz ?? "" },
  { key: "ort", label: "Ort", accessor: (r) => r.adresse?.ort ?? "" },
  { key: "telefon", label: "Telefon", accessor: (r) => r.telefon ?? "" },
  { key: "email", label: "E-Mail", accessor: (r) => r.email ?? "" },
];

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const records = listAemter({
    bundesland: sp.get("bl") ?? undefined,
    ags: sp.get("ags") ?? undefined,
    query: sp.get("q") ?? undefined,
  });
  return csvResponse(toCSV(records, COLUMNS), DATASET_META.aemter.filename);
}
