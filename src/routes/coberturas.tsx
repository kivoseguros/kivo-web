import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

const headers = ["KIVO CARE", "KIVO CARE+", "KIVO PREMIUM", "KIVO R.C."];
const rows: (string | "✓" | "—")[][] = [
  ["Reembolsos en gastos veterinarios", "80%", "90%", "100%", "—"],
  ["Límite anual por mascota", "1.500 €", "2.500 €", "Sin límite por accidente", "—"],
  ["Consultas", "✓", "✓", "✓", "—"],
  ["Cirugías", "✓", "✓", "✓", "—"],
  ["Pruebas diagnósticas", "✓", "✓", "✓", "—"],
  ["Medicamentos", "✓", "✓", "✓", "—"],
  ["Rehabilitación / Fisioterapia", "—", "✓", "✓", "—"],
  ["Responsabilidad Civil", "Hasta 150.000 €", "Hasta 200.000 €", "Hasta 200.000 €", "Hasta 300.000 €"],
];

export const Route = createFileRoute("/coberturas")({
  head: () => ({
    meta: [
      { title: "Coberturas KIVO — Comparativa completa de planes" },
      { name: "description", content: "Compara las coberturas de KIVO CARE, CARE+, PREMIUM y R.C. en una sola tabla." },
      { property: "og:title", content: "Coberturas KIVO — Comparativa completa de planes" },
      { property: "og:description", content: "Tabla comparativa de coberturas, límites y reembolsos de los planes KIVO." },
      { property: "og:url", content: "https://hola-kind-sparkle.lovable.app/coberturas" },
    ],
    links: [{ rel: "canonical", href: "https://hola-kind-sparkle.lovable.app/coberturas" }],
  }),
  component: CoberturasPage,
});

function CoberturasPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="COBERTURAS"
        title={<>Comparativa de <span className="text-primary">planes KIVO</span></>}
        subtitle="Todas las coberturas y límites de KIVO CARE, CARE+, PREMIUM y R.C. en una sola tabla."
      />
      <Section>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left">
            <thead className="bg-muted/60">
              <tr>
                <th className="py-4 px-5 font-bold text-secondary text-xs uppercase tracking-wider">Comparativa de coberturas</th>
                {headers.map((h) => (
                  <th key={h} className="py-4 px-4 font-bold text-secondary text-center text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[0]} className={`border-t border-border ${i % 2 ? "bg-muted/20" : ""}`}>
                  <th className="py-3.5 px-5 font-semibold text-secondary text-sm text-left">{r[0]}</th>
                  {r.slice(1).map((v, j) => (
                    <td key={j} className="py-3.5 px-4 text-center text-sm text-secondary/85">
                      {v === "✓" ? <Check className="h-5 w-5 text-primary mx-auto" />
                        : v === "—" ? <span className="text-secondary/30">—</span>
                        : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-xl font-extrabold text-secondary">Elige tu plan</h3>
          <p className="text-sm text-secondary/80 mt-2">Descubre las coberturas completas de cada uno.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { to: "/seguros/care", label: "KIVO CARE" },
              { to: "/seguros/care-plus", label: "KIVO CARE+" },
              { to: "/seguros/premium", label: "KIVO PREMIUM" },
              { to: "/seguros/rc", label: "KIVO R.C." },
            ].map((p) => (
              <Link
                key={p.to}
                to={p.to as "/seguros/care"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white hover:bg-primary/90"
              >
                {p.label} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
