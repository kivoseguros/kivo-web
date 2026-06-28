import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Minus } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

const headers = ["KIVO CARE", "KIVO CARE+", "KIVO PREMIUM", "R.C. ESENCIAL"];

type Cell = "✓" | "—" | string;
const rows: [string, Cell, Cell, Cell, Cell][] = [
  ["Reembolso gastos veterinarios",     "80%",       "90%",       "100%",          "—"],
  ["Límite anual de reembolso",         "3.500 €",   "4.000 €",   "5.000 €",       "—"],
  ["Sublímite por proceso",             "2.500 €",   "2.500 €",   "3.500 € oncol.","—"],
  ["Consultas y visitas",               "✓",         "✓",         "✓",             "—"],
  ["Hospitalización y cirugía",         "✓",         "✓",         "✓",             "—"],
  ["Diagnóstico (análisis, ecografías…)","✓",        "✓",         "✓",             "—"],
  ["Oncología",                         "✓",         "✓",         "✓",             "—"],
  ["Urgencias 24h",                     "✓",         "✓",         "✓",             "—"],
  ["Fisioterapia (hasta 9 ses./año)",   "✓",         "✓",         "✓",             "—"],
  ["Vacunación (hasta 250 €/año)",      "✓",         "✓",         "✓",             "—"],
  ["Teleconsulta veterinaria",          "✓",         "✓",         "✓",             "—"],
  ["Tartrectomía",                      "Desde 2.º año","Desde 2.º año","Desde 1.er año","—"],
  ["Copago a cargo del asegurado",      "20%",       "10%",       "Sin copago",    "—"],
  ["Responsabilidad Civil",             "200.000 €", "250.000 €", "300.000 €",     "150.000 €"],
  ["Defensa jurídica",                  "✓",         "✓",         "✓",             "✓"],
  ["Carencia accidentes",               "5 días",    "5 días",    "5 días",        "—"],
  ["Carencia enfermedades",             "28 días",   "28 días",   "28 días",       "—"],
];

const planes = [
  { to: "/seguros/care",      label: "KIVO CARE",      sub: "80% · 3.500 €/año" },
  { to: "/seguros/care-plus", label: "KIVO CARE+",     sub: "90% · 4.000 €/año" },
  { to: "/seguros/premium",   label: "KIVO PREMIUM",   sub: "100% · 5.000 €/año" },
  { to: "/seguros/rc",        label: "R.C. ESENCIAL",  sub: "R.C. 150.000 €" },
];

export const Route = createFileRoute("/coberturas")({
  head: () => ({
    meta: [
      { title: "Coberturas KIVO — Comparativa completa de planes" },
      { name: "description", content: "Compara KIVO CARE, CARE+, PREMIUM y R.C. ESENCIAL: reembolsos, límites, coberturas y carencias en una sola tabla." },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/coberturas" }],
  }),
  component: CoberturasPage,
});

function Cell({ v }: { v: Cell }) {
  if (v === "✓") return <Check className="h-4 w-4 text-[#3DBFA0] mx-auto" />;
  if (v === "—") return <Minus className="h-4 w-4 text-[#1B2A4A]/20 mx-auto" />;
  return <span>{v}</span>;
}

function CoberturasPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="COBERTURAS"
        title={<>Comparativa de <span className="text-primary">planes KIVO</span></>}
        subtitle="Todas las coberturas, límites y carencias de nuestros planes. Datos según IPIDs oficiales 2026."
      />
      <Section>
        {/* Tabla comparativa */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1B2A4A] text-white">
              <tr>
                <th className="py-4 px-5 font-bold text-xs uppercase tracking-wider w-56">Cobertura</th>
                {headers.map((h) => (
                  <th key={h} className="py-4 px-4 font-bold text-center text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[0]} className={"border-t border-border " + (i % 2 ? "bg-[#1B2A4A]/3" : "")}>
                  <th className="py-3 px-5 font-semibold text-[#1B2A4A] text-xs text-left">{r[0]}</th>
                  {r.slice(1).map((v, j) => (
                    <td key={j} className="py-3 px-4 text-center text-xs text-[#1B2A4A]/80">
                      <Cell v={v as Cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#1B2A4A]/40">
          IPID-KIVO-CARE-2026 · IPID-KIVO-CARE-PLUS-2026 · IPID-KIVO-PREMIUM-2026 · CG-KIVO-RC-2026 · v2
        </p>

        {/* Cards de cada plan */}
        <div className="mt-14">
          <h2 className="text-2xl font-extrabold text-[#1B2A4A] text-center mb-2">Elige tu plan</h2>
          <p className="text-sm text-[#1B2A4A]/60 text-center mb-8">Haz clic en cada plan para ver todos los detalles.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {planes.map((p) => (
              <Link
                key={p.to}
                to={p.to as "/seguros/care"}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#1B2A4A]/10 bg-white px-5 py-6 text-center hover:border-[#3DBFA0] hover:shadow-md transition-all"
              >
                <span className="text-base font-extrabold text-[#1B2A4A]">{p.label}</span>
                <span className="text-xs text-[#1B2A4A]/55">{p.sub}</span>
                <span className="mt-3 rounded-full bg-[#3DBFA0] px-4 py-1.5 text-xs font-bold text-white">Ver detalles →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA contratar */}
        <div className="mt-14 text-center">
          <Link
            to="/contratar"
            className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A] px-8 py-4 text-sm font-bold text-white hover:bg-[#1B2A4A]/90 transition-colors"
          >
            Calcula tu precio →
          </Link>
          <p className="mt-3 text-xs text-[#1B2A4A]/50">Sin compromiso · En menos de 5 minutos</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
