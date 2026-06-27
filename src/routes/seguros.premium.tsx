import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "premium",
  name: "PREMIUM",
  title: "KIVO PREMIUM — la máxima protección",
  subtitle: "El plan más completo: reembolso del 100% y sin límites por accidente.",
  pct: "100%",
  description:
    "KIVO PREMIUM reembolsa el 100% de los gastos veterinarios, sin límites por accidente, con las coberturas más completas y la Responsabilidad Civil ampliada.",
  coberturas: [
    "Todo lo incluido en KIVO CARE+",
    "Reembolso del 100%",
    "Sin límites por accidente",
    "Coberturas más completas",
    "Responsabilidad Civil ampliada",
  ],
  limites: [
    { label: "Reembolsos en gastos veterinarios", value: "100%" },
    { label: "Límite anual por mascota", value: "Sin límite por accidente" },
    { label: "Responsabilidad Civil", value: "Hasta 200.000 €" },
  ],
};

const URL = "https://hola-kind-sparkle.lovable.app/seguros/premium";

export const Route = createFileRoute("/seguros/premium")({
  head: () => ({
    meta: [
      { title: "KIVO PREMIUM — Máxima protección para tu mascota" },
      { name: "description", content: "KIVO PREMIUM: 100% de reembolso, sin límites por accidente y Responsabilidad Civil ampliada." },
      { property: "og:title", content: "KIVO PREMIUM — Máxima protección para tu mascota" },
      { property: "og:description", content: "100% de reembolso, sin límites por accidente y R.C. ampliada." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO PREMIUM",
        brand: { "@type": "Brand", name: "KIVO" },
        description: data.description,
        category: "Seguro de mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
