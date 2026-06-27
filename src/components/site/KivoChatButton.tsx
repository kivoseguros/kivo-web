import { useState } from "react";
import { X, Send } from "lucide-react";
import kivoIa from "@/assets/kivo-ia.png.asset.json";

export function KivoChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes kivoPulse {
          0%   { transform: scale(1);    filter: drop-shadow(0 0 8px rgba(61,191,160,0.22)) drop-shadow(0 8px 18px rgba(27,42,74,0.18)); }
          50%  { transform: scale(1.06); filter: drop-shadow(0 0 16px rgba(61,191,160,0.42)) drop-shadow(0 10px 22px rgba(27,42,74,0.22)); }
          100% { transform: scale(1);    filter: drop-shadow(0 0 8px rgba(61,191,160,0.22)) drop-shadow(0 8px 18px rgba(27,42,74,0.18)); }
        }
        .kivo-chat-btn {
          animation: kivoPulse 3.5s ease-in-out infinite;
          background: transparent !important;
          box-shadow: none !important;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .kivo-chat-btn:hover {
          transform: translateY(-4px) scale(1.06);
          filter: drop-shadow(0 0 20px rgba(61,191,160,0.52)) drop-shadow(0 12px 24px rgba(27,42,74,0.24));
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .kivo-chat-btn { animation: none; }
        }

      `}</style>

      {/* Mini panel del chat (placeholder) */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl border border-border overflow-hidden animate-scale-in">
          <div className="flex items-center gap-3 p-4 bg-secondary text-white">
            <div className="relative h-10 w-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <img src={kivoIa.url} alt="KIVO IA" className="h-9 w-9 object-contain" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm leading-tight">KIVO IA</div>
              <div className="text-[11px] text-white/70 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
                En línea · Te ayudo en lo que necesites
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Cerrar chat" className="text-white/80 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 bg-muted/40 max-h-72 overflow-y-auto">
            <div className="flex gap-2 items-end">
              <img src={kivoIa.url} alt="" className="h-7 w-7 rounded-full bg-white shadow-sm" />
              <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-foreground shadow-sm max-w-[80%]">
                Hola, soy <strong>KIVO IA</strong> 👋<br />
                ¿En qué puedo ayudarte hoy?
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="flex items-center gap-2 p-3 border-t border-border bg-white"
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje…"
              className="flex-1 text-sm rounded-full border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir asistente KIVO IA"
        className="kivo-chat-btn fixed bottom-6 right-6 z-50 h-32 w-32 md:h-36 md:w-36 flex items-center justify-center cursor-pointer border-0 p-0"
      >
        <img src={kivoIa.url} alt="KIVO IA" className="h-full w-full object-contain" />
      </button>

    </>
  );
}
