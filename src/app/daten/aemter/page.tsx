import type { Metadata } from "next";
import { DatasetHeader } from "@/components/daten/dataset-header";
import { QualityNote } from "@/components/daten/quality-note";
import { AemterBrowser } from "@/components/daten/aemter-browser";
import { DATASET_META } from "@/lib/data-access/meta";
import { aemterBundeslaender, listAemter } from "@/lib/data-access/aemter";

export const metadata: Metadata = {
  title: `${DATASET_META.aemter.label} · Daten – ÖGD Zukunftscheck`,
  description: DATASET_META.aemter.beschreibung,
};

export const dynamic = "force-static";

export default function AemterDatenPage() {
  const aemter = listAemter();
  const bundeslaender = aemterBundeslaender();

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
        <DatasetHeader meta={DATASET_META.aemter} recordCount={aemter.length} />
        <QualityNote variant="info" title="Hinweis zu Kontaktdaten">
          Die Kontaktdaten stammen aus dem öffentlichen RKI-Verzeichnis. Einige E-Mail-Adressen
          sind personenbezogen (z.B. <code>vorname.nachname@…</code>). Bitte nutzen Sie diese
          Daten ausschließlich im dienstlichen Kontext.
        </QualityNote>
        <AemterBrowser data={aemter} bundeslaender={bundeslaender} />
      </div>
    </section>
  );
}
