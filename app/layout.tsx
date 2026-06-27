import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KIVO Seguros – Seguro de Mascotas",
  description: "El seguro de mascotas más completo de España. Protege a tu compañero con KIVO.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav style={{ backgroundColor: "var(--kivo-navy)" }} className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 8v8c0 7 5.5 12.5 12 14 6.5-1.5 12-7 12-14V8L16 2z" fill="#3DBFA0"/>
              <path d="M16 6L7 11v6c0 5 3.8 9.2 9 10.5C21.2 26.2 25 22 25 17v-6L16 6z" fill="#1B2A4A"/>
              <text x="16" y="21" textAnchor="middle" fill="#3DBFA0" fontSize="9" fontWeight="bold">K</text>
            </svg>
            <span className="text-white font-bold text-xl tracking-tight">KIVO</span>
            <span className="text-xs" style={{ color: "var(--kivo-teal)" }}>SEGUROS</span>
          </div>
          <div className="flex gap-6 text-sm text-white/80">
            <a href="/" className="hover:text-white transition-colors">Productos</a>
            <a href="/tarificar" style={{ backgroundColor: "var(--kivo-teal)" }} className="px-4 py-1.5 rounded-full text-white font-medium hover:opacity-90 transition-opacity">
              Calcular precio
            </a>
          </div>
        </nav>
        {children}
        <footer style={{ backgroundColor: "var(--kivo-navy)" }} className="mt-20 px-6 py-10 text-center text-white/60 text-sm">
          <p>KIVO Seguros, S.L. · Agencia de Suscripción (MGA) · Madrid, España</p>
          <p className="mt-1">Inscrita en el Registro de la OEPM · M4384477</p>
        </footer>
      </body>
    </html>
  );
}
