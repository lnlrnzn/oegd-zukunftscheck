import { AlertTriangle, Info } from "lucide-react";

interface QualityNoteProps {
  variant?: "warning" | "info";
  title: string;
  children: React.ReactNode;
}

export function QualityNote({ variant = "warning", title, children }: QualityNoteProps) {
  const styles =
    variant === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-sky-200 bg-sky-50 text-sky-900";
  const Icon = variant === "warning" ? AlertTriangle : Info;
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-[0.75rem] border p-3 md:p-4 text-sm ${styles}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="space-y-1">
        <div className="font-semibold">{title}</div>
        <div className="text-[0.8125rem] leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
