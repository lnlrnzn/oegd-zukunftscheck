import Image from "next/image";
import { EXPERTS, EXPERTS_KONTAKT, type Expert } from "@/lib/experts";
import { Building2, ExternalLink } from "lucide-react";

interface ExpertsSectionProps {
  variant?: "default" | "compact";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const ACCENT_STYLES: Record<
  Expert["akzent"],
  { bg: string; ring: string; text: string; dot: string }
> = {
  blue: {
    bg: "bg-oegd-blue",
    ring: "ring-oegd-blue/20",
    text: "text-oegd-blue",
    dot: "bg-oegd-blue",
  },
  navy: {
    bg: "bg-oegd-navy",
    ring: "ring-oegd-navy/20",
    text: "text-oegd-navy",
    dot: "bg-oegd-navy",
  },
  green: {
    bg: "bg-oegd-green",
    ring: "ring-oegd-green/20",
    text: "text-oegd-green",
    dot: "bg-oegd-green",
  },
  yellow: {
    bg: "bg-oegd-yellow",
    ring: "ring-oegd-yellow/20",
    text: "text-oegd-yellow",
    dot: "bg-oegd-yellow",
  },
};

export function ExpertsSection({
  variant = "default",
  eyebrow = "Ihre Ansprechpartner",
  title = "Das Team hinter dem ÖGD Zukunftscheck",
  subtitle = "Vier Beraterinnen und Berater der Kienbaum Consultants International mit tiefer Expertise im ÖGD, in der Digitalisierung und in der Personalbedarfsermittlung.",
  className = "",
}: ExpertsSectionProps) {
  const isCompact = variant === "compact";

  return (
    <section
      className={`${isCompact ? "py-10 md:py-12" : "py-16 md:py-20"} bg-white ${className}`}
      aria-labelledby="experts-heading"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className={`mb-8 md:mb-10 ${isCompact ? "max-w-2xl" : "max-w-3xl"}`}>
          <span className="text-xs font-semibold tracking-wider uppercase text-oegd-blue">
            {eyebrow}
          </span>
          <h2
            id="experts-heading"
            className={`mt-2 font-bold text-oegd-navy tracking-tight ${isCompact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}
          >
            {title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">{subtitle}</p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
            <Building2 className="h-3.5 w-3.5" />
            <span>
              {EXPERTS_KONTAKT.firma} · {EXPERTS_KONTAKT.geschaeftsbereich}
            </span>
          </div>
        </header>

        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTS.map((e) => (
            <ExpertCard key={e.id} expert={e} compact={isCompact} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
          <span>Sie möchten ein Gespräch mit dem Team vereinbaren?</span>
          <a
            href={EXPERTS_KONTAKT.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-oegd-blue font-medium hover:underline"
          >
            Kienbaum kontaktieren
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

interface ExpertCardProps {
  expert: Expert;
  compact: boolean;
}

function ExpertCard({ expert, compact }: ExpertCardProps) {
  const accent = ACCENT_STYLES[expert.akzent];
  return (
    <article className="group relative flex flex-col gap-3 rounded-[1rem] border border-slate-200 bg-white p-4 md:p-5 shadow-sm transition-all hover:border-oegd-blue/30 hover:shadow-md">
      <div className="flex items-start gap-3">
        {expert.photo ? (
          <div
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-4 ${accent.ring}`}
          >
            <Image
              src={expert.photo}
              alt={`Portrait von ${expert.name}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ring-4 ${accent.bg} ${accent.ring}`}
            aria-hidden
          >
            {expert.initialen}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-oegd-navy leading-tight">
            {expert.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{expert.rolle}</p>
          {expert.abschluss && (
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{expert.abschluss}</p>
          )}
        </div>
      </div>

      <div className="text-xs text-slate-500 leading-relaxed">{expert.bereich}</div>

      {!compact && (
        <p className="text-[13px] leading-relaxed text-slate-600">{expert.bio}</p>
      )}

      <ul className="mt-auto space-y-1 pt-2 border-t border-slate-100">
        {expert.kernkompetenzen.slice(0, compact ? 3 : 4).map((k) => (
          <li key={k} className="flex items-start gap-1.5 text-[12px] text-slate-600">
            <span
              className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.dot}`}
              aria-hidden
            />
            <span className="leading-snug">{k}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
