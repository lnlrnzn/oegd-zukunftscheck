export interface DatasetMeta {
  id: string;
  label: string;
  beschreibung: string;
  quelle: string;
  stichtag: string;
  lizenz: string;
  lizenzUrl?: string;
  endpoint: string;
  filename: string;
}

export const DATASET_META: Record<
  "aemter" | "personal" | "tools" | "pakt" | "benchmarks" | "geografie",
  DatasetMeta
> = {
  aemter: {
    id: "aemter",
    label: "Gesundheitsämter",
    beschreibung:
      "Verzeichnis der unteren Gesundheitsbehörden in Deutschland mit Adressen, Kontakten und Landkreiszuordnung.",
    quelle: "RKI – Liste der Gesundheitsämter",
    stichtag: "2024-12-31",
    lizenz: "CC BY 4.0 (Quelle: RKI)",
    endpoint: "/api/daten/aemter",
    filename: "gesundheitsaemter",
  },
  personal: {
    id: "personal",
    label: "Personal im ÖGD",
    beschreibung:
      "Vollzeitäquivalente (VZÄ) nach Raumordnungsregion, Bundesland und Dimensionen (Alter, Beruf, Tätigkeit).",
    quelle: "GBE-Bund – RegGPM-Basistabelle",
    stichtag: "2024-12-31",
    lizenz: "DL-DE BY 2.0",
    lizenzUrl: "https://www.govdata.de/dl-de/by-2-0",
    endpoint: "/api/daten/personal",
    filename: "oegd-personal",
  },
  tools: {
    id: "tools",
    label: "PDT-Tool-Register",
    beschreibung:
      "Digitale Tools für den ÖGD aus dem Portal des PDT (Portal Digitaler Tools) des Bundesministeriums für Gesundheit.",
    quelle: "PDT Tool-Register (BMG)",
    stichtag: "2024",
    lizenz: "Nutzung gemäß PDT-Plattform",
    endpoint: "/api/daten/tools",
    filename: "pdt-tools",
  },
  pakt: {
    id: "pakt",
    label: "Pakt ÖGD",
    beschreibung:
      "Personalaufbau gemäß Pakt für den Öffentlichen Gesundheitsdienst (Soll, Ist, Übererfüllung je Bundesland).",
    quelle: "BMG – Pakt ÖGD Bericht 2024",
    stichtag: "2024-12-31",
    lizenz: "Auszug aus BMG-Bericht",
    endpoint: "/api/daten/pakt",
    filename: "pakt-oegd",
  },
  benchmarks: {
    id: "benchmarks",
    label: "Benchmarks",
    beschreibung: "Nationale und Bundesland-Durchschnitte für Digitalisierungsgrad, Altersstruktur und VZÄ.",
    quelle: "EvalDiGe 2024 · Destatis · GBE-Bund",
    stichtag: "2024-12-31",
    lizenz: "Gemischt (siehe Quelle)",
    endpoint: "/api/daten/benchmarks",
    filename: "benchmarks",
  },
  geografie: {
    id: "geografie",
    label: "Geografie",
    beschreibung: "Stammdaten der 400 Landkreise, 96 Raumordnungsregionen und 16 Bundesländer mit AGS-Schlüsseln.",
    quelle: "BBSR · Destatis",
    stichtag: "2024",
    lizenz: "Destatis: DL-DE BY 2.0",
    endpoint: "/api/daten/geografie",
    filename: "geografie",
  },
};
