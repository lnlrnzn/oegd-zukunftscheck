"use client";

import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface BLComparisonChartProps {
  data: { metric: string; region: number; bundesland: number; bund: number }[];
}

export const BLComparisonChart = memo(function BLComparisonChart({ data }: BLComparisonChartProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: -8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="region" name="Region" fill="#1d4ed8" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="bundesland" name="Bundesland" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="bund" name="Bund" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
});
