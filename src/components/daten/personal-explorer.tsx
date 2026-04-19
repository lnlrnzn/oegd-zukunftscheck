"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Search, Layers, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExportButtons } from "./export-buttons";
import { DataTable } from "./data-table";
import {
  PERSONAL_DIMENSIONS,
  type PersonalDimension,
  type PersonalEbene,
  type PersonalRow,
} from "@/lib/data-access/personal-shared";

interface PersonalExplorerProps {
  rowsByDimension: Record<PersonalDimension, PersonalRow[]>;
  bundeslaender: string[];
  endpoint: string;
  filename: string;
}

const ALL = "__all__";
const EBENEN: { id: PersonalEbene; label: string }[] = [
  { id: "deutschland", label: "Deutschland" },
  { id: "bundesland", label: "Bundesland" },
  { id: "raumordnungsregion", label: "Raumordnungsregion" },
];

export function PersonalExplorer({
  rowsByDimension,
  bundeslaender,
  endpoint,
  filename,
}: PersonalExplorerProps) {
  const [dimension, setDimension] = useState<PersonalDimension>("nach_alter");
  const [ebene, setEbene] = useState<string>(ALL);
  const [bl, setBl] = useState<string>(ALL);
  const [jahr, setJahr] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    let result = rowsByDimension[dimension] ?? [];
    if (ebene !== ALL) result = result.filter((r) => r.ebene === ebene);
    if (bl !== ALL) result = result.filter((r) => r.bundesland === bl);
    if (jahr !== ALL) result = result.filter((r) => r.jahr === jahr);
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (r) =>
          r.region.toLowerCase().includes(q) || r.kategorie.toLowerCase().includes(q),
      );
    }
    return result;
  }, [rowsByDimension, dimension, ebene, bl, jahr, query]);

  const columns = useMemo<ColumnDef<PersonalRow>[]>(
    () => [
      {
        accessorKey: "region",
        header: "Region",
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-oegd-navy">{row.original.region}</div>
            <div className="text-xs text-slate-500 capitalize">{row.original.ebene}</div>
          </div>
        ),
      },
      {
        accessorKey: "kategorie",
        header: "Kategorie",
        cell: ({ row }) => <span className="text-sm text-slate-700">{row.original.kategorie}</span>,
      },
      {
        accessorKey: "jahr",
        header: "Jahr",
        cell: ({ row }) => <span className="tabular-nums">{row.original.jahr}</span>,
      },
      {
        accessorKey: "insgesamt",
        header: "Insgesamt",
        cell: ({ row }) => (
          <span className="tabular-nums font-medium text-oegd-navy">
            {row.original.insgesamt !== null
              ? row.original.insgesamt.toLocaleString("de-DE")
              : "—"}
          </span>
        ),
      },
      {
        accessorKey: "maennlich",
        header: "Männlich",
        cell: ({ row }) => (
          <span className="tabular-nums text-slate-600">
            {row.original.maennlich !== null
              ? row.original.maennlich.toLocaleString("de-DE")
              : "—"}
          </span>
        ),
      },
      {
        accessorKey: "weiblich",
        header: "Weiblich",
        cell: ({ row }) => (
          <span className="tabular-nums text-slate-600">
            {row.original.weiblich !== null
              ? row.original.weiblich.toLocaleString("de-DE")
              : "—"}
          </span>
        ),
      },
    ],
    [],
  );

  const queryString = useMemo(() => {
    const parts: string[] = [`dimension=${dimension}`];
    if (ebene !== ALL) parts.push(`ebene=${ebene}`);
    if (bl !== ALL) parts.push(`bl=${encodeURIComponent(bl)}`);
    if (jahr !== ALL) parts.push(`jahr=${jahr}`);
    return parts.join("&");
  }, [dimension, ebene, bl, jahr]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start gap-3">
        <Select value={dimension} onValueChange={(v) => setDimension(v as PersonalDimension)}>
          <SelectTrigger className="w-full md:w-[240px]" aria-label="Dimension wählen">
            <Layers className="h-4 w-4 text-slate-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERSONAL_DIMENSIONS.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ebene} onValueChange={setEbene}>
          <SelectTrigger className="w-full md:w-[200px]" aria-label="Ebene">
            <SelectValue placeholder="Ebene" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Alle Ebenen</SelectItem>
            {EBENEN.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={bl} onValueChange={setBl}>
          <SelectTrigger className="w-full md:w-[220px]" aria-label="Bundesland">
            <MapPin className="h-4 w-4 text-slate-400" />
            <SelectValue placeholder="Bundesland" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Alle Bundesländer</SelectItem>
            {bundeslaender.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={jahr} onValueChange={setJahr}>
          <SelectTrigger className="w-full md:w-[120px]" aria-label="Jahr">
            <SelectValue placeholder="Jahr" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>2023 + 2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-full md:flex-1 md:min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Region / Kategorie suchen…"
            className="pl-9"
          />
        </div>
        {(ebene !== ALL || bl !== ALL || jahr !== ALL || query) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEbene(ALL);
              setBl(ALL);
              setJahr(ALL);
              setQuery("");
            }}
          >
            Zurücksetzen
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-slate-500">
          {rows.length.toLocaleString("de-DE")} Zeilen für aktuelle Auswahl
        </p>
        <ExportButtons endpoint={endpoint} filename={filename} queryString={queryString} />
      </div>

      <DataTable data={rows} columns={columns} pageSize={25} />
    </div>
  );
}
