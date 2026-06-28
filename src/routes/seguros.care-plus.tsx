import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "care-plus",
  name: "CARE+",
  title: "KIVO CARE+ — protección ampliada",
  subtitle: "90% de reembolso · Límite anual 4.000 € · R.C. hasta 250.000 €",
  pct: "90%",
  description:
    "KIVO CARE+ amplía las coberturas del plan CARE con un reembolso del 90% y un límite anual de 4.000 €, ideal para quien quiere mayor tranquilidad sin llegar al tope premium. Ref: IPID-KIVO-CARE-PLUS-2026.",
  coberturas: [
    "Consultas y visitas veterinarias (90% de reembolso)",
    "Hospitalización, cirugía y anestesia (90%)",
    "Diagnóstico: análisis, radiografías, ecografías, resonancias (90%)",
    "Oncología: quimioterapia, radioterapia, inmunoterapia (90%, sublímite 2.500 €/proceso)",
    "Urgencias veterinarias 24h (90%)",
    "Fisioterapia y rehabilitación: hasta 9 sesiones/año (90%)",
    "Vacunación obligatoria y recomendada: 100% sin carencia (hasta 250 €/año)",
    "Tartrectomía: cubierta a partir del 2.º año de vigencia",
    "Teleconsulta veterinaria con veterinario colegiado",
    "Responsabilidad Civil — R.C. ESENCIAL: hasta 250.000 € por siniestro",
  ],
  limites: [
    { label: "Reembolso gastos veterinarios", value: "90%" },
    { label: "Límite anual de reembolso", value: "4.000 €" },
    { label: "Sublímite por proceso", value: "2.500 €" },
    { label: "Responsabilidad Civil", value: "Hasta 250.000 €" },
    { label: "Vacunación anual", value: "Hasta 250 €" },
    { label: "Carencia accidentes", value: "5 días" },
    { label: "Carencia enfermedades", value: "28 días" },
  ],
};

const URL = "https://kivoseguros.com/seguros/care-plus";

export const Route = createFileRoute("/seguros/care-plus")({
  head: () => ({
    meta: [
      { title: "KIVO CARE+ — Seguro de mascotas ampliado | 90% reembolso" },
      { name: "description", content: "KIVO CARE+: 90% de reembolso, límite anual 4.000 €, vacunación incluida y R.C. hasta 250.000 €. Cobertura para perros y gatos." },
      { property: "og:title", content: "KIVO CARE+ — Protección ampliada para tu mascota" },
      { property: "og:description", content: "90% de reembolso, límite 4.000 €/año y R.C. hasta 250.000 €." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO CARE+",
        brand: { "@type": "Brand", name: "KIVO Seguros" },
        description: data.description,
        category: "Seguro de mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
