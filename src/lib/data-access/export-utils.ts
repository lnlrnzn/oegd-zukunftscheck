import "server-only";

export interface CsvColumn<T> {
  key: string;
  label: string;
  accessor: (row: T) => string | number | boolean | null | undefined;
}

const UTF8_BOM = "\uFEFF";

export function toCSV<T>(rows: readonly T[], columns: readonly CsvColumn<T>[]): string {
  const header = columns.map((c) => escapeCell(c.label)).join(";");
  const body = rows
    .map((row) =>
      columns
        .map((c) => {
          const value = c.accessor(row);
          return escapeCell(value ?? "");
        })
        .join(";"),
    )
    .join("\n");
  return `${UTF8_BOM}${header}\n${body}`;
}

function escapeCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(";") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
