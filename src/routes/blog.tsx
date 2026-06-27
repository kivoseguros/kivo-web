import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

type Cat = "Todos" | "Legislación" | "Salud" | "Cuidados" | "Seguros";
const cats: Cat[] = ["Todos", "Legislación", "Salud", "Cuidados", "Seguros"];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog KIVO — Legislación, salud, cuidados y seguros" },
      { name: "description", content: "Blog de KIVO con artículos sobre legislación, salud, cuidados y seguros para perros y gatos." },
      { property: "og:title", content: "Blog KIVO — Legislación, salud, cuidados y seguros" },
      { property: "og:description", content: "Artículos sobre legislación, salud, cuidados y seguros para mascotas." },
      { property: "og:url", content: "https://hola-kind-sparkle.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://hola-kind-sparkle.lovable.app/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const [active, setActive] = useState<Cat>("Todos");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="BLOG"
        title={<>Blog <span className="text-primary">KIVO</span></>}
        subtitle="Categorías: Legislación, Salud, Cuidados y Seguros. Contenido en desarrollo."
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
          Estamos preparando los primeros artículos de la categoría{" "}
          <strong className="not-italic text-secondary">{active}</strong>.
        </div>
      </Section>
    </SiteLayout>
  );
}
