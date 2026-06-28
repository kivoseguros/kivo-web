import { createFileRoute } from "@tanstack/react-router";
import { PlanPage, type PlanData } from "@/components/site/PlanPage";

const data: PlanData = {
  slug: "premium",
  name: "PREMIUM",
  title: "KIVO PREMIUM — cobertura total",
  subtitle: "100% de reembolso · Sin copago · Límite anual 5.000 € · R.C. hasta 300.000 €",
  pct: "100%",
  description:
    "KIVO PREMIUM es la cobertura máxima: reembolso del 100% sin copago, límite anual de 5.000 € y R.C. TOTAL hasta 300.000 €. Oncología con sublímite de 3.500 € en centros acreditados. Ref: IPID-KIVO-PREMIUM-2026.",
  coberturas: [
    "Consultas y visitas veterinarias (100% de reembolso, sin copago)",
    "Hospitalización, cirugía y anestesia (100%)",
    "Diagnóstico: análisis, radiografías, ecografías, resonancias (100%)",
    "Oncología: quimioterapia, radioterapia, inmunoterapia (100%, sublímite 3.500 €/proceso en centros acreditados)",
    "Urgencias veterinarias 24h (100%)",
    "Fisioterapia y rehabilitación: hasta 9 sesiones/año (100%)",
    "Vacunación obligatoria y recomendada: 100% sin carencia (hasta 250 €/año)",
    "Tartrectomía desde el 1.er año de vigencia (animales >3 años, hasta 200 €/año)",
    "Teleconsulta veterinaria con veterinario colegiado",
    "Responsabilidad Civil — R.C. TOTAL: hasta 300.000 € por siniestro",
  ],
  limites: [
    { label: "Reembolso gastos veterinarios", value: "100% (sin copago)" },
    { label: "Límite anual de reembolso", value: "5.000 €" },
    { label: "Sublímite oncología por proceso", value: "3.500 €" },
    { label: "Responsabilidad Civil", value: "Hasta 300.000 €" },
    { label: "Vacunación anual", value: "Hasta 250 €" },
    { label: "Tartrectomía anual", value: "Hasta 200 € (desde 1.er año)" },
    { label: "Carencia accidentes", value: "5 días" },
    { label: "Carencia enfermedades", value: "28 días" },
  ],
};

const URL = "https://kivoseguros.com/seguros/premium";

export const Route = createFileRoute("/seguros/premium")({
  head: () => ({
    meta: [
      { title: "KIVO PREMIUM — Seguro de mascotas total | 100% reembolso" },
      { name: "description", content: "KIVO PREMIUM: 100% de reembolso sin copago, límite anual 5.000 € y R.C. hasta 300.000 €. La cobertura máxima para tu mascota." },
      { property: "og:title", content: "KIVO PREMIUM — Cobertura total para tu mascota" },
      { property: "og:description", content: "100% de reembolso sin copago, límite 5.000 €/año y R.C. hasta 300.000 €." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KIVO PREMIUM",
        brand: { "@type": "Brand", name: "KIVO Seguros" },
        description: data.description,
        category: "Seguro de mascotas",
        url: URL,
      }),
    }],
  }),
  component: () => <PlanPage plan={data} />,
});
