"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "./data-table";
import type { PdtTool } from "@/lib/data-access/tools";

interface ToolsBrowserProps {
  data: PdtTool[];
  oberkategorien: string[];
  fachliche: string[];
}

const ALL = "__all__";

export function ToolsBrowser({ data, oberkategorien, fachliche }: ToolsBrowserProps) {
  const [kat, setKat] = useState(ALL);
  const [fach, setFach] = useState(ALL);
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: [
          { name: "name", weight: 2 },
          { name: "modul", weight: 1 },
          { name: "beschreibung", weight: 1 },
          { name: "oberkategorie", weight: 0.7 },
          { name: "fachliche_oberkategorie", weight: 0.7 },
          { name: "fachliche_subkategorie", weight: 0.5 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [data],
  );

  const rows = useMemo(() => {
    let base = data;
    if (kat !== ALL) base = base.filter((t) => t.oberkategorie === kat);
    if (fach !== ALL) base = base.filter((t) => t.fachliche_oberkategorie === fach);
    const q = query.trim();
    if (!q) return base;
    const hits = fuse.search(q).map((r) => r.item);
    return hits.filter(
      (t) =>
        (kat === ALL || t.oberkategorie === kat) &&
        (fach === ALL || t.fachliche_oberkategorie === fach),
    );
  }, [kat, fach, query, data, fuse]);

  const columns = useMemo<ColumnDef<PdtTool>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tool",
        cell: ({ row }) => (
          <div className="min-w-0 max-w-[260px]">
            <div className="font-medium text-oegd-navy truncate">{row.original.name}</div>
            {row.original.modul && (
              <div className="text-xs text-slate-500 truncate">{row.original.modul}</div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "beschreibung",
        header: "Beschreibung",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="text-sm text-slate-600 max-w-[420px]">
            {row.original.beschreibung || <span className="text-slate-400">—</span>}
          </div>
        ),
      },
      {
        accessorKey: "oberkategorie",
        header: "Kategorie",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <Badge variant="secondary" className="font-normal w-fit">
              {row.original.oberkategorie}
            </Badge>
            <span className="text-xs text-slate-500">{row.original.fachliche_oberkategorie}</span>
          </div>
        ),
      },
      {
        id: "link",
        header: "",
        enableSorting: false,
        cell: ({ row }) =>
          row.original.link ? (
            <a
              href={row.original.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-oegd-blue text-xs hover:underline"
            >
              Öffnen <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-xs text-slate-400">—</span>
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
            placeholder="Suche: Tool-Name, Beschreibung…"
            className="pl-9"
            aria-label="Tools durchsuchen"
          />
        </div>
        <Select value={kat} onValueChange={setKat}>
          <SelectTrigger className="w-full md:w-[220px]" aria-label="Oberkategorie filtern">
            <Filter className="h-4 w-4 text-slate-400" />
            <SelectValue placeholder="Oberkategorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Alle Oberkategorien</SelectItem>
            {oberkategorien.map((k) => (
              <SelectItem key={k} value={k}>
                {k}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={fach} onValueChange={setFach}>
          <SelectTrigger className="w-full md:w-[220px]" aria-label="Fachliche Kategorie filtern">
            <Filter className="h-4 w-4 text-slate-400" />
            <SelectValue placeholder="Fachbereich" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Alle Fachbereiche</SelectItem>
            {fachliche.map((k) => (
              <SelectItem key={k} value={k}>
                {k}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(kat !== ALL || fach !== ALL || query) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setKat(ALL);
              setFach(ALL);
              setQuery("");
            }}
          >
            Zurücksetzen
          </Button>
        )}
      </div>
      <DataTable data={rows} columns={columns} pageSize={20} />
    </div>
  );
}
