# Reglas de seguridad frontend

- **Sin `localStorage`/`sessionStorage`** para datos de app ni tokens.
- Cookies propias: `SameSite=Lax`, `Secure` en producción, `Path=/`, valor validado contra allowlist (zod enum) **al leer y al escribir**.
- Todo input de usuario y todo dato externo (incluidos mocks) se valida con **zod** en el borde (services / Server Actions).
- Server Actions: validar input, nunca confiar en el cliente, devolver errores genéricos.
- Respuestas correctas y lógica de corrección **solo en servidor** (`import "server-only"` en `services/`).
- Nunca `dangerouslySetInnerHTML` con datos dinámicos. Única excepción: el script de tema inline, con contenido **estático**.
- Headers de seguridad en `next.config.ts`: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`/`frame-ancestors`.
- No exponer secretos: solo `NEXT_PUBLIC_*` llega al cliente; no commitear `.env*`.
- Links externos con `rel="noopener noreferrer"`.
- `npm audit` sin vulnerabilidades altas/críticas antes de merge.
- El rol (estudiante/docente) en mocks es solo visual. La autorización real la hará el backend; `proxy.ts` solo hará chequeos optimistas.
