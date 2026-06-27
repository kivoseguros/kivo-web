import Link from "next/link";

const products = [
  {
    id: "care",
    name: "KIVO CARE",
    tagline: "Lo esencial, sin complicaciones",
    price: "Desde 19€/mes",
    color: "#3DBFA0",
    features: [
      "Consultas veterinarias ilimitadas",
      "Urgencias 24h",
      "Telemedicina veterinaria",
      "Hasta 1.500€/año en tratamientos",
    ],
    highlight: false,
  },
  {
    id: "care-plus",
    name: "KIVO CARE+",
    tagline: "La cobertura que tu mascota merece",
    price: "Desde 34€/mes",
    color: "#1B2A4A",
    features: [
      "Todo lo de CARE",
      "Cirugías cubiertas",
      "Hospitalización",
      "Pruebas diagnósticas",
      "Hasta 3.000€/año en tratamientos",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "KIVO PREMIUM",
    tagline: "Cobertura total, sin límites",
    price: "Desde 54€/mes",
    color: "#3DBFA0",
    features: [
      "Todo lo de CARE+",
      "Especialistas y oncología",
      "Fisioterapia y rehabilitación",
      "Responsabilidad civil",
      "Cobertura ilimitada",
    ],
    highlight: false,
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--kivo-navy)" }} className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          El seguro que tu mascota<br />
          <span style={{ color: "var(--kivo-teal)" }}>realmente necesita</span>
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
          Cobertura veterinaria real, sin letra pequeña. Elige el plan que mejor se adapta a vosotros.
        </p>
        <Link
          href="/tarificar"
          style={{ backgroundColor: "var(--kivo-teal)" }}
          className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Calcular mi precio →
        </Link>
      </section>

      {/* Productos */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 style={{ color: "var(--kivo-navy)" }} className="text-3xl font-bold text-center mb-12">
          Elige tu plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl overflow-hidden shadow-lg flex flex-col ${
                p.highlight ? "ring-2 scale-105" : ""
              }`}
              style={{ ringColor: p.highlight ? "var(--kivo-teal)" : undefined }}
            >
              {p.highlight && (
                <div style={{ backgroundColor: "var(--kivo-teal)" }} className="py-2 text-center text-white text-sm font-semibold">
                  ⭐ Más elegido
                </div>
              )}
              <div
                style={{ backgroundColor: p.highlight ? "var(--kivo-navy)" : "#fff" }}
                className="p-8 flex-1"
              >
                <h3
                  style={{ color: p.highlight ? "var(--kivo-teal)" : "var(--kivo-navy)" }}
                  className="text-xl font-bold mb-1"
                >
                  {p.name}
                </h3>
                <p className={`text-sm mb-4 ${p.highlight ? "text-white/60" : "text-gray-500"}`}>
                  {p.tagline}
                </p>
                <p
                  style={{ color: "var(--kivo-teal)" }}
                  className="text-2xl font-bold mb-6"
                >
                  {p.price}
                </p>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight ? "text-white/80" : "text-gray-600"}`}>
                      <span style={{ color: "var(--kivo-teal)" }} className="mt-0.5 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/tarificar?plan=${p.id}`}
                  style={{
                    backgroundColor: p.highlight ? "var(--kivo-teal)" : "var(--kivo-navy)",
                    color: "white",
                  }}
                  className="block text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Contratar {p.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
