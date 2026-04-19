import Link from "next/link";
import {
  Users,
  Clock,
  MapPin,
  ClipboardCheck,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  Cpu,
} from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BentoCard } from "@/components/magicui/bento-grid";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: VZÄ Count */}
            <BentoCard className="bento-gradient-blue min-h-[180px]">
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
            <BentoCard className="bento-gradient-red min-h-[180px]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-oegd-red/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-oegd-red" />
                  </div>
                  <span className="text-xs font-semibold text-oegd-red uppercase tracking-wider">
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
            <BentoCard className="bento-gradient-yellow min-h-[180px]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-oegd-yellow/10 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-oegd-yellow" />
                  </div>
                  <span className="text-xs font-semibold text-oegd-yellow uppercase tracking-wider">
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
            <BentoCard className="bento-gradient-navy min-h-[180px]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-white/90" />
                  </div>
                  <span className="text-xs font-semibold text-white/85 uppercase tracking-wider">
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
          </div>
        </BlurFade>

        {/* So funktioniert's — eigene Sektion, damit die 3 Schritte klar lesbar sind */}
        <BlurFade delay={0.25} inView>
          <div className="mt-10 md:mt-14 rounded-[1rem] border border-oegd-blue/10 bg-gradient-to-br from-white to-oegd-blue-light/60 p-5 md:p-8 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1 w-6 rounded-full bg-oegd-blue" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-oegd-blue">
                    In 3 Schritten
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight">
                  So funktioniert&apos;s
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Vom Start bis zum Ergebnis in 5 Minuten — kostenlos und ohne Registrierung.
                </p>
              </div>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {steps.map((s, i) => (
                <li key={s.num} className="relative">
                  <div className="h-full rounded-[0.75rem] border border-slate-200 bg-white p-4 md:p-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-oegd-blue flex items-center justify-center text-white shadow-sm shadow-oegd-blue/30">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-oegd-blue tabular-nums">
                        {s.num}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-oegd-navy">{s.title}</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-oegd-blue/40 hidden sm:block"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.4} inView>
          <div className="text-center mt-10 md:mt-14">
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
