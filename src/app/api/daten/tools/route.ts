import { NextRequest } from "next/server";
import { listTools } from "@/lib/data-access/tools";
import { DATASET_META } from "@/lib/data-access/meta";
import { jsonResponse } from "../_shared";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const records = listTools({
    oberkategorie: sp.get("kat") ?? undefined,
    fachlicheOberkategorie: sp.get("fach") ?? undefined,
    query: sp.get("q") ?? undefined,
  });
  return jsonResponse(DATASET_META.tools, records);
}
