import { getPaktGesamt, getPaktLaender } from "@/lib/data-access/pakt";
import { DATASET_META } from "@/lib/data-access/meta";
import { jsonResponse } from "../_shared";

export const dynamic = "force-static";

export function GET() {
  return jsonResponse(DATASET_META.pakt, getPaktLaender(), {
    gesamt_de: getPaktGesamt(),
  });
}
