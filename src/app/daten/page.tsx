import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Building2, Users, Wrench, Scale, Activity, Map } from "lucide-react";
import { DATASET_META } from "@/lib/data-access/meta";
import { aemterCount } from "@/lib/data-access/aemter";
import { toolsCount } from "@/lib/data-access/tools";
import { personalRegionen } from "@/lib/data-access/personal";
import { getPaktLaender } from "@/lib/data-access/pakt";
import { getBenchmarks } from "@/lib/data-access/benchmarks";

export const metadata: Metadata = {
  title: "Offene Daten – ÖGD Zukunftscheck",
  description:
    "Rohdaten zum Öffentlichen Gesundheitsdienst: Gesundheitsämter, Personalbestand, Pakt ÖGD, PDT-Tool-Register — als JSON und CSV verfügbar.",
};

export const dynamic = "force-static";

interface Card {
  id: string;
  label: string;
  beschreibung: string;
  href: string;
  count: string;
  stand: string;
  icon: typeof Building2;
  accent: string;
}

export default function DatenHubPage() {
  const aemter = aemterCount();
  const tools = toolsCount();
  const regionen = personalRegionen();
  const pakt = getPaktLaender();
  const benchmarks = getBenchmarks();

  const cards: Card[] = [
    {
      id: "aemter",
      label: DATASET_META.aemter.label,
      beschreibung: DATASET_META.aemter.beschreibung,
      href: "/daten/aemter",
      count: `${aemter.toLocaleString("de-DE")} Einträge`,
      stand: DATASET_META.aemter.stichtag,
      icon: Building2,
      accent: "bg-oegd-blue-light text-oegd-blue",
    },
    {
      id: "personal",
      label: DATASET_META.personal.label,
      beschreibung: DATASET_META.personal.beschreibung,
      href: "/daten/personal",
      count: `${regionen.length} Regionen · 7 Dimensionen · 2 Jahre`,
      stand: DATASET_META.personal.stichtag,
      icon: Users,
      accent: "bg-oegd-green-light text-oegd-green",
    },
    {
      id: "tools",
      label: DATASET_META.tools.label,
      beschreibung: DATASET_META.tools.beschreibung,
      href: "/daten/tools",
      count: `${tools.toLocaleString("de-DE")} Tools`,
      stand: DATASET_META.tools.stichtag,
      icon: Wrench,
      accent: "bg-oegd-yellow-light text-oegd-yellow",
    },
    {
      id: "pakt",
      label: DATASET_META.pakt.label,
      beschreibung: DATASET_META.pakt.beschreibung,
      href: "/daten/pakt",
      count: `${pakt.length} Bundesländer`,
      stand: DATASET_META.pakt.stichtag,
      icon: Scale,
      accent: "bg-oegd-blue-mid text-oegd-navy",
    },
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
        <header className="space-y-3 max-w-3xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-oegd-blue">
            Offene Daten
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-oegd-navy tracking-tight">
            Alle Rohdaten. Zum Zitieren, Exportieren, Weiterverwenden.
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Sämtliche Datensätze des ÖGD Zukunftschecks sind hier einsehbar, filterbar und als
            JSON oder CSV herunterladbar. Jede Tabelle ist über eine öffentliche REST-API
            zugänglich.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                href={c.href}
                className="group rounded-[1rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm transition-all hover:border-oegd-blue/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${c.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-oegd-blue" />
                </div>
                <div className="mt-4 space-y-2">
                  <h2 className="text-lg font-semibold text-oegd-navy">{c.label}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.beschreibung}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="tabular-nums">{c.count}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>Stand: {c.stand}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="rounded-[1rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
              <Activity className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-oegd-navy">Benchmarks auf einen Blick</h2>
              <p className="text-xs text-slate-500">
                Quelle: EvalDiGe 2024 · Destatis · GBE-Bund · Stand: {DATASET_META.benchmarks.stichtag}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-xs text-slate-500">Stufe 0 (DE)</dt>
              <dd className="text-2xl font-semibold text-oegd-navy tabular-nums">
                {benchmarks.deutschland.digitalisierungsgrad.stufe_0_pct}%
              </dd>
              <p className="text-xs text-slate-500">der ÖGD-Prozesse analog</p>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Digital-Score (DE)</dt>
              <dd className="text-2xl font-semibold text-oegd-navy tabular-nums">
                {benchmarks.deutschland.digitalisierungsgrad.durchschnitts_score}
              </dd>
              <p className="text-xs text-slate-500">Durchschnittspunkte</p>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Personal 55+ (DE)</dt>
              <dd className="text-2xl font-semibold text-oegd-navy tabular-nums">
                {benchmarks.deutschland.anteil_55plus_pct}%
              </dd>
              <p className="text-xs text-slate-500">Anteil in Ruhestandsnähe</p>
            </div>
            <div>
              <dt className="text-xs text-slate-500">VZÄ pro 100.000 EW (DE)</dt>
              <dd className="text-2xl font-semibold text-oegd-navy tabular-nums">
                {benchmarks.deutschland.vzae_pro_100k_einwohner}
              </dd>
              <p className="text-xs text-slate-500">Durchschnitt</p>
            </div>
          </dl>
        </section>

        <section className="rounded-[1rem] border border-slate-200 bg-slate-50 p-5 md:p-6 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <Map className="h-4 w-4 mt-0.5 text-slate-500 shrink-0" />
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-oegd-navy">Daten-API</h2>
              <p>
                Alle Datensätze sind per HTTP-GET auf <code className="text-[0.8125rem] rounded bg-white px-1 py-0.5 border border-slate-200">/api/daten/&lt;name&gt;</code>
                {" "}abrufbar (JSON) oder{" "}
                <code className="text-[0.8125rem] rounded bg-white px-1 py-0.5 border border-slate-200">/api/daten/&lt;name&gt;.csv</code> (CSV).
                Responses enthalten Quelle, Stichtag, Lizenz und Record-Count.
              </p>
              <p className="text-xs text-slate-500">
                Beispiel:{" "}
                <code className="text-[0.75rem]">GET /api/daten/aemter?bl=Bayern&amp;q=München</code>
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
