"use client";

import { memo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ProfessionChartProps {
  aerzte: number;
  fachpersonal: number;
  verwaltung: number;
}

const COLORS = ["#1d4ed8", "#059669", "#d97706"];

export const ProfessionChart = memo(function ProfessionChart({
  aerzte,
  fachpersonal,
  verwaltung,
}: ProfessionChartProps) {
  const total = aerzte + fachpersonal + verwaltung;
  if (total === 0)
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Keine Daten verfügbar
      </p>
    );

  const data = [
    { name: "Ärzte/Zahnärzte", value: aerzte, color: COLORS[0] },
    { name: "Fachpersonal", value: fachpersonal, color: COLORS[1] },
    { name: "Verwaltung", value: verwaltung, color: COLORS[2] },
  ];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `${value.toLocaleString("de-DE")} VZÄ (${((value / total) * 100).toFixed(0)}%)`,
            ]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Custom legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-[11px] text-muted-foreground">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
