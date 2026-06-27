import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X, Download, UserRound } from "lucide-react";
import logo from "@/assets/kivo-logo-full.jpg.asset.json";

const seguros = [
  { to: "/seguros/care", label: "KIVO CARE" },
  { to: "/seguros/care-plus", label: "KIVO CARE+" },
  { to: "/seguros/premium", label: "KIVO PREMIUM" },
  { to: "/seguros/rc", label: "KIVO R.C." },
];

const navLinks = [
  { to: "/coberturas", label: "Coberturas" },
  { to: "/como-funciona", label: "Cómo funciona" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre-kivo", label: "Sobre KIVO" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [openSeguros, setOpenSeguros] = useState(false);
  const [lang, setLang] = useState<"ES" | "EN">("ES");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo.url} alt="KIVO - Seguros para perros y gatos" className="h-14 sm:h-16 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-secondary">
          <div
            className="relative"
            onMouseEnter={() => setOpenSeguros(true)}
            onMouseLeave={() => setOpenSeguros(false)}
          >
            <button className="flex items-center gap-1 hover:text-primary transition">
              Seguros <ChevronDown className="h-4 w-4" />
            </button>
            {openSeguros && (
              <div className="absolute left-0 top-full pt-2 w-56">
                <div className="rounded-xl border border-border bg-card shadow-lg p-2">
                  {seguros.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-primary"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary transition"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex text-xs font-semibold text-secondary/80 border border-border rounded-full overflow-hidden">
            {(["ES", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 ${lang === l ? "bg-secondary text-white" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-secondary/30 px-4 py-2 text-sm font-semibold text-secondary hover:border-primary hover:text-primary transition"
          >
            <UserRound className="h-4 w-4" /> Área cliente
          </a>
          <a
            href="#descarga"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition"
          >
            <Download className="h-4 w-4" /> DESCARGA LA APP DE KIVO
          </a>
          <button
            className="lg:hidden p-2 text-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-1">
            <div className="font-bold text-secondary text-sm pt-1 pb-1">Seguros</div>
            {seguros.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className="block pl-3 py-2 rounded-lg text-sm hover:bg-accent"
              >
                {s.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block py-2 font-semibold text-secondary hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#"
              className="block py-2 font-semibold text-secondary"
            >
              Área cliente
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
