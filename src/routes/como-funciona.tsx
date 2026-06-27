import { createFileRoute } from "@tanstack/react-router";
import { FileSignature, Receipt, Smartphone } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

const blocks = [
  { Icon: FileSignature, title: "Contratación" },
  { Icon: Receipt, title: "Reembolsos" },
  { Icon: Smartphone, title: "Uso de la App" },
];

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Cómo funciona KIVO — Contratación, reembolsos y App" },
      { name: "description", content: "Cómo funciona KIVO: contratación online, reembolsos rápidos y gestión desde la App." },
      { property: "og:title", content: "Cómo funciona KIVO — Contratación, reembolsos y App" },
      { property: "og:description", content: "Contratación online, reembolsos rápidos y gestión desde la App de KIVO." },
      { property: "og:url", content: "https://hola-kind-sparkle.lovable.app/como-funciona" },
    ],
    links: [{ rel: "canonical", href: "https://hola-kind-sparkle.lovable.app/como-funciona" }],
  }),
  component: ComoFunciona,
});

function ComoFunciona() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="CÓMO FUNCIONA"
        title={<>Cómo funciona <span className="text-primary">KIVO</span></>}
        subtitle="Contratación, reembolsos y uso de la App. Contenido en desarrollo."
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-7">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <b.Icon className="h-6 w-6" />
              </div>
              <h2 className="font-extrabold text-secondary text-xl mt-4">{b.title}</h2>
              <p className="mt-3 text-sm text-secondary/60 italic">
                Información pendiente de definición.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
