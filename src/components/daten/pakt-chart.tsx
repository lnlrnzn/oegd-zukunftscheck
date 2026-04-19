"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PaktRow } from "@/lib/data-access/pakt";

interface PaktChartProps {
  data: PaktRow[];
}

export function PaktChart({ data }: PaktChartProps) {
  const chartData = data.map((r) => ({
    name: r.kuerzel,
    Vorgabe: r.vorgabenVzae,
    Ist: r.istBesetztVzae2024,
  }));
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            formatter={(v: number) => v.toLocaleString("de-DE")}
          />
          <Bar dataKey="Vorgabe" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Ist" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
