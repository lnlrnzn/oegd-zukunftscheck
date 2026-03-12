import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGroupedRegions, getDeutschland } from "@/lib/regions";
import { StatistikPageClient } from "@/components/statistik/statistik-page-client";

export const metadata = {
  title: "ÖGD Statistiken — Zukunftscheck",
  description: "Personal, Finanzierung, Digitalisierung und regionale Vergleiche im Öffentlichen Gesundheitsdienst.",
};

export default function StatistikPage() {
  const groupedRegions = getGroupedRegions();
  const defaultRegion = getDeutschland();

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-header border-b">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-oegd-blue flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-oegd-navy">
                ÖGD Zukunftscheck
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="ghost" className="text-sm">
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Zurück
              </Link>
            </Button>
          </div>
        </div>
      </nav>

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
