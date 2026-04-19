import { NextRequest } from "next/server";
import { listAemter } from "@/lib/data-access/aemter";
import { DATASET_META } from "@/lib/data-access/meta";
import { jsonResponse } from "../_shared";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const records = listAemter({
    bundesland: sp.get("bl") ?? undefined,
    ags: sp.get("ags") ?? undefined,
    query: sp.get("q") ?? undefined,
  });
  return jsonResponse(DATASET_META.aemter, records);
}
