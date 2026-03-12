import Link from "next/link";
import {
  Users,
  Clock,
  TrendingUp,
  MapPin,
  ClipboardCheck,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  Cpu,
  Building2,
} from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

const steps = [
  {
    num: "01",
    icon: MapPin,
    title: "Region wählen",
    desc: "Ihre Raumordnungsregion auswählen",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "10 Fragen",
    desc: "Digitalisierungsgrad bewerten",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Ergebnisse",
    desc: "ROI-Prognose & Benchmarking",
  },
];

export function BentoSection() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.08}
        duration={5}
        repeatDelay={1}
        className="fill-oegd-blue/20 stroke-oegd-blue/10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <BlurFade delay={0} inView>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oegd-blue mb-2">
              Aktuelle Lage im ÖGD
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight">
              Die Zahlen hinter dem Zukunftscheck
            </h2>
          </div>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <BentoGrid className="auto-rows-[10rem] md:auto-rows-[13rem]">
            {/* Card 1: VZÄ Count - spans 2 cols */}
            <BentoCard className="md:col-span-2 md:row-span-1 bento-gradient-blue">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-oegd-blue/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-oegd-blue" />
                  </div>
                  <span className="text-xs font-semibold text-oegd-blue uppercase tracking-wider">
                    Personalbestand 2024
                  </span>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-oegd-navy tracking-tight tabular-nums">
                    <NumberTicker value={21745} delay={0.4} />
                  </p>
                  <p className="text-sm text-oegd-slate mt-1">
                    Vollzeitäquivalente in 375 örtlichen Gesundheitsämtern
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Card 2: Retirement wave */}
            <BentoCard className="bento-gradient-red">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-oegd-red/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-oegd-red" />
                  </div>
                  <span className="text-[10px] font-semibold text-oegd-red uppercase tracking-wider">
                    Rentenwelle
                  </span>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-oegd-navy tracking-tight tabular-nums">
                    <NumberTicker value={34} delay={0.6} />
                    <span className="text-2xl">%</span>
                  </p>
                  <p className="text-sm text-oegd-slate mt-1">
                    des Personals ist 55+ — fehlt in 8 Jahren
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Card 3: Pakt ÖGD */}
            <BentoCard className="bento-gradient-yellow">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-oegd-yellow/10 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-oegd-yellow" />
                  </div>
                  <span className="text-[10px] font-semibold text-oegd-yellow uppercase tracking-wider">
                    Pakt ÖGD
                  </span>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-oegd-navy tracking-tight">
                    Ende 2026
                  </p>
                  <p className="text-sm text-oegd-slate mt-1">
                    Bundesförderung läuft aus — keine Anschlussfinanzierung
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Card 4: Digitalization status */}
            <BentoCard className="bento-gradient-navy">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-white/90" />
                  </div>
                  <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                    EvalDiGe 2024
                  </span>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                    <NumberTicker value={90} delay={0.5} />
                    <span className="text-2xl">%</span>
                  </p>
                  <p className="text-sm text-white/70 mt-1">
                    der Prozesse laufen noch analog (Stufe 0)
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Card 5: How it works - spans 2 cols */}
            <BentoCard className="md:col-span-2 bg-muted/30">
              <div className="flex flex-col justify-between h-full">
                <p className="text-xs font-semibold text-oegd-blue uppercase tracking-[0.15em] mb-3">
                  So funktioniert&apos;s
                </p>
                <div className="flex items-start gap-6">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex-1 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-oegd-blue/10 flex items-center justify-center">
                          <s.icon className="h-3.5 w-3.5 text-oegd-blue" />
                        </div>
                        <span className="text-[10px] font-bold text-oegd-blue tabular-nums">
                          {s.num}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-oegd-navy">
                        {s.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                      {i < steps.length - 1 && (
                        <ArrowRight className="absolute right-0 top-2.5 h-3 w-3 text-oegd-blue/30 hidden md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.4} inView>
          <div className="text-center mt-14">
            <Link href="/assessment">
              <ShimmerButton className="h-13 px-10 text-base font-medium shadow-xl shadow-oegd-blue/20">
                <span className="flex items-center gap-2">
                  Assessment starten
                  <ArrowRight className="h-4 w-4" />
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
