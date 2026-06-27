import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

export const Route = createFileRoute("/sobre-kivo")({
  head: () => ({
    meta: [
      { title: "Sobre KIVO — Correduría digital de seguros para mascotas" },
      { name: "description", content: "Conoce a KIVO, correduría digital especializada en seguros para perros y gatos." },
      { property: "og:title", content: "Sobre KIVO — Correduría digital de seguros para mascotas" },
      { property: "og:description", content: "Correduría digital especializada en seguros para perros y gatos." },
      { property: "og:url", content: "https://hola-kind-sparkle.lovable.app/sobre-kivo" },
    ],
    links: [{ rel: "canonical", href: "https://hola-kind-sparkle.lovable.app/sobre-kivo" }],
  }),
  component: Sobre,
});

function Placeholder({ text = "Contenido en desarrollo." }: { text?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-secondary/70 italic">
      {text}
    </div>
  );
}

function Sobre() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="SOBRE KIVO"
        title={<>Correduría digital de <span className="text-primary">seguros para mascotas.</span></>}
        subtitle="KIVO es una correduría digital especializada en seguros para perros y gatos."
      />

      <Section title="Historia">
        <Placeholder />
      </Section>

      <Section title="Qué significa KIVO">
        <Placeholder />
      </Section>

      <Section title="Equipo">
        <Placeholder />
      </Section>

      <Section title="Socio asegurador">
        <Placeholder text="Información pendiente de definición." />
      </Section>
    </SiteLayout>
  );
}
