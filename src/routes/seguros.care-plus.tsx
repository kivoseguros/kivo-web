import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "care-plus",
  name: "CARE+",
  title: "KIVO CARE+ — más cobertura, más tranquilidad",
  subtitle: "El plan más elegido: equilibrio entre cobertura y precio.",
  pct: "90%",
  description:
    "KIVO CARE+ amplía las coberturas de KIVO CARE con límites anuales más altos, más pruebas y tratamientos, y rehabilitación y fisioterapia.",
  coberturas: [
    "Todo lo incluido en KIVO CARE",
    "Límites anuales más altos",
    "Más pruebas y tratamientos",
    "Rehabilitación y fisioterapia",
    "Responsabilidad Civil",
  ],
  limites: [
    { label: "Reembolsos en gastos veterinarios", value: "90%" },
    { label: "Límite anual por mascota", value: "2.500 €" },
    { label: "Responsabilidad Civil", value: "Hasta 200.000 €" },
  ],
};

const URL = "https://hola-kind-sparkle.lovable.app/seguros/care-plus";

export const Route = createFileRoute("/seguros/care-plus")({
  head: () => ({
    meta: [
      { title: "KIVO CARE+ — Más cobertura, más tranquilidad" },
      { name: "description", content: "KIVO CARE+: 90% de reembolso, 2.500 € anuales, fisioterapia y rehabilitación." },
      { property: "og:title", content: "KIVO CARE+ — Más cobertura, más tranquilidad" },
      { property: "og:description", content: "90% de reembolso, 2.500 € anuales, fisioterapia y rehabilitación." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO CARE+",
        brand: { "@type": "Brand", name: "KIVO" },
        description: data.description,
        category: "Seguro de mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
