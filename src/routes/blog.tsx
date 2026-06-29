import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";
import { ArrowRight } from "lucide-react";

type Cat = "Todos" | "Legislación" | "Salud" | "Cuidados" | "Seguros";
const cats: Cat[] = ["Todos", "Legislación", "Salud", "Cuidados", "Seguros"];

const posts = [
  {
    cat: "Legislación" as Cat,
    emoji: "⚖️",
    title: "Ley 7/2023 de Bienestar Animal: todo lo que debes saber como dueño de un perro o gato",
    excerpt: "La Ley de Bienestar Animal establece nuevas obligaciones para los propietarios de animales de compañía en España: seguro obligatorio de RC, microchip, y restricciones en razas PPP. Te explicamos qué cambia y qué debes hacer.",
    mins: "5 min",
    date: "Junio 2025",
  },
  {
    cat: "Legislación" as Cat,
    emoji: "📋",
    title: "Seguro de Responsabilidad Civil para perros: obligatorio desde 2024",
    excerpt: "Con la entrada en vigor de la Ley 7/2023, todos los propietarios de perros en España están obligados a contratar un seguro de RC. Te explicamos qué cubre, cuánto cuesta y cómo cumplir con la normativa.",
    mins: "4 min",
    date: "Mayo 2025",
  },
  {
    cat: "Salud" as Cat,
    emoji: "🦟",
    title: "Leishmaniosis en perros: síntomas, tratamiento y prevención",
    excerpt: "La leishmaniosis es una enfermedad parasitaria transmitida por la picadura del mosquito flebotomo. En España es endémica en muchas zonas. Aprende a reconocer los síntomas, cómo se trata y qué puedes hacer para prevenirla.",
    mins: "6 min",
    date: "Abril 2025",
  },
  {
    cat: "Salud" as Cat,
    emoji: "🦷",
    title: "Salud dental en perros y gatos: por qué es más importante de lo que crees",
    excerpt: "El 80% de los perros mayores de 3 años tienen algún grado de enfermedad periodontal. La higiene dental no es estética, es salud. Te explicamos cómo cepillar los dientes de tu mascota y qué señales no debes ignorar.",
    mins: "5 min",
    date: "Marzo 2025",
  },
  {
    cat: "Cuidados" as Cat,
    emoji: "🚗",
    title: "Cómo preparar a tu perro para viajar en coche sin estrés",
    excerpt: "El viaje en coche puede ser estresante para muchos perros. Con la preparación adecuada, puedes convertir cada trayecto en una experiencia tranquila. Te damos los consejos clave para que tu perro viaje seguro y relajado.",
    mins: "4 min",
    date: "Febrero 2025",
  },
  {
    cat: "Cuidados" as Cat,
    emoji: "☀️",
    title: "Golpe de calor en mascotas: señales de alarma y qué hacer",
    excerpt: "Los golpes de calor son una emergencia veterinaria. En verano, el riesgo aumenta especialmente en razas braquicéfalas (bulldog, pug, shih tzu). Aprende a reconocer los síntomas y actuar rápido antes de llegar al veterinario.",
    mins: "3 min",
    date: "Enero 2025",
  },
  {
    cat: "Seguros" as Cat,
    emoji: "🛡️",
    title: "¿Por qué contratar un seguro para tu mascota? 5 razones que no te esperabas",
    excerpt: "Una operación de urgencias puede costar entre 1.500 € y 5.000 €. Un proceso oncológico, mucho más. El seguro de mascotas no es un gasto extra: es la diferencia entre poder dar a tu compañero el mejor tratamiento o tener que elegir.",
    mins: "4 min",
    date: "Diciembre 2024",
  },
  {
    cat: "Seguros" as Cat,
    emoji: "📊",
    title: "CARE vs CARE+ vs PREMIUM: ¿qué plan KIVO te conviene más?",
    excerpt: "Los tres planes cubren accidentes, enfermedades y R.C., pero difieren en el porcentaje de reembolso, el límite anual y las coberturas adicionales. Esta guía te ayuda a elegir el que mejor se adapta a tu mascota y tu bolsillo.",
    mins: "5 min",
    date: "Noviembre 2024",
  },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog KIVO — Legislación, salud, cuidados y seguros de mascotas" },
      { name: "description", content: "Artículos sobre legislación, salud, cuidados y seguros para perros y gatos. Ley 7/2023, leishmaniosis, RC obligatoria y más." },
      { property: "og:title", content: "Blog KIVO — Legislación, salud, cuidados y seguros de mascotas" },
      { property: "og:url", content: "https://kivoseguros.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const [active, setActive] = useState<Cat>("Todos");
  const filtered = active === "Todos" ? posts : posts.filter(p => p.cat === active);
  return (
    <SiteLayout>
      <PageHero
        eyebrow="BLOG KIVO"
        title={<>Consejos, legislación y <span className="text-primary">cuidados</span></>}
        subtitle="Todo lo que necesitas saber para cuidar mejor a tu compañero de vida."
      />
      <Section>
        <div className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                active === c
                  ? "bg-[#1B2A4A] text-white border-[#1B2A4A]"
                  : "border-[#1B2A4A]/15 text-[#1B2A4A]/60 hover:border-[#3DBFA0] hover:text-[#3DBFA0]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.title} className="rounded-2xl border border-[#1B2A4A]/8 bg-white p-6 shadow-sm flex flex-col hover:shadow-md transition">
              <div className="text-4xl mb-4">{p.emoji}</div>
              <span className="text-[10px] font-bold tracking-widest text-[#3DBFA0] uppercase mb-2">{p.cat}</span>
              <h2 className="font-extrabold text-[#1B2A4A] text-base leading-snug mb-3">{p.title}</h2>
              <p className="text-sm text-[#1B2A4A]/65 leading-relaxed flex-1">{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-[#1B2A4A]/40">
                <span>{p.date} · {p.mins} de lectura</span>
                <span className="text-[#3DBFA0] font-semibold flex items-center gap-1">
                  Leer <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
