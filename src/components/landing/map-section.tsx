"use client";

import dynamic from "next/dynamic";

const GermanyHeatmap = dynamic(
  () => import("./germany-heatmap").then((m) => m.GermanyHeatmap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[640px] animate-pulse rounded-[1rem] bg-slate-100" />
    ),
  },
);

export function MapSection() {
  return (
    <section className="py-12 md:py-16 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <GermanyHeatmap />
      </div>
    </section>
  );
}
