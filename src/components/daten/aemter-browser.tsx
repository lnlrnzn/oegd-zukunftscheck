"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { ColumnDef } from "@tanstack/react-table";
import { Search, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import type { Gesundheitsamt } from "@/lib/data-access/aemter";

interface AemterBrowserProps {
  data: Gesundheitsamt[];
  bundeslaender: string[];
}

const ALL_BL = "__all__";

export function AemterBrowser({ data, bundeslaender }: AemterBrowserProps) {
  const [bl, setBl] = useState<string>(ALL_BL);
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: [
          { name: "name", weight: 2 },
          { name: "landkreis", weight: 1.5 },
          { name: "bundesland", weight: 1 },
          { name: "adresse.ort", weight: 1 },
          { name: "adresse.plz", weight: 0.5 },
          { name: "raumordnungsregion", weight: 0.5 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [data],
  );

  const rows = useMemo(() => {
    const base = bl === ALL_BL ? data : data.filter((a) => a.bundesland === bl);
    const q = query.trim();
    if (!q) return base;
    const hits = fuse.search(q).map((r) => r.item);
    return bl === ALL_BL ? hits : hits.filter((a) => a.bundesland === bl);
  }, [bl, query, data, fuse]);

  const columns = useMemo<ColumnDef<Gesundheitsamt>[]>(
    () => [
      {
        accessorKey: "landkreis",
        header: "Landkreis",
        cell: ({ row }) => (
          <div className="min-w-0">
            <div className="font-medium text-oegd-navy truncate">{row.original.landkreis}</div>
            <div className="text-xs text-slate-500 truncate">
              <span className="font-mono">{row.original.landkreis_ags}</span> ·{" "}
              {row.original.bundesland}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Behörde",
        cell: ({ row }) => (
          <div className="text-slate-700 max-w-[320px] truncate">{row.original.name}</div>
        ),
      },
      {
        id: "adresse",
        header: "Adresse",
        enableSorting: false,
        cell: ({ row }) => {
          const a = row.original.adresse;
          if (!a) return <span className="text-slate-400">—</span>;
          return (
            <div className="text-xs leading-snug text-slate-600">
              <div>{a.strasse}</div>
              <div>
                {a.plz} {a.ort}
              </div>
            </div>
          );
        },
      },
      {
        id: "kontakt",
        header: "Kontakt",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex flex-col gap-1 text-xs text-slate-600">
            {row.original.telefon && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3 w-3 shrink-0" />
                <span className="tabular-nums">{row.original.telefon}</span>
              </span>
            )}
            {row.original.email && (
              <a
                className="inline-flex items-center gap-1 text-oegd-blue hover:underline truncate max-w-[220px]"
                href={`mailto:${row.original.email}`}
              >
                <Mail className="h-3 w-3 shrink-0" />
                <span className="truncate">{row.original.email}</span>
              </a>
            )}
          </div>
        ),
      },
      {
        accessorKey: "raumordnungsregion",
        header: "ROR",
        cell: ({ row }) => (
          <span className="text-xs text-slate-500">{row.original.raumordnungsregion}</span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche: Ort, Landkreis, PLZ, AGS…"
            className="pl-9"
            aria-label="Ämter durchsuchen"
          />
        </div>
        <Select value={bl} onValueChange={setBl}>
          <SelectTrigger className="w-full md:w-[240px]" aria-label="Bundesland filtern">
            <MapPin className="h-4 w-4 text-slate-400" />
            <SelectValue placeholder="Bundesland" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_BL}>Alle Bundesländer</SelectItem>
            {bundeslaender.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(bl !== ALL_BL || query) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBl(ALL_BL);
              setQuery("");
            }}
          >
            Zurücksetzen
          </Button>
        )}
      </div>
      <DataTable data={rows} columns={columns} pageSize={25} />
    </div>
  );
}
