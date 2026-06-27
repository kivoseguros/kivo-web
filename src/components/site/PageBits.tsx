import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-accent/40 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {eyebrow && (
          <div className="text-sm font-bold text-primary uppercase tracking-wider mb-3">{eyebrow}</div>
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-secondary max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-5 text-lg text-secondary/75 max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 ${className}`}>
      {title && (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
}

export function CTACard({
  title,
  text,
  cta,
  to,
}: {
  title: string;
  text: string;
  cta: string;
  to: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="text-white/80 mt-2">{text}</p>
      </div>
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold hover:bg-primary/90 transition"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
