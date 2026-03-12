import pdtTools from "../../data/pdt_tool_register.json";

interface PDTTool {
  name: string;
  modul: string | null;
  link: string;
  beschreibung: string;
  oberkategorie: string;
  unterkategorie: string;
  subkategorie: string;
  fachliche_oberkategorie: string;
  fachliche_subkategorie: string;
  bundesland: string;
  pdt_empfehlung: boolean;
}

const tools = pdtTools as PDTTool[];

export interface ToolCategoryCount {
  kategorie: string;
  count: number;
}

/** Aggregate tools by Oberkategorie */
export function aggregateToolCategories(): ToolCategoryCount[] {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    const cat = tool.oberkategorie || "Sonstige";
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([kategorie, count]) => ({ kategorie, count }))
    .sort((a, b) => b.count - a.count);
}

/** Get top N tools by frequency (unique names) */
export function getTopTools(n = 10): { name: string; count: number; kategorie: string }[] {
  const counts = new Map<string, { count: number; kategorie: string }>();
  for (const tool of tools) {
    const existing = counts.get(tool.name);
    if (existing) {
      existing.count++;
    } else {
      counts.set(tool.name, { count: 1, kategorie: tool.oberkategorie });
    }
  }
  return Array.from(counts.entries())
    .map(([name, { count, kategorie }]) => ({ name, count, kategorie }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** Get total unique tool count */
export function getUniqueToolCount(): number {
  return new Set(tools.map((t) => t.name)).size;
}

/** Get total tool entries */
export function getTotalToolEntries(): number {
  return tools.length;
}

/** Get the most common Oberkategorie */
export function getMostCommonCategory(): string {
  const categories = aggregateToolCategories();
  return categories[0]?.kategorie ?? "Unbekannt";
}
