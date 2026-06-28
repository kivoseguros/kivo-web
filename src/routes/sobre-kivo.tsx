import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

export const Route = createFileRoute("/sobre-kivo")({
  head: () => ({
    meta: [
      { title: "Sobre KIVO — Quiénes somos" },
      { name: "description", content: "KIVO Seguros, S.L. es una agencia de suscripción (MGA) especializada en seguros de mascotas en España. Conoce nuestra misión, valores e historia." },
    ],
    links: [{ rel: "canonical", href: "https://kivoseguros.com/sobre-kivo" }],
  }),
  component: SobreKivoPage,
});

const valores = [
  { icon: "🎯", titulo: "Simplicidad", texto: "Si algo es difícil de entender, debemos simplificarlo. La complejidad es un defecto de diseño, no una característica del sector." },
  { icon: "🔍", titulo: "Transparencia", texto: "Lo que cubrimos debe entenderse a la primera. Sin asteriscos. Sin letra pequeña." },
  { icon: "⚡", titulo: "Rapidez", texto: "Cada hora de espera es una promesa incumplida. El cliente no debería esperar semanas para una respuesta." },
  { icon: "🤝", titulo: "Empatía", texto: "Detrás de cada expediente hay una familia preocupada. Nuestro trabajo es acompañar personas, no gestionar siniestros." },
  { icon: "💡", titulo: "Innovación", texto: "La tecnología existe para resolver problemas reales. Cada nueva función nace de una sola pregunta: ¿hace esto la vida más fácil al propietario?" },
];

const letras = [
  { l: "K", concepto: "Knowledge", desc: "Conocimiento y tecnología. La K aporta personalidad y fuerza visual." },
  { l: "I", concepto: "Intelligence", desc: "Inteligencia, automatización y conexión con el mundo digital." },
  { l: "V", concepto: "Vitality", desc: "Vida, salud y bienestar. La V aporta dinamismo y movimiento." },
  { l: "O♥", concepto: "Love", desc: "El vínculo entre persona y mascota. La razón por la que todo existe." },
];

function SobreKivoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="SOBRE KIVO"
        title={<>No vendemos seguros.<br /><span className="text-primary">Vendemos tranquilidad.</span></>}
        subtitle="KIVO Seguros, S.L. es una Agencia de Suscripción (MGA) especializada en seguros de mascotas, inscrita en el Registro de Mediadores de la DGSFP."
      />

      {/* Misión y visión */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#1B2A4A] text-white p-8">
            <p className="text-xs font-bold tracking-widest text-[#3DBFA0] uppercase mb-3">Nuestra Visión</p>
            <p className="text-lg font-bold leading-relaxed">
              Convertirnos en la marca de referencia para propietarios de perros y gatos en Europa. El ecosistema de confianza más importante alrededor del bienestar animal.
            </p>
          </div>
          <div className="rounded-2xl bg-[#3DBFA0]/10 border border-[#3DBFA0]/30 p-8">
            <p className="text-xs font-bold tracking-widest text-[#3DBFA0] uppercase mb-3">Nuestra Misión</p>
            <p className="text-lg font-bold text-[#1B2A4A] leading-relaxed">
              Hacer que proteger a una mascota sea tan fácil como pedir un taxi o comprar online. Sin burocracia. Sin procesos eternos. Con tecnología al servicio de las personas.
            </p>
          </div>
        </div>
      </Section>

      {/* Origen */}
      <Section className="bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#3DBFA0] uppercase mb-4">Por qué existe KIVO</p>
          <h2 className="text-2xl font-extrabold text-[#1B2A4A] mb-6">Nace para cerrar una brecha</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="rounded-xl bg-red-50 border-t-4 border-red-400 p-5">
              <p className="text-xs font-bold uppercase text-red-500 mb-3">El sector ofrecía</p>
              {["Pólizas imposibles de entender","Reembolsos que tardan semanas","Atención al cliente burocrática","Aplicaciones antiguas y lentas","Exclusiones ocultas en letra pequeña"].map(t => (
                <p key={t} className="text-sm text-[#1B2A4A]/70 mb-1.5 flex gap-2"><span>✗</span>{t}</p>
              ))}
            </div>
            <div className="rounded-xl bg-[#3DBFA0]/8 border-t-4 border-[#3DBFA0] p-5">
              <p className="text-xs font-bold uppercase text-[#3DBFA0] mb-3">KIVO ofrece</p>
              {["Coberturas claras y sin sorpresas","Reembolsos rápidos sin papeleo","Información en tiempo real","App intuitiva centrada en tu mascota","Atención cercana cuando más se necesita"].map(t => (
                <p key={t} className="text-sm text-[#1B2A4A]/70 mb-1.5 flex gap-2"><span className="text-[#3DBFA0]">✓</span>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#1B2A4A] text-center mb-2">Nuestros valores</h2>
          <p className="text-sm text-[#1B2A4A]/60 text-center mb-10">Cada vez que KIVO tiene que elegir entre lo fácil y lo correcto, estos cinco principios marcan el camino.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map(v => (
              <div key={v.titulo} className="rounded-2xl bg-white border border-[#1B2A4A]/8 p-6 shadow-sm">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-extrabold text-[#1B2A4A] mb-2">{v.titulo}</h3>
                <p className="text-sm text-[#1B2A4A]/65 leading-relaxed">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* El nombre */}
      <Section className="bg-[#1B2A4A]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-xs font-bold tracking-widest text-[#3DBFA0] uppercase mb-4">El nombre</p>
          <h2 className="text-2xl font-extrabold mb-2">Cuatro letras. Una sola idea.</h2>
          <p className="text-sm text-white/60 mb-10">KIVO no suena a aseguradora. Y eso fue absolutamente deliberado.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {letras.map(l => (
              <div key={l.l} className="rounded-xl bg-white/8 border border-white/15 p-4">
                <span className="text-3xl font-black text-[#3DBFA0] block mb-1">{l.l}</span>
                <span className="text-xs font-bold text-white block mb-2">{l.concepto}</span>
                <p className="text-[11px] text-white/55 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Personalidad */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#1B2A4A] text-center mb-2">Nuestra personalidad</h2>
          <p className="text-sm text-[#1B2A4A]/60 text-center mb-8">Si KIVO fuera una persona, sería así.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#3DBFA0]/8 border border-[#3DBFA0]/20 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3DBFA0] mb-4">Siempre somos</p>
              {[["🤗","Cercana","Hablamos como personas. Directo, claro, sin barreras artificiales."],
                ["🧠","Inteligente","Tecnología para resolver problemas reales, no para aparentar."],
                ["☀️","Optimista","Comunicación que proyecta bienestar y tranquilidad."],
                ["🔎","Transparente","Lo que cubrimos lo decimos claro. Lo que no, también."],
                ["⚡","Resolutiva","Cuando hay un problema, aportamos soluciones, no excusas."]].map(([i,t,d]) => (
                <div key={t} className="flex gap-3 mb-4">
                  <span className="text-xl shrink-0">{i}</span>
                  <div><p className="font-bold text-[#1B2A4A] text-sm">{t}</p><p className="text-xs text-[#1B2A4A]/60 mt-0.5">{d}</p></div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-red-50 border border-red-100 p-6 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Nunca somos</p>
              {["Arrogantes","Burocráticos","Distantes","Lentos","Opacos"].map(t => (
                <p key={t} className="text-sm text-[#1B2A4A]/60 mb-2 flex gap-2"><span className="text-red-400">✗</span>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#F7F8FA] text-center">
        <h2 className="text-2xl font-extrabold text-[#1B2A4A] mb-2">¿Listo para proteger a tu mascota?</h2>
        <p className="text-sm text-[#1B2A4A]/60 mb-8">En menos de 5 minutos tienes tu seguro.</p>
        <Link to="/contratar" className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A] px-8 py-4 text-sm font-bold text-white hover:bg-[#1B2A4A]/90 transition-colors">
          Calcula tu precio →
        </Link>
      </Section>
    </SiteLayout>
  );
}
