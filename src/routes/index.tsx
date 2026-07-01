import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, FileText, Send, Clock, Wallet, Star, Check, CheckCircle2,
  ShieldCheck, Scale, Heart, FileCheck, Users, Smartphone, Zap, Stethoscope,
  PawPrint,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroPets from "@/assets/hero-pets.jpg.asset.json";
import blog1 from "@/assets/blog1.jpg.asset.json";
import blog2 from "@/assets/blog2.jpg.asset.json";
import blog3 from "@/assets/blog3.jpg.asset.json";
import blog4 from "@/assets/blog4.jpg.asset.json";
import avatar1 from "@/assets/avatar1.jpg.asset.json";
import avatar2 from "@/assets/avatar2.jpg.asset.json";
import avatar3 from "@/assets/avatar3.jpg.asset.json";

const SOCIAL_IMG = "https://storage.googleapis.com/gpt-engineer-file-uploads/8jV2Ln37joP0RXHmlU5QCZ4ja843/social-images/social-1781207839091-ChatGPT_Image_11_jun_2026,_15_59_24.webp";
const URL_HOME = "https://hola-kind-sparkle.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KIVO — Correduría digital de seguros para perros y gatos" },
      { name: "description", content: "KIVO, correduría digital de seguros para mascotas. Contrata desde la App y recibe tus reembolsos en 24/48h en los casos simples." },
      { property: "og:title", content: "KIVO — Correduría digital de seguros para perros y gatos" },
      { property: "og:description", content: "Seguros para perros y gatos fáciles de contratar y rápidos de cobrar. Reembolsos en 24/48h en casos simples." },
      { property: "og:url", content: URL_HOME },
      { property: "og:image", content: SOCIAL_IMG },
      { name: "twitter:image", content: SOCIAL_IMG },
    ],
    links: [
      { rel: "canonical", href: URL_HOME },
      { rel: "preload", as: "image", href: heroPets.url, fetchpriority: "high" },
    ],
  }),
  component: Home,
});

/* ── SVG illustration: perro + gato ── */
function DogCatSVG() {
  return (
    <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* heart */}
      <path d="M110 52 C110 52 98 38 88 38 C75 38 68 48 68 58 C68 75 85 88 110 105 C135 88 152 75 152 58 C152 48 145 38 132 38 C122 38 110 52 110 52Z" fill="#F47B30" opacity="0.85"/>
      {/* sparkles */}
      <path d="M60 35 L62 28 L64 35 L71 37 L64 39 L62 46 L60 39 L53 37Z" fill="#F47B30" opacity="0.7"/>
      <path d="M155 45 L156.5 40 L158 45 L163 46.5 L158 48 L156.5 53 L155 48 L150 46.5Z" fill="#F47B30" opacity="0.7"/>
      {/* dog head */}
      <ellipse cx="80" cy="115" rx="32" ry="28" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>
      {/* dog ears */}
      <path d="M52 100 C44 88 48 75 58 80 L65 100Z" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M108 100 C116 88 112 75 102 80 L95 100Z" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* dog nose */}
      <ellipse cx="80" cy="118" rx="5" ry="4" fill="#2C1A0E"/>
      {/* dog eyes */}
      <circle cx="68" cy="108" r="3" fill="#2C1A0E"/>
      <circle cx="92" cy="108" r="3" fill="#2C1A0E"/>
      <circle cx="69.5" cy="106.5" r="1" fill="white"/>
      <circle cx="93.5" cy="106.5" r="1" fill="white"/>
      {/* dog smile */}
      <path d="M72 124 Q80 130 88 124" stroke="#2C1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* dog body */}
      <path d="M55 140 L55 170" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M105 140 L105 170" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>
      {/* cat head */}
      <ellipse cx="148" cy="118" rx="26" ry="24" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>
      {/* cat ears */}
      <path d="M126 100 L122 84 L138 96Z" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M170 100 L174 84 L158 96Z" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* cat eyes - happy squint */}
      <path d="M138 113 Q141 110 144 113" stroke="#2C1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M152 113 Q155 110 158 113" stroke="#2C1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* cat nose */}
      <path d="M146 120 L148 118 L150 120 L148 122Z" fill="#2C1A0E"/>
      {/* cat whiskers */}
      <path d="M122 120 L138 120" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M122 124 L138 123" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M158 120 L174 120" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M158 124 L174 123" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
      {/* cat smile */}
      <path d="M143 127 Q148 131 153 127" stroke="#2C1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* cat body */}
      <path d="M128 140 L128 170" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M168 140 L168 170" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

type Plan = {
  name: string;
  to: "/seguros/care" | "/seguros/care-plus" | "/seguros/premium" | "/seguros/rc";
  subtitle: string;
  pct?: string;
  pctLabel?: string;
  rcValue?: string;
  tag?: string | null;
  highlighted?: boolean;
  color: string;
  btnBg: string;
  coberturas: string[];
};

const plans: Plan[] = [
  {
    name: "CARE", to: "/seguros/care",
    subtitle: "La protección esencial",
    pct: "80%", pctLabel: "de reembolso en gastos veterinarios",
    color: "#F47B30", btnBg: "#F47B30",
    coberturas: ["Accidentes y enfermedades", "Cirugías", "Pruebas diagnósticas", "Medicamentos", "Responsabilidad Civil"],
  },
  {
    name: "CARE+", to: "/seguros/care-plus",
    subtitle: "Más cobertura, más tranquilidad",
    pct: "90%", pctLabel: "de reembolso en gastos veterinarios",
    tag: "MÁS ELEGIDO", highlighted: true,
    color: "#1A5C38", btnBg: "#1A5C38",
    coberturas: ["Todo lo incluido en KIVO CARE", "Límites anuales más altos", "Más pruebas y tratamientos", "Rehabilitación / Fisioterapia", "Responsabilidad Civil"],
  },
  {
    name: "PREMIUM", to: "/seguros/premium",
    subtitle: "La máxima protección",
    pct: "100%", pctLabel: "de reembolso en gastos veterinarios",
    color: "#B8922A", btnBg: "#152D63",
    coberturas: ["Todo lo incluido en KIVO CARE+", "Reembolso del 100%", "Sin límites por accidente", "Coberturas más completas", "Responsabilidad Civil ampliada"],
  },
  {
    name: "R.C.", to: "/seguros/rc",
    subtitle: "Protección ante imprevistos",
    rcValue: "300.000 €", pctLabel: "Protección frente a daños a terceros",
    color: "#0D9E8C", btnBg: "#0D9E8C",
    coberturas: ["Protección frente a daños a terceros", "Defensa jurídica incluida", "Libre elección de abogado", "Cumplimiento de obligaciones legales"],
  },
];

const steps = [
  { n: 1, title: "Haces tu solicitud", text: "Desde la App en menos de 1 minuto.", Icon: Smartphone },
  { n: 2, title: "Mandas el informe y la factura", text: "Adjunta los documentos de tu visita.", Icon: FileText },
  { n: 3, title: "Esperas 24/48h", text: "En los casos simples*.", Icon: Clock },
  { n: 4, title: "Recibes tu dinero", text: "Por transferencia a tu cuenta.", Icon: Wallet },
];

const blog = [
  { tag: "LEY Y NORMATIVA", img: blog1.url, slug: "ley-bienestar-animal", title: "Ley de Bienestar Animal: todo lo que debes saber en 2025" },
  { tag: "SALUD", img: blog2.url, slug: "leishmaniosis-perros", title: "Leishmaniosis en perros: síntomas, tratamiento y prevención" },
  { tag: "CUIDADOS", img: blog3.url, slug: "viajar-coche-perro", title: "Cómo preparar a tu perro para viajar en coche" },
  { tag: "SALUD", img: blog4.url, slug: "seguro-mascota", title: "¿Por qué contratar un seguro para tu mascota?" },
];

const testimonials = [
  { name: "Laura y Thor", avatar: avatar1.url, city: "Madrid", text: "El reembolso fue súper rápido. En 48h ya tenía el dinero en mi cuenta. Servicio increíble." },
  { name: "Carlos y Nala", avatar: avatar2.url, city: "Barcelona", text: "Por fin un seguro claro, sin letra pequeña y que cumple lo que promete." },
  { name: "Marta y Rocky", avatar: avatar3.url, city: "Valencia", text: "La App es muy fácil de usar. Hacer la solicitud de reembolso es cuestión de segundos." },
];

const confianza = [
  { Icon: ShieldCheck, t: "Transparencia total", d: "Te contamos todo claro, sin letra pequeña." },
  { Icon: FileText, t: "Condicionados accesibles", d: "Toda la documentación siempre disponible para ti." },
  { Icon: Scale, t: "Cumplimiento normativo", d: "Operamos conforme a la normativa española de distribución de seguros." },
  { Icon: Heart, t: "Protección para perros y gatos", d: "Seguros diseñados para su bienestar, en toda España." },
];

const compHeaders = ["KIVO CARE", "KIVO CARE+", "KIVO PREMIUM", "KIVO R.C."];
const compRows: (string)[][] = [
  ["Reembolsos en gastos veterinarios", "80%", "90%", "100%", "—"],
  ["Límite anual por mascota", "1.500 €", "2.500 €", "Sin límite por accidente", "—"],
  ["Consultas veterinarias", "✓", "✓", "✓", "—"],
  ["Cirugías", "✓", "✓", "✓", "—"],
  ["Pruebas diagnósticas", "✓", "✓", "✓", "—"],
  ["Medicamentos", "✓", "✓", "✓", "—"],
  ["Rehabilitación / Fisioterapia", "—", "✓", "✓", "—"],
  ["Responsabilidad Civil", "Hasta 150.000 €", "Hasta 200.000 €", "Hasta 200.000 €", "Hasta 300.000 €"],
];

function StoreBadge({ label, store }: { label: string; store: string }) {
  const isPlay = store === "Google Play";
  return (
    <a href="#" aria-label={`${label} ${store}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-left hover:bg-zinc-800 transition-colors">
      {isPlay ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
          <path fill="#EA4335" d="M3.6 2.3C3.2 2.7 3 3.3 3 4.1v15.8c0 .8.2 1.4.6 1.8l9-9-9-9z"/>
          <path fill="#FBBC04" d="M16.8 13.5l-2.7-2.7L4.7 21l12.1-6.9c.6-.4.6-.8 0-.6z"/>
          <path fill="#4285F4" d="M20.4 10.7l-3.6-2.1-3 3 3 3 3.6-2.1c1-.6 1-1.6 0-2.2z"/>
          <path fill="#34A853" d="M4.7 3l9.4 7.8 2.7-2.7L4.7 3z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
          <path d="M16.5 12.6c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.7-1.8-3.3-1.9-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1-.1-2.5-1-2.5-3.8zm-2.3-7c.6-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.2z"/>
        </svg>
      )}
      <div className="leading-tight">
        <div className="text-[8px] uppercase tracking-wider opacity-75">{label}</div>
        <div className="text-xs font-bold">{store}</div>
      </div>
    </a>
  );
}

function Home() {
  return (
    <SiteLayout>

      {/* ── HERO ── */}
      <section className="bg-[#FDF8F3] pt-10 pb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center pb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-secondary">
              Tu seguro de mascota<br />
              fácil de entender,<br />
              <span className="text-primary">rápido de cobrar.</span>
            </h1>
            <p className="mt-6 text-lg text-secondary/75 font-medium max-w-lg leading-relaxed">
              Contrata en minutos desde la App<br />
              y recibe tus reembolsos en 24/48h<br />
              en los casos simples.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {[
                { Icon: Zap, label: "Reembolsos 24/48h" },
                { Icon: Stethoscope, label: "Cualquier veterinario" },
                { Icon: Smartphone, label: "Todo desde la App" },
                { Icon: ShieldCheck, label: "Sin papeleo innecesario" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="text-xs font-semibold text-secondary leading-tight">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link to="/contratar" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-7 py-3.5 font-bold text-base hover:opacity-90 transition-opacity">
                Calcular precio <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/seguros/care" className="inline-flex items-center gap-2 border-2 border-secondary text-secondary rounded-full px-6 py-3 font-bold text-base hover:bg-secondary/5 transition-colors">
                Ver planes
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex">
                {[avatar1.url, avatar2.url, avatar3.url].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" style={{ marginLeft: i > 0 ? -10 : 0 }} loading="lazy" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"/>)}
                </div>
                <p className="text-xs text-secondary/70 font-semibold mt-0.5">+2.000 familias confían en KIVO</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src={heroPets.url}
              alt="Familia con perro y gato"
              className="rounded-3xl w-full object-cover shadow-lg"
              style={{ aspectRatio: "4/3" }}
              width={1280} height={960}
              fetchPriority="high" decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ── TU FAMILIA + SIN LETRA PEQUEÑA ── */}
      <section className="bg-[#FDF8F3] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Izq: ilustración + texto */}
            <div className="rounded-3xl bg-[#FBF0E8] p-8 sm:p-10 flex items-center gap-6 sm:gap-10">
              <div className="shrink-0 w-36 sm:w-44 h-36 sm:h-44">
                <DogCatSVG />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary leading-tight">
                  Tu familia,<br />nuestra prioridad
                </h2>
                <p className="mt-4 text-sm text-secondary/75 font-medium leading-relaxed">
                  Te acompaña cada día, te hace reír y está ahí cuando más lo necesitas. En KIVO estamos para protegerlos cuando más lo necesitas.
                </p>
              </div>
            </div>
            {/* Der: Sin letra pequeña */}
            <div className="rounded-3xl bg-[#FBF0E8] p-8 sm:p-10 flex flex-col justify-center">
              <PawPrint className="h-10 w-10 text-[#F47B30]" strokeWidth={1.5} />
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-secondary leading-tight">
                Sin letra pequeña.<br />Sin sorpresas.<br />Solo tranquilidad.
              </h2>
              <p className="mt-4 text-secondary/75 font-medium leading-relaxed">
                Te explicamos todo de forma clara para que tomes siempre la mejor decisión.
              </p>
              <Link to="/coberturas" className="mt-6 inline-flex items-center gap-2 border-2 border-primary text-primary rounded-full px-6 py-3 font-bold text-sm w-fit hover:bg-primary/5 transition-colors">
                Ver todas las coberturas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANES ── */}
      <section id="planes" className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-secondary mb-10">
            Elige la protección que mejor se adapta a tu familia
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative rounded-2xl bg-white border-2 flex flex-col ${p.highlighted ? "border-[#1A5C38] shadow-xl" : "border-border"}`}>
                {p.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A5C38] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" /> {p.tag}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-center">
                    <div className="text-lg font-extrabold text-secondary">
                      KIVO <span style={{ color: p.color }}>{p.name}</span>
                    </div>
                    <div className="text-xs text-secondary/70 mt-1">{p.subtitle}</div>
                    <div className="mt-4" style={{ color: p.color }}>
                      {p.rcValue ? (
                        <>
                          <div className="flex items-center justify-center gap-1.5">
                            <PawPrint className="h-6 w-6" strokeWidth={1.5} />
                            <span className="text-3xl font-extrabold">{p.rcValue}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-5xl font-extrabold">{p.pct}</div>
                      )}
                    </div>
                    <div className="text-[11px] text-secondary/70 mt-1">{p.pctLabel}</div>
                    <div className="border-t border-border my-4" />
                    <div className="text-[10px] font-bold tracking-wider text-left mb-3" style={{ color: p.color }}>COBERTURAS PRINCIPALES</div>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {p.coberturas.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: p.color }} strokeWidth={2} />
                        <span className="text-[12px] text-secondary">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 space-y-2">
                    <a href="#calcular" className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: p.btnBg }}>
                      Calcular precio <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link to={p.to} className="flex items-center justify-center rounded-full py-2.5 text-sm font-bold border-2 transition-colors hover:opacity-80" style={{ borderColor: p.color, color: p.color }}>
                      Ver coberturas completas
                    </Link>
                    <Link to={p.to} className="flex items-center justify-center gap-1 text-xs text-secondary/70 hover:text-secondary">
                      <FileCheck className="h-3.5 w-3.5" /> Ver condicionado general
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIVA ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FDF8F3]">
              <tr>
                <th className="py-3 px-4 font-bold text-secondary text-xs uppercase tracking-wider">Comparativa de coberturas</th>
                {compHeaders.map((h) => (
                  <th key={h} className="py-3 px-3 font-bold text-secondary text-[10px] text-center uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compRows.map((r, i) => (
                <tr key={r[0]} className={`border-t border-border ${i % 2 ? "bg-[#FDF8F3]/40" : ""}`}>
                  <th className="py-3 px-4 font-semibold text-secondary text-[12px] text-left">{r[0]}</th>
                  {r.slice(1).map((v, j) => (
                    <td key={j} className="py-3 px-3 text-center text-[12px] text-secondary/80">
                      {v === "✓" ? <Check className="h-4 w-4 text-primary mx-auto" strokeWidth={2.5} />
                        : v === "—" ? <span className="text-secondary/25">—</span>
                        : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center py-4 border-t border-border">
            <Link to="/coberturas" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline">
              Ver todas las coberturas, límites y exclusiones <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-[#FBF0E8] p-7">
          <Heart className="h-7 w-7 text-[#F47B30]" strokeWidth={1.5} />
          <h3 className="font-extrabold text-secondary text-2xl mt-3 leading-tight">
            Sin letra pequeña.<br />Sin sorpresas.<br />Solo tranquilidad.
          </h3>
          <p className="text-sm text-secondary/75 mt-4 leading-relaxed">
            Te explicamos todo de forma clara para que tomes siempre la mejor decisión.
          </p>
          <Link to="/coberturas" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary text-primary text-sm font-bold px-5 py-2.5 hover:bg-primary/5 transition-colors">
            Ver todas las coberturas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── ASÍ DE FÁCIL ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-secondary mb-12">
          Así de fácil funciona KIVO ✦
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div key={s.n} className="flex flex-col items-center text-center relative">
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg mb-4" style={{ backgroundColor: "#0A5C36" }}>
                {s.n}
              </div>
              <s.Icon className="h-14 w-14 text-primary mb-4" strokeWidth={1.2} />
              <div className="font-bold text-secondary text-base">{s.title}</div>
              <p className="text-sm text-secondary/70 mt-2">{s.text}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] border-t-2 border-dashed border-primary/30" />
              )}
            </div>
          ))}
        </div>
        <div className="text-xs text-secondary/60 text-center mt-8">*Plazos sujetos a la complejidad del expediente.</div>
      </section>

      {/* ── APP ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-3xl bg-secondary text-white p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-sm text-white/70 mb-2 font-semibold uppercase tracking-wider">La App de KIVO</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Todo en tu mano,<br />cuando lo necesitas.
            </h2>
            <ul className="mt-6 space-y-3">
              {["Solicitar reembolsos", "Ver el estado de tus solicitudes", "Mis pólizas y coberturas", "Mis documentos", "Chat y contacto directo", "Mi perfil y mis mascotas"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-white/90 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-7 flex-wrap">
              <StoreBadge label="DISPONIBLE EN" store="Google Play" />
              <StoreBadge label="Consíguelo en el" store="App Store" />
            </div>
          </div>
          <div className="text-center">
            <div className="inline-block rounded-3xl bg-white p-6 shadow-2xl">
              <svg viewBox="0 0 120 120" className="h-36 w-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="120" rx="28" fill="#152D63"/>
                <path d="M60 20 C60 20 35 35 35 60 C35 80 48 95 60 95 C72 95 85 80 85 60 C85 35 60 20 60 20Z" fill="#0A5C36" opacity="0.9"/>
                <path d="M60 20 C60 20 85 35 85 60 C85 80 72 95 60 95" fill="#F47B30" opacity="0.85"/>
                <circle cx="60" cy="55" r="18" fill="white" opacity="0.15"/>
                <text x="60" y="62" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="sans-serif">KIVO</text>
              </svg>
            </div>
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300"/>)}</div>
              <span className="font-bold text-white">4,8/5</span>
            </div>
            <p className="text-sm text-white/70 mt-3">Descarga la app de KIVO y empieza hoy<br />a cuidar su futuro.</p>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
            Consejos, cuidados y novedades para cuidar mejor
          </h2>
          <Link to="/blog" className="text-primary font-bold text-sm shrink-0 hidden sm:inline-flex items-center gap-1 hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blog.map((b) => (
            <article key={b.title} className="rounded-2xl overflow-hidden border border-border bg-white group">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
                <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold tracking-wider text-secondary px-2 py-1 rounded">{b.tag}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-secondary text-sm leading-snug">{b.title}</h3>
                <Link to={"/blog/" + b.slug as any} className="inline-flex items-center gap-1 mt-3 text-primary text-sm font-semibold hover:underline">
                  Leer más <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="bg-[#FDF8F3] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-secondary mb-10">
            Lo que dicen nuestras familias
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-bold text-secondary text-sm">{t.name}</div>
                    <div className="text-xs text-secondary/60">{t.city}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>)}
                </div>
                <p className="text-sm text-secondary/80 italic leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRANJA CONFIANZA ── */}
      <section className="bg-[#FBF0E8] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {confianza.map((c) => (
            <div key={c.t} className="flex items-start gap-3">
              <c.Icon className="h-7 w-7 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <div className="font-bold text-secondary text-sm">{c.t}</div>
                <p className="text-xs text-secondary/75 mt-1 leading-snug">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="calcular" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-3xl bg-secondary text-white p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Más que un seguro, tu tranquilidad.
          </h2>
          <p className="mt-4 text-white/75 max-w-md mx-auto">
            Empieza hoy y protege a quien forma parte de tu vida.
          </p>
          <div className="flex justify-center gap-3 mt-7 flex-wrap">
            <StoreBadge label="DISPONIBLE EN" store="Google Play" />
            <StoreBadge label="Consíguelo en el" store="App Store" />
          </div>
          <Link to="/contratar" className="mt-5 inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-3.5 font-bold hover:opacity-90 transition-opacity">
            Calcular mi precio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </SiteLayout>
  );
}
