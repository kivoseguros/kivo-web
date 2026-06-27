"use client";
import { useState } from "react";
import Link from "next/link";

const planes = ["KIVO CARE", "KIVO CARE+", "KIVO PREMIUM"];
const razas = ["Labrador Retriever", "Pastor Alemán", "Golden Retriever", "Bulldog Francés", "Caniche", "Beagle", "Otro"];

export default function TarifarPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    especie: "",
    nombre: "",
    raza: "",
    edad: "",
    plan: "",
  });
  const [precio, setPrecio] = useState<number | null>(null);

  const calcularPrecio = () => {
    const base = form.plan === "KIVO CARE" ? 19 : form.plan === "KIVO CARE+" ? 34 : 54;
    const factorEdad = parseInt(form.edad) > 7 ? 1.3 : parseInt(form.edad) > 3 ? 1.1 : 1;
    setPrecio(Math.round(base * factorEdad * 100) / 100);
    setStep(3);
  };

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:underline">Productos</Link>
          <span>→</span>
          <span style={{ color: "var(--kivo-navy)" }} className="font-medium">Calcular precio</span>
        </div>

        {/* Título */}
        <h1 style={{ color: "var(--kivo-navy)" }} className="text-3xl font-bold mb-2">
          Calcula el precio de tu seguro
        </h1>
        <p className="text-gray-500 mb-8">Sin compromiso. En menos de 1 minuto.</p>

        {/* Pasos */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: step >= s ? "var(--kivo-teal)" : "#e5e7eb" }}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 style={{ color: "var(--kivo-navy)" }} className="text-xl font-semibold">¿Qué mascota tienes?</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Perro", "Gato"].map((e) => (
                <button
                  key={e}
                  onClick={() => setForm({ ...form, especie: e })}
                  className="py-6 rounded-2xl border-2 text-center font-semibold text-lg transition-all"
                  style={{
                    borderColor: form.especie === e ? "var(--kivo-teal)" : "#e5e7eb",
                    backgroundColor: form.especie === e ? "#f0fdf9" : "white",
                    color: form.especie === e ? "var(--kivo-teal)" : "var(--kivo-navy)",
                  }}
                >
                  {e === "Perro" ? "🐕" : "🐈"}<br />{e}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de tu mascota</label>
              <input
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
                style={{ borderColor: "#e5e7eb" }}
                placeholder="Ej: Luna"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Raza</label>
              <select
                className="w-full border rounded-xl px-4 py-3 focus:outline-none bg-white"
                style={{ borderColor: "#e5e7eb" }}
                value={form.raza}
                onChange={(e) => setForm({ ...form, raza: e.target.value })}
              >
                <option value="">Selecciona una raza</option>
                {razas.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Edad (años)</label>
              <input
                type="number"
                min="0"
                max="20"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                style={{ borderColor: "#e5e7eb" }}
                value={form.edad}
                onChange={(e) => setForm({ ...form, edad: e.target.value })}
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.especie || !form.nombre || !form.raza || !form.edad}
              style={{ backgroundColor: "var(--kivo-teal)" }}
              className="w-full py-4 rounded-xl text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Siguiente →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 style={{ color: "var(--kivo-navy)" }} className="text-xl font-semibold">
              Elige el plan para {form.nombre}
            </h2>
            <div className="space-y-4">
              {planes.map((plan) => (
                <button
                  key={plan}
                  onClick={() => setForm({ ...form, plan })}
                  className="w-full text-left p-5 rounded-2xl border-2 transition-all"
                  style={{
                    borderColor: form.plan === plan ? "var(--kivo-teal)" : "#e5e7eb",
                    backgroundColor: form.plan === plan ? "#f0fdf9" : "white",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span style={{ color: "var(--kivo-navy)" }} className="font-semibold">{plan}</span>
                    {form.plan === plan && <span style={{ color: "var(--kivo-teal)" }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-xl border-2 font-semibold text-gray-600"
                style={{ borderColor: "#e5e7eb" }}
              >
                ← Atrás
              </button>
              <button
                onClick={calcularPrecio}
                disabled={!form.plan}
                style={{ backgroundColor: "var(--kivo-teal)" }}
                className="flex-1 py-4 rounded-xl text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Ver mi precio
              </button>
            </div>
          </div>
        )}

        {step === 3 && precio !== null && (
          <div className="text-center space-y-6">
            <div style={{ backgroundColor: "var(--kivo-navy)" }} className="rounded-2xl p-10">
              <p className="text-white/70 mb-2">Tu precio para {form.nombre} con {form.plan}</p>
              <p style={{ color: "var(--kivo-teal)" }} className="text-5xl font-bold mb-1">
                {precio}€
              </p>
              <p className="text-white/60 text-sm">al mes · sin permanencia</p>
            </div>
            <button
              style={{ backgroundColor: "var(--kivo-teal)" }}
              className="w-full py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Contratar ahora
            </button>
            <button
              onClick={() => { setStep(1); setForm({ especie: "", nombre: "", raza: "", edad: "", plan: "" }); setPrecio(null); }}
              className="w-full py-3 text-gray-500 text-sm hover:underline"
            >
              Calcular de nuevo
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
