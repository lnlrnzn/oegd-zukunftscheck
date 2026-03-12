"use client";

import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface BefristungBLChartProps {
  data: { name: string; befristetPct: number; highlighted?: boolean }[];
}

export const BefristungBLChart = memo(function BefristungBLChart({ data }: BefristungBLChartProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  const sorted = [...data].sort((a, b) => b.befristetPct - a.befristetPct);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={sorted} margin={{ top: 8, right: 4, left: -8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} angle={-45} textAnchor="end" height={60} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} domain={[0, "auto"]} />
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Befristungsquote"]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }}
        />
        <Bar dataKey="befristetPct" radius={[6, 6, 0, 0]} maxBarSize={32}>
          {sorted.map((entry, i) => (
            <Cell key={`cell-${entry.name}`} fill={entry.highlighted ? "#dc2626" : "#f87171"} opacity={entry.highlighted ? 1 : 0.6} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});
