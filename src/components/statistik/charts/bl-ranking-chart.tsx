"use client";

import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface BLRankingChartProps {
  data: { name: string; value: number; highlighted?: boolean }[];
  valueLabel?: string;
  valueSuffix?: string;
}

export const BLRankingChart = memo(function BLRankingChart({
  data, valueLabel = "Übererfüllung", valueSuffix = "%",
}: BLRankingChartProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={Math.max(280, sorted.length * 28)}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 40, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} width={130} />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString("de-DE")}${valueSuffix}`, valueLabel]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={20}>
          {sorted.map((entry, i) => (
            <Cell key={`cell-${entry.name}`} fill={entry.highlighted ? "#1d4ed8" : "#94a3b8"} opacity={entry.highlighted ? 1 : 0.6} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});
