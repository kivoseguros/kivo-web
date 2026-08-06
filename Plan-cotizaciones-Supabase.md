# Plan: guardar cotizaciones en Supabase (vinculadas al email) — KIVO

## Objetivo
Que cada cotización se guarde en servidor (Supabase), vinculada al email del cliente, para que al volver se recupere de forma fiable (no depender de localStorage ni de meter todos los datos en la URL).

## Diseño
1. **Tabla Supabase `cotizaciones`**:
   - `token` (uuid, clave para el enlace), `email` (text), `mascotas` (jsonb), `total` (numeric), `periodo` (text), `estado` (text: 'vista_precios' / 'abandonada' / 'contratada'), `created_at`, `updated_at`.
   - RLS: **anon puede INSERT** (como la tabla `atribucion`). La LECTURA NO se abre a anon.
2. **Guardar**: al llegar a precios (email B) → INSERT/UPSERT en `cotizaciones` con un `token` único. Actualizar `estado` según avanza (abandona → 'abandonada'; contrata → 'contratada').
3. **Enlace del email**: en vez de `pet0=...&pet1=...` (largo), llevar solo `?cot=TOKEN` (enlace corto).
4. **Recuperar**: al abrir el link, el tarificador llama a un endpoint serverless nuevo **`/api/cotizacion?token=...`** que usa `SUPABASE_SERVICE_ROLE_KEY` (ya está en Vercel) para hacer SELECT por token de forma segura y devolver la cotización → se restaura en el tarificador.

## Ventajas
- Datos a salvo en servidor, vinculados al email.
- Enlace corto y robusto (funciona en cualquier dispositivo).
- Se pueden ver/analizar todas las cotizaciones (leads) y su estado.

## Seguridad
- anon solo INSERT (nunca leer cotizaciones de otros).
- La lectura por token se hace en el servidor con service role (nunca exponer service role al cliente).

## Pendiente de implementar (próxima sesión)
- Crear tabla + RLS en Supabase.
- Endpoint `/api/cotizacion` (GET por token, service role).
- Ajustar tarificador: guardar en Supabase (email B), enlace corto con token, y restaurar desde `/api/cotizacion`.
- (Relacionado: mover email B a `showResults` y crear email A de captación.)
