import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";

export function HeroSection() {
  return (
    <section className="relative hero-gradient pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Ambient dot pattern */}
      <DotPattern
        cr={1}
        width={20}
        height={20}
        className="text-oegd-blue/[0.07] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_30%,transparent_80%)]"
      />

      {/* Floating particles with mouse interaction */}
      <Particles
        quantity={40}
        color="#1d4ed8"
        size={0.6}
        staticity={60}
        ease={80}
        className="absolute inset-0"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <BlurFade delay={0} direction="up">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-oegd-blue bg-oegd-blue-light px-3 py-1.5 rounded-full mb-6 border border-oegd-blue/10">
              <span className="w-1.5 h-1.5 rounded-full bg-oegd-green animate-pulse" />
              Datenstand: 31.12.2024
            </span>
          </BlurFade>

          <BlurFade delay={0.1} direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-oegd-navy leading-[1.08] tracking-tight">
              Wie zukunftsfähig ist
              <br />
              <span className="font-[var(--font-source-serif)] italic bg-gradient-to-r from-oegd-blue to-blue-500 bg-clip-text text-transparent">
                Ihr Gesundheitsamt?
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} direction="up">
            <p className="mt-6 text-base md:text-lg text-oegd-slate leading-relaxed max-w-xl mx-auto">
              Der Pakt ÖGD endet 2026. 90% der Prozesse laufen analog,
              ein Drittel des Personals geht bald in Rente. Finden Sie in{" "}
              <strong>5&nbsp;Minuten</strong> heraus, wo Ihr Amt steht — und was
              Digitalisierung konkret bringen kann.
            </p>
          </BlurFade>

          <BlurFade delay={0.3} direction="up">
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/assessment">
                <ShimmerButton className="h-13 px-8 text-base font-medium shadow-xl shadow-oegd-blue/20">
                  <span className="flex items-center gap-2">
                    Jetzt Zukunftscheck starten
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </ShimmerButton>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Kostenlos · 5 Minuten · Keine Registrierung
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
