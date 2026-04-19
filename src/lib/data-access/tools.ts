import "server-only";
import toolsRaw from "../../../data/pdt_tool_register.json";

export interface PdtTool {
  name: string;
  modul: string | null;
  link: string | null;
  beschreibung: string | null;
  oberkategorie: string;
  unterkategorie: string;
  subkategorie: string;
  fachliche_oberkategorie: string;
  fachliche_subkategorie: string;
  bundesland: string;
  pdt_empfehlung: boolean;
}

const ALL_TOOLS = toolsRaw as PdtTool[];

export interface ToolFilter {
  oberkategorie?: string;
  fachlicheOberkategorie?: string;
  query?: string;
}

export function listTools(filter: ToolFilter = {}): PdtTool[] {
  const q = filter.query?.trim().toLowerCase();
  return ALL_TOOLS.filter((t) => {
    if (filter.oberkategorie && t.oberkategorie !== filter.oberkategorie) return false;
    if (
      filter.fachlicheOberkategorie &&
      t.fachliche_oberkategorie !== filter.fachlicheOberkategorie
    )
      return false;
    if (q) {
      const hay = [
        t.name,
        t.modul,
        t.beschreibung,
        t.oberkategorie,
        t.unterkategorie,
        t.fachliche_oberkategorie,
        t.fachliche_subkategorie,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function toolsCount(): number {
  return ALL_TOOLS.length;
}

export function toolOberkategorien(): string[] {
  return [...new Set(ALL_TOOLS.map((t) => t.oberkategorie))].sort((a, b) =>
    a.localeCompare(b, "de"),
  );
}

export function toolFachlicheOberkategorien(): string[] {
  return [...new Set(ALL_TOOLS.map((t) => t.fachliche_oberkategorie))].sort((a, b) =>
    a.localeCompare(b, "de"),
  );
}
