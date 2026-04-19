import type { Metadata } from "next";
import { DatasetHeader } from "@/components/daten/dataset-header";
import { QualityNote } from "@/components/daten/quality-note";
import { ToolsBrowser } from "@/components/daten/tools-browser";
import { DATASET_META } from "@/lib/data-access/meta";
import {
  listTools,
  toolFachlicheOberkategorien,
  toolOberkategorien,
} from "@/lib/data-access/tools";

export const metadata: Metadata = {
  title: `${DATASET_META.tools.label} · Daten – ÖGD Zukunftscheck`,
  description: DATASET_META.tools.beschreibung,
};

export const dynamic = "force-static";

export default function ToolsDatenPage() {
  const tools = listTools();
  const oberkategorien = toolOberkategorien();
  const fachliche = toolFachlicheOberkategorien();

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
        <DatasetHeader meta={DATASET_META.tools} recordCount={tools.length} />
        <QualityNote title="Datenqualität eingeschränkt">
          Das PDT-Register ist eine Rohdaten-Sammlung. Das Feld <code>bundesland</code> enthält
          teilweise Freitextwerte (über 70 unterschiedliche Ausprägungen); die Spalte{" "}
          <code>pdt_empfehlung</code> ist in diesem Export nicht differenziert (alle Einträge
          <code> true</code>). Die Kategorien-Filter sind zuverlässig, bundeslandbezogene
          Filterung ist es <strong>nicht</strong>.
        </QualityNote>
        <ToolsBrowser data={tools} oberkategorien={oberkategorien} fachliche={fachliche} />
      </div>
    </section>
  );
}
