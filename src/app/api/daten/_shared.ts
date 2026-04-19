import { NextResponse } from "next/server";
import type { DatasetMeta } from "@/lib/data-access/meta";

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
};

export function jsonResponse<T>(meta: DatasetMeta, records: T[], extra?: Record<string, unknown>) {
  const body = {
    beschreibung: meta.beschreibung,
    quelle: meta.quelle,
    stichtag: meta.stichtag,
    lizenz: meta.lizenz,
    ...extra,
    count: records.length,
    records,
  };
  return NextResponse.json(body, { headers: CACHE_HEADERS });
}

export function csvResponse(csv: string, filenameBase: string) {
  return new NextResponse(csv, {
    headers: {
      ...CACHE_HEADERS,
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filenameBase}.csv"`,
    },
  });
}
