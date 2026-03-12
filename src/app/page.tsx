import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/hero-section";
import { BentoSection } from "@/components/landing/bento-section";
import { ChatWidget } from "@/components/ai-agent/chat-widget";
import {
  ArrowRight,
  Shield,
  Database,
  FileBarChart,
  BarChart3,
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
          <div className="flex items-center gap-1">
            <Button asChild size="sm" variant="ghost" className="text-sm">
              <Link href="/statistik">
                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                Statistiken
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost" className="text-sm">
              <Link href="/assessment">
                Zum Check
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <HeroSection />
      <BentoSection />
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
    </main>
  );
}
