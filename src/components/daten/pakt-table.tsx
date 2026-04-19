"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import type { PaktRow } from "@/lib/data-access/pakt";

interface PaktTableProps {
  data: PaktRow[];
}

function fmtNum(v: number): string {
  return v.toLocaleString("de-DE");
}

export function PaktTable({ data }: PaktTableProps) {
  const columns = useMemo<ColumnDef<PaktRow>[]>(
    () => [
      {
        accessorKey: "bundesland",
        header: "Bundesland",
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-oegd-navy">{row.original.bundesland}</div>
            <div className="text-xs text-slate-500">{row.original.kuerzel}</div>
          </div>
        ),
      },
      {
        accessorKey: "vorgabenVzae",
        header: "Vorgabe",
        cell: ({ row }) => (
          <span className="tabular-nums">{fmtNum(row.original.vorgabenVzae)}</span>
        ),
      },
      {
        accessorKey: "istBesetztVzae2024",
        header: "Ist 2024",
        cell: ({ row }) => (
          <span className="tabular-nums font-medium text-oegd-navy">
            {fmtNum(row.original.istBesetztVzae2024)}
          </span>
        ),
      },
      {
        accessorKey: "uebererfuellungPct",
        header: "Übererfüllung",
        cell: ({ row }) => {
          const v = row.original.uebererfuellungPct;
          const color = v >= 0 ? "text-oegd-green" : "text-oegd-red";
          return (
            <span className={`tabular-nums font-medium ${color}`}>
              {v >= 0 ? "+" : ""}
              {v.toFixed(1)} %
            </span>
          );
        },
      },
      {
        accessorKey: "unbefristetAnteilPct",
        header: "Unbefristet",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.unbefristetAnteilPct.toFixed(0)} %</span>
        ),
      },
      {
        accessorKey: "aerzteVzae",
        header: "Ärzte",
        cell: ({ row }) => <span className="tabular-nums">{fmtNum(row.original.aerzteVzae)}</span>,
      },
      {
        accessorKey: "fachpersonalVzae",
        header: "Fachpersonal",
        cell: ({ row }) => (
          <span className="tabular-nums">{fmtNum(row.original.fachpersonalVzae)}</span>
        ),
      },
      {
        accessorKey: "verwaltungVzae",
        header: "Verwaltung",
        cell: ({ row }) => (
          <span className="tabular-nums">{fmtNum(row.original.verwaltungVzae)}</span>
        ),
      },
    ],
    [],
  );

  return <DataTable data={data} columns={columns} pageSize={20} />;
}
