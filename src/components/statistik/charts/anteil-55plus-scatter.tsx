"use client";

import { memo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis,
} from "recharts";

interface Anteil55PlusScatterProps {
  data: { name: string; anteil55plus: number; veraenderungPct: number; highlighted?: boolean }[];
}

export const Anteil55PlusScatter = memo(function Anteil55PlusScatter({ data }: Anteil55PlusScatterProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  const highlighted = data.filter((d) => d.highlighted);
  const rest = data.filter((d) => !d.highlighted);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ScatterChart margin={{ top: 8, right: 16, left: -8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          type="number" dataKey="anteil55plus" name="55+ Anteil"
          tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }}
          unit="%" domain={["auto", "auto"]}
          label={{ value: "Anteil 55+ (%)", position: "insideBottom", offset: -2, fontSize: 10, fill: "#94a3b8" }}
        />
        <YAxis
          type="number" dataKey="veraenderungPct" name="VZÄ-Veränderung"
          tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false}
          unit="%"
          label={{ value: "VZÄ-Veränderung (%)", angle: -90, position: "insideLeft", offset: 16, fontSize: 10, fill: "#94a3b8" }}
        />
        <ZAxis range={[40, 40]} />
        <Tooltip
          content={({ payload }) => {
            if (!payload?.length) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-white border border-border rounded-lg p-2 shadow-md text-xs">
                <p className="font-medium text-oegd-navy">{d.name}</p>
                <p>55+ Anteil: {d.anteil55plus.toFixed(1)}%</p>
                <p>VZÄ-Veränderung: {d.veraenderungPct >= 0 ? "+" : ""}{d.veraenderungPct.toFixed(1)}%</p>
              </div>
            );
          }}
        />
        <Scatter data={rest} fill="#94a3b8" opacity={0.5} />
        {highlighted.length > 0 && (
          <Scatter data={highlighted} fill="#dc2626" opacity={1} />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
});
