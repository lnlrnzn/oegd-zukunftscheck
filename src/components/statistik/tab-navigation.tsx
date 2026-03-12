"use client";

import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Users, Landmark, Monitor, GitCompareArrows } from "lucide-react";

export type StatistikTab = "personal" | "pakt" | "digital" | "regional";

interface TabNavigationProps {
  activeTab: StatistikTab;
  onTabChange: (tab: StatistikTab) => void;
}

const tabs: { value: StatistikTab; label: string; icon: ReactNode }[] = [
  { value: "personal", label: "Personal & Demografie", icon: <Users className="h-4 w-4" /> },
  { value: "pakt", label: "Pakt ÖGD & Finanzierung", icon: <Landmark className="h-4 w-4" /> },
  { value: "digital", label: "Digitalisierung", icon: <Monitor className="h-4 w-4" /> },
  { value: "regional", label: "Regionale Vergleiche", icon: <GitCompareArrows className="h-4 w-4" /> },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as StatistikTab)}>
      <TabsList className="flex flex-wrap gap-1 bg-muted/50 p-1 rounded-xl">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-white data-[state=active]:text-oegd-blue data-[state=active]:shadow-sm"
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
