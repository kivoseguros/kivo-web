import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "care",
  name: "CARE",
  title: "KIVO CARE — la protección esencial",
  subtitle: "80% de reembolso · Límite anual 3.500 € · R.C. hasta 200.000 €",
  pct: "80%",
  description:
    "KIVO CARE cubre accidentes, enfermedades y Responsabilidad Civil para perros y gatos domésticos. Reembolso del 80% de los gastos veterinarios cubiertos, con un límite anual de 3.500 €. Ref: IPID-KIVO-CARE-2026.",
  coberturas: [
    "Consultas y visitas veterinarias (80% de reembolso)",
    "Hospitalización, cirugía y anestesia (80%)",
    "Diagnóstico: análisis, radiografías, ecografías, resonancias (80%)",
    "Oncología: quimioterapia, radioterapia, inmunoterapia (80%, sublímite 2.500 €/proceso)",
    "Urgencias veterinarias 24h (80%)",
    "Fisioterapia y rehabilitación: hasta 9 sesiones/año (80%)",
    "Vacunación obligatoria y recomendada: 100% sin carencia (hasta 250 €/año)",
    "Tartrectomía: cubierta a partir del 2.º año de vigencia",
    "Teleconsulta veterinaria con veterinario colegiado",
    "Responsabilidad Civil — R.C. ESENCIAL: hasta 200.000 € por siniestro",
  ],
  limites: [
    { label: "Reembolso gastos veterinarios", value: "80%" },
    { label: "Límite anual de reembolso", value: "3.500 €" },
    { label: "Sublímite por proceso", value: "2.500 €" },
    { label: "Responsabilidad Civil", value: "Hasta 200.000 €" },
    { label: "Vacunación anual", value: "Hasta 250 €" },
    { label: "Carencia accidentes", value: "5 días" },
    { label: "Carencia enfermedades", value: "28 días" },
  ],
};

const URL = "https://kivoseguros.com/seguros/care";

export const Route = createFileRoute("/seguros/care")({
  head: () => ({
    meta: [
      { title: "KIVO CARE — Seguro de mascotas esencial | 80% reembolso" },
      { name: "description", content: "KIVO CARE: 80% de reembolso, límite anual 3.500 €, vacunación incluida y R.C. hasta 200.000 €. Cobertura para perros y gatos." },
      { property: "og:title", content: "KIVO CARE — La protección esencial para tu mascota" },
      { property: "og:description", content: "80% de reembolso, límite 3.500 €/año y R.C. hasta 200.000 €." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO CARE",
        brand: { "@type": "Brand", name: "KIVO Seguros" },
        description: data.description,
        category: "Seguro de mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
