"use client";

import { memo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis,
} from "recharts";

interface VzaePerCapitaScatterProps {
  data: { name: string; einwohner: number; vzaePro100k: number; highlighted?: boolean }[];
}

export const VzaePerCapitaScatter = memo(function VzaePerCapitaScatter({ data }: VzaePerCapitaScatterProps) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Keine Daten verfügbar</p>;

  const highlighted = data.filter((d) => d.highlighted);
  const rest = data.filter((d) => !d.highlighted);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ScatterChart margin={{ top: 8, right: 16, left: -8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          type="number" dataKey="einwohner" name="Einwohner"
          tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }}
          tickFormatter={(v: number) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${(v / 1_000).toFixed(0)}k`}
          label={{ value: "Einwohner", position: "insideBottom", offset: -2, fontSize: 10, fill: "#94a3b8" }}
        />
        <YAxis
          type="number" dataKey="vzaePro100k" name="VZÄ/100k"
          tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false}
          label={{ value: "VZÄ/100k", angle: -90, position: "insideLeft", offset: 16, fontSize: 10, fill: "#94a3b8" }}
        />
        <ZAxis range={[40, 40]} />
        <Tooltip
          content={({ payload }) => {
            if (!payload?.length) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-white border border-border rounded-lg p-2 shadow-md text-xs">
                <p className="font-medium text-oegd-navy">{d.name}</p>
                <p>{d.einwohner.toLocaleString("de-DE")} Einwohner</p>
                <p>{d.vzaePro100k.toFixed(1)} VZÄ/100k</p>
              </div>
            );
          }}
        />
        <Scatter data={rest} fill="#94a3b8" opacity={0.5} />
        {highlighted.length > 0 && (
          <Scatter data={highlighted} fill="#1d4ed8" opacity={1} />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
});
