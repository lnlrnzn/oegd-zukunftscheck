"use client";

import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { RegionData } from "@/lib/data";

interface AgeChartProps {
  region: RegionData;
}

const AGE_KEYS = [
  { key: "Unter 25 Jahre", label: "<25" },
  { key: "25 Jahre bis unter 35 Jahre", label: "25–34" },
  { key: "35 Jahre bis unter 45 Jahre", label: "35–44" },
  { key: "45 Jahre bis unter 55 Jahre", label: "45–54" },
  { key: "55 Jahre bis unter 65 Jahre", label: "55–64" },
];

function find65Key(keys: string[]): string | undefined {
  return keys.find((k) => k.startsWith("65 Jahre"));
}

export const AgeChart = memo(function AgeChart({ region }: AgeChartProps) {
  const alter = region.daten.nach_alter;
  const key65 = find65Key(Object.keys(alter));

  const data = [
    ...AGE_KEYS.map(({ key, label }) => ({
      name: label,
      vzae: alter[key]?.["2024"]?.insgesamt ?? 0,
      is55plus: label.startsWith("55") || label.startsWith("65"),
    })),
    ...(key65
      ? [
          {
            name: "65+",
            vzae: alter[key65]?.["2024"]?.insgesamt ?? 0,
            is55plus: true,
          },
        ]
      : []),
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 4, left: -16, bottom: 4 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e8f0"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#64748b" }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748b" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value: number) => [
            `${value.toLocaleString("de-DE")} VZÄ`,
            "Beschäftigte",
          ]}
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px -4px rgba(0,0,0,0.08)",
          }}
        />
        <Bar dataKey="vzae" radius={[6, 6, 0, 0]} maxBarSize={40}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.is55plus ? "#dc2626" : "#1d4ed8"}
              opacity={entry.is55plus ? 0.85 : 0.75}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});
