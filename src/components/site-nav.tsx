"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Shield, ArrowRight, Menu, X, BarChart3, Table2, ClipboardCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Shield;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Start", href: "/", icon: Home },
  { label: "Daten", href: "/daten", icon: Table2 },
  { label: "Statistiken", href: "/statistik", icon: BarChart3 },
  { label: "Zum Check", href: "/assessment", icon: ClipboardCheck },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 glass-header border-b bg-white/80 backdrop-blur"
      aria-label="Hauptnavigation"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity min-w-0"
        >
          <div className="w-8 h-8 rounded-lg bg-oegd-blue flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-oegd-navy truncate">
            ÖGD Zukunftscheck
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.filter((i) => i.href !== "/" && i.href !== "/assessment").map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Button
                asChild
                key={item.href}
                size="sm"
                variant="ghost"
                className={`text-sm ${active ? "text-oegd-blue bg-oegd-blue-light" : ""}`}
              >
                <Link href={item.href}>
                  <Icon className="h-3.5 w-3.5 mr-1" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
          <Button asChild size="sm" className="text-sm shadow-sm">
            <Link href="/assessment">
              Zum Check
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="site-nav-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-oegd-navy hover:bg-slate-100 transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="site-nav-mobile-menu"
        className={`md:hidden border-t border-slate-200 bg-white overflow-hidden transition-[max-height,opacity] duration-200 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const isCTA = item.href === "/assessment";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isCTA
                      ? "bg-oegd-blue text-white hover:bg-oegd-blue/90 mt-2"
                      : active
                        ? "bg-oegd-blue-light text-oegd-blue"
                        : "text-oegd-navy hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {isCTA && <ArrowRight className="h-3.5 w-3.5 ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
