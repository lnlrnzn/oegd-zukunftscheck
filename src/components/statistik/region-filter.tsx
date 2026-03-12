"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GroupedRegions } from "@/lib/regions";
import { MapPin } from "lucide-react";

interface RegionFilterProps {
  groupedRegions: GroupedRegions[];
  selectedBundesland: string;
  selectedRegion: string;
  onBundeslandChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export function RegionFilter({
  groupedRegions,
  selectedBundesland,
  selectedRegion,
  onBundeslandChange,
  onRegionChange,
}: RegionFilterProps) {
  const bundeslaender = groupedRegions.map((g) => g.bundesland);

  const availableRegions =
    selectedBundesland === "alle"
      ? groupedRegions.flatMap((g) => g.regionen)
      : groupedRegions
          .filter((g) => g.bundesland === selectedBundesland)
          .flatMap((g) => g.regionen);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
        <MapPin className="h-4 w-4" />
        <span className="font-medium">Region:</span>
      </div>

      <Select value={selectedBundesland} onValueChange={(v) => {
        onBundeslandChange(v);
        onRegionChange("alle");
      }}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Bundesland wählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alle">Alle Bundesländer</SelectItem>
          {bundeslaender.map((bl) => (
            <SelectItem key={bl} value={bl}>
              {bl}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[260px]">
          <SelectValue placeholder="Raumordnungsregion wählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alle">Alle Regionen</SelectItem>
          {selectedBundesland === "alle"
            ? groupedRegions.map((g) => (
                <SelectGroup key={g.bundesland}>
                  <SelectLabel>{g.bundesland}</SelectLabel>
                  {g.regionen.map((r) => (
                    <SelectItem key={r.name} value={r.name}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))
            : availableRegions.map((r) => (
                <SelectItem key={r.name} value={r.name}>
                  {r.name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
}
