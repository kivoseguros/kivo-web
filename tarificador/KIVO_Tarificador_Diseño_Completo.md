# KIVO SEGUROS — Diseño Completo Tarificador + Contratación
## Basado en análisis del flujo Musky (julio 2026)

---

## REFERENCIA: FLUJO MUSKY COMPLETO

### TARIFICADOR (7 pasos one-question-per-screen + página de resultado)

| URL step= | Pregunta | Tipo de input |
|-----------|----------|---------------|
| step=1 | Landing: selector Perro / Gato | Dos botones grandes con icono + nombre mascota |
| step=2 | "¿Cómo se llama tu [perro/gato]?" | Input texto |
| step=3 | "¿Es macho o hembra, [nombre]?" | Dos botones (Macho / Hembra) — selección avanza sola |
| step=4 | "¿Cuándo nació [nombre]?" | Selector fecha (MM/YYYY) |
| step=5 | "¿De qué raza es [nombre]?" | Toggle Pura raza / Cruce + buscador con autocomplete |
| step=6 | "¿Tu familia está completa?" | Multi-mascota: añadir más o Continuar + oferta familia numerosa |
| step=7 | "¡Estamos preparando tu oferta!" | Email + Teléfono + Código descuento + 3 checkboxes legales |
| /cotizacion/detalles | RESULTADO | Precio + RC opcional + declaración salud + Contratar |

**UX tarificador Musky:**
- Sin navbar durante el tarificador (solo logo + botón contacto)
- Flecha ← arriba izquierda para retroceder
- Puntos de progreso arriba al centro
- Fondo blanco/gris muy claro
- Una pregunta visible a la vez, animación de transición
- Botón "Continuar" o selección directa avanza automáticamente

**Detalle paso 5 — Raza:**
- Toggle: [Pura raza] | [Cruce] (NO "Mestizo")
- Si Pura raza: buscador con autocomplete/filter-as-you-type
- Si Cruce: selector de tamaño (Pequeño / Mediano / Grande)

**Detalle paso 6 — ¿Tu familia está completa?**
- Muestra la mascota ya configurada (tarjeta con icono + nombre + raza)
- Botón "+ Añadir otro peludo" (añade 2ª mascota al flujo)
- Botón "Continuar" (debajo del fold — hay que hacer scroll)
- Banner oferta familia numerosa si hay >1 mascota

**3 checkboxes legales en paso 7:**
1. Acepto la Política de privacidad y los Términos y condiciones de uso (obligatorio)
2. Acepto recibir información sobre mi seguro de mascotas y asistencia por WhatsApp a través de Musky Solutions, S.L. Podré darme de baja en cualquier momento respondiendo 'STOP'
3. Acepto recibir comunicaciones comerciales personalizadas de Musky sobre sus productos y servicios y sobre los de terceros colaboradores

### PÁGINA DE RESULTADOS MUSKY — Auditoría completa
URL: `/cotizacion/detalles?quot=XXXX`

**Navbar:** Logo Musky visible (aparece aquí, no durante el tarificador)

**Título:** "Revisa el detalle y escoge tu plan a medida"

**Toggle frecuencia de pago:**
- "¿Con qué frecuencia pagarías?" → [Mensual] | [Anual (con badge descuento)]
- En modo Anual: precio tachado visible (ej. 645,36 → 629,29 €/año)

**Tarjeta mascota:**
- Avatar circular con icono
- Nombre + Sexo, Raza, Edad
- Precio mensual: 53,78 €/mes | Precio anual: 629,29 €/año (645,36 tachado)

**Sección en dos columnas dentro de la tarjeta:**

Columna izquierda — RC:
- ☐ "Agregar Responsabilidad Civil" [badge Opcional]
- 3,06 €/mes | 35,69 €/año
- "Indemnización por daños a terceros causados por la mascota, con un límite de 150.000 euros por siniestro."

Columna derecha — Declaración de salud:
- "¿Tiene o ha tenido alguna enfermedad o lesión?"
- [Sí] | [No]
- Si Sí: dropdown multi-select "Selecciona una o más opciones":
  - Alergias alimentarias, Alergias cutáneas, Artritis, Dermatitis, Diabetes mellitus
  - Dilatación y vólvulo gástrico, Displasia de cadera, Enfermedad de Lyme
  - Enfermedad dental, Enfermedad inflamatoria intestinal, Epilepsia
  - Gusano del corazón, Hipotiroidismo, Hipoxia, Infecciones de oído
  - Insuficiencia pancreática exocrina, Leptospirosis, Moquillo canino
  - Obesidad, Parvovirus, Rabia, Síndrome de Wobbler, Tos de las perreras
  - Otras enfermedades
- Banner azul tras seleccionar: "Aseguraremos a tu mascota independiente de su enfermedad o lesión, pero no cubriremos los gastos por tratamiento de estas que hayan mostrado síntomas o comenzado antes de contratar el seguro."

**Sección "Condiciones generales"** (4 ítems en grid 2x2 con iconos):
1. Reembolso del 80% en enfermedades y accidentes
2. Revisión anual y vacunas obligatorias
3. Hasta 3.000 €/año de cobertura
4. Válido en la clínica veterinaria en España que tú elijas
- Link "Desplegar más información ↓" → expande a "Ocultar información ↑"

**Contenido expandido (Desplegar más información):**
Seguro Salud:
- Reembolso de gastos por tratamientos de accidentes o enfermedades (consultas, cirugía, medicamentos, diagnósticos, cuidados posteriores)
- Tratamientos complementarios: quiropráctica, hidroterapia, acupuntura, terapia conductual (hasta 9 sesiones)
- Atención hospitalaria y ambulatoria
- Cobertura dental por accidentes
- Dieta específica para disolver piedras o cristales urinarios
- Tratamiento con células madre
- Periodos de carencia: 5 días accidentes, 25 días enfermedades, 6 meses algunas condiciones
- Gastos de eutanasia y eliminación de restos (si lo prescribe veterinario)
- Cobertura en extranjero (UE) hasta 3 meses
Seguro Preventivo:
- Revisión veterinaria anual preventiva
- Vacunas obligatorias por calendario:
  - Perros: Rabia, Vacuna polivalente, Tos de las perreras, Primovacunación
  - Gatos: Rabia, Vacuna trivalente, Leucemia, Primovacunación

**Sección "Detalle completo (IPID)":**
- Link descargable: 📄 [Nombre mascota] → PDF IPID personalizado con nombre
- ⚠️ KIVO NO pondrá IPID aquí — se descarga solo tras elegir uno de los 3 planes

**Banner cross-sell:**
- Tractive — "¡Contrata ahora y disfruta de nuestras promociones exclusivas!"

**Sidebar derecha (sticky):**
- "Valor total: 53,78 €/mes" (o XX €/año en anual)
- Botón "Contratar" (rosa Musky / verde #3DBFA0 en KIVO) → inicia contratación
- ⏰ "14 días para dar un vistazo" — reembolso 100% si desistimiento
- "¿Aún con dudas? Escríbenos por Whatsapp"
- Botón verde WhatsApp "Contactar"

---

### CONTRATACIÓN (4 pasos)

**PASO C1 — "La letra pequeña, ahora en grande"** → `/contratacion?step=1`

UX: ← (círculo, arriba izquierda) | Logo centro | Puntos ●○○○ (4 pasos)
Título: "La letra pequeña, ahora en grande"
Subtítulo: "Lee con atención y confirma si has entendido estos puntos importantes de la póliza"

4 tarjetas con icono + título + texto bold + texto normal + checkbox "He leído y entiendo.":

**Tarjeta 1 — Microchip** [icono: chip/toggle verde con señal wifi]
- **"Para que puedas solicitar reembolsos, tu mascota debe tener el microchip implantado."**
- "Una vez lo tengas, podrás añadirlo fácilmente desde la app de Musky."
- ☐ He leído y entiendo.

**Tarjeta 2 — Cartilla de vacunación** [icono: libreta con cruz médica verde]
- **"Para poder solicitar reembolsos, será necesario adjuntar en la app de Musky la cartilla de vacunación y/o el pasaporte de la mascota."**
- "En el momento de solicitar un reembolso, Musky verificará la información facilitada por el usuario."
- ☐ He leído y entiendo.

**Tarjeta 3 — Periodo de carencia** [icono: documento/clipboard verde]
- **"En Musky, el período de carencia es de 25 días para enfermedades y 5 días para accidentes."**
- "Durante esos días, no podremos cubrir tus gastos, pero después estaremos aquí para ti y tu compañero de cuatro patas."
- ☐ He leído y entiendo.

**Tarjeta 4 — Enfermedades y lesiones preexistentes** [icono: tirita/banda adhesiva verde]
- **"Las enfermedades y/o lesiones que tu mascota ya tiene o ha tenido antes de unirse a Musky (preexistentes), no estarán cubiertas por nuestro seguro."**
- "Pero no te preocupes, te cubrimos las demás para que tu peludo siempre esté protegido."
- ☐ He leído y entiendo.

Botón [Continuar] (rosa, ancho completo) — solo activo si los 4 checkboxes marcados
Footer: ©Musky (v.2.10.0) — pequeño, abajo izquierda
Botón flotante WhatsApp — círculo verde, abajo derecha (presente en toda la contratación)

**PASO C2 — "Datos personales"** → `/contratacion?step=2`

UX: ← (círculo, arriba izquierda) | Logo centro | Puntos ○●○○ (completado = rosa claro, activo = rosa oscuro)
Título: "Datos personales"
Subtítulo: "Añade los datos personales que aparecen en la cartilla de [nombre mascota]. Es necesario para validar su seguro."

Campos en grid 2 columnas:
- [Nombre] | [Apellidos]
- [Fecha de nacimiento dd/mm/aaaa] + icono 📅 rosa | [DNI/NIE]
- [Correo electrónico] (prellenado del tarificador) | [Teléfono] (prellenado del tarificador)

Botón [Continuar] — inactivo hasta que todos los campos estén rellenos
Botón flotante WhatsApp — círculo verde, abajo derecha
⚠️ KIVO: el botón de WhatsApp debe ir vinculado a la IA de KIVO para resolver preguntas automáticamente (no WhatsApp humano directo)

**PASO C3 — Dirección**
- Código postal → Ciudad autocompletada
- Tipo de vía: dropdown (Calle / Avenida / Travesía / Camino)
- Dirección (nombre de la calle)
- Número
- Piso, Puerta, Bloque, Escalera
→ Confirmación: "¿Esta dirección es correcta? [dirección formateada] — Sí, continuar"

**PASO C4 — Verificación y Pago**
Layout: columna izquierda (resumen) + sidebar derecha (precio + CTA)

Columna izquierda:
- Datos personales (con lápiz editar)
- Dirección (con lápiz editar)
- Coberturas a contratar: foto mascota + raza + precio/mes
- Documentación:
  - "Detalle completo (IPID)" → link PDF descargable
  - "Pólizas (borrador)" → link PDF descargable
- Checkbox 1: "He leído y acepto la Póliza del seguro, el Documento de información previa (IPID) y la Política de privacidad"
- Checkbox 2: "Declaro que la información facilitada sobre la edad, raza, fecha de nacimiento y enfermedades previas de la mascota asegurada es veraz y completa"

Sidebar derecha (sticky):
- Valor total: XX,XX €/mes
- Botón "Pagar" (→ Stripe)
- "14 días para dar un vistazo" — desistimiento 100% reembolso
- "¿Aún con dudas? Escríbenos por WhatsApp"

---

## DISEÑO KIVO — TARIFICADOR ADAPTADO

### DIFERENCIAS RESPECTO A MUSKY

| Concepto | Musky | KIVO |
|----------|-------|------|
| Resultado | 1 precio único | 3 planes (CARE / CARE+ / PREMIUM) |
| RC | Opcional add-on | RC Suelta = 4º opción separada |
| Colores | Rosa (#E91E8C) | Azul navy (#1B2A4A) + verde (#3DBFA0) |
| Asistente IA | WhatsApp | Botón flotante KIVO IA en todo momento |
| PREMIUM | No aplica | Color oro (#B48841) |

---

## KIVO — ARQUITECTURA COMPLETA

### PARTE 1: TARIFICADOR (7 pasos)

**PASO 0 — Hero/Landing (encima del fold)**
- Título: "Calcula el precio del seguro de tu mascota"
- Subtítulo: "Sin letra pequeña. Sin sorpresas."
- Selector grande: [🐶 Perro] [🐱 Gato]
- Al hacer clic → entra en el flujo
- Botón flotante KIVO IA visible (esquina inferior derecha)

**PASO 1 — Nombre**
- "¿Cómo se llama tu mascota?"
- Input texto grande
- Flecha ← | ● ○ ○ ○ ○ ○ ○ | [Continuar]

**PASO 2 — Sexo**
- "¿Es macho o hembra, [nombre]?"
- Dos botones: [Macho] [Hembra]
- Selección avanza automáticamente

**PASO 3 — Fecha de nacimiento**
- "¿Cuándo nació [nombre]?"
- Selector mes/año
- [Continuar]

**PASO 4 — Raza**
- "¿De qué raza es [nombre]?"
- Toggle: [Pura raza] [Mestizo/a]
- Si Pura raza: buscador con lista de razas
- Si Mestizo: selector de tamaño (Pequeño <10kg / Mediano 10-25kg / Grande >25kg)

**PASO 5 — Datos de contacto + legal**
- "Ya casi estamos"
- Email
- Teléfono
- Código de descuento (opcional, desplegable)
- 3 checkboxes legales:
  1. ☐ He leído y acepto las Condiciones Generales, el IPID y la Política de Privacidad de KIVO Seguros
  2. ☐ Acepto recibir comunicaciones comerciales de KIVO Seguros por email y SMS
  3. ☐ Acepto que KIVO comparta mis datos con la aseguradora para la prestación del servicio
- [Ver mis precios →]

**PASO 6 — RESULTADO: 3 planes + RC Suelta**

Layout: toggle mensual/anual + 3 tarjetas + declaración salud + 1 tarjeta RC Suelta

**Toggle global:** [Mensual] | [Anual] (con badge "ahorra X€") — cambia precios en todas las tarjetas

**3 tarjetas de plan (en columnas):**

| Plan | Color acento | Badge | Precio mensual | Precio anual |
|------|-------------|-------|----------------|--------------|
| CARE | Verde #3DBFA0 | — | XX,XX €/mes | XX,XX €/año |
| CARE+ | Azul #1B2A4A | "Más popular" | XX,XX €/mes | XX,XX €/año |
| PREMIUM | Oro #B48841 | "Mejor cobertura" | XX,XX €/mes | XX,XX €/año |

Cada tarjeta es una RÉPLICA EXACTA de las tarjetas de la web KIVO (sección planes/coberturas), pero con el precio real calculado para esa mascota:
- Mismo diseño visual, mismo layout, mismas coberturas listadas
- **Precio mensual prominente** + **precio anual equivalente visible** (pestaña / subtexto debajo)
  - Ejemplo: "XX,XX €/mes" grande + "o XX,XX €/año" debajo en gris
  - Toggle global cambia cuál precio se resalta, pero ambos visibles
- ⚠️ IPID NO aquí — se descarga solo en paso C4 tras elegir plan
- Botón [Contratar este plan] → inicia contratación para ese plan

> DECISIÓN DE DISEÑO: las tarjetas del resultado = mismas tarjetas que ya están en la web, personalizadas con precio real calculado.

**Declaración de salud** (debajo de las tarjetas, igual que Musky):
- "¿Tu mascota tiene o ha tenido alguna enfermedad o lesión?"
- [Sí] | [No]
- Si Sí: dropdown multi-select con lista de enfermedades
- Banner informativo sobre exclusiones de preexistencias

**Condiciones generales (desplegable):**
Seguro Salud (adaptado coberturas KIVO):
- Reembolso X% gastos por accidentes/enfermedades
- Tratamientos complementarios
- Atención hospitalaria y ambulatoria
- Cobertura dental por accidentes
- Tratamiento con células madre
- Periodos de carencia KIVO (según CG AyE v2.3)
- Gastos eutanasia
- Cobertura extranjero (UE)
Seguro Preventivo (Plan Básico):
- Revisión anual preventiva
- Vacunas obligatorias (Perros: Rabia, Polivalente, Tos perreras / Gatos: Rabia, Trivalente, Leucemia)

**RC como complemento (add-on en cada tarjeta de plan):**
- Checkbox "Añadir Responsabilidad Civil" dentro de cada tarjeta CARE/CARE+/PREMIUM
- Muestra precio RC/mes + precio RC/año visible
- Al marcarlo: el precio total de la tarjeta se actualiza sumando el RC

**RC Suelta (tarjeta separada debajo — 4ª opción):**
- Réplica de la tarjeta RC de la web KIVO, con precio real calculado
- Precio mensual prominente + precio anual equivalente (igual que los 3 planes)
- "¿Solo necesitas RC?"
- Botón [Contratar RC] → inicia contratación del plan RC Suelta

Botón flotante KIVO IA presente en todo momento.

---

### PARTE 2: CONTRATACIÓN (4 pasos)

**PASO C1 — Antes de continuar**
Título: "Antes de continuar, léete esto"
(Equivalente a "La letra pequeña" de Musky — texto legal resumido)

4 checkboxes:
1. ☐ He leído y acepto las condiciones generales de KIVO Seguros, el IPID y la Política de privacidad (obligatorio)
2. ☐ Autorizo a KIVO a usar mis datos para comunicaciones comerciales sobre productos propios (opcional)
3. ☐ Autorizo a KIVO a compartir mis datos con Wakam (aseguradora) para la gestión de la póliza (obligatorio)
4. ☐ Declaro que la mascota asegurada no padece enfermedades graves preexistentes ni está en tratamiento veterinario activo (obligatorio)

Botón [Continuar →] (solo activo si obligatorios marcados)

**PASO C2 — Tus datos personales**
- Nombre
- Apellidos
- Fecha de nacimiento
- DNI/NIE
- Email (prellenado desde tarificador)
- Teléfono (prellenado desde tarificador)
- [Continuar →]

**PASO C3 — ¿Dónde vives?**
- Código postal → Ciudad (autocompletada)
- Tipo de vía: Calle / Avenida / Travesía / Camino
- Nombre de la vía
- Número
- Piso / Puerta / Bloque / Escalera
→ Confirmación de dirección: "¿Es correcta esta dirección? [dirección formateada]"
→ [Sí, continuar]

**PASO C4 — Revisa y paga**

Columna izquierda:
- Bloque "Datos personales" (editable ✏️)
- Bloque "Dirección" (editable ✏️)
- Bloque "Tu plan": plan elegido + mascota + precio/mes
- Bloque "Documentación":
  - [📄 IPID — Plan CARE/CARE+/PREMIUM]
  - [📄 Condicionado General AyE]
  - [📄 Condicionado General RC] (si aplica)
- Checkbox 1: "He leído y acepto la Póliza del seguro, el IPID y la Política de privacidad de KIVO Seguros"
- Checkbox 2: "Declaro que la información facilitada sobre mi mascota (edad, raza, fecha de nacimiento y enfermedades previas) es veraz y completa"

Sidebar derecha (sticky):
- Plan seleccionado: nombre + precio
- Valor total: XX,XX €/mes (o XX €/año)
- Botón [Pagar] → Stripe
- ✅ 14 días de desistimiento — reembolso 100%
- 📞 ¿Dudas? WhatsApp KIVO

---

## ELEMENTOS GLOBALES DEL FLUJO

### KIVO IA — Botón flotante
- Presente en TODOS los pasos del tarificador y contratación
- Posición: esquina inferior derecha
- Color: verde #3DBFA0, icono de chat/robot
- Al hacer clic: abre panel lateral o modal con el asistente IA
- Función: resolver dudas sobre coberturas, planes, proceso

### Navegación
- Sin navbar visible durante el flujo
- Solo: logo KIVO (pequeño, arriba izquierda) + botón KIVO IA
- Flecha ← retroceder (arriba izquierda, junto al logo)
- Puntos de progreso (arriba centro): ● ● ○ ○ ○ ○

### Colores KIVO
```
--blue:    #1B2A4A  (navy principal)
--green:   #1B4D3E  (verde oscuro)
--green-l: #3DBFA0  (verde claro — CTAs, CARE)
--gold:    #B48841  (PREMIUM)
--white:   #FFFFFF
--gray-bg: #F8F8F6  (fondo pasos)
```

### Footer (solo visible en landing, no durante el flujo)
- Descarga IPIDs: CARE / CARE+ / PREMIUM / RC Suelta
- Descarga Condicionados: AyE + RC
- Links legales: Política privacidad / Aviso legal / Cookies

---

## PASO C4 (continuación) — SIDEBAR ANTES DE STRIPE

**Sidebar derecha (sticky):**
- Precio total: XX,XX €/mes
- Botón **"Pagar"** (rosa en Musky → verde #3DBFA0 en KIVO)
- ✅ "14 días para dar un vistazo" — desistimiento 100% reembolso
- Botón **WhatsApp verde**: "¿Aún con dudas? Escríbenos por WhatsApp, te ayudaremos lo antes posible a resolverlas"
  - Al hacer clic → pop-up WhatsApp: "Abrir aplicación" / "Continuar en WhatsApp Web"
  - Número Musky: +34 602 714 589 → **Para KIVO: usar número real de KIVO**

---

## STRIPE CHECKOUT — ANÁLISIS COMPLETO DE BOTONES Y OPCIONES

### Cabecera Stripe
- Botón **← Atrás** (vuelve a la página de Musky)
- Logo circular Musky + texto "Musky"

### Métodos de pago rápido (arriba del todo)
- Botón **Apple Pay** (negro, ancho completo) — solo aparece si el browser/dispositivo lo soporta
- Separador "o"

### Sección Contacto
- Campo **Correo electrónico** — prellenado con el email del tarificador (no editable)

### Sección Método de pago (3 opciones radio)

**Opción 1 — Tarjeta** ○
Al seleccionar despliega:
- Campo: **Número de tarjeta** (acepta Visa / Mastercard / Amex / Discover)
- Campo: **MM/AA** (caducidad)
- Campo: **Código de seguridad** (CVV)
- Campo: **Nombre del titular de la tarjeta**
- Sección "Datos de facturación": dropdown País
- Botón CTA: **"Guardar tarjeta"** (rosa/color marca)

**Opción 2 — Google Pay** ○
Al seleccionar → abre Google Pay nativo del navegador

**Opción 3 — Adeudo SEPA** ○ (domiciliación bancaria)
Al seleccionar despliega:
- Campo: **IBAN** (placeholder: ES00 0000 0000 0000 0000 0000)
- Sección "Datos de facturación":
  - Campo: **Nombre completo**
  - Dropdown: **País** (default: Francia — hay que cambiar a España para KIVO)
  - Campo: **Línea 1 de dirección**
- Texto legal SEPA (mandato de domiciliación bancaria — obligatorio por regulación)
- Botón CTA: **"Configura la cuenta bancaria"** (rosa/color marca)

### Pie de página Stripe
- "Powered by **Stripe**" (logo)
- Link: **Condiciones**
- Link: **Privacidad**

---

### PARA KIVO — Configuración Stripe (DECISIÓN DE CARLOS)
- Métodos: **Solo tarjeta** (Visa/Mastercard/Amex) — por el momento
- Apple Pay / Google Pay / SEPA: añadir más adelante si se decide
- Email prellenado desde tarificador
- Color botón CTA: **#3DBFA0** (verde KIVO)
- Nombre comercial en Stripe: **KIVO Seguros, S.L.**

---

## POST-PAGO — EMAIL DE BIENVENIDA + ACCESO APP

### Email de bienvenida (enviado vía Resend tras pago confirmado)

**Estructura del email:**
1. **Header con imagen KIVO** (branding completo — logo + foto mascota / ilustración KIVO)
2. "Bienvenido/a a KIVO, [nombre]. Tu mascota ya está protegida."
3. **Documentación de la póliza (adjunto o links):**
   - 📄 Condicionado General KIVO AyE
   - 📄 Condicionado Particular (póliza personalizada del cliente)
   - 📄 IPID del plan contratado
4. **CTA principal en grande:** botón/link descargable de la app KIVO
   - Texto: "Descarga la app KIVO" o "Accede a tu póliza desde la app"
   - Dos botones: [App Store] y [Google Play]
5. Resumen del plan: mascota, plan, precio, fecha de inicio
6. Footer KIVO (logo pequeño, datos legales, contacto)

> Herramienta: **Resend** (API key pendiente de configurar)

---

### Secuencia de recuperación — Cliente que NO completa el pago

Si el cliente llega al tarificador (o a contratación) pero **no finaliza el pago**, se activa una secuencia automática de emails de recuperación:

**Trigger:** cliente introduce su email en el paso de datos de contacto (C2) pero no llega a pagar.

**Cadencia (cada 2 días):**

| Email | Día | Asunto / Enfoque |
|-------|-----|-----------------|
| Email 1 | +2d | "Olvidaste algo, [nombre]" — recordatorio suave, enlace directo a retomar |
| Email 2 | +4d | "Tu mascota sigue sin cobertura" — beneficio emocional, urgencia blanda |
| Email 3 | +6d | "¿Tienes alguna duda? Te ayudamos" — objeción / CTA WhatsApp KIVO IA |
| Email 4 | +8d | Oferta o beneficio especial (si aplica) — último intento |

Todos los emails llevan:
- Imagen KIVO en el header
- Resumen del plan calculado (precio, mascota, plan)
- Botón CTA: "Retomar mi presupuesto" → URL directa al tarificador con datos prellenados (si es posible) o al inicio
- Footer con datos legales + opción de baja/unsubscribe

> Implementación: Resend + Supabase (registro del lead y estado en tabla `leads`)

---

### Login app KIVO — Magic Code (sin contraseña inicial)

**Flujo de acceso:**
1. Cliente abre la app KIVO por primera vez
2. Introduce su **email** (el mismo del tarificador / contrato)
3. Pulsa "Continuar" / "Enviar código"
4. Le llega un **código numérico** (OTP) a su email (enviado vía Resend)
5. Introduce el código en la app
6. Una vez dentro, puede **crear/establecer su contraseña** para futuros accesos
7. Desde ese momento: acceso normal con email + contraseña

> No hay registro previo — el email ya está en Supabase desde la contratación.
> El código OTP caduca (tiempo por definir: 10 min recomendado).

---

## ESTADO: LISTO PARA CONSTRUIR
Fecha: 09/07/2026
