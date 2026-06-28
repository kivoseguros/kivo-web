import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { ChevronRight, ChevronLeft, Check, Shield, CreditCard, Building2, AlertTriangle, Info, Loader2, Search } from "lucide-react";
import { buscarRaza, esPPP, type Raza } from "@/lib/razas";
import { calcularTramo, calcularPrecio, PLANES_INFO, type Plan, type Tramo } from "@/lib/tarifa";
import { validarDNI } from "@/lib/dni";

export const Route = createFileRoute("/contratar")({
  head: () => ({
    meta: [
      { title: "KIVO — Calcula y contrata tu seguro de mascota" },
      { name: "description", content: "Contrata el seguro de tu perro o gato en 5 pasos. Coberturas claras, reembolsos rápidos." },
    ],
  }),
  component: ContratarPage,
});

type Especie = "perro" | "gato";
type TipoRaza = "pura" | "mestizo";
type Sexo = "M" | "H";
type TipoPago = "tarjeta" | "transferencia";
type Step = 0 | 1 | 2 | 3 | 4 | 5;

interface FormMascota {
  especie: Especie | null;
  tipoRaza: TipoRaza | null;
  raza: string;
  razaObj: Raza | null;
  pesoRango: string;
  fechaNacimiento: string;
  sexo: Sexo | null;
  esterilizado: boolean | null;
  microchip: string;
  microchipPendiente: boolean;
  paraCaza: boolean;
}

interface FormTomador {
  nombreCompleto: string;
  dni: string;
  email: string;
  telefono: string;
  direccion: string;
  codigoPostal: string;
}

const STEP_LABELS = ["Mascota", "Tomador", "Cobertura", "Tu precio", "Pago"];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1">
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div className={"h-1.5 w-full rounded-full transition-all duration-500 " + (done || active ? "bg-[#3DBFA0]" : "bg-[#1B2A4A]/10")} />
            <span className={"text-[10px] font-semibold transition-colors " + (active ? "text-[#1B2A4A]" : done ? "text-[#3DBFA0]" : "text-[#1B2A4A]/40")}>
              {done ? "✓" : label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TransitionCard({ message, subtext }: { message: string; subtext: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-full bg-[#3DBFA0]/15 flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-[#3DBFA0]" />
      </div>
      <h2 className="text-xl font-extrabold text-[#1B2A4A]">{message}</h2>
      <p className="mt-2 text-sm text-[#1B2A4A]/60 max-w-xs">{subtext}</p>
      <div className="mt-8 flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-2 w-2 rounded-full bg-[#3DBFA0]/50 animate-bounce" style={{ animationDelay: i * 0.15 + "s" }} />
        ))}
      </div>
    </div>
  );
}

function Field({ label, children, error, hint, labelCls }: { label: string; children: React.ReactNode; error?: string; hint?: React.ReactNode; labelCls: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
      {hint && <div className="mt-1">{hint}</div>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-[#1B2A4A]/6">
      <dt className="text-[#1B2A4A]/55 text-xs">{label}</dt>
      <dd className="font-semibold text-[#1B2A4A] text-xs text-right">{value}</dd>
    </div>
  );
}

function PlanCard({ plan, selected, onSelect }: {
  plan: (typeof PLANES_INFO)[keyof typeof PLANES_INFO];
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={"rounded-2xl border-2 transition-all duration-200 overflow-hidden " + (selected ? "border-[#3DBFA0] shadow-[0_4px_18px_rgba(61,191,160,0.18)]" : "border-[#1B2A4A]/10")}>
      <button type="button" onClick={onSelect} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#1B2A4A]">{plan.nombre}</h3>
              {plan.destacado && <span className="rounded-full bg-[#3DBFA0]/15 px-2 py-0.5 text-[10px] font-bold uppercase text-[#3DBFA0]">Más popular</span>}
            </div>
            <p className="text-xs text-[#1B2A4A]/60 mt-0.5">{plan.subtitulo}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-extrabold text-[#1B2A4A]">{plan.reembolso}</div>
            <div className="text-xs text-[#1B2A4A]/50">Reembolso</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#1B2A4A]/6 px-2.5 py-1 text-[11px] font-semibold text-[#1B2A4A]/70">Límite {plan.limite}</span>
          <span className="rounded-full bg-[#1B2A4A]/6 px-2.5 py-1 text-[11px] font-semibold text-[#1B2A4A]/70">RC {plan.rc}</span>
        </div>
      </button>
      <button type="button" onClick={() => setExpanded(!expanded)}
        className="w-full px-4 pb-3 text-left text-xs text-[#3DBFA0] font-semibold hover:underline">
        {expanded ? "▲ Ocultar detalle" : "▼ Ver coberturas completas (IPID)"}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#1B2A4A]/6 pt-3">
          <div>
            <p className="text-xs font-bold text-[#1B2A4A] mb-1.5">✓ Qué se asegura</p>
            <ul className="space-y-1">
              {plan.coberturas.map((c: string) => (
                <li key={c} className="flex items-start gap-2 text-xs text-[#1B2A4A]/75">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#3DBFA0] shrink-0" />{c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-[#1B2A4A] mb-1.5">✗ Qué no está asegurado</p>
            <ul className="space-y-1">
              {plan.noTincluyе.map((c: string) => (
                <li key={c} className="flex items-start gap-2 text-xs text-[#1B2A4A]/60">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />{c}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[10px] text-[#1B2A4A]/40">IPID-KIVO-2026 · CG-KIVO-AYE-RC-2026 · v1.0</p>
        </div>
      )}
    </div>
  );
}

function ContratarPage() {
  const [step, setStep] = useState<Step>(0);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState("");
  const [transitionSub, setTransitionSub] = useState("");
  const [planSeleccionado, setPlanSeleccionado] = useState<Plan>("care_plus");
  const [tipoPago, setTipoPago] = useState<TipoPago>("tarjeta");
  const [calculando, setCalculando] = useState(false);
  const [priceDone, setPriceDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [numeroPoliza, setNumeroPoliza] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [razaResults, setRazaResults] = useState<Raza[]>([]);
  const [razaFocus, setRazaFocus] = useState(false);

  const [mascota, setMascota] = useState<FormMascota>({
    especie: null, tipoRaza: null, raza: "", razaObj: null,
    pesoRango: "", fechaNacimiento: "", sexo: null,
    esterilizado: null, microchip: "", microchipPendiente: false, paraCaza: false,
  });

  const [tomador, setTomador] = useState<FormTomador>({
    nombreCompleto: "", dni: "", email: "", telefono: "", direccion: "", codigoPostal: "",
  });

  const nombreMascota = mascota.raza.split(" ")[0] || "tu mascota";
  const nombreTomador = tomador.nombreCompleto.trim().split(" ")[0] || "";

  const tramo: Tramo | null = useMemo(() => {
    if (!mascota.fechaNacimiento) return null;
    return calcularTramo(mascota.fechaNacimiento);
  }, [mascota.fechaNacimiento]);

  const tamano = mascota.razaObj?.tamano ?? (
    mascota.pesoRango === "<5" || mascota.pesoRango === "5-10" ? "P" :
    mascota.pesoRango === "10-20" ? "M" : "G"
  );

  const precio = useMemo(() => {
    if (!tramo || !mascota.sexo) return null;
    if (planSeleccionado === "rc_esencial" || planSeleccionado === "rc_total") {
      return calcularPrecio({ tamano: "M", tramo: "J", sexo: "M", plan: planSeleccionado });
    }
    return calcularPrecio({ tamano, tramo, sexo: mascota.sexo, plan: planSeleccionado });
  }, [tamano, tramo, mascota.sexo, planSeleccionado]);

  const planInfo = PLANES_INFO[planSeleccionado === "rc_total" ? "rc_esencial" : planSeleccionado] ?? PLANES_INFO.care_plus;

  useEffect(() => {
    setRazaResults(buscarRaza(mascota.raza));
  }, [mascota.raza]);

  function goToStep(nextStep: Step, msg: string, sub: string) {
    setTransitionMsg(msg);
    setTransitionSub(sub);
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      setStep(nextStep);
      if (nextStep === 3) {
        setCalculando(true);
        setPriceDone(false);
        setTimeout(() => { setCalculando(false); setPriceDone(true); }, 2800);
      }
    }, 1900);
  }

  function validateStep0(): boolean {
    const e: Record<string, string> = {};
    if (!mascota.especie) e.especie = "Selecciona la especie";
    else if (!mascota.tipoRaza) e.tipoRaza = "Indica si es pura raza o mestizo";
    else if (mascota.tipoRaza === "pura" && !mascota.razaObj) e.raza = "Selecciona una raza de la lista";
    else if (mascota.tipoRaza === "mestizo" && !mascota.pesoRango) e.peso = "Selecciona el rango de peso";
    if (mascota.paraCaza) e.caza = "bloqueado";
    if (mascota.razaObj?.ppp) e.ppp = "bloqueado";
    if (!mascota.fechaNacimiento) e.fecha = "Introduce la fecha de nacimiento";
    else if (!tramo) e.fecha = "La edad debe estar entre 2 meses y 11 años";
    if (!mascota.sexo) e.sexo = "Indica el sexo";
    if (mascota.esterilizado === null) e.esterilizado = "Indica si está esterilizado";
    if (!mascota.microchipPendiente && mascota.microchip && mascota.microchip.length !== 15) {
      e.microchip = "El microchip debe tener 15 dígitos";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (tomador.nombreCompleto.trim().length < 3) e.nombre = "Introduce tu nombre completo";
    const dniRes = validarDNI(tomador.dni);
    if (!tomador.dni) e.dni = "Introduce tu DNI o NIE";
    else if (!dniRes.valido) e.dni = dniRes.mensaje;
    if (!z.string().email().safeParse(tomador.email).success) e.email = "Email inválido";
    if (!tomador.telefono.trim()) e.telefono = "Introduce tu teléfono";
    if (!tomador.codigoPostal.trim()) e.cp = "Introduce el código postal";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 0) {
      if (!validateStep0()) return;
      goToStep(1, "¡Genial! Ya tenemos todo sobre " + nombreMascota + ".", "Ahora cuéntanos sobre ti como tomador del seguro…");
    } else if (step === 1) {
      if (!validateStep1()) return;
      goToStep(2, "¡Perfecto" + (nombreTomador ? ", " + nombreTomador : "") + "!", "Elige la cobertura ideal para " + nombreMascota + "…");
    } else if (step === 2) {
      goToStep(3, "¡Excelente elección!", "Calculando el precio exacto para " + nombreMascota + "…");
    } else if (step === 3 && priceDone) {
      goToStep(4, "¡" + nombreMascota + " está a punto de estar protegido!", "Solo queda completar el pago.");
    }
  }

  async function handleSubmit() {
    setSubmitted(true);
    await new Promise(r => setTimeout(r, 1500));
    const poliza = "KIVO-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
    setNumeroPoliza(poliza);
    setStep(5);
  }

  const inputCls = "h-12 w-full rounded-2xl border border-[#1B2A4A]/15 bg-white px-4 text-base text-[#1B2A4A] outline-none focus:border-[#3DBFA0] transition";
  const inputErrCls = "h-12 w-full rounded-2xl border-2 border-red-400 bg-red-50 px-4 text-base text-[#1B2A4A] outline-none focus:border-red-500 transition";
  const labelCls = "block text-xs font-bold uppercase tracking-wide text-[#1B2A4A]/60 mb-1.5";

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "Nunito, system-ui, sans-serif" }}>
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-[#1B2A4A]/8 px-5 py-3">
        <div className="mx-auto max-w-xl flex items-center justify-between mb-3">
          <Link to="/" className="text-sm font-semibold text-[#1B2A4A]/50 hover:text-[#1B2A4A] transition flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Inicio
          </Link>
          {step < 5 && <span className="text-xs font-bold text-[#1B2A4A]/50">Paso {Math.min((step as number) + 1, 5)}/5</span>}
        </div>
        {step < 5 && <div className="mx-auto max-w-xl"><Stepper current={step as number} /></div>}
      </div>

      <div className="mx-auto max-w-xl px-5 pb-16">
        {showTransition && <TransitionCard message={transitionMsg} subtext={transitionSub} />}

        {!showTransition && (
          <>
            {step === 0 && (
              <div className="pt-8 space-y-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#1B2A4A]">Cuéntanos sobre tu compañero</h1>
                  <p className="mt-1 text-sm text-[#1B2A4A]/60">En menos de 5 minutos tendrás su precio.</p>
                </div>

                <div>
                  <label className={labelCls}>¿Perro o gato?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["perro", "gato"] as Especie[]).map(val => (
                      <button key={val} type="button"
                        onClick={() => setMascota(m => ({ ...m, especie: val, tipoRaza: null, raza: "", razaObj: null }))}
                        className={"h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 text-sm font-bold transition " + (mascota.especie === val ? "border-[#3DBFA0] bg-[#3DBFA0]/10 text-[#1B2A4A]" : "border-[#1B2A4A]/12 text-[#1B2A4A]/70 hover:border-[#3DBFA0]/50")}>
                        <span className="text-3xl">{val === "perro" ? "🐕" : "🐱"}</span>
                        {val === "perro" ? "Perro" : "Gato"}
                      </button>
                    ))}
                  </div>
                  {errors.especie && <p className="mt-1 text-xs text-red-500">{errors.especie}</p>}
                </div>

                {mascota.especie && (
                  <div>
                    <label className={labelCls}>¿Pura raza o mestizo?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["pura", "mestizo"] as TipoRaza[]).map(val => (
                        <button key={val} type="button"
                          onClick={() => setMascota(m => ({ ...m, tipoRaza: val, raza: "", razaObj: null, pesoRango: "" }))}
                          className={"h-12 rounded-2xl border-2 text-sm font-bold transition " + (mascota.tipoRaza === val ? "border-[#3DBFA0] bg-[#3DBFA0]/10 text-[#1B2A4A]" : "border-[#1B2A4A]/12 text-[#1B2A4A]/70 hover:border-[#3DBFA0]/50")}>
                          {val === "pura" ? "Pura raza" : "Mestizo"}
                        </button>
                      ))}
                    </div>
                    {errors.tipoRaza && <p className="mt-1 text-xs text-red-500">{errors.tipoRaza}</p>}
                  </div>
                )}

                {mascota.tipoRaza === "pura" && (
                  <div className="relative">
                    <label className={labelCls}>Raza</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B2A4A]/30" />
                      <input className={"pl-9 " + (errors.raza ? inputErrCls : inputCls)} placeholder="Escribe la raza…"
                        value={mascota.raza}
                        onChange={e => setMascota(m => ({ ...m, raza: e.target.value, razaObj: null }))}
                        onFocus={() => setRazaFocus(true)}
                        onBlur={() => setTimeout(() => setRazaFocus(false), 150)} />
                    </div>
                    {razaFocus && razaResults.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full rounded-2xl border border-[#1B2A4A]/10 bg-white shadow-lg overflow-hidden">
                        {razaResults.map(r => (
                          <button key={r.nombre} type="button"
                            onClick={() => { setMascota(m => ({ ...m, raza: r.nombre, razaObj: r })); setRazaFocus(false); }}
                            className="flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-[#3DBFA0]/8 text-left">
                            <span className="font-medium text-[#1B2A4A]">{r.nombre}</span>
                            <span className="text-xs text-[#1B2A4A]/40">
                              {r.tamano === "P" ? "Pequeño" : r.tamano === "M" ? "Mediano" : "Grande"}
                              {r.ppp && <span className="ml-2 text-red-500 font-bold"> PPP</span>}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.raza && <p className="mt-1 text-xs text-red-500">{errors.raza}</p>}
                    {mascota.razaObj?.ppp && (
                      <div className="mt-3 rounded-2xl bg-red-50 border border-red-200 p-4 flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-red-700">Raza no asegurable</p>
                          <p className="text-xs text-red-600 mt-0.5">{mascota.raza} está clasificada como Potencialmente Peligrosa (RD 287/2002) y no puede contratarse bajo esta póliza.</p>
                        </div>
                      </div>
                    )}
                    <details className="mt-2">
                      <summary className="text-xs text-[#1B2A4A]/50 cursor-pointer flex items-center gap-1">
                        <Info className="h-3.5 w-3.5" /> ¿Quieres saber si tu raza es PPP?
                      </summary>
                      <div className="mt-2 rounded-xl bg-[#1B2A4A]/4 p-3 text-xs text-[#1B2A4A]/70 space-y-0.5">
                        <p className="font-bold mb-1">Razas PPP según RD 287/2002:</p>
                        {["Pit Bull Terrier","Staffordshire Bull Terrier","American Staffordshire Terrier","Rottweiler","Dogo Argentino","Fila Brasileño","Tosa Inu","Akita Inu"].map(r => <p key={r}>· {r}</p>)}
                      </div>
                    </details>
                  </div>
                )}

                {mascota.tipoRaza === "mestizo" && (
                  <div>
                    <label className={labelCls}>Peso aproximado</label>
                    <div className="space-y-2">
                      {[{v:"<5",l:"Menos de 5 kg"},{v:"5-10",l:"5 — 10 kg"},{v:"10-20",l:"10 — 20 kg"},{v:"20-40",l:"20 — 40 kg"},{v:">40",l:"Más de 40 kg"}].map(p => (
                        <button key={p.v} type="button"
                          onClick={() => setMascota(m => ({ ...m, pesoRango: p.v }))}
                          className={"w-full h-11 rounded-2xl border-2 text-sm font-semibold transition text-left px-4 " + (mascota.pesoRango === p.v ? "border-[#3DBFA0] bg-[#3DBFA0]/10 text-[#1B2A4A]" : "border-[#1B2A4A]/12 text-[#1B2A4A]/70")}>
                          {p.l}
                        </button>
                      ))}
                    </div>
                    {errors.peso && <p className="mt-1 text-xs text-red-500">{errors.peso}</p>}
                  </div>
                )}

                {(mascota.razaObj || mascota.pesoRango) && !mascota.razaObj?.ppp && (
                  <div>
                    <label className={labelCls}>Fecha de nacimiento</label>
                    <input type="date" className={errors.fecha ? inputErrCls : inputCls}
                      value={mascota.fechaNacimiento} max={new Date().toISOString().split("T")[0]}
                      onChange={e => setMascota(m => ({ ...m, fechaNacimiento: e.target.value }))} />
                    {tramo === null && mascota.fechaNacimiento && <p className="mt-1 text-xs text-red-500">Edad fuera del rango asegurable (2 meses – 11 años)</p>}
                    {tramo && <p className="mt-1 text-xs text-[#3DBFA0] font-semibold">Tramo: {tramo === "J" ? "Joven (hasta 3 años)" : tramo === "A1" ? "Adulto (3–5 años)" : tramo === "A2" ? "Adulto (5–7 años)" : "Senior (7–11 años)"}</p>}
                    {errors.fecha && !tramo && !mascota.fechaNacimiento && <p className="mt-1 text-xs text-red-500">{errors.fecha}</p>}
                  </div>
                )}

                {mascota.fechaNacimiento && tramo && (
                  <div>
                    <label className={labelCls}>Sexo</label>
                    <div className="grid grid-cols-2 gap-3">
                      {([["M","♂ Macho"],["H","♀ Hembra"]] as const).map(([v,l]) => (
                        <button key={v} type="button"
                          onClick={() => setMascota(m => ({ ...m, sexo: v }))}
                          className={"h-12 rounded-2xl border-2 text-sm font-bold transition " + (mascota.sexo === v ? "border-[#3DBFA0] bg-[#3DBFA0]/10 text-[#1B2A4A]" : "border-[#1B2A4A]/12 text-[#1B2A4A]/70")}>
                          {l}
                        </button>
                      ))}
                    </div>
                    {errors.sexo && <p className="mt-1 text-xs text-red-500">{errors.sexo}</p>}
                  </div>
                )}

                {mascota.sexo && (
                  <div>
                    <label className={labelCls}>¿Está esterilizado/a?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {([true,false] as const).map(v => (
                        <button key={String(v)} type="button"
                          onClick={() => setMascota(m => ({ ...m, esterilizado: v }))}
                          className={"h-12 rounded-2xl border-2 text-sm font-bold transition " + (mascota.esterilizado === v ? "border-[#3DBFA0] bg-[#3DBFA0]/10 text-[#1B2A4A]" : "border-[#1B2A4A]/12 text-[#1B2A4A]/70")}>
                          {v ? "Sí" : "No"}
                        </button>
                      ))}
                    </div>
                    {errors.esterilizado && <p className="mt-1 text-xs text-red-500">{errors.esterilizado}</p>}
                  </div>
                )}

                {mascota.esterilizado !== null && (
                  <div>
                    <label className={labelCls}>Microchip (15 dígitos)</label>
                    <input className={errors.microchip ? inputErrCls : inputCls} placeholder="Ej: 941000012345678"
                      maxLength={15} value={mascota.microchip} disabled={mascota.microchipPendiente}
                      onChange={e => setMascota(m => ({ ...m, microchip: e.target.value.replace(/\D/g,"") }))} />
                    <label className="mt-2 flex items-center gap-2 cursor-pointer text-sm text-[#1B2A4A]/70">
                      <input type="checkbox" className="h-4 w-4 rounded accent-[#3DBFA0]"
                        checked={mascota.microchipPendiente}
                        onChange={e => setMascota(m => ({ ...m, microchipPendiente: e.target.checked, microchip: "" }))} />
                      Pendiente de obtener (se aportará antes del inicio de cobertura)
                    </label>
                    {errors.microchip && <p className="mt-1 text-xs text-red-500">{errors.microchip}</p>}
                  </div>
                )}

                {mascota.esterilizado !== null && mascota.especie === "perro" && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded accent-[#3DBFA0]"
                      checked={mascota.paraCaza}
                      onChange={e => setMascota(m => ({ ...m, paraCaza: e.target.checked }))} />
                    <span className="text-sm text-[#1B2A4A]/70">Este perro se utiliza para actividades de caza o trabajo</span>
                  </label>
                )}

                {mascota.paraCaza && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-700">Perro de caza o trabajo</p>
                      <p className="text-xs text-amber-600 mt-0.5">Los animales usados para caza o trabajo no son asegurables. Si convive como mascota, desmarca esta opción.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="pt-8 space-y-5">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#1B2A4A]">Tus datos como tomador</h1>
                  <p className="mt-1 text-sm text-[#1B2A4A]/60">El tomador es quien contrata y paga la póliza.</p>
                </div>
                <Field label="Nombre completo" error={errors.nombre} labelCls={labelCls}>
                  <input className={errors.nombre ? inputErrCls : inputCls} value={tomador.nombreCompleto}
                    onChange={e => setTomador(t => ({ ...t, nombreCompleto: e.target.value }))} />
                </Field>
                <Field label="DNI / NIE"
                  hint={tomador.dni ? (validarDNI(tomador.dni).valido ? <span className="text-[#3DBFA0] text-xs font-semibold">✓ DNI válido</span> : <span className="text-red-500 text-xs">{validarDNI(tomador.dni).mensaje}</span>) : null}
                  error={errors.dni} labelCls={labelCls}>
                  <input className={(tomador.dni && !validarDNI(tomador.dni).valido) ? inputErrCls : inputCls}
                    placeholder="12345678Z" value={tomador.dni}
                    onChange={e => setTomador(t => ({ ...t, dni: e.target.value.toUpperCase() }))} />
                </Field>
                <Field label="Email" error={errors.email} labelCls={labelCls}>
                  <input type="email" className={errors.email ? inputErrCls : inputCls} value={tomador.email}
                    onChange={e => setTomador(t => ({ ...t, email: e.target.value }))} />
                </Field>
                <Field label="Teléfono" error={errors.telefono} labelCls={labelCls}>
                  <input type="tel" className={errors.telefono ? inputErrCls : inputCls} value={tomador.telefono}
                    onChange={e => setTomador(t => ({ ...t, telefono: e.target.value }))} />
                </Field>
                <Field label="Dirección" labelCls={labelCls}>
                  <input className={inputCls} value={tomador.direccion}
                    onChange={e => setTomador(t => ({ ...t, direccion: e.target.value }))} />
                </Field>
                <Field label="Código postal" error={errors.cp} labelCls={labelCls}>
                  <input className={errors.cp ? inputErrCls : inputCls} maxLength={5} value={tomador.codigoPostal}
                    onChange={e => setTomador(t => ({ ...t, codigoPostal: e.target.value.replace(/\D/g,"") }))} />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="pt-8 space-y-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#1B2A4A]">Elige la cobertura</h1>
                  <p className="mt-1 text-sm text-[#1B2A4A]/60">Puedes cambiar de plan más adelante desde tu póliza.</p>
                </div>
                {(Object.values(PLANES_INFO) as (typeof PLANES_INFO)[keyof typeof PLANES_INFO][]).map(p => (
                  <PlanCard key={p.id} plan={p} selected={planSeleccionado === p.id} onSelect={() => setPlanSeleccionado(p.id)} />
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="pt-8">
                <h1 className="text-2xl font-extrabold text-[#1B2A4A]">Tu precio</h1>
                {calculando && (
                  <div className="mt-12 flex flex-col items-center text-center">
                    <div className="relative h-24 w-24">
                      <div className="absolute inset-0 rounded-full bg-[#3DBFA0]/20 animate-ping" />
                      <div className="relative h-24 w-24 rounded-full bg-[#1B2A4A] flex items-center justify-center">
                        <Shield className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <p className="mt-6 text-base font-bold text-[#1B2A4A] animate-pulse">Calculando el mejor precio para {nombreMascota}…</p>
                    <p className="mt-2 text-xs text-[#1B2A4A]/50">Analizando perfil de riesgo y coberturas</p>
                  </div>
                )}
                {priceDone && precio && (
                  <div className="mt-8 space-y-5">
                    <div className="rounded-3xl bg-[#1B2A4A] p-6 text-white text-center">
                      <p className="text-sm font-semibold opacity-70">{planInfo.nombre}</p>
                      <div className="mt-3 flex items-end justify-center gap-1">
                        <span className="text-5xl font-black">{precio.mensual.toFixed(2).replace(".",",")}</span>
                        <span className="text-xl font-bold opacity-70 mb-2">€/mes</span>
                      </div>
                      <p className="mt-1 text-sm opacity-60">{precio.anual} €/año · IVA incluido</p>
                      <p className="mt-2 text-xs opacity-40">Precio provisional · Pendiente validación actuarial Wakam S.A.</p>
                    </div>
                    <div className="rounded-2xl border border-[#1B2A4A]/10 p-4 space-y-2">
                      <p className="text-xs font-bold text-[#1B2A4A] mb-2">Resumen de cobertura</p>
                      {planInfo.coberturas.slice(0,4).map((c: string) => (
                        <div key={c} className="flex items-start gap-2 text-xs text-[#1B2A4A]/70">
                          <Check className="h-3.5 w-3.5 text-[#3DBFA0] shrink-0 mt-0.5" />{c}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-[#3DBFA0]/8 p-4">
                      <p className="text-xs text-[#1B2A4A]/60 leading-relaxed">
                        <strong>Carencias:</strong> 5 días accidentes · 15 días enfermedades · 6 meses cirugía/oncología.<br/>
                        Renovación garantizada de por vida sin límite de edad.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="pt-8 space-y-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#1B2A4A]">Método de pago</h1>
                  <p className="mt-1 text-sm text-[#1B2A4A]/60">Elige cómo quieres abonar tu seguro.</p>
                </div>
                {precio && (
                  <div className="rounded-2xl bg-[#1B2A4A]/4 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#1B2A4A]/60">Plan {planInfo.nombre}</p>
                      <p className="font-bold text-[#1B2A4A]">{precio.mensual.toFixed(2).replace(".",",")} €/mes</p>
                    </div>
                    <p className="text-xs text-[#1B2A4A]/50">{precio.anual} €/año</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#1B2A4A]/6">
                  <button type="button" onClick={() => setTipoPago("tarjeta")}
                    className={"h-10 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 " + (tipoPago === "tarjeta" ? "bg-white shadow text-[#1B2A4A]" : "text-[#1B2A4A]/50")}>
                    <CreditCard className="h-4 w-4" /> Tarjeta
                  </button>
                  <button type="button" onClick={() => setTipoPago("transferencia")}
                    className={"h-10 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 " + (tipoPago === "transferencia" ? "bg-white shadow text-[#1B2A4A]" : "text-[#1B2A4A]/50")}>
                    <Building2 className="h-4 w-4" /> Transferencia
                  </button>
                </div>
                {tipoPago === "tarjeta" && (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-[#1B2A4A]/15 p-4 space-y-3">
                      <div>
                        <label className={labelCls}>Número de tarjeta</label>
                        <div className="h-12 rounded-xl border border-[#1B2A4A]/15 bg-[#F8F9FA] px-4 flex items-center text-[#1B2A4A]/30 text-sm">•••• •••• •••• ••••</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Caducidad</label>
                          <div className="h-12 rounded-xl border border-[#1B2A4A]/15 bg-[#F8F9FA] px-4 flex items-center text-[#1B2A4A]/30 text-sm">MM / AA</div>
                        </div>
                        <div>
                          <label className={labelCls}>CVV</label>
                          <div className="h-12 rounded-xl border border-[#1B2A4A]/15 bg-[#F8F9FA] px-4 flex items-center text-[#1B2A4A]/30 text-sm">•••</div>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#1B2A4A]/40 flex items-center gap-1"><Shield className="h-3 w-3" /> Pago seguro · Visa · Mastercard · Amex</p>
                    </div>
                    <p className="text-[10px] text-center text-[#1B2A4A]/40">⚠ Pasarela en integración — próximamente operativa</p>
                  </div>
                )}
                {tipoPago === "transferencia" && (
                  <div className="rounded-2xl border border-[#1B2A4A]/15 p-4 space-y-3">
                    <p className="text-sm font-bold text-[#1B2A4A]">Datos para la transferencia</p>
                    <div className="space-y-0">
                      <Row label="Beneficiario" value="KIVO SEGUROS, S.L." />
                      <Row label="IBAN" value="ES— — — — — — (pendiente)" />
                      {precio && <Row label="Importe" value={precio.anual + " € (anual)"} />}
                      <Row label="Concepto" value="Seguro mascota — tu nombre" />
                    </div>
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                      <p className="text-xs text-amber-700">Envía el justificante a <strong>contratos@kivoseguros.com</strong>. La póliza se activa en 24/48h laborables.</p>
                    </div>
                  </div>
                )}
                <div className="rounded-2xl bg-[#1B2A4A]/3 p-3">
                  <p className="text-[10px] text-[#1B2A4A]/50 leading-relaxed">
                    Al confirmar, autorizas a KIVO SEGUROS, S.L. a gestionar el cobro de la prima según el método de pago seleccionado, de conformidad con la Ley 50/1980 de Contrato de Seguro. Tus datos personales serán tratados conforme al RGPD (UE) 2016/679. El contrato tiene duración anual con renovación automática salvo aviso con 1 mes de antelación al vencimiento.
                  </p>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="pt-12 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-[#3DBFA0]/15 flex items-center justify-center">
                  <Check className="h-10 w-10 text-[#3DBFA0]" />
                </div>
                <h1 className="mt-6 text-2xl font-extrabold text-[#1B2A4A]">¡{nombreMascota} ya está protegido/a!</h1>
                <p className="mt-3 text-sm text-[#1B2A4A]/60 max-w-xs">
                  Hemos enviado un email a <strong>{tomador.email}</strong> con el enlace para crear tu contraseña y acceder a la app KIVO.
                </p>
                {numeroPoliza && (
                  <div className="mt-6 rounded-2xl border border-[#1B2A4A]/10 bg-[#1B2A4A]/3 px-6 py-4 w-full max-w-xs">
                    <p className="text-xs uppercase tracking-wide text-[#1B2A4A]/50">Número de póliza</p>
                    <p className="mt-1 font-mono text-lg font-extrabold text-[#1B2A4A]">{numeroPoliza}</p>
                    <p className="mt-1 text-xs text-[#1B2A4A]/50">Plan {planInfo.nombre}</p>
                  </div>
                )}
                <div className="mt-8 space-y-3 w-full max-w-xs">
                  <Link to="/" className="flex h-12 w-full items-center justify-center rounded-full bg-[#1B2A4A] text-sm font-bold text-white gap-2">
                    Ir al inicio
                  </Link>
                </div>
                <p className="mt-8 text-xs text-[#1B2A4A]/40">
                  ¿Dudas? <a href="mailto:atencion.cliente@kivoseguros.com" className="underline">atencion.cliente@kivoseguros.com</a>
                </p>
              </div>
            )}

            {step < 5 && (
              <div className="mt-8 space-y-3">
                {step === 3 && !priceDone && (
                  <div className="text-center text-sm text-[#1B2A4A]/50 animate-pulse">Calculando el mejor precio…</div>
                )}
                {(step !== 3 || priceDone) && step !== 4 && (
                  <button type="button" onClick={handleNext}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1B2A4A] text-base font-bold text-white transition hover:bg-[#1B2A4A]/90 active:scale-[0.98]">
                    {step === 2 ? "Ver mi precio" : step === 3 ? "Aceptar este precio" : "Continuar"}
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
                {step === 4 && (
                  <button type="button" onClick={handleSubmit} disabled={submitted}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#3DBFA0] text-base font-bold text-white transition hover:bg-[#3DBFA0]/90 active:scale-[0.98] disabled:opacity-60">
                    {submitted ? <><Loader2 className="h-5 w-5 animate-spin" /> Procesando…</> : <><Shield className="h-5 w-5" /> Confirmar y contratar</>}
                  </button>
                )}
                {step > 0 && (
                  <button type="button" onClick={() => setStep((step - 1) as Step)}
                    className="w-full text-sm font-semibold text-[#1B2A4A]/50 hover:text-[#1B2A4A] transition py-1">
                    ← Atrás
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
