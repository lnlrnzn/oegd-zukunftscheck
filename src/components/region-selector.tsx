"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getGroupedRegions } from "@/lib/regions";
import { MapPin, Search, Building2 } from "lucide-react";
import gaVerzeichnis from "../../data/gesundheitsaemter_verzeichnis.json";

const grouped = getGroupedRegions();

interface GAEntry {
  id: string;
  name: string;
  landkreis: string;
  bundesland: string;
  raumordnungsregion: string;
  adresse: { ort: string };
}

const gaList = gaVerzeichnis as GAEntry[];

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter GA entries by search query (js-early-exit + js-length-check-first)
  const filteredGA = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const results: GAEntry[] = [];
    for (const ga of gaList) {
      if (
        ga.adresse.ort.toLowerCase().includes(q) ||
        ga.name.toLowerCase().includes(q) ||
        ga.landkreis.toLowerCase().includes(q)
      ) {
        results.push(ga);
        if (results.length >= 8) break; // js-early-exit: stop after 8 matches
      }
    }
    return results;
  }, [searchQuery]);

  // Close search dropdown on outside click (client-event-listeners)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Stable callback (rerender-functional-setstate)
  const selectGA = useCallback((ga: GAEntry) => {
    if (ga.raumordnungsregion && ga.raumordnungsregion !== "Unbekannt") {
      onChange(ga.raumordnungsregion);
    }
    setShowSearch(false);
    setSearchQuery("");
  }, [onChange]);

  return (
    <div className="w-full max-w-md space-y-3">
      {/* GA Search */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchRef}
            type="text"
            placeholder="Gesundheitsamt suchen (z.B. Köln, München...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearch(true);
            }}
            onFocus={() => setShowSearch(true)}
            className="pl-9 h-12 text-base bg-white shadow-sm border-border/60 hover:border-oegd-blue/40 transition-colors"
          />
        </div>
        {showSearch && filteredGA.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-lg max-h-[300px] overflow-y-auto">
            {filteredGA.map((ga) => (
              <button
                key={ga.id}
                type="button"
                onClick={() => selectGA(ga)}
                className="w-full text-left px-4 py-3 hover:bg-oegd-blue-light/50 transition-colors border-b border-border/30 last:border-0"
              >
                <div className="flex items-start gap-2.5">
                  <Building2 className="h-4 w-4 text-oegd-blue shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-oegd-navy truncate">
                      {ga.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ga.adresse.ort} · {ga.bundesland}
                      {ga.raumordnungsregion !== "Unbekannt" && (
                        <span className="text-oegd-blue"> · ROR: {ga.raumordnungsregion}</span>
                      )}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        {showSearch && searchQuery.length >= 2 && filteredGA.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Kein Gesundheitsamt gefunden. Wählen Sie unten Ihre Region.
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>oder Region direkt wählen</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* ROR Dropdown */}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 text-base bg-white shadow-sm border-border/60 hover:border-oegd-blue/40 transition-colors">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Raumordnungsregion auswählen..." />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-[340px]">
          {grouped.map((group, gi) => (
            <div key={group.bundesland}>
              {gi > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2">
                  {group.bundesland}
                </SelectLabel>
                {group.regionen.map((r) => (
                  <SelectItem key={r.name} value={r.name} className="text-sm">
                    {r.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
