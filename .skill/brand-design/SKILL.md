---
name: brand-design
description: Guía de identidad visual, sistema de diseño y componentes UI para Clínica Laura
---

# Skill: Diseño de Marca e Identidad Visual (Clínica Laura)

Esta skill define las reglas de interfaz y estilo visual que los agentes deben aplicar en la aplicación para evitar interfaces genéricas.

## 1. Identidad y Tono
- **Propósito:** Software operativo clínico, limpio, confiable y de alta legibilidad para asistentes dentales.
- **Tono Visual:** Profesional, moderno, sin saturación visual y enfocado en la claridad de los datos.

## 2. Paleta de Colores
- **Color Primario (Clínico / Calma):**
  - Azul Salud: `#0284c7` (Sky 600) / `#0369a1` (Sky 700 para hover).
  - Fondo de marca suave: `#f0f9ff` (Sky 50).
- **Semáforo Operativo de Estados:**
  - *Confirmada / Éxito:* Verde esmeralda `#10b981` (Emerald 500) con texto `#065f46`.
  - *Pendiente / Advertencia:* Ámbar suave `#f59e0b` (Amber 500) con fondo `#fffbeb`.
  - *Riesgo de abandono / Cancelada:* Rojo coral `#ef4444` (Red 500) con fondo `#fef2f2`.
- **Fondos y Superficies:**
  - Fondo general: `#f8fafc` (Slate 50).
  - Tarjetas / Superficies: `#ffffff` con borde sutil `#e2e8f0` (Slate 200).

## 3. Tipografía y Jerarquía
- **Fuente Principal:** Inter o sistema sans-serif nativo.
- **Títulos:** Semibold a Bold (`font-semibold`), tracking ajustado (`tracking-tight`).
- **Números / Métricas:** ExtraBold (`font-bold`) en contadores superiores para lectura de reojo.
- **Etiquetas de Estado:** Tamaño pequeño (`text-xs`), mayúscula inicial o uppercase sutil con padding cómodo (`px-2 py-0.5 rounded-full`).

## 4. Componentes y Botones de Acción
- **Botón de WhatsApp:**
  - Color distintivo verde `#25D366` o botón outline con icono de mensaje verde para identificar rápidamente la acción de contacto directo.
- **Tarjetas de Citas:**
  - Disposición horizontal clara: `Hora | Paciente | Tratamiento | Acción rápida WhatsApp | Estado`.
  - Espaciado táctil accesible para no errar el clic en pantallas de mostrador.