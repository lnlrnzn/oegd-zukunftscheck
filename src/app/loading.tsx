import { Shield } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-12 h-12 rounded-xl bg-oegd-blue flex items-center justify-center">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div className="h-1.5 w-32 rounded-full bg-oegd-blue-light overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-oegd-blue animate-[shimmer-slide_1.5s_ease-in-out_infinite_alternate]" />
        </div>
      </div>
    </div>
  );
}
