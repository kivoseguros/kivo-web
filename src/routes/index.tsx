import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap, Stethoscope, Smartphone, ShieldCheck, Users, Star, Check, CheckCircle2,
  ArrowRight, FileText, Send, Clock, Wallet, Scale, FileCheck, Heart,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import shield from "@/assets/kivo-shield.png.asset.json";
import heroPets from "@/assets/hero-pets.jpg.asset.json";
import manDog from "@/assets/man-dog.jpg.asset.json";
import ctaPets from "@/assets/cta-pets.jpg.asset.json";
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
      {
        name: "description",
        content:
          "KIVO, correduría digital de seguros para mascotas. Contrata desde la App y recibe tus reembolsos en 24/48h en los casos simples.",
      },
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


type Plan = {
  name: string;
  to: "/seguros/care" | "/seguros/care-plus" | "/seguros/premium" | "/seguros/rc";
  ipid?: string;
  subtitle: string;
  pct?: string;
  pctLabel?: string;
  rcIcon?: boolean;
  rcIntro?: string;
  tag?: string | null;
  highlighted?: boolean;
  coberturas: string[];
};

const plans: Plan[] = [
  {
    name: "CARE", to: "/seguros/care", ipid: "/ipids/IPID_KIVO_CARE_2026.docx",
    subtitle: "La protección esencial",
    pct: "80%", pctLabel: "de reembolsos en gastos veterinarios",
    coberturas: ["Accidentes y enfermedades", "Cirugías", "Pruebas diagnósticas", "Medicamentos", "Responsabilidad Civil"],
  },
  {
    name: "CARE+", to: "/seguros/care-plus", ipid: "/ipids/IPID_KIVO_CARE_PLUS_2026.docx",
    subtitle: "Más cobertura, más tranquilidad",
    pct: "90%", pctLabel: "de reembolsos en gastos veterinarios",
    tag: "MÁS ELEGIDO", highlighted: true,
    coberturas: ["Todo lo incluido en KIVO CARE", "Límites anuales más altos", "Más pruebas y tratamientos", "Rehabilitación y fisioterapia", "Responsabilidad Civil"],
  },
  {
    name: "PREMIUM", to: "/seguros/premium", ipid: "/ipids/IPID_KIVO_PREMIUM_2026.docx",
    subtitle: "La máxima protección",
    pct: "100%", pctLabel: "de reembolsos en gastos veterinarios",
    coberturas: ["Todo lo incluido en KIVO CARE+", "Reembolso del 100%", "Sin límites por accidente", "Coberturas más completas", "Responsabilidad Civil ampliada"],
  },
  {
    name: "R.C.", to: "/seguros/rc",
    subtitle: "Responsabilidad Civil",
    rcIcon: true, rcIntro: "Protección frente a daños a terceros",
    coberturas: ["Cobertura de daños a terceros", "Defensa jurídica", "Protección frente a reclamaciones", "Cumplimiento de obligaciones legales"],
  },
];

const compHeaders = ["KIVO CARE", "KIVO CARE+", "KIVO PREMIUM", "KIVO R.C."];
const compRows: (string | "✓" | "—")[][] = [
  ["Reembolsos en gastos veterinarios", "80%", "90%", "100%", "—"],
  ["Límite anual por mascota", "1.500 €", "2.500 €", "Sin límite por accidente", "—"],
  ["Consultas", "✓", "✓", "✓", "—"],
  ["Cirugías", "✓", "✓", "✓", "—"],
  ["Pruebas diagnósticas", "✓", "✓", "✓", "—"],
  ["Medicamentos", "✓", "✓", "✓", "—"],
  ["Rehabilitación / Fisioterapia", "—", "✓", "✓", "—"],
  ["Responsabilidad Civil", "Hasta 150.000 €", "Hasta 200.000 €", "Hasta 200.000 €", "Hasta 300.000 €"],
];

const steps = [
  { n: 1, title: "Haces tu solicitud", text: "Desde la App en menos de 1 minuto.", Icon: Send },
  { n: 2, title: "Mandas el informe y la factura", text: "Adjunta los documentos de tu visita.", Icon: FileText },
  { n: 3, title: "Esperas 24/48h", text: "En los casos simples*.", Icon: Clock },
  { n: 4, title: "Recibes tu dinero", text: "Por transferencia a tu cuenta.", Icon: Wallet },
];

const appFeatures = [
  "Solicitar reembolsos", "Ver el estado de tus solicitudes", "Mis pólizas y coberturas",
  "Mis documentos", "Chat y contacto directo", "Mi perfil y mis mascotas",
];

const blog = [
  { tag: "LEY Y NORMATIVA", img: blog1.url, title: "Ley de Bienestar Animal: todo lo que debes saber en 2025" },
  { tag: "SALUD", img: blog2.url, title: "Leishmaniosis en perros: síntomas, tratamiento y prevención" },
  { tag: "CUIDADOS", img: blog3.url, title: "Cómo preparar a tu perro para viajar en coche" },
  { tag: "SALUD", img: blog4.url, title: "¿Por qué contratar un seguro para tu mascota?" },
];

const testimonials = [
  { name: "Laura y Thor", avatar: avatar1.url, text: "El reembolso fue súper rápido. En 48h ya tenía el dinero en mi cuenta. Servicio increíble." },
  { name: "Carlos y Nala", avatar: avatar2.url, text: "Por fin un seguro claro, sin letra pequeña y que cumple lo que promete." },
  { name: "Marta y Rocky", avatar: avatar3.url, text: "La App es muy fácil de usar. Hacer la solicitud de reembolso es cuestión de segundos." },
];

const confianza = [
  { Icon: ShieldCheck, t: "Transparencia total", d: "Te contamos todo claro, sin letra pequeña." },
  { Icon: FileText, t: "Condicionados accesibles", d: "Toda la documentación siempre disponible para ti." },
  { Icon: Scale, t: "Cumplimiento normativo", d: "Operamos conforme a la normativa española de distribución de seguros." },
  { Icon: Heart, t: "Protección para perros y gatos", d: "Seguros diseñados para su bienestar, en toda España." },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative" style={{background:"linear-gradient(100deg,#fff8ef 0%,#fffaf4 48%,#f6e7d6 100%)"}}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block bg-orange-50 text-orange-600 font-bold text-sm px-4 py-2 rounded-xl mb-5">
              El seguro de mascotas de tu familia ♡
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-secondary font-serif">
              Ellos nunca<br />
              te fallan.<br />
              <span className="text-primary">Nosotros<br />tampoco.</span>
            </h1>
            <p className="mt-6 text-xl font-bold text-secondary/80 max-w-lg">
              El seguro de mascotas fácil de entender y rápido de cobrar.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {[
                { Icon: Zap, label: "Reembolsos 24/48h" },
                { Icon: Stethoscope, label: "Veterinario de libre elección" },
                { Icon: Smartphone, label: "Todo desde la App" },
                { Icon: ShieldCheck, label: "Sin papeleo innecesario" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold text-secondary leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={heroPets.url} alt="Perro y gato" className="rounded-3xl w-full object-cover aspect-[4/3] shadow-md" width={1280} height={960} fetchPriority="high" decoding="async" />
            <div className="absolute -right-2 top-4 sm:right-6 sm:top-6 bg-white rounded-2xl shadow-xl border border-border p-4 w-44 text-center">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" />
              </div>
              <div className="mt-2 font-bold text-secondary text-sm">¡Genial!</div>
              <p className="text-[11px] text-secondary/75 mt-1 leading-snug">
                Tu solicitud de reembolso se ha efectuado con éxito.
              </p>
              <button className="mt-2 text-[11px] font-semibold text-primary border border-primary rounded-full px-3 py-1">
                Ver mis solicitudes
              </button>
            </div>
          </div>
        </div>

        {/* App banner */}
        <div id="descarga" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <div className="rounded-2xl bg-secondary text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <img src={shield.url} alt="KIVO" className="h-14 w-14 rounded-2xl bg-white p-1 object-contain" />
            <div className="flex-1">
              <div className="font-bold text-xl">Descarga la app de KIVO</div>
              <div className="text-sm text-white/90 flex items-center gap-2 mt-1">
                <span className="flex">{Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                ))}</span>
                4,8/5 en la App Store
              </div>
            </div>
            <div className="flex gap-3">
              <StoreBadge label="DISPONIBLE EN" store="Google Play" />
              <StoreBadge label="Consíguelo en el" store="App Store" />
            </div>
          </div>
        </div>
      </section>

      {/* Más que una mascota */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-10 items-center">
        <img src={manDog.url} alt="Persona con su perro" className="rounded-3xl w-full object-cover aspect-[5/4]" loading="lazy" width={800} height={640} />
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary leading-tight">
            Más que una mascota.<br /><span className="text-primary">Es parte de tu familia.</span>
          </h2>
          <p className="mt-4 text-secondary/75 max-w-md">Te acompaña cada día, te hace reír y está ahí cuando más lo necesitas.</p>
          <p className="mt-3 text-secondary/75 max-w-md">En KIVO estamos para protegeros cuando más lo necesitáis.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { Icon: Users, big: "+2.000", small: "familias confían en KIVO" },
              { Icon: Star, big: "4,8/5", small: "valoración media en la App" },
              { Icon: ShieldCheck, big: "100%", small: "transparente y sin letra pequeña" },
            ].map((s) => (
              <div key={s.big} className="text-center">
                <s.Icon className="h-7 w-7 text-primary mx-auto" />
                <div className="mt-2 font-extrabold text-secondary text-xl">{s.big}</div>
                <div className="text-[11px] text-secondary/80 mt-1">{s.small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES — 4 tarjetas */}
      <section id="planes" className="bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-secondary">
            Elige la protección que mejor se adapta a tu familia
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative rounded-2xl bg-card p-6 border flex flex-col ${p.highlighted ? "border-primary shadow-xl" : "border-border"}`}>
                {p.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full">
                    {p.tag}
                  </div>
                )}
                <div className="text-center">
                  <div className="text-lg font-extrabold text-secondary">
                    KIVO <span className="text-primary">{p.name}</span>
                  </div>
                  <div className="text-xs text-secondary/80 mt-1">{p.subtitle}</div>
                  {p.pct ? (
                    <>
                      <div className="text-4xl font-extrabold text-primary mt-4">{p.pct}</div>
                      <div className="text-[11px] text-secondary/80 mt-1">{p.pctLabel}</div>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-10 w-10 text-primary mx-auto mt-4" />
                      <div className="text-[11px] text-secondary/80 mt-2">{p.rcIntro}</div>
                    </>
                  )}
                </div>
                <div className="mt-5 text-[10px] font-bold tracking-wider text-secondary/80">COBERTURAS PRINCIPALES</div>
                <ul className="mt-3 space-y-2 text-sm text-secondary flex-1">
                  {p.coberturas.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-[13px]">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-2">
                  <a href="/contratar" className={`block text-center rounded-full py-2.5 text-sm font-bold transition ${p.highlighted ? "bg-primary text-white hover:bg-primary/90" : "bg-primary text-white hover:bg-primary/90"}`}>
                    Calcular precio
                  </a>
                  <Link to={p.to} className="block text-center rounded-full py-2.5 text-sm font-bold border border-primary text-primary hover:bg-primary/5">
                    Ver coberturas completas
                  </Link>
                  {p.ipid && (
                    <a href={p.ipid} download className="block text-center text-xs text-[#3DBFA0] hover:underline inline-flex items-center justify-center gap-1 w-full">
                      Descargar IPID <FileCheck className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* VETERINARIO LIBRE ELECCIÓN */}
      <section className="bg-[#3DBFA0]/8 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="h-16 w-16 rounded-2xl bg-[#3DBFA0] text-white flex items-center justify-center shrink-0 text-3xl">🏥</div>
          <div>
            <div className="font-extrabold text-[#1B2A4A] text-lg">Veterinario de libre elección</div>
            <p className="text-sm text-[#1B2A4A]/70 mt-1 max-w-2xl">Con KIVO puedes ir a <strong>cualquier clínica veterinaria colegiada en España</strong>: urgencias, especialistas, centros de referencia. Sin red cerrada. Sin restricciones. Tú decides quién cuida a tu mascota.</p>
          </div>
          <a href="/contratar" className="shrink-0 rounded-full bg-[#1B2A4A] text-white text-sm font-bold px-6 py-3 hover:bg-[#1B2A4A]/90 transition">Calcular precio →</a>
        </div>
      </section>

      {/* COMPARATIVA + lateral */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="py-3 px-4 font-bold text-secondary text-xs uppercase tracking-wider">Comparativa de coberturas</th>
                {compHeaders.map((h) => (
                  <th key={h} className="py-3 px-3 font-bold text-secondary text-[11px] text-center uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compRows.map((r, i) => (
                <tr key={r[0]} className={`border-t border-border ${i % 2 ? "bg-muted/20" : ""}`}>
                  <th className="py-3 px-4 font-semibold text-secondary text-[13px] text-left">{r[0]}</th>
                  {r.slice(1).map((v, j) => (
                    <td key={j} className="py-3 px-3 text-center text-[13px] text-secondary/85">
                      {v === "✓" ? <Check className="h-4 w-4 text-primary mx-auto" />
                        : v === "—" ? <span className="text-secondary/30">—</span>
                        : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center py-4 border-t border-border">
            <Link to="/coberturas" className="inline-flex items-center gap-2 text-primary font-bold text-sm">
              Ver todas las coberturas, límites y exclusiones <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl bg-accent/40 p-7">
          <Heart className="h-7 w-7 text-primary" />
          <h3 className="font-extrabold text-secondary text-2xl mt-3 leading-tight">
            Sin letra pequeña.<br />Sin sorpresas.<br />Solo tranquilidad.
          </h3>
          <p className="text-sm text-secondary/75 mt-4">
            Te explicamos todo de forma clara para que tomes siempre la mejor decisión.
          </p>
          <Link to="/coberturas" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold px-5 py-2.5">
            Ver todas las coberturas
          </Link>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-secondary">Así de fácil funciona KIVO</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="h-9 w-9 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto">{s.n}</div>
              <div className="mt-4 font-bold text-secondary">{s.title}</div>
              <p className="text-sm text-secondary/80 mt-2">{s.text}</p>
              <s.Icon className="h-10 w-10 text-primary mx-auto mt-5" />
            </div>
          ))}
        </div>
        <div className="text-xs text-secondary/75 text-center mt-6">*Plazos sujetos a la complejidad del expediente.</div>
      </section>

      {/* APP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-secondary text-white p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-sm text-white/85 mb-2">La App de KIVO</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Todo en tu mano,<br />cuando lo necesitas.</h2>
            <ul className="mt-6 space-y-3">
              {appFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-7">
              <StoreBadge label="DISPONIBLE EN" store="Google Play" dark />
              <StoreBadge label="Consíguelo en el" store="App Store" dark />
            </div>
          </div>
          <div className="text-center">
            <div className="inline-block rounded-3xl bg-white p-4 shadow-xl">
              <img src={shield.url} alt="App de KIVO" className="h-40 w-40 object-contain" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <span className="flex">{Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-300 text-yellow-300" />
              ))}</span>
              <span className="font-semibold">4,8/5</span>
            </div>
            <p className="text-sm text-white/75 mt-3 max-w-xs mx-auto">Descarga la app de KIVO y empieza hoy a cuidar su futuro.</p>
          </div>
        </div>
      </section>


      {/* IA SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-block text-xs font-bold tracking-widest text-[#3DBFA0] uppercase mb-4 bg-[#3DBFA0]/10 px-3 py-1 rounded-full">Tecnología KIVO</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary leading-tight mb-4">
            Inteligencia Artificial al servicio <span className="text-primary">de tu mascota.</span>
          </h2>
          <p className="text-secondary/75 mb-4">
            Nuestro sistema de IA analiza automáticamente las facturas veterinarias y clasifica cada concepto en segundos. El resultado: reembolsos más rápidos y menos papeleo para ti.
          </p>
          <ul className="space-y-3 mt-6">
            {[
              "Lectura automática de facturas con OCR inteligente",
              "Clasificación instantánea de conceptos cubiertos",
              "Detección de errores y documentación incompleta",
              "Gestión de expedientes en tiempo real desde la App",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-secondary/80">
                <span className="text-[#3DBFA0] font-bold mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-[#1B2A4A] p-8 text-white space-y-4">
          <div className="text-xs font-bold tracking-widest text-[#3DBFA0] uppercase mb-2">En menos de 1 minuto</div>
          {[
            { step: "1", label: "Fotografías la factura", sub: "OCR extrae los datos al instante" },
            { step: "2", label: "Enviamos tu solicitud", sub: "La IA clasifica cada concepto" },
            { step: "3", label: "Recibes tu dinero", sub: "En 24/48h en casos simples*" },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-[#3DBFA0] text-white font-black flex items-center justify-center shrink-0 text-sm">{s.step}</div>
              <div>
                <div className="font-bold">{s.label}</div>
                <div className="text-sm text-white/60">{s.sub}</div>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-white/40 pt-2">*Plazos sujetos a la complejidad del expediente.</p>
        </div>
      </section>

      {/* BLOG */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">Consejos, cuidados y novedades para cuidar mejor</h2>
          <Link to="/blog" className="text-primary font-bold text-sm shrink-0 hidden sm:inline-flex items-center gap-1">
            Ver todos los artículos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blog.map((b) => (
            <article key={b.title} className="rounded-2xl overflow-hidden border border-border bg-card group">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
                <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold tracking-wider text-secondary px-2 py-1 rounded">{b.tag}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-secondary text-sm leading-snug">{b.title}</h3>
                <Link to="/blog" className="inline-flex items-center gap-1 mt-3 text-primary text-sm font-semibold">
                  Leer más <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-secondary">Lo que dicen nuestras familias</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-secondary/80 italic">"{t.text}"</p>
                <div className="mt-3 text-sm font-bold text-secondary">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRANJA CONFIANZA */}
      <section className="bg-accent/30 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {confianza.map((c) => (
            <div key={c.t} className="flex items-start gap-3">
              <c.Icon className="h-7 w-7 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-secondary text-sm">{c.t}</div>
                <p className="text-xs text-secondary/80 mt-1 leading-snug">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="calcular" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-secondary text-white p-8 sm:p-12 grid md:grid-cols-2 items-center gap-8 overflow-hidden">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Más que un seguro,<br />tu tranquilidad.</h2>
            <p className="mt-4 text-white/80 max-w-md">Empieza en la App y protege a quien forma parte de tu vida.</p>
            <div className="flex gap-3 mt-6">
              <StoreBadge label="DISPONIBLE EN" store="Google Play" dark />
              <StoreBadge label="Consíguelo en el" store="App Store" dark />
            </div>
          </div>
          <img src={ctaPets.url} alt="Perro y gato" className="rounded-2xl w-full object-cover aspect-[16/9]" loading="lazy" />
        </div>
      </section>
    </SiteLayout>
  );
}

function StoreBadge({ label, store }: { label: string; store: string; dark?: boolean }) {
  const isPlay = store === "Google Play";
  return (
    <a href="#" aria-label={`${label} ${store}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white text-left">
      {isPlay ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path fill="#EA4335" d="M3.6 2.3C3.2 2.7 3 3.3 3 4.1v15.8c0 .8.2 1.4.6 1.8l9-9-9-9z" />
          <path fill="#FBBC04" d="M16.8 13.5l-2.7-2.7L4.7 21l12.1-6.9c.6-.4.6-.8 0-.6z" />
          <path fill="#4285F4" d="M20.4 10.7l-3.6-2.1-3 3 3 3 3.6-2.1c1-.6 1-1.6 0-2.2z" />
          <path fill="#34A853" d="M4.7 3l9.4 7.8 2.7-2.7L4.7 3z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M16.5 12.6c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.7-1.8-3.3-1.9-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1-.1-2.5-1-2.5-3.8zm-2.3-7c.6-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.2z"/>
        </svg>
      )}
      <div className="leading-tight">
        <div className="text-[8px] uppercase tracking-wider opacity-80">{label}</div>
        <div className="text-xs font-bold">{store}</div>
      </div>
    </a>
  );
}
