import { NextRequest } from "next/server";
import {
  listPersonal,
  type PersonalDimension,
  type PersonalEbene,
} from "@/lib/data-access/personal";
import { DATASET_META } from "@/lib/data-access/meta";
import { jsonResponse } from "../_shared";

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

  return jsonResponse(DATASET_META.personal, records);
}
