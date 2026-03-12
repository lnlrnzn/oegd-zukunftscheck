"use client";

import { useState, useMemo } from "react";
import type { RegionData } from "@/lib/data";
import type { GroupedRegions } from "@/lib/regions";
import { getRegionByName, getDeutschland } from "@/lib/regions";
import { RegionFilter } from "./region-filter";
import { TabNavigation, type StatistikTab } from "./tab-navigation";
import { TabPersonal } from "./tab-personal";
import { TabPakt } from "./tab-pakt";
import { TabDigital } from "./tab-digital";
import { TabRegional } from "./tab-regional";

interface StatistikPageClientProps {
  groupedRegions: GroupedRegions[];
  defaultRegion: RegionData;
}

export function StatistikPageClient({ groupedRegions, defaultRegion }: StatistikPageClientProps) {
  const [activeTab, setActiveTab] = useState<StatistikTab>("personal");
  const [selectedBundesland, setSelectedBundesland] = useState("alle");
  const [selectedRegion, setSelectedRegion] = useState("alle");

  const currentRegion = useMemo(() => {
    if (selectedRegion !== "alle") {
      return getRegionByName(selectedRegion) ?? defaultRegion;
    }
    return defaultRegion;
  }, [selectedRegion, defaultRegion]);

  const regionLabel = selectedRegion === "alle" ? "Deutschland" : currentRegion.name;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-oegd-navy">
          ÖGD in Zahlen
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personal, Finanzierung, Digitalisierung und regionale Vergleiche — aktueller Datenstand 31.12.2024
        </p>
      </div>

      {/* Region Filter */}
      <RegionFilter
        groupedRegions={groupedRegions}
        selectedBundesland={selectedBundesland}
        selectedRegion={selectedRegion}
        onBundeslandChange={setSelectedBundesland}
        onRegionChange={setSelectedRegion}
      />

      {/* Current region indicator */}
      <div className="text-sm text-muted-foreground">
        Daten für: <span className="font-semibold text-oegd-navy">{regionLabel}</span>
        {selectedBundesland !== "alle" && selectedRegion === "alle" && (
          <span> · {selectedBundesland}</span>
        )}
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div key={`${activeTab}-${currentRegion.name}`}>
        {activeTab === "personal" && <TabPersonal region={currentRegion} />}
        {activeTab === "pakt" && <TabPakt region={currentRegion} />}
        {activeTab === "digital" && <TabDigital />}
        {activeTab === "regional" && <TabRegional region={currentRegion} />}
      </div>
    </div>
  );
}
