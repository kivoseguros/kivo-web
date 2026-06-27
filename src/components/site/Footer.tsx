import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import logoIcon from "@/assets/kivo-logo-footer-tight.png.asset.json";


const segurosCol = [
  { to: "/seguros/care", label: "KIVO CARE" },
  { to: "/seguros/care-plus", label: "KIVO CARE+" },
  { to: "/seguros/premium", label: "KIVO PREMIUM" },
  { to: "/seguros/rc", label: "KIVO R.C." },
] as const;

const documentacionCol = [
  "Condicionado General Salud y Enfermedad",
  "Condicionado General Responsabilidad Civil",
  "IPID Salud y Enfermedad",
  "IPID Responsabilidad Civil",
  "Preguntas Frecuentes",
];

const legalCol = [
  "Aviso Legal",
  "Política de Privacidad",
  "Política de Cookies",
  "Canal de Reclamaciones",
  "Contacto",
];

const regulatoria = [
  "Operativa conforme a la normativa española de distribución de seguros.",
  "Pólizas respaldadas por entidad aseguradora autorizada.",
  "Transparencia y protección para perros y gatos en toda España.",
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Logo + tagline + apps + socials */}
          <div className="col-span-2">
            <div className="mb-3">
              <img
                src={logoIcon.url}
                alt="KIVO - Seguros para perros y gatos"
                className="h-20 sm:h-24 w-auto"
              />
            </div>
            <p className="text-sm text-white/75 max-w-xs">
              Protección para quienes forman parte de tu familia.
            </p>
            <div className="flex gap-3 mt-5 text-white/80">
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="TikTok" className="hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19.6 7.2a5.6 5.6 0 0 1-3.3-1.1V15a5 5 0 1 1-5-5v2.7a2.3 2.3 0 1 0 2.3 2.3V3h2.7a4 4 0 0 0 3.3 3.3v.9z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Seguros */}
          <div>
            <h4 className="font-bold mb-3 text-xs tracking-wider">SEGUROS</h4>
            <ul className="space-y-2 text-sm text-white/75">
              {segurosCol.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentación */}
          <div>
            <h4 className="font-bold mb-3 text-xs tracking-wider">DOCUMENTACIÓN</h4>
            <ul className="space-y-2 text-sm text-white/75">
              {documentacionCol.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-3 text-xs tracking-wider">LEGAL</h4>
            <ul className="space-y-2 text-sm text-white/75">
              {legalCol.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información regulatoria */}
          <div>
            <h4 className="font-bold mb-3 text-xs tracking-wider">INFORMACIÓN REGULATORIA</h4>
            <ul className="space-y-3 text-xs text-white/85">
              {regulatoria.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 text-xs text-white/85 text-center">
          © {new Date().getFullYear()} KIVO Seguros para Perros y Gatos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
