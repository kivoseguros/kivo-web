import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — KIVO Seguros, S.L." },
      { name: "description", content: "Política de cookies de KIVO Seguros. Qué cookies usamos y cómo gestionarlas." },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="LEGAL" title={<>Política de <span className="text-primary">Cookies</span></>} subtitle="Qué cookies utilizamos, para qué y cómo puedes gestionarlas." />
      <Section>
        <div className="max-w-3xl mx-auto space-y-8 text-sm text-[#1B2A4A]/80">

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias y mejore la experiencia de navegación.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">Cookies que utilizamos</h2>
            <div className="rounded-2xl border border-[#1B2A4A]/8 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#1B2A4A] text-white">
                  <tr>
                    <th className="py-3 px-4 font-bold">Tipo</th>
                    <th className="py-3 px-4 font-bold">Finalidad</th>
                    <th className="py-3 px-4 font-bold">Duración</th>
                    <th className="py-3 px-4 font-bold">Consentimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Técnicas", "Sesión, preferencias de idioma, seguridad CSRF", "Sesión", "No requerido"],
                    ["Analíticas", "Medición de visitas y comportamiento (sin identificación personal)", "13 meses", "Requerido"],
                    ["Marketing", "Personalización de anuncios y remarketing", "90 días", "Requerido"],
                  ].map(([tipo, fin, dur, cons], i) => (
                    <tr key={tipo} className={`border-t border-[#1B2A4A]/8 ${i % 2 ? "bg-[#F7F8FA]" : ""}`}>
                      <td className="py-3 px-4 font-semibold text-[#1B2A4A]">{tipo}</td>
                      <td className="py-3 px-4">{fin}</td>
                      <td className="py-3 px-4">{dur}</td>
                      <td className="py-3 px-4">{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">Cómo gestionar las cookies</h2>
            <p>Puedes aceptar, rechazar o personalizar las cookies en cualquier momento a través del panel de preferencias de cookies disponible en la parte inferior de la página. También puedes configurar tu navegador para bloquear o eliminar cookies:</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#3DBFA0]">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noopener noreferrer" className="text-[#3DBFA0]">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/HT201265" target="_blank" rel="noopener noreferrer" className="text-[#3DBFA0]">Safari</a></li>
            </ul>
            <p className="mt-3">Ten en cuenta que desactivar ciertas cookies puede afectar a la funcionalidad del sitio.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">Base legal</h2>
            <p>El uso de cookies técnicas se basa en el interés legítimo (art. 6.1.f RGPD). Las cookies analíticas y de marketing requieren tu consentimiento previo (art. 6.1.a RGPD), de acuerdo con la Ley 34/2002 (LSSI-CE) y la Guía de Cookies de la AEPD.</p>
          </div>

          <p className="text-xs text-[#1B2A4A]/40 pt-4 border-t border-[#1B2A4A]/8">Última actualización: junio 2026</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
