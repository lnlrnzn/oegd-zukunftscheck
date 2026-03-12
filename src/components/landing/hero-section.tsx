"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export function HeroSection() {
  return (
    <section className="relative hero-gradient bg-grid-pattern pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <BlurFade delay={0} direction="up">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-oegd-blue bg-oegd-blue-light px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-oegd-blue animate-pulse" />
              Datenstand: 31.12.2024
            </span>
          </BlurFade>

          <BlurFade delay={0.1} direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-oegd-navy leading-[1.1] tracking-tight">
              Wie zukunftsfähig ist
              <br />
              <span className="font-[var(--font-source-serif)] italic text-oegd-blue">
                Ihr Gesundheitsamt?
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} direction="up">
            <p className="mt-6 text-base md:text-lg text-oegd-slate leading-relaxed max-w-xl">
              Der Pakt für den ÖGD hat tausende neue Stellen geschaffen — 90&nbsp;%
              davon unbefristet. Jetzt läuft die Bundesförderung aus. Prüfen Sie
              in <strong>5&nbsp;Minuten</strong>, wo Ihr Amt steht.
            </p>
          </BlurFade>

          <BlurFade delay={0.3} direction="up">
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/assessment">
                <ShimmerButton className="h-13 px-8 text-base font-medium shadow-lg">
                  <span className="flex items-center gap-2">
                    Jetzt starten
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </ShimmerButton>
              </Link>
              <Button asChild variant="outline" size="lg" className="text-base h-13">
                <a href="#wie-es-funktioniert">
                  So funktioniert&rsquo;s
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[80%] opacity-[0.03] pointer-events-none hidden lg:block">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full" aria-hidden="true">
          <circle cx="200" cy="200" r="180" stroke="#1d4ed8" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="140" stroke="#1d4ed8" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" stroke="#1d4ed8" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="60" stroke="#1d4ed8" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}
