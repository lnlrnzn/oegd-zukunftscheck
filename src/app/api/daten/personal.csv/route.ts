import { NextRequest } from "next/server";
import {
  listPersonal,
  type PersonalDimension,
  type PersonalEbene,
  type PersonalRow,
} from "@/lib/data-access/personal";
import { DATASET_META } from "@/lib/data-access/meta";
import { toCSV, type CsvColumn } from "@/lib/data-access/export-utils";
import { csvResponse } from "../_shared";

export const dynamic = "force-dynamic";

const VALID_DIMENSIONS: PersonalDimension[] = [
  "nach_alter",
  "nach_personengruppe",
  "nach_beschaeftigungsverhaeltnis",
  "nach_beschaeftigungsart",
  "nach_beruf",
  "nach_taetigkeitsbereich",
  "nach_abschluss",
];
const VALID_EBENEN: PersonalEbene[] = ["deutschland", "bundesland", "raumordnungsregion"];

const COLUMNS: CsvColumn<PersonalRow>[] = [
  { key: "region", label: "Region", accessor: (r) => r.region },
  { key: "ebene", label: "Ebene", accessor: (r) => r.ebene },
  { key: "bundesland", label: "Bundesland", accessor: (r) => r.bundesland ?? "" },
  { key: "dimension", label: "Dimension", accessor: (r) => r.dimension },
  { key: "kategorie", label: "Kategorie", accessor: (r) => r.kategorie },
  { key: "jahr", label: "Jahr", accessor: (r) => r.jahr },
  { key: "insgesamt", label: "Insgesamt (VZÄ)", accessor: (r) => r.insgesamt ?? "" },
  { key: "maennlich", label: "Männlich (VZÄ)", accessor: (r) => r.maennlich ?? "" },
  { key: "weiblich", label: "Weiblich (VZÄ)", accessor: (r) => r.weiblich ?? "" },
];

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const dimensionParam = sp.get("dimension") as PersonalDimension | null;
  const ebeneParam = sp.get("ebene") as PersonalEbene | null;
  const jahrParam = sp.get("jahr");

  const records = listPersonal({
    ebene: ebeneParam && VALID_EBENEN.includes(ebeneParam) ? ebeneParam : undefined,
    bundesland: sp.get("bl") ?? undefined,
    region: sp.get("region") ?? undefined,
    dimension:
      dimensionParam && VALID_DIMENSIONS.includes(dimensionParam) ? dimensionParam : undefined,
    jahr: jahrParam === "2023" || jahrParam === "2024" ? jahrParam : undefined,
  });

  return csvResponse(toCSV(records, COLUMNS), DATASET_META.personal.filename);
}
