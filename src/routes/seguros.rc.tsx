import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "rc",
  name: "R.C. ESENCIAL",
  title: "KIVO R.C. ESENCIAL — Responsabilidad Civil",
  subtitle: "Cobertura obligatoria · R.C. hasta 150.000 € · Defensa jurídica incluida",
  pct: "RC",
  description:
    "El plan R.C. ESENCIAL de KIVO cubre exclusivamente la Responsabilidad Civil por daños a terceros causados por tu mascota, cumpliendo con la Ley 7/2023 de protección animal. Defensa jurídica incluida. Ref: CG-KIVO-RC-2026.",
  coberturas: [
    "Daños corporales y materiales causados a terceros por tu mascota",
    "Defensa jurídica ante reclamaciones de terceros",
    "Cumplimiento de la obligación legal de R.C. (Ley 7/2023)",
    "Siniestro único por evento en cadena",
    "Ámbito territorial: España",
  ],
  limites: [
    { label: "Responsabilidad Civil por siniestro", value: "Hasta 150.000 €" },
    { label: "Defensa jurídica", value: "Incluida" },
    { label: "Ámbito territorial", value: "España" },
    { label: "IPID definitivo", value: "Próximamente" },
  ],
};

const URL = "https://kivoseguros.com/seguros/rc";

export const Route = createFileRoute("/seguros/rc")({
  head: () => ({
    meta: [
      { title: "KIVO R.C. ESENCIAL — Responsabilidad Civil para mascotas" },
      { name: "description", content: "Seguro de Responsabilidad Civil de KIVO: hasta 150.000 € y defensa jurídica incluida. Cumple con la Ley 7/2023." },
      { property: "og:title", content: "KIVO R.C. ESENCIAL — Responsabilidad Civil para mascotas" },
      { property: "og:description", content: "R.C. hasta 150.000 € y defensa jurídica incluida. Ley 7/2023." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO R.C. ESENCIAL",
        brand: { "@type": "Brand", name: "KIVO Seguros" },
        description: data.description,
        category: "Seguro de responsabilidad civil para mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
