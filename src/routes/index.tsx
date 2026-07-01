import { createFileRoute, Link } from "@tanstack/react-router";
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
const URL_HOME = "https://kivo-web-seven.vercel.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KIVO — Seguros para perros y gatos" },
      { name: "description", content: "KIVO, correduría digital de seguros para mascotas. Contrata desde la App y recibe tus reembolsos en 24/48h en los casos simples." },
      { property: "og:title", content: "KIVO — Seguros para perros y gatos" },
      { property: "og:description", content: "Seguros para perros y gatos fáciles de contratar y rápidos de cobrar." },
      { property: "og:url", content: URL_HOME },
      { property: "og:image", content: SOCIAL_IMG },
    ],
    links: [
      { rel: "canonical", href: URL_HOME },
      { rel: "preload", as: "image", href: heroPets.url, fetchpriority: "high" },
    ],
  }),
  component: Home,
});

/* ── SVG icons ── */
const IconShield = ({ color = "#148458", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L21 6 L21 12 Q21 19 12 22 Q3 19 3 12 L3 6 Z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const IconStethoscope = ({ color = "#148458", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v6a6 6 0 0012 0V4"/>
    <circle cx="18" cy="17" r="3"/>
    <line x1="18" y1="14" x2="18" y2="11"/>
    <line x1="6" y1="4" x2="6" y2="4"/>
  </svg>
);
const IconSmartphone = ({ color = "#148458", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3"/>
    <circle cx="12" cy="18" r="1" fill={color} stroke="none"/>
  </svg>
);
const IconDoc = ({ color = "#148458", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
);
const IconUsers = ({ color = "#152D63", size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IconStar = ({ color = "#152D63", size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconCheck = ({ color = "#152D63", size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

/* ── Plan card icons ── */
const IconDog = ({ color = "#148458", bg = "#EAF7F0" }) => (
  <span style={{ width: 48, height: 48, borderRadius: "50%", background: bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="20" cy="23" rx="12" ry="10"/>
      <ellipse cx="10" cy="14" rx="5" ry="6" transform="rotate(-15 10 14)"/>
      <ellipse cx="30" cy="14" rx="5" ry="6" transform="rotate(15 30 14)"/>
      <ellipse cx="20" cy="27" rx="3" ry="2" fill={color} stroke="none"/>
      <circle cx="15" cy="21" r="1.8" fill={color} stroke="none"/>
      <circle cx="25" cy="21" r="1.8" fill={color} stroke="none"/>
    </svg>
  </span>
);
const IconCat = ({ color = "#0E7A4D", bg = "#E5F7EE" }) => (
  <span style={{ width: 48, height: 48, borderRadius: "50%", background: bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="24" r="12"/>
      <path d="M10 16 L7 7 L16 13"/>
      <path d="M30 16 L33 7 L24 13"/>
      <ellipse cx="15" cy="22" rx="2" ry="2.5" fill={color} stroke="none"/>
      <ellipse cx="25" cy="22" rx="2" ry="2.5" fill={color} stroke="none"/>
      <path d="M17 27 L20 29 L23 27" stroke={color} strokeWidth="1.5"/>
    </svg>
  </span>
);
const IconShieldPlan = ({ color = "#2F5BC8", bg = "#EDF2FF" }) => (
  <span style={{ width: 48, height: 48, borderRadius: "50%", background: bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L21 6V12Q21 19 12 22Q3 19 3 12V6Z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  </span>
);
const IconDogBlue = ({ color = "#2F5BC8", bg = "#EDF2FF" }) => (
  <span style={{ width: 48, height: 48, borderRadius: "50%", background: bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="20" cy="23" rx="12" ry="10"/>
      <ellipse cx="10" cy="14" rx="5" ry="6" transform="rotate(-15 10 14)"/>
      <ellipse cx="30" cy="14" rx="5" ry="6" transform="rotate(15 30 14)"/>
      <ellipse cx="20" cy="27" rx="3" ry="2" fill={color} stroke="none"/>
      <circle cx="15" cy="21" r="1.8" fill={color} stroke="none"/>
      <circle cx="25" cy="21" r="1.8" fill={color} stroke="none"/>
    </svg>
  </span>
);

/* ── Decorative heart SVG ── */
const Heart = ({ size = 18, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F2A365" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

/* ── Data ── */
const plans = [
  {
    id: "care", name: "CARE", subtitle: "La protección esencial",
    pct: "80%", pctColor: "#148458", btnBg: "#148458", checkColor: "#148458", tag: null,
    to: "/seguros/care" as const,
    icon: <IconDog />,
    coberturas: ["Accidentes y enfermedades","Cirugías","Pruebas diagnósticas","Medicamentos","Responsabilidad Civil"],
  },
  {
    id: "care-plus", name: "CARE+", subtitle: "Más cobertura, más tranquilidad",
    pct: "90%", pctColor: "#0E7A4D", btnBg: "#148458", checkColor: "#0E7A4D", tag: "MÁS ELEGIDO",
    to: "/seguros/care-plus" as const,
    icon: <IconCat />,
    coberturas: ["Todo lo incluido en KIVO CARE","Límites anuales más altos","Más pruebas y tratamientos","Rehabilitación / Fisioterapia","Responsabilidad Civil"],
  },
  {
    id: "premium", name: "PREMIUM", subtitle: "La máxima protección",
    pct: "100%", pctColor: "#2F5BC8", btnBg: "#2F5BC8", checkColor: "#2F5BC8", tag: null,
    to: "/seguros/premium" as const,
    icon: <IconDogBlue />,
    coberturas: ["Todo lo incluido en KIVO CARE+","Reembolso del 100%","Sin límites por accidente","Coberturas más completas","Responsabilidad Civil ampliada"],
  },
  {
    id: "rc", name: "R.C.", subtitle: "Responsabilidad Civil",
    pct: null, pctColor: "#2F5BC8", btnBg: "#2F5BC8", checkColor: "#2F5BC8", tag: null,
    to: "/seguros/rc" as const,
    icon: <IconShieldPlan />,
    coberturas: ["Cobertura de daños a terceros","Defensa jurídica","Protección frente a reclamaciones","Cumplimiento de obligaciones legales"],
  },
];

const compRows = [
  ["Reembolsos en gastos veterinarios","80%","90%","100%","—"],
  ["Límite anual por mascota","1.500 €","2.500 €","Sin límite","—"],
  ["Consultas","✓","✓","✓","—"],
  ["Cirugías","✓","✓","✓","—"],
  ["Pruebas diagnósticas","✓","✓","✓","—"],
  ["Medicamentos","✓","✓","✓","—"],
  ["Rehabilitación / Fisioterapia","✓","✓","✓","—"],
  ["Responsabilidad Civil","150.000 €","200.000 €","300.000 €","300.000 €"],
];

const steps = [
  { n: "1", title: "Haces tu solicitud", text: "Desde la App en menos de 1 minuto." },
  { n: "2", title: "Mandas el informe y la factura", text: "Adjunta los documentos de tu visita." },
  { n: "3", title: "Esperas 24/48h", text: "En los casos simples*." },
  { n: "4", title: "Recibes tu dinero", text: "Por transferencia a tu cuenta." },
];

const blogs = [
  { tag: "LEY Y NORMATIVA", img: blog1.url, title: "Ley de Bienestar Animal: todo lo que debes saber en 2025", to: "/blog" },
  { tag: "SALUD", img: blog2.url, title: "Leishmaniosis en perros: síntomas, tratamiento y prevención", to: "/blog" },
  { tag: "CUIDADOS", img: blog3.url, title: "Cómo preparar y tu perro para viajar en coche", to: "/blog" },
  { tag: "SEGUROS", img: blog4.url, title: "¿Por qué contratar un seguro para tu mascota?", to: "/blog" },
];

const GREEN = "#148458";
const NAVY = "#152D63";
const BG = "#FCFAF6";
const ORANGE = "#F2A365";

/* ── Component ── */
function Home() {
  return (
    <SiteLayout>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap');

        .kv-root { font-family: 'Manrope', 'Nunito', sans-serif; background: ${BG}; }
        .kw { width: min(1280px, calc(100% - 40px)); margin: 0 auto; }

        /* Hero */
        .kv-hero { background: ${BG}; overflow: hidden; position: relative; }
        .kv-hgrid { display: grid; grid-template-columns: 48% 52%; min-height: 480px; }
        .kv-h1 { font-family: 'Manrope', 'Nunito', sans-serif !important; font-size: 64px; line-height: 0.96; margin: 0 0 20px; letter-spacing: -2px; color: #231815; font-weight: 800; }
        .kv-h1 .accent { color: ${GREEN}; display: block; }

        /* Plan cards */
        .kv-plan-card { border: 1.5px solid #E2E8F0; border-radius: 20px; padding: 22px 18px 18px; background: #fff; box-shadow: 0 10px 35px rgba(20,30,50,.05); position: relative; display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; cursor: pointer; }
        .kv-plan-card:hover { transform: translateY(-10px); box-shadow: 0 28px 60px rgba(20,45,99,.15); border-color: rgba(20,45,99,.2); }
        .kv-plan-card.featured { transform: translateY(-5px); box-shadow: 0 16px 45px rgba(14,122,77,.15); border-color: #148458; border-width: 2px; }
        .kv-plan-card.featured:hover { transform: translateY(-15px); box-shadow: 0 32px 70px rgba(14,122,77,.22); }

        /* Pill buttons */
        .kv-btn { border-radius: 999px; padding: 11px 20px; font-weight: 800; font-size: 13px; text-align: center; display: block; border: none; transition: filter 0.2s, transform 0.15s; }
        .kv-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .kv-btn-outline { border-radius: 999px; padding: 10px 20px; font-weight: 700; font-size: 12px; text-align: center; display: block; background: transparent; transition: background 0.2s; }

        /* Benefits */
        .kv-benefits { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .kv-bitem { display: flex; flex-direction: column; align-items: center; gap: 6px; }

        /* Steps */
        .kv-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        .kv-step { border: 1.5px solid #E2E8F0; border-radius: 20px; padding: 18px 14px; background: #fff; box-shadow: 0 10px 35px rgba(20,30,50,.05); position: relative; }

        /* Blog */
        .kv-blog-card { border: 1.5px solid #E2E8F0; border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 10px 35px rgba(20,30,50,.05); transition: transform 0.2s, box-shadow 0.2s; }
        .kv-blog-card:hover { transform: translateY(-4px); box-shadow: 0 18px 45px rgba(20,30,50,.1); }

        /* Testimonials */
        .kv-test { background: #fff; border: 1.5px solid #E2E8F0; border-radius: 20px; padding: 24px; box-shadow: 0 10px 35px rgba(20,30,50,.05); }

        /* App section */
        .kv-app { background: #102A61; color: white; border-radius: 24px; padding: 40px 48px; }

        /* Trust */
        .kv-trust { background: ${BG}; border-top: 1px solid #E2E8F0; padding: 28px 0; }

        /* Responsive */
        @media(max-width:1024px){
          .kv-hgrid { grid-template-columns: 1fr !important; }
          .kv-photo { display: none !important; }
          .kv-h1 { font-size: 46px !important; }
        }
        @media(max-width:900px){
          .kv-plans { grid-template-columns: repeat(2,1fr) !important; }
          .kv-steps { grid-template-columns: repeat(2,1fr) !important; }
          .kv-blogs { grid-template-columns: repeat(2,1fr) !important; }
          .kv-tests { grid-template-columns: 1fr !important; }
          .kv-trust-grid { grid-template-columns: repeat(2,1fr) !important; }
          .kv-app { padding: 28px 24px !important; }
        }
        @media(max-width:600px){
          .kv-plans { grid-template-columns: 1fr !important; }
          .kv-blogs { grid-template-columns: 1fr !important; }
          .kv-benefits { grid-template-columns: repeat(2,1fr) !important; }
          .kv-h1 { font-size: 36px !important; }
        }
      `}} />

      <div className="kv-root">

        {/* ── HERO ── */}
        <section className="kv-hero">
          {/* Decorative hearts */}
          <Heart size={20} style={{ position: "absolute", top: 60, left: "42%", opacity: 0.7 }} />
          <Heart size={14} style={{ position: "absolute", top: 110, left: "44%", opacity: 0.5 }} />
          <Heart size={16} style={{ position: "absolute", bottom: 80, left: "30%", opacity: 0.4 }} />

          <div className="kw">
            <div className="kv-hgrid" style={{ alignItems: "center" }}>
              {/* Left */}
              <div style={{ padding: "52px 0 48px", zIndex: 2 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF0E3", color: "#C06020", borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 13, marginBottom: 24 }}>
                  El seguro de mascotas de tu familia <Heart size={14} style={{ display: "inline" }} />
                </div>
                <h1 className="kv-h1">
                  Ellos nunca<br />
                  te fallan.<br />
                  <span className="accent">Nosotros<br />tampoco.</span>
                </h1>
                <p style={{ fontWeight: 600, color: "#3D4F6A", fontSize: 16, maxWidth: 360, margin: "0 0 28px", lineHeight: 1.55 }}>
                  El seguro de mascotas <strong style={{ color: GREEN }}>fácil de entender</strong> y <strong style={{ color: GREEN }}>rápido de cobrar.</strong>
                </p>

                {/* Benefit icons */}
                <div className="kv-benefits" style={{ marginBottom: 28 }}>
                  {[
                    { Icon: () => <IconShield color={NAVY} size={24}/>, label: "Reembolsos en 24/48h" },
                    { Icon: () => <IconStethoscope color={NAVY} size={24}/>, label: "Veterinario de libre elección" },
                    { Icon: () => <IconSmartphone color={NAVY} size={24}/>, label: "Todo desde la App" },
                    { Icon: () => <IconDoc color={NAVY} size={24}/>, label: "Sin papeleo innecesario" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="kv-bitem">
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#EDF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: NAVY, textAlign: "center", lineHeight: 1.3 }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* App download bar */}
                <div style={{ background: NAVY, borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, color: "white", boxShadow: "0 10px 35px rgba(21,45,99,.25)", maxWidth: 440 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>Descarga la app de KIVO</div>
                    <span style={{ color: "#F6C445", letterSpacing: 1, fontSize: 13 }}>★★★★★</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.8)", marginLeft: 6 }}>4,8/5 en la App Store</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["▶ Google Play", "🍎 App Store"].map(s => (
                      <span key={s} style={{ background: "#0A0E1A", color: "white", border: "1px solid rgba(255,255,255,.2)", borderRadius: 10, padding: "8px 12px", fontSize: 10, fontWeight: 800 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: photo + floating card */}
              <div className="kv-photo" style={{ position: "relative", height: 520, overflow: "hidden", borderRadius: "0 0 24px 24px" }}>
                <img src={heroPets.url} alt="Familia con mascota" style={{ width: "100%", height: "100%", objectFit: "cover" }} fetchPriority="high" />
                {/* Floating success card */}
                <div style={{ position: "absolute", right: 24, top: 80, width: 172, background: "white", borderRadius: 20, boxShadow: "0 20px 50px rgba(21,45,99,.18)", padding: "22px 18px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, background: GREEN, color: "white", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 12px", fontSize: 22 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: "#231815" }}>¡Genial!</h3>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#3D4F6A", margin: "0 0 14px", lineHeight: 1.4 }}>Tu solicitud de reembolso se ha efectuado con éxito.</p>
                  <a style={{ fontSize: 11, fontWeight: 700, border: `1.5px solid ${GREEN}`, color: GREEN, borderRadius: 999, padding: "7px 14px", display: "inline-block", cursor: "pointer" }}>Ver mis solicitudes</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAMILIA / STATS ── */}
        <section style={{ padding: "40px 0 32px" }}>
          <div className="kw">
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 48, alignItems: "center" }}>
              <div style={{ background: "white", border: "1.5px solid #E2E8F0", borderRadius: 20, padding: "22px 24px", display: "flex", gap: 18, alignItems: "center", boxShadow: "0 10px 35px rgba(20,30,50,.05)" }}>
                {/* Inline linear dog + cat illustration */}
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="#152D63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <ellipse cx="26" cy="44" rx="16" ry="14"/>
                  <ellipse cx="14" cy="28" rx="7" ry="8" transform="rotate(-15 14 28)"/>
                  <ellipse cx="38" cy="28" rx="7" ry="8" transform="rotate(15 38 28)"/>
                  <ellipse cx="26" cy="49" rx="4" ry="3" fill="#F2A365" stroke="none"/>
                  <circle cx="20" cy="42" r="2.2" fill="#152D63" stroke="none"/>
                  <circle cx="32" cy="42" r="2.2" fill="#152D63" stroke="none"/>
                  <path d="M46 52 a14 14 0 0 1 14-14" stroke="#152D63"/>
                  <ellipse cx="52" cy="30" rx="6" ry="7"/>
                  <path d="M47 24 L44 16 L51 20"/>
                  <path d="M57 24 L60 16 L53 20"/>
                  <circle cx="49" cy="31" r="1.8" fill="#152D63" stroke="none"/>
                  <circle cx="55" cy="31" r="1.8" fill="#152D63" stroke="none"/>
                  {/* Orange heart above */}
                  <path d="M36 14 Q36 10 32 10 Q28 10 28 14 Q28 18 36 22 Q44 18 44 14 Q44 10 40 10 Q36 10 36 14" fill="#F2A365" stroke="none"/>
                </svg>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 18, lineHeight: 1.2, fontWeight: 800, color: "#231815" }}>Tu familia,<br />nuestra prioridad</h3>
                  <p style={{ fontSize: 12, color: "#3D4F6A", fontWeight: 600, margin: 0, lineHeight: 1.6 }}>Te acompañan cada día, te hacen reír y están ahí cuando más lo necesitas. En KIVO estamos para protegerlos.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
                {[
                  { icon: <IconUsers color={NAVY} size={28}/>, big: "+2.000", small: "familias confían en KIVO" },
                  { icon: <IconStar color={NAVY} size={28}/>, big: "4,8/5", small: "valoración media en la App" },
                  { icon: <IconCheck color={NAVY} size={28}/>, big: "100%", small: "transparente y sin letra pequeña" },
                ].map(({ icon, big, small }, i) => (
                  <div key={big} style={{ textAlign: "center", borderLeft: i > 0 ? "1.5px solid #E2E8F0" : "none", padding: "16px 8px" }}>
                    <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>{icon}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{big}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#3D4F6A" }}>{small}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PLANES ── */}
        <section style={{ padding: "0 0 40px" }}>
          <div className="kw">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ color: ORANGE, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Elige la protección que mejor se adapta a tu familia</p>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#231815", margin: 0, letterSpacing: -0.5 }}>Planes KIVO</h2>
            </div>
            <div className="kv-plans" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {plans.map((p) => (
                <div key={p.name} className={`kv-plan-card${p.tag ? " featured" : ""}`}>
                  {p.tag && (
                    <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: GREEN, color: "white", borderRadius: 999, padding: "4px 14px", fontSize: 10, fontWeight: 800, whiteSpace: "nowrap", letterSpacing: 0.5 }}>{p.tag}</div>
                  )}
                  <div style={{ marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#231815", marginBottom: 2 }}>KIVO <span style={{ color: p.pctColor }}>{p.name}</span></div>
                  <div style={{ fontSize: 11, color: "#3D4F6A", fontWeight: 600, marginBottom: 10 }}>{p.subtitle}</div>
                  {p.pct ? (
                    <>
                      <div style={{ fontSize: 38, fontWeight: 800, color: p.pctColor, lineHeight: 1, marginBottom: 2 }}>{p.pct}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#3D4F6A", marginBottom: 14 }}>de reembolso en gastos veterinarios</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#231815", margin: "8px 0 14px", lineHeight: 1.4 }}>Protección frente a<br />daños a terceros</div>
                  )}
                  <div style={{ fontSize: 10, fontWeight: 800, color: p.checkColor, marginBottom: 8, letterSpacing: 0.3 }}>COBERTURAS PRINCIPALES</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", flex: 1 }}>
                    {p.coberturas.map((c) => (
                      <li key={c} style={{ fontSize: 11, fontWeight: 600, color: "#3D4F6A", marginBottom: 6, display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.checkColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"/></svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.to} className="kv-btn" style={{ background: p.btnBg, color: "white", marginBottom: 8, textDecoration: "none" }}>Calcular precio</Link>
                  <Link to={p.to} className="kv-btn-outline" style={{ border: `1.5px solid ${p.pctColor}`, color: p.pctColor, marginBottom: 6, textDecoration: "none" }}>Ver coberturas completas</Link>
                  <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#3D4F6A" }}>Ver condicionado general
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" style={{ marginLeft: 4, verticalAlign: "middle" }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparativa */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 20, marginTop: 24 }}>
              <div style={{ overflowX: "auto", background: "white", borderRadius: 20, border: "1.5px solid #E2E8F0", boxShadow: "0 10px 35px rgba(20,30,50,.05)" }}>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: BG }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, color: NAVY, fontSize: 10, borderBottom: "1.5px solid #E2E8F0" }}>COMPARATIVA</th>
                      {["KIVO CARE","KIVO CARE+","KIVO PREMIUM","KIVO R.C."].map(h => (
                        <th key={h} style={{ padding: "12px 10px", fontWeight: 800, color: NAVY, fontSize: 10, textAlign: "center", borderBottom: "1.5px solid #E2E8F0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compRows.map((r, i) => (
                      <tr key={i} style={{ borderTop: "1px solid #F0F4F8", background: i % 2 ? BG : "white" }}>
                        <td style={{ padding: "8px 16px", fontWeight: 600, color: "#3D4F6A" }}>{r[0]}</td>
                        {r.slice(1).map((v, j) => (
                          <td key={j} style={{ padding: "8px 10px", textAlign: "center", fontWeight: 700, color: v === "✓" ? GREEN : v === "—" ? "#B0BEC5" : NAVY, fontSize: v === "✓" ? 16 : 11 }}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: "14px 16px", borderTop: "1.5px solid #E2E8F0", textAlign: "center" }}>
                  <Link to="/coberturas" style={{ color: GREEN, fontWeight: 700, fontSize: 12, textDecoration: "none" }}>Ver todas las coberturas, límites y exclusiones →</Link>
                </div>
              </div>
              <div style={{ background: "#FFF5EB", borderRadius: 20, padding: "24px 20px", border: "1.5px solid #FFD9B0" }}>
                <Heart size={22} style={{ marginBottom: 12 }} />
                <h3 style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.1, margin: "0 0 12px", color: "#231815" }}>Sin letra pequeña.<br />Sin sorpresas.<br />Solo tranquilidad.</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#3D4F6A", margin: "0 0 16px", lineHeight: 1.6 }}>Te explicamos todo de forma clara para que tomes siempre la mejor decisión.</p>
                <Link to="/coberturas" className="kv-btn" style={{ background: GREEN, color: "white", textDecoration: "none" }}>Ver todas las coberturas</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section style={{ padding: "8px 0 48px" }}>
          <div className="kw">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: "#231815", margin: 0, letterSpacing: -0.5 }}>
                Así de fácil funciona KIVO
                <Heart size={20} style={{ marginLeft: 8, verticalAlign: "middle" }} />
              </h2>
            </div>
            <div className="kv-steps">
              {steps.map((s, i) => (
                <div key={s.n} className="kv-step">
                  {i < 3 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A5AFBB" strokeWidth="1.8" strokeLinecap="round" style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: BG, borderRadius: "50%" }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  )}
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: GREEN, color: "white", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 800, marginBottom: 12 }}>{s.n}</div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#231815", marginBottom: 6 }}>{s.title}</div>
                  <p style={{ fontSize: 12, color: "#3D4F6A", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 11, color: "#8A96A8", marginTop: 16 }}>*Plazos sujetos a la complejidad del expediente.</p>
          </div>
        </section>

        {/* ── APP ── */}
        <section style={{ padding: "0 0 56px" }}>
          <div className="kw">
            <div className="kv-app" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 40, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", fontWeight: 600, marginBottom: 8 }}>La App de KIVO</div>
                <h2 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px" }}>Todo en tu mano,<br />cuando lo necesitas.</h2>
                {["Solicitar reembolsos","Ver el estado de tus solicitudes","Mis pólizas y coberturas","Mis documentos","Chat y contacto directo","Mi perfil y mis mascotas"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.9)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3DBFA0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  {["▶ Google Play", "🍎 App Store"].map(s => (
                    <span key={s} style={{ background: "rgba(255,255,255,.1)", color: "white", border: "1px solid rgba(255,255,255,.2)", borderRadius: 10, padding: "10px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ background: "rgba(255,255,255,.1)", borderRadius: 24, padding: "24px 20px", display: "inline-block" }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M40 12L64 22V40Q64 60 40 70Q16 60 16 40V22Z"/>
                    <ellipse cx="34" cy="38" rx="8" ry="10"/>
                    <path d="M44 30 Q52 30 52 38 Q52 46 44 50"/>
                    <polyline points="30 38 36 44 46 32"/>
                  </svg>
                </div>
                <div style={{ color: "#F6C445", fontSize: 18, marginTop: 10 }}>★★★★★</div>
                <div style={{ fontWeight: 800, fontSize: 16, marginTop: 4 }}>4,8/5</div>
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.2, margin: "0 0 16px" }}>Descarga la app de KIVO y empieza hoy a cuidar su futuro.</h3>
                <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 600, lineHeight: 1.6 }}>Disponible en Google Play y App Store. Descarga gratuita.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ padding: "0 0 56px" }}>
          <div className="kw">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, margin: 0, color: "#231815", }}>Consejos, cuidados y novedades para cuidar mejor</h2>
              <Link to="/blog" style={{ fontSize: 13, fontWeight: 700, color: GREEN, textDecoration: "none" }}>Ver todos los artículos →</Link>
            </div>
            <div className="kv-blogs" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {blogs.map((b) => (
                <article key={b.title} className="kv-blog-card">
                  <div style={{ position: "relative" }}>
                    <img src={b.img} alt={b.title} style={{ height: 160, width: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                    <span style={{ position: "absolute", top: 10, left: 10, background: GREEN, color: "white", fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 999, letterSpacing: 0.5 }}>{b.tag}</span>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ fontSize: 13, lineHeight: 1.4, margin: "0 0 12px", fontWeight: 700, color: "#231815" }}>{b.title}</h3>
                    <Link to={b.to} style={{ fontSize: 12, fontWeight: 700, color: GREEN, textDecoration: "none" }}>Leer más →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section style={{ padding: "0 0 56px" }}>
          <div className="kw">
            <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: 26, marginBottom: 32, color: "#231815" }}>
              Lo que dicen nuestras familias <Heart size={20} style={{ verticalAlign: "middle" }} />
            </h2>
            <div className="kv-tests" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {[
                { img: avatar1.url, stars: "★★★★★", text: '"El reembolso fue súper rápido. En 48h ya tenía el dinero en mi cuenta. Servicio increíble."', name: "Laura y Thor" },
                { img: avatar2.url, stars: "★★★★★", text: '"Por fin un seguro claro, sin letra pequeña y que cumple lo que promete."', name: "Carlos y Nala" },
                { img: avatar3.url, stars: "★★★★★", text: '"La App es muy fácil de usar. Hacer la solicitud de reembolso es cuestión de segundos."', name: "Mara y Rocky" },
              ].map((t) => (
                <div key={t.name} className="kv-test">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <img src={t.img} alt={t.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} loading="lazy" />
                       <div>
                      <div style={{ color: "#F6C445", fontSize: 16, marginBottom: 6 }}>{t.stars}</div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#3D4F6A", margin: "0 0 8px", lineHeight: 1.5, fontStyle: "italic" }}>{t.text}</p>
                      <strong style={{ fontSize: 13, color: NAVY, fontWeight: 800 }}>{t.name}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="kv-trust">
          <div className="kw">
            <div className="kv-trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {[
                { icon: <IconShield color={GREEN} size={28}/>, title: "Transparencia total", text: "Te contamos todo claro, sin letra pequeña." },
                { icon: <IconDoc color={GREEN} size={28}/>, title: "Condicionados accesibles", text: "Toda la documentación siempre disponible para ti." },
                { icon: <IconCheck color={GREEN} size={28}/>, title: "Cumplimiento normativo", text: "Operamos conforme a la normativa española de distribución de seguros." },
                { icon: <Heart size={28}/>, title: "Protección para perros y gatos", text: "Seguros diseñados para su bienestar, con todo España." },
              ].map((c) => (
                <div key={c.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{c.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: 13, margin: "0 0 4px", color: "#231815" }}>{c.title}</h3>
                    <p style={{ fontSize: 11, color: "#3D4F6A", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </SiteLayout>
  );
}
