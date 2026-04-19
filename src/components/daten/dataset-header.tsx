import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExportButtons } from "./export-buttons";
import type { DatasetMeta } from "@/lib/data-access/meta";

interface DatasetHeaderProps {
  meta: DatasetMeta;
  recordCount: number;
}

export function DatasetHeader({ meta, recordCount }: DatasetHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/daten" className="hover:text-oegd-blue">
          Daten
        </Link>
        <span>/</span>
        <span className="text-slate-700">{meta.label}</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-oegd-navy tracking-tight">
          {meta.label}
        </h1>
        <p className="text-slate-600 text-sm md:text-base md:max-w-3xl">{meta.beschreibung}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="font-normal">
          Quelle: {meta.quelle}
        </Badge>
        <Badge variant="secondary" className="font-normal">
          Stand: {meta.stichtag}
        </Badge>
        {meta.lizenzUrl ? (
          <Badge variant="secondary" className="font-normal">
            <a href={meta.lizenzUrl} target="_blank" rel="noreferrer" className="hover:underline">
              Lizenz: {meta.lizenz}
            </a>
          </Badge>
        ) : (
          <Badge variant="secondary" className="font-normal">
            Lizenz: {meta.lizenz}
          </Badge>
        )}
        <Badge variant="outline" className="font-normal tabular-nums">
          {recordCount.toLocaleString("de-DE")} Einträge
        </Badge>
      </div>

      <ExportButtons endpoint={meta.endpoint} filename={meta.filename} />
    </div>
  );
}
