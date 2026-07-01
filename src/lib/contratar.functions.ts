import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  pet: z.object({
    name: z.string().trim().min(1).max(60),
    species: z.enum(["perro", "gato"]),
    breed: z.string().trim().max(80).optional().nullable(),
    birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  }),
  holder: z.object({
    full_name: z.string().trim().min(2).max(120),
    dni: z.string().trim().min(8).max(20),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(30).optional().nullable(),
    address: z.string().trim().max(200).optional().nullable(),
    postal_code: z.string().trim().max(10).optional().nullable(),
  }),
  tier: z.enum(["care", "care_plus", "premium"]),
  iban: z.string().trim().min(15).max(34),
});

const PRICES: Record<"care" | "care_plus" | "premium", number> = {
  care: 19.9,
  care_plus: 29.9,
  premium: 49.9,
};

const TIPO_MAP: Record<"care" | "care_plus" | "premium", "CARE" | "CARE+" | "PREMIUM"> = {
  care: "CARE",
  care_plus: "CARE+",
  premium: "PREMIUM",
};

/** Genera una contraseña legible: Kivo + 4 letras minúsculas + 4 dígitos */
function generatePassword(): string {
  const letters = "abcdefghjkmnpqrstuvwxyz"; // sin i,l,o para evitar confusión visual
  const digits  = "23456789";               // sin 0,1 para evitar confusión visual
  let pass = "Kivo";
  for (let i = 0; i < 4; i++) pass += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 4; i++) pass += digits[Math.floor(Math.random() * digits.length)];
  return pass; // ej: Kivobnqt4827 — 12 chars, mayúscula + minúsculas + dígitos
}

export const createPolicy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const email = data.holder.email.toLowerCase();
    const iban  = data.iban.replace(/\s+/g, "").toUpperCase();

    const parts     = data.holder.full_name.trim().split(/\s+/);
    const nombre    = parts[0] ?? data.holder.full_name;
    const apellidos = parts.slice(1).join(" ") || null;

    const passwordAcceso = generatePassword();

    const { data: created, error: createErr } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: passwordAcceso,
        email_confirm: true,
        user_metadata: { full_name: data.holder.full_name },
      });

    if (createErr) {
      const msg = createErr.message?.toLowerCase() ?? "";
      if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
        throw new Error("Este email ya está registrado. Inicia sesión para contratar.");
      }
      throw new Error(createErr.message);
    }
    const userId = created.user?.id ?? null;
    if (!userId) throw new Error("No se pudo crear la cuenta");

    const { error: profErr } = await supabaseAdmin.from("usuarios").insert({
      id: userId, email, nombre, apellidos,
      dni: data.holder.dni, telefono: data.holder.phone || null,
      direccion: data.holder.address || null,
      codigo_postal: data.holder.postal_code || null, iban,
    });
    if (profErr) throw new Error(profErr.message);

    let raza_id: number | null = null;
    if (data.pet.breed) {
      const { data: razaRow } = await supabaseAdmin.from("razas").select("id")
        .eq("especie", data.pet.species).ilike("nombre", data.pet.breed).maybeSingle();
      raza_id = razaRow?.id ?? null;
    }

    const { data: mascota, error: petErr } = await supabaseAdmin.from("mascotas")
      .insert({ usuario_id: userId, nombre: data.pet.name, especie: data.pet.species,
        raza_id, fecha_nacimiento: data.pet.birth_date || null })
      .select("id").single();
    if (petErr) throw new Error(petErr.message);

    const { data: numRow, error: numErr } = await supabaseAdmin.rpc("generar_numero_poliza");
    if (numErr) throw new Error(numErr.message);
    const policyNumber = numRow as unknown as string;

    const { error: polErr } = await supabaseAdmin.from("polizas").insert({
      usuario_id: userId, mascota_id: mascota.id, numero_poliza: policyNumber,
      tipo: TIPO_MAP[data.tier], estado: "activa", prima_mensual: PRICEQ[data.tier],
    });
    if (polErr) throw new Error(polErr.message);

    try {
      const React = await import("react");
      const { render } = await import("@react-email/components");
      const { WelcomeEmail } = await import("@/lib/email-templates/welcome");
      const element = React.createElement(WelcomeEmail as any, {
        nombreTitular: data.holder.full_name, nombreMascota: data.pet.name,
        numeroPoliza: policyNumber, emailAcceso: email,
        passwordAcceso, tipoPoliza: TIPO_MAP[data.tier],
      });
      const html = await render(element);
      const text = await render(element, { plainText: true });
      const msgId = crypto.randomUUID();
      await supabaseAdmin.from("email_send_log").insert({
        message_id: msgId, template_name: "welcome", recipient_email: email, status: "pending",
      });
      await supabaseAdmin.rpc("enqueue_email", {
        queue_name: "auth_emails",
        payload: { run_id: msgId, message_id: msgId, to: email,
          from: "KIVO Seguros <hola@notify.kivoseguros.com>", sender_domain: "notify.kivoseguros.com",
          subject: `Bienvenido a KIVO — tu póliza ${policyNumber} está activa`,
          html, text, purpose: "transactional", label: "welcome", queued_at: new Date().toISOString() },
      });
    } catch (e) { console.error("welcome email failed", e); }

    return { policyNumber };
  });
