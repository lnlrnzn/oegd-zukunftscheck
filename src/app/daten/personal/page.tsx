import type { Metadata } from "next";
import { DatasetHeader } from "@/components/daten/dataset-header";
import { PersonalExplorer } from "@/components/daten/personal-explorer";
import { DATASET_META } from "@/lib/data-access/meta";
import {
  PERSONAL_DIMENSIONS,
  listPersonal,
  personalBundeslaender,
  type PersonalDimension,
  type PersonalRow,
} from "@/lib/data-access/personal";

export const metadata: Metadata = {
  title: `${DATASET_META.personal.label} · Daten – ÖGD Zukunftscheck`,
  description: DATASET_META.personal.beschreibung,
};

export const dynamic = "force-static";

export default function PersonalDatenPage() {
  const rowsByDimension = PERSONAL_DIMENSIONS.reduce(
    (acc, d) => {
      acc[d.id] = listPersonal({ dimension: d.id });
      return acc;
    },
    {} as Record<PersonalDimension, PersonalRow[]>,
  );

  const totalRows = Object.values(rowsByDimension).reduce((a, r) => a + r.length, 0);
  const bundeslaender = personalBundeslaender();

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
        <DatasetHeader meta={DATASET_META.personal} recordCount={totalRows} />
        <PersonalExplorer
          rowsByDimension={rowsByDimension}
          bundeslaender={bundeslaender}
          endpoint={DATASET_META.personal.endpoint}
          filename={DATASET_META.personal.filename}
        />
      </div>
    </section>
  );
}
