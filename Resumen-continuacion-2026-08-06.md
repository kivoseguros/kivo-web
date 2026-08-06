# Punto de continuación — 6 de agosto de 2026 (uso interno de Claude)

## Contexto
Sesión de auditoría + arreglos de la web KIVO (seguro reembolso perros/gatos, prototipo).
Detalles completos en `Informe-estado-KIVO-2026-08-06.md`. Datos del proyecto en memoria [[proyecto-kivo]].

## HECHO Y DESPLEGADO (commit c23d221 — live en kivo-web-seven.vercel.app)
- `.gitignore` (excluye PDFs/documentos personales).
- Quitado el texto falso "15% de descuento anual" (config.js).
- `kivo.es` / `hola@kivo.es` → **kivoseguros.com** / **hola@kivoseguros.com** (config.js + app.js).
- Ruta de reserva del asesor: `../KIVO Tarificador/` → `../tarificador/` (asistente.js).
- Cada mascota guarda/restaura `tipoRaza/raza/raza2/peso/interior` → arregla precio erróneo al editar en cotización multi-mascota (app.js).

## Deploy (.bat) — RESUELTO
- Se rompió porque yo quité el token de GitHub del remoto (sin auth). **Restaurado el token.**
- Además GitHub rechazaba mis commits por email privado (GH007) → ahora se firma con el email de GitHub correcto: `Kivoseguros <297371634+kivoseguros@users.noreply.github.com>`.
- El `.bat` de Carlos vuelve a funcionar igual que antes.
- **Trade-off:** el token `ghp_` sigue incrustado en `.git/config` (para que el .bat funcione sin login). Endurecer más adelante con GitHub Desktop/credential manager si se quiere.

## PENDIENTE AHORA MISMO
- **Arreglo del "retomar" (email) — hecho en local, SIN desplegar aún.** En `app.js`: (1) la vía URL ahora restaura `completedMascotas` (antes al volver/añadir/quitar desaparecían las mascotas); (2) `_buildRetomarUrl` ahora mete TODOS los datos por mascota (antes solo 8 campos → mascotas "a medias"). Sintaxis verificada (node --check OK).
- **Carlos va a ejecutar DESPLEGAR.bat** para subir este arreglo. Claude debe **mirar su pantalla y confirmar** que despliega bien (y ayudar si sale login/error).

## PENDIENTE / MÁS ADELANTE
- **Auditoría dinámica real** en navegador: simular dueño de 3 perros + 2 gatos, navegar adelante/atrás, añadir/quitar, retomar — comprobar que nada se rompe ni bloquea. (Tras desplegar el arreglo del retomar.)
- **WhatsApp:** número real pendiente (aún no lo tienen; placeholder `34600000000`).
- **Factores de precio** (multiplicadores edad/peso/etc.): se ajustan después de terminar el prototipo.
- **Duplicado carpeta `asistente`/`Asistente`** (mayúsculas): diferido — el asistente es solo un stub básico; arreglar cuando se desarrolle.

## Estado servicios (verificado en vivo)
- Vercel: plan Hobby; env vars OK (RESEND_API_KEY + SUPABASE_*). URL prototipo: kivo-web-seven.vercel.app. kivoseguros.com sin conectar (a propósito).
- Resend: dominio kivoseguros.com **verificado**; 3 emails (póliza / cotización / retomar).
- Supabase (Free): tabla `atribucion` con RLS (anon solo INSERT) = seguro.
