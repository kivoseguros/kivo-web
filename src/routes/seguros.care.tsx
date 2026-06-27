import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "care",
  name: "CARE",
  title: "KIVO CARE — la protección esencial",
  subtitle: "El plan de entrada con las coberturas imprescindibles para tu perro o gato.",
  pct: "80%",
  description:
    "KIVO CARE incluye las coberturas principales para que tu mascota esté protegida ante accidentes y enfermedades, con el respaldo de la Responsabilidad Civil.",
  coberturas: [
    "Accidentes y enfermedades",
    "Cirugías",
    "Pruebas diagnósticas",
    "Medicamentos",
    "Responsabilidad Civil",
  ],
  limites: [
    { label: "Reembolsos en gastos veterinarios", value: "80%" },
    { label: "Límite anual por mascota", value: "1.500 €" },
    { label: "Responsabilidad Civil", value: "Hasta 150.000 €" },
  ],
};

const URL = "https://hola-kind-sparkle.lovable.app/seguros/care";

export const Route = createFileRoute("/seguros/care")({
  head: () => ({
    meta: [
      { title: "KIVO CARE — La protección esencial para tu mascota" },
      { name: "description", content: "KIVO CARE: 80% de reembolso, coberturas esenciales y Responsabilidad Civil hasta 150.000 €." },
      { property: "og:title", content: "KIVO CARE — La protección esencial para tu mascota" },
      { property: "og:description", content: "80% de reembolso, coberturas esenciales y R.C. hasta 150.000 €." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO CARE",
        brand: { "@type": "Brand", name: "KIVO" },
        description: data.description,
        category: "Seguro de mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
