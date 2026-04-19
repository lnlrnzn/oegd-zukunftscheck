import { getGroupedRegions, getDeutschland } from "@/lib/regions";
import { StatistikPageClient } from "@/components/statistik/statistik-page-client";
import { SiteNav } from "@/components/site-nav";

export const metadata = {
  title: "ÖGD Statistiken — Zukunftscheck",
  description: "Personal, Finanzierung, Digitalisierung und regionale Vergleiche im Öffentlichen Gesundheitsdienst.",
};

export default function StatistikPage() {
  const groupedRegions = getGroupedRegions();
  const defaultRegion = getDeutschland();

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      {/* Content */}
      <div className="pt-20 pb-16 max-w-6xl mx-auto px-6">
        <StatistikPageClient
          groupedRegions={groupedRegions}
          defaultRegion={defaultRegion}
        />
      </div>

      {/* Footer */}
      <footer className="py-8 bg-oegd-navy text-white/60">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs space-y-1">
          <p>Datenquellen: GBE-Bund 2024 · EvalDiGe 2024 · Pakt ÖGD Monitoring · PDT-Toolregister · BBSR Raumgliederung</p>
          <p className="text-white/40">ÖGD Zukunftscheck — Alle Daten ohne Gewähr</p>
        </div>
      </footer>
    </main>
  );
}
