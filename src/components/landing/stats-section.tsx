"use client";

import { Users, Clock, TrendingUp } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";

const stats = [
  {
    icon: Users,
    value: 21745,
    suffix: "",
    prefix: "",
    label: "Vollzeitäquivalente",
    desc: "in örtlichen Gesundheitsämtern (2024)",
    color: "bg-oegd-blue-light text-oegd-blue",
    border: "kpi-blue",
  },
  {
    icon: Clock,
    value: 34,
    suffix: "%",
    prefix: "",
    label: "über 55 Jahre",
    desc: "die Rentenwelle kommt — in 10 Jahren fehlen diese Stellen",
    color: "bg-oegd-red-light text-oegd-red",
    border: "kpi-red",
  },
  {
    icon: TrendingUp,
    value: 21,
    suffix: "%",
    prefix: "+",
    label: "überbesetzt",
    desc: "über Pakt-Vorgabe eingestellt — Kosten bleiben, Förderung endet",
    color: "bg-oegd-yellow-light text-oegd-yellow",
    border: "kpi-yellow",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <BlurFade delay={0} inView>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-oegd-blue mb-2">
              Aktuelle Lage
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-oegd-navy tracking-tight">
              Die Zahlen sprechen für sich
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <BlurFade key={item.label} delay={0.1 * (idx + 1)} inView>
              <div
                className={`${item.border} rounded-xl bg-white p-6 shadow-sm card-hover`}
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.color} mb-4`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-oegd-navy tracking-tight">
                  {item.prefix}
                  <NumberTicker value={item.value} delay={0.3 + idx * 0.15} />
                  {item.suffix}
                </p>
                <p className="text-sm font-semibold text-oegd-slate mt-1">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
