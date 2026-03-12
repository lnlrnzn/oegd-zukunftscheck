import { Shield } from "lucide-react";

export default function AssessmentLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 glass-header border-b">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-oegd-blue flex items-center justify-center">
                <Shield className="h-3 w-3 text-white" />
              </div>
              <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full w-0 bg-oegd-blue rounded-full" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse" />
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
          <div className="h-4 w-80 bg-muted/60 rounded animate-pulse" />
          <div className="h-12 w-full max-w-md bg-muted rounded-xl animate-pulse mt-4" />
        </div>
      </div>
    </div>
  );
}
