import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — KIVO Seguros, S.L." },
      { name: "description", content: "Política de privacidad de KIVO Seguros. Cómo tratamos tus datos personales conforme al RGPD y la LOPD-GDD." },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/privacidad" }],
  }),
  component: PrivacidadPage,
});

function PrivacidadPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="LEGAL" title={<>Política de <span className="text-primary">Privacidad</span></>} subtitle="Cómo tratamos tus datos personales de forma transparente y conforme al RGPD." />
      <Section>
        <div className="max-w-3xl mx-auto space-y-8 text-sm text-[#1B2A4A]/80">

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">1. Responsable del tratamiento</h2>
            <ul className="space-y-1">
              <li><strong>Responsable:</strong> KIVO SEGUROS, S.L.</li>
              <li><strong>Correo:</strong> <a href="mailto:privacidad@kivoseguros.com" className="text-[#3DBFA0]">privacidad@kivoseguros.com</a></li>
              <li><strong>Actividad:</strong> Agencia de Suscripción (MGA) — seguros de mascotas</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">2. Datos que tratamos y finalidades</h2>
            <div className="space-y-3">
              {[
                { title: "Contratación de seguros", data: "Nombre, DNI/NIE, email, teléfono, dirección, datos de la mascota (especie, raza, edad, microchip).", base: "Ejecución del contrato (art. 6.1.b RGPD)." },
                { title: "Gestión de siniestros y reembolsos", data: "Facturas veterinarias, informes médicos, datos bancarios.", base: "Ejecución del contrato y obligación legal (art. 6.1.b y 6.1.c RGPD)." },
                { title: "Comunicaciones comerciales", data: "Email, preferencias de productos.", base: "Consentimiento o interés legítimo (art. 6.1.a y 6.1.f RGPD). Puedes darte de baja en cualquier momento." },
                { title: "Mejora del servicio y analítica web", data: "Datos de navegación, cookies técnicas y analíticas.", base: "Interés legítimo con posibilidad de oposición (art. 6.1.f RGPD)." },
              ].map(r => (
                <div key={r.title} className="rounded-xl bg-[#F7F8FA] border border-[#1B2A4A]/8 p-4">
                  <p className="font-bold text-[#1B2A4A]">{r.title}</p>
                  <p className="mt-1"><span className="font-semibold">Datos:</span> {r.data}</p>
                  <p className="mt-1"><span className="font-semibold">Base jurídica:</span> {r.base}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">3. Conservación de datos</h2>
            <p>Los datos se conservarán durante la vigencia de la relación contractual y, posteriormente, durante los plazos legalmente exigidos (mínimo 6 años conforme a la normativa fiscal y mercantil; 10 años para datos de seguros conforme a la normativa supervisora).</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">4. Destinatarios y transferencias</h2>
            <p>KIVO podrá comunicar datos a:</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Entidades aseguradoras (underwriters) para la formalización y gestión de las pólizas</li>
              <li>TPA (Third Party Administrators) para la gestión de siniestros</li>
              <li>Proveedores tecnológicos bajo acuerdos de tratamiento encargado (art. 28 RGPD)</li>
              <li>Autoridades y organismos supervisores cuando sea legalmente exigible</li>
            </ul>
            <p className="mt-2">No se realizan transferencias internacionales fuera del EEE salvo mediante las garantías adecuadas del art. 46 RGPD.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">5. Tus derechos</h2>
            <p>Puedes ejercer los derechos de <strong>acceso, rectificación, supresión, portabilidad, limitación y oposición</strong> escribiendo a <a href="mailto:privacidad@kivoseguros.com" className="text-[#3DBFA0]">privacidad@kivoseguros.com</a> adjuntando copia de tu DNI/NIE. Tienes derecho a presentar reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#3DBFA0]">www.aepd.es</a>.</p>
          </div>

          <p className="text-xs text-[#1B2A4A]/40 pt-4 border-t border-[#1B2A4A]/8">Última actualización: junio 2026</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
