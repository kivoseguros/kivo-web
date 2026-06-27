import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section } from "@/components/site/PageBits";

type FAQ = { q: string; a: string };

export type PlanData = {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  pct?: string;
  description?: string;
  coberturas?: string[];
  exclusiones?: string[];
  limites?: { label: string; value: string }[];
  faq?: FAQ[];
};

const PLACEHOLDER = "Contenido en desarrollo. Información pendiente de definición.";

function PlaceholderBlock({ text = PLACEHOLDER }: { text?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-secondary/80 text-sm italic">
      {text}
    </div>
  );
}

export function PlanPage({ plan }: { plan: PlanData }) {
  const hasCob = plan.coberturas && plan.coberturas.length > 0;
  const hasExc = plan.exclusiones && plan.exclusiones.length > 0;
  const hasLim = plan.limites && plan.limites.length > 0;
  const hasFaq = plan.faq && plan.faq.length > 0;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={`PLAN KIVO ${plan.name}`}
        title={plan.title}
        subtitle={plan.subtitle}
      />

      <Section title="Descripción">
        {plan.description ? (
          <p className="text-secondary/80 max-w-3xl">{plan.description}</p>
        ) : (
          <PlaceholderBlock />
        )}
      </Section>

      <Section title="Coberturas">
        {hasCob ? (
          <ul className="grid sm:grid-cols-2 gap-3">
            {plan.coberturas!.map((c) => (
              <li
                key={c}
                className="rounded-xl border border-border bg-card p-4 text-secondary"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <PlaceholderBlock />
        )}
      </Section>

      <Section title="Exclusiones">
        {hasExc ? (
          <ul className="grid sm:grid-cols-2 gap-3">
            {plan.exclusiones!.map((c) => (
              <li
                key={c}
                className="rounded-xl border border-border bg-card p-4 text-secondary"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <PlaceholderBlock />
        )}
      </Section>

      <Section title="Límites">
        {hasLim ? (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <tbody>
                {plan.limites!.map((l) => (
                  <tr key={l.label} className="border-b last:border-0 border-border">
                    <th className="py-4 px-5 font-semibold text-secondary w-1/2">{l.label}</th>
                    <td className="py-4 px-5 text-secondary/80">{l.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <PlaceholderBlock />
        )}
      </Section>

      <Section title="Preguntas frecuentes">
        {hasFaq ? (
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {plan.faq!.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-secondary">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition">+</span>
                </summary>
                <p className="text-secondary/80 mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        ) : (
          <PlaceholderBlock text="Próximamente disponible." />
        )}
      </Section>

      <Section className="!pt-4">
        <div className="rounded-3xl bg-secondary text-white p-10 text-center">
          <h2 className="text-2xl font-extrabold">KIVO {plan.name}</h2>
          <p className="text-white/80 mt-2">Información detallada próximamente disponible.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-bold hover:bg-primary/90"
          >
            Volver al inicio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
