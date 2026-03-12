import { Card, CardContent } from "@/components/ui/card";

interface NarrativeBoxProps {
  children: React.ReactNode;
  source?: string;
}

export function NarrativeBox({ children, source }: NarrativeBoxProps) {
  return (
    <Card className="bg-oegd-navy border-0 shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="shrink-0 w-1 rounded-full bg-oegd-blue" />
          <div className="space-y-2">
            <p className="text-sm text-slate-300 leading-relaxed">
              {children}
            </p>
            {source && (
              <p className="text-[10px] text-slate-500 mt-3">
                Quelle: {source}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
