import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso Legal — KIVO Seguros, S.L." },
      { name: "description", content: "Aviso legal de KIVO Seguros, S.L. Información corporativa, condiciones de uso y normativa aplicable." },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/aviso-legal" }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <SiteLayout>
      <PageHero eyebrow="LEGAL" title={<>Aviso <span className="text-primary">Legal</span></>} subtitle="Información corporativa y condiciones de uso del sitio web." />
      <Section>
        <div className="max-w-3xl mx-auto prose prose-sm text-[#1B2A4A]/80 space-y-8">

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">1. Datos identificativos</h2>
            <p>En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa de los siguientes datos identificativos del titular del presente sitio web:</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Denominación social:</strong> KIVO SEGUROS, S.L.</li>
              <li><strong>CIF:</strong> Pendiente de asignación registral</li>
              <li><strong>Domicilio social:</strong> España</li>
              <li><strong>Correo electrónico:</strong> <a href="mailto:hola@kivoseguros.com" className="text-[#3DBFA0]">hola@kivoseguros.com</a></li>
              <li><strong>Actividad:</strong> Agencia de Suscripción (MGA) de seguros de mascotas</li>
              <li><strong>Registro mercantil:</strong> Pendiente de inscripción</li>
              <li><strong>Registro DGSFP:</strong> Inscrita en el Registro Especial de Mediadores de Seguros, Corredores de Reaseguros y sus Altos Cargos de la Dirección General de Seguros y Fondos de Pensiones</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">2. Objeto y ámbito de aplicación</h2>
            <p>El presente Aviso Legal regula el acceso y uso del sitio web <strong>www.kivoseguros.com</strong> (en adelante, «el Sitio»), así como los servicios ofrecidos a través de él. El acceso al Sitio y su uso implican la aceptación plena y sin reservas de las presentes condiciones.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del Sitio — textos, imágenes, logotipos, marcas, diseño gráfico, código fuente y demás elementos — son propiedad de KIVO SEGUROS, S.L. o se utilizan bajo licencia. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa.</p>
            <p className="mt-2">La marca KIVO® está registrada en la Oficina Española de Patentes y Marcas (OEPM) con número M4384477.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">4. Exclusión de responsabilidad</h2>
            <p>KIVO SEGUROS, S.L. no se responsabiliza de los daños derivados de la interrupción, indisponibilidad o mal funcionamiento del Sitio por causas ajenas a su control. La información contenida en el Sitio tiene carácter meramente informativo y no constituye asesoramiento profesional vinculante.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">5. Legislación aplicable y fuero</h2>
            <p>El presente Aviso Legal se rige por la legislación española. Para cualquier controversia derivada del acceso o uso del Sitio, las partes se someten a los Juzgados y Tribunales de España, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#1B2A4A] mb-3">6. Normativa de distribución de seguros</h2>
            <p>KIVO SEGUROS, S.L. actúa como Mediador de Seguros autorizado, sujeto al control y supervisión de la Dirección General de Seguros y Fondos de Pensiones (DGSFP), conforme a la Ley 26/2006 de Mediación en Seguros y Reaseguros Privados y el Real Decreto 764/2010.</p>
          </div>

          <p className="text-xs text-[#1B2A4A]/40 pt-4 border-t border-[#1B2A4A]/8">Última actualización: junio 2026</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
