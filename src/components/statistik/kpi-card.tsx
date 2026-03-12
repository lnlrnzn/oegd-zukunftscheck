"use client";

import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NumberTicker } from "@/components/magicui/number-ticker";

interface KPICardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  subtitle?: string;
  icon: ReactNode;
  accent: "blue" | "red" | "green" | "yellow";
  delay?: number;
  decimals?: number;
}

const accentStyles = {
  blue: { card: "kpi-blue", bg: "bg-oegd-blue-light", text: "text-oegd-blue" },
  red: { card: "kpi-red", bg: "bg-oegd-red-light", text: "text-oegd-red" },
  green: { card: "kpi-green", bg: "bg-oegd-green-light", text: "text-oegd-green" },
  yellow: { card: "kpi-yellow", bg: "bg-oegd-yellow-light", text: "text-oegd-yellow" },
};

export function KPICard({
  label,
  value,
  suffix = "",
  prefix = "",
  subtitle,
  icon,
  accent,
  delay = 0.2,
  decimals = 0,
}: KPICardProps) {
  const s = accentStyles[accent];

  return (
    <Card className={`${s.card} border-0 shadow-sm card-hover animate-fade-in`}>
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center`}>
            <span className={s.text}>{icon}</span>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-oegd-navy tabular-nums">
          {prefix}
          <NumberTicker value={value} delay={delay} decimalPlaces={decimals} />
          {suffix}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1.5">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
