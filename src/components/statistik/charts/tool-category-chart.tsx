"use client";

import { memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#1d4ed8", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#be185d"];

interface ToolCategoryChartProps {
  data: { kategorie: string; count: number }[];
}

export const ToolCategoryChart = memo(function ToolCategoryChart({ data }: ToolCategoryChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="count" nameKey="kategorie" strokeWidth={0}>
            {data.map((entry, i) => (<Cell key={`cell-${entry.kategorie}`} fill={COLORS[i % COLORS.length]} />))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} Tools (${((value / total) * 100).toFixed(0)}%)`, name]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1 max-w-md">
        {data.map((entry, i) => (
          <div key={entry.kategorie} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} aria-hidden="true" />
            <span className="text-[11px] text-muted-foreground">{entry.kategorie}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
