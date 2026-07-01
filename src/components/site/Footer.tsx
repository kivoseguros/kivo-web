import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import logoIcon from "@/assets/kivo-logo-footer-tight.png.asset.json";

const FOOTER_BG = "#0F244F";
const GREEN = "#148458";

const segurosCol = [
  { to: "/seguros/care", label: "KIVO CARE" },
  { to: "/seguros/care-plus", label: "KIVO CARE+" },
  { to: "/seguros/premium", label: "KIVO PREMIUM" },
  { to: "/seguros/rc", label: "KIVO R.C." },
] as const;

const documentacionCol = [
  { label: "Condicionado General Accidentes y Enfermedad", href: "#" },
  { label: "Condicionado General Responsabilidad Civil", href: "#" },
  { label: "IPID Accidentes y Enfermedad", href: "#" },
  { label: "IPID Responsabilidad Civil", href: "#" },
  { label: "Preguntas Frecuentes", href: "/faq" },
];

const legalCol = [
  { label: "Aviso Legal", href: "#" },
  { label: "Política de Privacidad", href: "#" },
  { label: "Política de Cookies", href: "/cookies" },
  { label: "Canal de Reclamaciones", href: "mailto:reclamaciones@kivoseguros.com" },
  { label: "Contacto", href: "mailto:hola@kivoseguros.com" },
];

const regulatoria = [
  "Operamos conforme a la normativa española de distribución de seguros.",
  "Pólizas respaldadas por entidad aseguradora autorizada.",
  "Transparencia y protección para perros y gatos en toda España.",
];

export function Footer() {
  return (
    <footer style={{ background: FOOTER_BG, color: "white", marginTop: 0 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1.4fr", gap: 40 }}>

          {/* Logo + tagline + socials */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <img
                src={logoIcon.url}
                alt="KIVO - Seguros para perros y gatos"
                style={{ height: 88, width: "auto" }}
              />
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", maxWidth: 220, fontWeight: 500, lineHeight: 1.6, marginBottom: 20 }}>
              Protección para quienes forman parte de tu familia.
            </p>
            <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,.6)" }}>
              <a href="#" aria-label="Instagram" style={{ color: "rgba(255,255,255,.6)", transition: "color 0.2s" }} onMouseOver={e => (e.currentTarget.style.color="white")} onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.6)")}><Instagram style={{ width: 20, height: 20 }} /></a>
              <a href="#" aria-label="Facebook" style={{ color: "rgba(255,255,255,.6)", transition: "color 0.2s" }} onMouseOver={e => (e.currentTarget.style.color="white")} onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.6)")}><Facebook style={{ width: 20, height: 20 }} /></a>
              <a href="#" aria-label="TikTok" style={{ color: "rgba(255,255,255,.6)", transition: "color 0.2s" }} onMouseOver={e => (e.currentTarget.style.color="white")} onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.6)")}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
                  <path d="M19.6 7.2a5.6 5.6 0 0 1-3.3-1.1V15a5 5 0 1 1-5-5v2.7a2.3 2.3 0 1 0 2.3 2.3V3h2.7a4 4 0 0 0 3.3 3.3v.9z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" style={{ color: "rgba(255,255,255,.6)", transition: "color 0.2s" }} onMouseOver={e => (e.currentTarget.style.color="white")} onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.6)")}><Youtube style={{ width: 20, height: 20 }} /></a>
            </div>
          </div>

          {/* Seguros */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>SEGUROS</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {segurosCol.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={{ color: "rgba(255,255,255,.7)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => (e.currentTarget.style.color="white")}
                    onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.7)")}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentación */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>DOCUMENTACIÓN</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {documentacionCol.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color 0.2s", lineHeight: 1.4, display: "block" }}
                    onMouseOver={e => (e.currentTarget.style.color="white")}
                    onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.7)")}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>LEGAL</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {legalCol.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => (e.currentTarget.style.color="white")}
                    onMouseOut={e => (e.currentTarget.style.color="rgba(255,255,255,.7)")}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información regulatoria */}
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>INFORMACIÓN REGULATORIA</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {regulatoria.map((l) => (
                <li key={l} style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontWeight: 500, lineHeight: 1.55, display: "flex", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {l}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.12)", fontSize: 12, color: "rgba(255,255,255,.5)", textAlign: "center", fontWeight: 500 }}>
          © {new Date().getFullYear()} KIVO Seguros para Perros y Gatos, S.L. — Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
