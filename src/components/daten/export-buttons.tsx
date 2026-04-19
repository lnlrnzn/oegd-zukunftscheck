"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileJson, FileSpreadsheet, Link2, Check } from "lucide-react";

interface ExportButtonsProps {
  endpoint: string;
  filename: string;
  queryString?: string;
}

export function ExportButtons({ endpoint, filename, queryString }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);
  const qs = queryString ? `?${queryString}` : "";
  const jsonUrl = `${endpoint}${qs}`;
  const csvUrl = `${endpoint}.csv${qs}`;
  const apiHref =
    typeof window !== "undefined" ? `${window.location.origin}${jsonUrl}` : jsonUrl;

  const copyApiUrl = async () => {
    try {
      await navigator.clipboard.writeText(apiHref);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button asChild size="sm" variant="outline">
        <a href={jsonUrl} download={`${filename}.json`}>
          <FileJson className="h-3.5 w-3.5" />
          JSON
        </a>
      </Button>
      <Button asChild size="sm" variant="outline">
        <a href={csvUrl} download={`${filename}.csv`}>
          <FileSpreadsheet className="h-3.5 w-3.5" />
          CSV
        </a>
      </Button>
      <Button size="sm" variant="ghost" onClick={copyApiUrl} className="text-slate-500">
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" /> kopiert
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" /> API-URL
          </>
        )}
      </Button>
    </div>
  );
}
