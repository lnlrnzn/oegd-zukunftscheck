"use client";

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
import { getGroupedRegions } from "@/lib/regions";
import { MapPin } from "lucide-react";

const grouped = getGroupedRegions();

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-md h-12 text-base bg-white shadow-sm border-border/60 hover:border-oegd-blue/40 transition-colors">
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
  );
}
