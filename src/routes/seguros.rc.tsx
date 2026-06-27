import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "rc",
  name: "R.C.",
  title: "KIVO R.C. — Responsabilidad Civil",
  subtitle: "Protección frente a daños a terceros causados por tu mascota.",
  pct: "RC",
  description:
    "El seguro de Responsabilidad Civil de KIVO cubre los daños causados por tu mascota a terceros, con defensa jurídica incluida y cumplimiento de las obligaciones legales para perros y gatos.",
  coberturas: [
    "Cobertura de daños a terceros",
    "Defensa jurídica",
    "Protección frente a reclamaciones",
    "Cumplimiento de obligaciones legales",
  ],
  limites: [
    { label: "Responsabilidad Civil", value: "Hasta 300.000 €" },
    { label: "Defensa jurídica", value: "Incluida" },
  ],
};

const URL = "https://hola-kind-sparkle.lovable.app/seguros/rc";

export const Route = createFileRoute("/seguros/rc")({
  head: () => ({
    meta: [
      { title: "KIVO R.C. — Responsabilidad Civil para perros y gatos" },
      { name: "description", content: "Seguro de Responsabilidad Civil de KIVO: hasta 300.000 € y defensa jurídica incluida." },
      { property: "og:title", content: "KIVO R.C. — Responsabilidad Civil para perros y gatos" },
      { property: "og:description", content: "Cobertura R.C. hasta 300.000 € y defensa jurídica incluida." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO R.C.",
        brand: { "@type": "Brand", name: "KIVO" },
        description: data.description,
        category: "Seguro de responsabilidad civil para mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
