import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";

export default function DatenLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50/40">
      <SiteNav />
      <div className="pt-14">{children}</div>
    </main>
  );
}
