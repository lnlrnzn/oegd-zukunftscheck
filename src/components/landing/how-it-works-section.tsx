"use client";

import Link from "next/link";
import { MapPin, ClipboardCheck, BarChart3, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const steps = [
  {
    step: "1",
    icon: MapPin,
    title: "Region auswählen",
    desc: "Wählen Sie Ihre Raumordnungsregion und sehen Sie die aktuellen Personaldaten Ihres Gesundheitsamtes.",
  },
  {
    step: "2",
    icon: ClipboardCheck,
    title: "10 Fragen beantworten",
    desc: "Bewerten Sie den Digitalisierungsgrad Ihrer wichtigsten Geschäftsprozesse — von Begutachtungen bis Krisenmanagement.",
  },
  {
    step: "3",
    icon: BarChart3,
    title: "Auswertung erhalten",
    desc: "Erfahren Sie, wo der größte Handlungsbedarf besteht und welche Digitalisierungshebel den Unterschied machen.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="wie-es-funktioniert"
      className="py-16 md:py-20 bg-muted/50 bg-dot-pattern"
    >
      <div className="max-w-6xl mx-auto px-6">
        <BlurFade delay={0} inView>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-oegd-blue mb-2">
              In 3 Schritten
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight">
              So funktioniert der Zukunftscheck
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border z-0"
            aria-hidden="true"
          />

          {steps.map((item, idx) => (
            <BlurFade key={item.step} delay={0.1 * (idx + 1)} inView>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-oegd-blue/20 shadow-sm mb-5">
                  <item.icon className="h-7 w-7 text-oegd-blue" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 bg-oegd-blue text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-oegd-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5} inView>
          <div className="text-center mt-14">
            <Link href="/assessment">
              <ShimmerButton className="h-13 px-10 text-base font-medium shadow-lg">
                <span className="flex items-center gap-2">
                  Assessment starten
                  <ArrowRight className="h-4 w-4" />
                </span>
              </ShimmerButton>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Kostenlos &middot; 5&nbsp;Minuten &middot; Keine Registrierung
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
