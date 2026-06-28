import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

type Cat = "Contratación" | "Coberturas" | "Reembolsos" | "Carencias" | "R.C.";
const cats: Cat[] = ["Contratación", "Coberturas", "Reembolsos", "Carencias", "R.C."];

const faqs: Record<Cat, { q: string; a: string }[]> = {
  "Contratación": [
    { q: "¿Qué edad debe tener mi mascota para contratar?", a: "Para perros, la edad mínima es 2 meses y la máxima 11 años en la fecha de efecto. Para gatos, de 2 meses a 10 años. Si tu mascota supera la edad máxima, no podrá contratarse un nuevo seguro KIVO, aunque las pólizas vigentes se renuevan anualmente sin límite de edad." },
    { q: "¿Necesito el número de microchip para contratar?", a: "Sí, el microchip es obligatorio para formalizar la póliza. Si tu mascota aún no lo tiene (por ejemplo cachorros menores de 3-4 meses), puedes marcarlo como 'pendiente' durante la contratación y aportarlo antes de la fecha de efecto." },
    { q: "¿Puedo contratar si mi perro es mestizo?", a: "Sí, KIVO asegura tanto perros de raza pura como mestizos. Para mestizos, la tarificación se realiza por tramo de peso." },
    { q: "¿Qué razas quedan excluidas?", a: "Los perros clasificados como Potencialmente Peligrosos según el RD 287/2002 no pueden asegurarse: Pit Bull Terrier, Staffordshire Bull Terrier, American Staffordshire Terrier, Rottweiler, Dogo Argentino, Fila Brasileño, Tosa Inu y Akita Inu." },
    { q: "¿Puedo contratar si mi perro es de caza?", a: "No. Los perros utilizados para actividades de caza quedan excluidos de la cobertura KIVO. El seguro está diseñado exclusivamente para mascotas domésticas." },
    { q: "¿Cómo se paga el seguro?", a: "Puedes pagar con tarjeta (Visa o Mastercard) o mediante transferencia bancaria. El importe se fracciona en cuotas mensuales o puede abonarse anualmente." },
    { q: "¿Puedo cancelar en cualquier momento?", a: "Sí. El tomador puede resolver el contrato con un preaviso de 30 días antes del vencimiento anual, según lo establecido en el Condicionado General." },
  ],
  "Coberturas": [
    { q: "¿Qué diferencia hay entre CARE, CARE+ y PREMIUM?", a: "Los tres planes cubren accidentes, enfermedades y R.C., pero difieren en el porcentaje de reembolso y el límite anual: CARE (80%, 3.500 €), CARE+ (90%, 4.000 €) y PREMIUM (100% sin copago, 5.000 €)." },
    { q: "¿La vacunación está cubierta?", a: "Sí, en todos los planes. KIVO cubre el 100% de los gastos de vacunación obligatoria y recomendada, hasta 250 €/año, sin período de carencia." },
    { q: "¿Se cubre la oncología?", a: "Sí. Los tres planes cubren quimioterapia, radioterapia e inmunoterapia. El sublímite por proceso es de 2.500 € en CARE y CARE+, y de 3.500 € en PREMIUM (en centros veterinarios de referencia acreditados)." },
    { q: "¿Se cubre la fisioterapia y rehabilitación?", a: "Sí, hasta 9 sesiones por año en los tres planes." },
    { q: "¿Está cubierta la tartrectomía (limpieza dental)?", a: "En CARE y CARE+ la tartrectomía se cubre a partir del segundo año de vigencia de la póliza. En PREMIUM, desde el primer año para animales mayores de 3 años, hasta 200 €/año." },
    { q: "¿Qué es la teleconsulta veterinaria?", a: "Es una videollamada o llamada con un veterinario colegiado, sin necesidad de desplazamiento. Está incluida en los tres planes sin coste adicional." },
    { q: "¿Se cubren enfermedades preexistentes?", a: "No. Las enfermedades o accidentes previos a la fecha de contratación quedan excluidos, así como las patologías congénitas o hereditarias." },
    { q: "¿Se cubre la esterilización?", a: "No. La esterilización electiva, la gestación y el parto quedan fuera de la cobertura." },
  ],
  "Reembolsos": [
    { q: "¿Cómo solicito un reembolso?", a: "A través de la app KIVO: fotografías la factura veterinaria con el OCR integrado, adjuntas el informe médico si lo tienes, y envías la solicitud. Recibirás respuesta en un plazo máximo de 10 días hábiles." },
    { q: "¿Qué documentos necesito para pedir un reembolso?", a: "Factura original del veterinario con desglose de conceptos, diagnóstico o informe médico (si lo solicita el gestor), y los datos bancarios donde quieres recibir el abono." },
    { q: "¿Cuánto tarda en llegar el reembolso?", a: "Una vez aprobada la solicitud, el abono se realiza en un plazo máximo de 5 días hábiles por transferencia bancaria." },
    { q: "¿Hay un límite por cada visita o proceso?", a: "Sí. Además del límite anual (3.500 € / 4.000 € / 5.000 € según plan), existe un sublímite por proceso de 2.500 € en CARE y CARE+, y de 3.500 € para oncología en PREMIUM." },
    { q: "¿Puedo ir a cualquier veterinario?", a: "Sí. KIVO funciona con libertad de elección de veterinario. Puedes acudir a cualquier clínica veterinaria colegiada en España y pedir el reembolso posteriormente." },
  ],
  "Carencias": [
    { q: "¿Qué es un período de carencia?", a: "Es el tiempo desde la fecha de efecto de la póliza durante el cual no se cubren determinadas contingencias. Sirve para evitar la contratación oportunista justo antes de un siniestro ya conocido." },
    { q: "¿Cuáles son las carencias de KIVO?", a: "Accidentes: 5 días. Enfermedades comunes: 28 días. Cirugía compleja, oncología, epilepsia, dermatología/atopia y leishmaniosis: 6 meses desde la fecha de efecto." },
    { q: "¿La vacunación tiene carencia?", a: "No. La cobertura de vacunación es efectiva desde el primer día, sin período de carencia." },
    { q: "¿Se aplican carencias en la renovación?", a: "No. Las carencias solo se aplican en la contratación inicial. En renovaciones anuales sin interrupción de cobertura, no se vuelven a aplicar." },
  ],
  "R.C.": [
    { q: "¿Qué es la Responsabilidad Civil incluida en los planes?", a: "Es la cobertura que indemniza a terceros por daños corporales o materiales causados involuntariamente por tu mascota. Está incluida en todos los planes A&E: R.C. ESENCIAL hasta 200.000 € en CARE, 250.000 € en CARE+, y R.C. TOTAL hasta 300.000 € en PREMIUM." },
    { q: "¿Es obligatoria la R.C. para perros?", a: "Sí. La Ley 7/2023 de protección de los animales de compañía establece la obligatoriedad de un seguro de Responsabilidad Civil para perros. KIVO la incluye en todos sus planes." },
    { q: "¿Qué cubre el plan R.C. ESENCIAL independiente?", a: "El plan R.C. ESENCIAL (contratado de forma independiente, sin cobertura A&E) cubre daños corporales y materiales causados a terceros, defensa jurídica incluida, hasta 150.000 € por siniestro. Referencia: CG-KIVO-RC-2026." },
    { q: "¿La R.C. cubre daños causados a otros animales?", a: "Sí, siempre que el daño sea a un tercero (persona o animal ajeno). Los daños entre animales asegurados en la misma póliza quedan excluidos." },
    { q: "¿La defensa jurídica está incluida?", a: "Sí, en todos los planes que incluyen R.C. La defensa jurídica frente a reclamaciones de terceros está incluida sin coste adicional." },
  ],
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ KIVO — Preguntas frecuentes sobre seguros de mascotas" },
      { name: "description", content: "Resolvemos tus dudas sobre contratación, coberturas, reembolsos, carencias y Responsabilidad Civil de KIVO Seguros." },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/faq" }],
  }),
  component: FAQPage,
});

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1B2A4A]/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-[#1B2A4A] text-sm leading-snug">{q}</span>
        <ChevronDown className={"h-4 w-4 text-[#3DBFA0] shrink-0 transition-transform duration-200 " + (open ? "rotate-180" : "")} />
      </button>
      {open && (
        <p className="pb-5 text-sm text-[#1B2A4A]/70 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function FAQPage() {
  const [active, setActive] = useState<Cat>("Contratación");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQ"
        title={<>Preguntas <span className="text-primary">frecuentes</span></>}
        subtitle="Todo lo que necesitas saber sobre contratación, coberturas, reembolsos, carencias y R.C."
      />
      <Section>
        <div className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={"px-4 py-2 rounded-full text-sm font-semibold border transition-all " +
                (active === c
                  ? "bg-[#1B2A4A] text-white border-[#1B2A4A]"
                  : "border-[#1B2A4A]/15 text-[#1B2A4A]/60 hover:border-[#3DBFA0] hover:text-[#3DBFA0]")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-[#1B2A4A]/8 shadow-sm px-6">
          {faqs[active].map((item) => (
            <Item key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-[#1B2A4A]/50">
          ¿No encuentras tu respuesta?{" "}
          <a href="mailto:hola@kivoseguros.com" className="text-[#3DBFA0] font-semibold hover:underline">
            Escríbenos a hola@kivoseguros.com
          </a>
        </p>
      </Section>
    </SiteLayout>
  );
}
