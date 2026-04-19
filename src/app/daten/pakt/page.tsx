import type { Metadata } from "next";
import { DatasetHeader } from "@/components/daten/dataset-header";
import { PaktChart } from "@/components/daten/pakt-chart";
import { PaktTable } from "@/components/daten/pakt-table";
import { DATASET_META } from "@/lib/data-access/meta";
import { getPaktGesamt, getPaktLaender } from "@/lib/data-access/pakt";

export const metadata: Metadata = {
  title: `${DATASET_META.pakt.label} · Daten – ÖGD Zukunftscheck`,
  description: DATASET_META.pakt.beschreibung,
};

export const dynamic = "force-static";

export default function PaktDatenPage() {
  const laender = getPaktLaender();
  const gesamt = getPaktGesamt();

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
        <DatasetHeader meta={DATASET_META.pakt} recordCount={laender.length + 1} />

        <div className="grid gap-4 md:grid-cols-3">
          <Kpi label="Vorgabe Deutschland" value={gesamt.vorgabenVzae} unit="VZÄ" />
          <Kpi
            label="Ist-Besetzung 2024"
            value={gesamt.istBesetztVzae2024}
            unit="VZÄ"
            highlight
          />
          <Kpi
            label="Übererfüllung"
            value={gesamt.uebererfuellungPct}
            unit="%"
            signed
            format="pct"
          />
        </div>

        <section className="rounded-[1rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
          <h2 className="text-base font-semibold text-oegd-navy mb-1">
            Vorgabe vs. Ist-Besetzung pro Bundesland
          </h2>
          <p className="text-xs text-slate-500 mb-4">VZÄ, Stand 2024</p>
          <PaktChart data={laender} />
        </section>

        <PaktTable data={[gesamt, ...laender]} />
      </div>
    </section>
  );
}

function Kpi({
  label,
  value,
  unit,
  signed = false,
  highlight = false,
  format = "int",
}: {
  label: string;
  value: number;
  unit?: string;
  signed?: boolean;
  highlight?: boolean;
  format?: "int" | "pct";
}) {
  const formatted =
    format === "pct"
      ? `${signed && value > 0 ? "+" : ""}${value.toFixed(1)}`
      : value.toLocaleString("de-DE");
  return (
    <div className={`rounded-[1rem] border p-5 ${highlight ? "border-oegd-blue/30 bg-oegd-blue-light/50" : "border-slate-200 bg-white"}`}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={`text-3xl font-bold tabular-nums ${highlight ? "text-oegd-blue" : "text-oegd-navy"}`}>
          {formatted}
        </span>
        {unit && <span className="text-sm text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}
