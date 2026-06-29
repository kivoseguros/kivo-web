import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function CookiesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem("kivo_cookies");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => { if (typeof window !== "undefined") localStorage.setItem("kivo_cookies", "all"); setVisible(false); };
  const reject = () => { if (typeof window !== "undefined") localStorage.setItem("kivo_cookies", "essential"); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-[#1B2A4A] text-white shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/85">
          <span className="font-bold text-white">🍪 Cookies en KIVO</span>{" "}
          Usamos cookies técnicas (necesarias) y analíticas para mejorar tu experiencia. Puedes aceptarlas todas o solo las esenciales.{" "}
          <Link to="/cookies" className="text-[#3DBFA0] underline hover:no-underline">Política de cookies</Link>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
          >
            Solo esenciales
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-[#3DBFA0] px-5 py-2 text-xs font-bold text-white hover:bg-[#3DBFA0]/90 transition"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
