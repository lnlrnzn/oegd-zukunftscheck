"use client";

import { memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ProfessionMixChartProps {
  aerzte: number;
  fachpersonal: number;
  verwaltung: number;
}

const COLORS = ["#1d4ed8", "#059669", "#d97706"];
const LABELS = ["Ärzte/Zahnärzte", "Fachpersonal", "Verwaltung"];

export const ProfessionMixChart = memo(function ProfessionMixChart({
  aerzte, fachpersonal, verwaltung,
}: ProfessionMixChartProps) {
  const total = aerzte + fachpersonal + verwaltung;
  if (total === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  const data = [
    { name: LABELS[0], value: aerzte, color: COLORS[0] },
    { name: LABELS[1], value: fachpersonal, color: COLORS[1] },
    { name: LABELS[2], value: verwaltung, color: COLORS[2] },
  ];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" strokeWidth={0}>
            {data.map((entry) => (<Cell key={`cell-${entry.name}`} fill={entry.color} />))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString("de-DE")} VZÄ (${((value / total) * 100).toFixed(0)}%)`]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} aria-hidden="true" />
            <span className="text-[11px] text-muted-foreground">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
