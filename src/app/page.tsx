import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import {
  ArrowRight,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-header border-b">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-oegd-blue flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-oegd-navy">
              ÖGD Zukunftscheck
            </span>
          </div>
          <Button asChild size="sm" variant="ghost" className="text-sm">
            <Link href="/assessment">
              Zum Check
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </nav>

      <HeroSection />
      <StatsSection />
      <HowItWorksSection />

      {/* Footer */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-oegd-blue flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-oegd-navy">ÖGD Zukunftscheck</span>
            </div>
            <p className="text-center md:text-right text-xs">
              Datenquelle: Regionales Gesundheitspersonalmonitoring (GBE-Bund), Stichtag 31.12.2024
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
