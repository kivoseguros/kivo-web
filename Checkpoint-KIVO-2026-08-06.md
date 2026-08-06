# CHECKPOINT KIVO — 6 ago 2026 (para retomar en chat nuevo)

## Estado: TODO DESPLEGADO Y FUNCIONANDO (live en kivo-web-seven.vercel.app)

### Arreglos hechos y desplegados hoy
- `.gitignore` (excluye PDFs/documentos personales).
- Quitado texto falso "15% descuento anual" (config.js).
- `kivo.es`/`hola@kivo.es` → **kivoseguros.com**/**hola@kivoseguros.com**.
- Ruta asesor `../KIVO Tarificador/` → `../tarificador/`.
- Cada mascota guarda/restaura `tipoRaza/raza/raza2/peso/interior` (precio correcto al editar multi-mascota).
- **Retomar desde email ARREGLADO**: la vía URL ahora restaura `completedMascotas` completo + el enlace lleva todos los datos. VERIFICADO en vivo: retomar con 2 mascotas restaura las 2 (antes solo 1).

### Deploy (.bat) — RESUELTO
- Fallaba porque **Windows no tenía Git instalado** ("git no se reconoce"). Carlos **instaló Git para Windows** → el .bat ya funciona.
- (Antes yo había quitado el token del remoto y lo restauré; commits se firman con `Kivoseguros <297371634+kivoseguros@users.noreply.github.com>` para evitar el bloqueo GH007 por email privado.)
- Las líneas "modified: Asistente/..." en el .bat = duplicado de mayúsculas (asistente vs Asistente), inofensivo.

### Verificado en la prueba dinámica (tarificador)
- Flujo completo OK. Precios EXACTOS (Rex perro 6 años: CARE 33,48 / CARE+ 53,88 / PREMIUM 81,48; RC 14,90; anual sin descuento).
- "Añadir otra mascota" funciona.
- Emails Resend: envían y **entregan** (test → Delivered al email de auditoría). Sistema OK.

### Servicios (verificado)
- Vercel Hobby, env vars OK. Resend dominio kivoseguros.com verificado. Supabase RLS OK (anon solo INSERT).
- Email de PRUEBAS: **kivosegurosauditoria@gmail.com** (usar siempre para tests). El tarificador acepta CUALQUIER email.

### PENDIENTE (próximo chat)
1. Terminar la prueba dinámica: 3 perros + 2 gatos, cambiar/quitar mascota, navegación adelante/atrás (quedó a medias — probado hasta 1 pet + retomar).
2. (Opcional) Limpiar el duplicado de carpeta `Asistente`/`asistente`.
3. Nota consumo: el trabajo con navegador + capturas gasta MUCHO; para pruebas usar inspección por código (JS) en vez de screenshots, y/o modelo Sonnet.

### Fallos aún NO arreglados / a revisar
- WhatsApp: número real pendiente (placeholder 34600000000).
- Duplicado carpeta Asistente/asistente (diferido; el asistente es stub básico).
- Factores de precio (multiplicadores): se afinan más adelante, tras terminar prototipo.
