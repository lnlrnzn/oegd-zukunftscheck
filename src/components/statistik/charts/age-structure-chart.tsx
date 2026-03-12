"use client";

import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface AgeStructureChartProps {
  data: { name: string; vzae: number; is55plus: boolean }[];
}

export const AgeStructureChart = memo(function AgeStructureChart({ data }: AgeStructureChartProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: -16, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString("de-DE")} VZÄ`, "Beschäftigte"]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }}
        />
        <Bar dataKey="vzae" radius={[6, 6, 0, 0]} maxBarSize={40}>
          {data.map((entry, i) => (
            <Cell key={`cell-${entry.name}`} fill={entry.is55plus ? "#dc2626" : "#1d4ed8"} opacity={entry.is55plus ? 0.85 : 0.75} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});
