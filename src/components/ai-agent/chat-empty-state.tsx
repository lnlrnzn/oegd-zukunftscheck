"use client";

import { Shield } from "lucide-react";

export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center flex-1">
      <div className="w-12 h-12 rounded-xl bg-oegd-blue/10 flex items-center justify-center">
        <Shield className="h-6 w-6 text-oegd-blue" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm text-oegd-navy">
          ÖGD Zukunftscheck Assistent
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-[260px]">
          Fragen zur Digitalisierung im ÖGD? Ich helfe Ihnen gerne weiter.
        </p>
      </div>
    </div>
  );
}
