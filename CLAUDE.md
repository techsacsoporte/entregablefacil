# Contexto y Reglas del Proyecto (Constitución / Steering)

## 1. Misión del Sistema
Panel operativo web para la asistente del consultorio dental de la Dra. Laura.
Optimizado para flujo de trabajo matutino en escritorio: reducir el 30% de inasistencias (no-shows) y evitar el abandono de tratamientos multisesión.

## 2. Stack Tecnológico
- Framework: Next.js 14+ (App Router).
- Lenguaje: TypeScript.
- Estilos: Tailwind CSS.
- Componentes UI: shadcn/ui + Radix UI.
- Iconos: lucide-react.

## 3. Límites Estrictos de Negocio (Out of Scope)
- PROHIBIDO implementar módulos de facturación, pasarelas de pago, cobros, presupuestos contables o emisión de recibos.
- PROHIBIDO implementar expedientes clínicos completos, odontogramas interactivos, historias médicas o recetas digitales.
- La aplicación complementa Google Calendar y WhatsApp; no sustituye la base de datos de historial médico.

## 4. Convenciones de Código y Arquitectura
- Componentes modulares dentro de `components/`.
- Uso estricto de Server Components donde no se requiera interactividad y Client Components (`"use client"`) para interacción de agenda y filtros.
- Enlaces de mensajería generados mediante `https://wa.me/{telefono}?text={mensaje}` con codificación URI (`encodeURIComponent`).
- Nomenclatura en español para entidades de dominio (Cita, Paciente, Tratamiento) y estados consistentes (`confirmada`, `pendiente`, `cancelada`, `en-riesgo`).
