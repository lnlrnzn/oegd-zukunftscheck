"use client";

import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface AnalogProcessChartProps {
  data: { prozess: string; analogAnteil: number }[];
}

export const AnalogProcessChart = memo(function AnalogProcessChart({ data }: AnalogProcessChartProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  const sorted = [...data].sort((a, b) => b.analogAnteil - a.analogAnteil);

  return (
    <ResponsiveContainer width="100%" height={Math.max(280, sorted.length * 32)}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 40, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} unit="%" />
        <YAxis type="category" dataKey="prozess" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} width={180} />
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Analog-Anteil"]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }}
        />
        <Bar dataKey="analogAnteil" radius={[0, 6, 6, 0]} maxBarSize={22}>
          {sorted.map((entry, i) => (
            <Cell key={`cell-${entry.prozess}`} fill={entry.analogAnteil > 70 ? "#dc2626" : entry.analogAnteil > 40 ? "#d97706" : "#059669"} opacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});
