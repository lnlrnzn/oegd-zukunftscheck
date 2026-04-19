import { HeroSection } from "@/components/landing/hero-section";
import { MapSection } from "@/components/landing/map-section";
import { BentoSection } from "@/components/landing/bento-section";
import { ExpertsSection } from "@/components/experts-section";
import { ChatWidget } from "@/components/ai-agent/chat-widget";
import { SiteNav } from "@/components/site-nav";
import { Shield, Database, FileBarChart } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      <div className="pt-14">
        <HeroSection />
        <MapSection />
        <BentoSection />
        <ExpertsSection />
        <ChatWidget />

        {/* Footer */}
        <section className="py-10 bg-oegd-navy text-white/60">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white/80" />
                </div>
                <span className="font-medium text-white/90">ÖGD Zukunftscheck</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <Database className="h-3 w-3" />
                  GBE-Bund 2024
                </span>
                <span className="flex items-center gap-1.5">
                  <FileBarChart className="h-3 w-3" />
                  EvalDiGe 2024
                </span>
                <span>BBSR Raumgliederung</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
