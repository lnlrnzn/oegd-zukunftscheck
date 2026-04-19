import { NextRequest } from "next/server";
import { listTools, type PdtTool } from "@/lib/data-access/tools";
import { DATASET_META } from "@/lib/data-access/meta";
import { toCSV, type CsvColumn } from "@/lib/data-access/export-utils";
import { csvResponse } from "../_shared";

export const dynamic = "force-dynamic";

const COLUMNS: CsvColumn<PdtTool>[] = [
  { key: "name", label: "Name", accessor: (r) => r.name },
  { key: "modul", label: "Modul", accessor: (r) => r.modul ?? "" },
  { key: "link", label: "Link", accessor: (r) => r.link ?? "" },
  { key: "beschreibung", label: "Beschreibung", accessor: (r) => r.beschreibung ?? "" },
  { key: "oberkategorie", label: "Oberkategorie", accessor: (r) => r.oberkategorie },
  { key: "unterkategorie", label: "Unterkategorie", accessor: (r) => r.unterkategorie },
  { key: "fachliche_oberkategorie", label: "Fachliche Oberkategorie", accessor: (r) => r.fachliche_oberkategorie },
  { key: "fachliche_subkategorie", label: "Fachliche Subkategorie", accessor: (r) => r.fachliche_subkategorie },
  { key: "bundesland", label: "Bundesland (Freitext)", accessor: (r) => r.bundesland },
];

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const records = listTools({
    oberkategorie: sp.get("kat") ?? undefined,
    fachlicheOberkategorie: sp.get("fach") ?? undefined,
    query: sp.get("q") ?? undefined,
  });
  return csvResponse(toCSV(records, COLUMNS), DATASET_META.tools.filename);
}
