import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[11rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
