import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

type Cat = "Contratación" | "Coberturas" | "Reembolsos" | "APP" | "R.C.";
const cats: Cat[] = ["Contratación", "Coberturas", "Reembolsos", "APP", "R.C."];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ KIVO — Preguntas frecuentes sobre seguros de mascotas" },
      { name: "description", content: "Resolvemos tus dudas sobre contratación, coberturas, reembolsos, App y Responsabilidad Civil de KIVO." },
      { property: "og:title", content: "FAQ KIVO — Preguntas frecuentes sobre seguros de mascotas" },
      { property: "og:description", content: "Dudas sobre contratación, coberturas, reembolsos, App y R.C. de KIVO." },
      { property: "og:url", content: "https://hola-kind-sparkle.lovable.app/faq" },
    ],
    links: [{ rel: "canonical", href: "https://hola-kind-sparkle.lovable.app/faq" }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [active, setActive] = useState<Cat>("Contratación");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQ"
        title={<>Preguntas <span className="text-primary">frecuentes</span></>}
        subtitle="Categorías: Contratación, Coberturas, Reembolsos, APP y R.C. Contenido en desarrollo."
      />
      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                active === c
                  ? "bg-secondary text-white border-secondary"
                  : "border-border text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-secondary/70 italic">
          Próximamente disponible.
          <br />
          Preguntas y respuestas de <strong className="not-italic text-secondary">{active}</strong> en
          desarrollo.
        </div>
      </Section>
    </SiteLayout>
  );
}
