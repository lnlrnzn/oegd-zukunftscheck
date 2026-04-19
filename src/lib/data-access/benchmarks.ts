import "server-only";
import benchRaw from "../../../data/benchmarking_durchschnitte.json";

interface BenchmarkEntry {
  ebene: "deutschland" | "bundesland";
  name: string;
  digitalisierungsgrad: {
    stufe_0_pct: number;
    durchschnitts_score: number;
  };
  anteil_55plus_pct: number;
  vzae_pro_100k_einwohner: number;
}

interface BenchmarkJSON {
  beschreibung: string;
  quellen: string[];
  deutschland: BenchmarkEntry;
  bundeslaender: BenchmarkEntry[];
}

const data = benchRaw as BenchmarkJSON;

export function getBenchmarks() {
  return {
    deutschland: data.deutschland,
    bundeslaender: [...data.bundeslaender].sort((a, b) =>
      a.name.localeCompare(b.name, "de"),
    ),
  };
}
