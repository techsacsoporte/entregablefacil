# Especificación Funcional: Sistema de Confirmación y Continuidad Dental

## 1. Resumen Ejecutivo
Herramienta operativa enfocada en dos problemas críticos:
1. Huecos en agenda por pacientes que no asisten a citas programadas.
2. Pérdida de continuidad en tratamientos de varias sesiones (endodoncia, ortodoncia) cuando cesa el dolor.

---

## 2. Historias de Usuario y Criterios de Aceptación (Formato Gherkin)

### HU-01: Confirmación Rápida de Agenda Matutina
**Como** asistente dental  
**Quiero** visualizar las citas de hoy y mañana agrupadas por estado  
**Para** enviar recordatorios por WhatsApp con un solo clic y confirmar la asistencia antes de iniciar la jornada.

- **Escenario 1: Envío de recordatorio por WhatsApp**
  - **Given** una cita en estado `Pendiente` para el día seleccionado.
  - **When** hago clic en el botón de WhatsApp de la fila del paciente.
  - **Then** el sistema abre una pestaña a `wa.me` con el teléfono del paciente y un texto predefinido que incluye nombre, fecha, hora y tipo de consulta.
  - **And** permite cambiar el estado de la cita a `Confirmada` con un solo clic.

- **Escenario 2: Cancelación y visualización de hueco libre**
  - **Given** un paciente que notifica que no asistirá.
  - **When** marco la cita como `Cancelada`.
  - **Then** la tarjeta visual se actualiza a `Hueco libre`.
  - **And** el contador superior de "Huecos libres hoy/mañana" se incrementa automáticamente.

---

### HU-02: Gestión de Reemplazo en Huecos Libres (Lista de Espera)
**Como** asistente dental  
**Quiero** ver sugerencias de pacientes en espera al generarse un espacio libre  
**Para** reasignar el horario inmediatamente y evitar tiempos muertos de la Dra. Laura.

- **Escenario 1: Asignación de paciente desde lista de espera**
  - **Given** un espacio disponible marcado como `Hueco libre`.
  - **When** pulso sobre el botón "Buscar reemplazo".
  - **Then** se despliega la lista de pacientes con tratamientos pendientes o solicitudes de cita anticipada.
  - **And** al seleccionar un paciente, el hueco pasa a estado `Confirmada` con los datos del nuevo paciente.

---

### HU-03: Seguimiento Preventivo de Tratamientos Multisesión
**Como** asistente dental  
**Quiero** un panel de monitoreo de pacientes con tratamientos activos  
**Para** contactar a quienes no han agendado su siguiente sesión y corren riesgo de abandono.

- **Escenario 1: Detección de paciente en riesgo de abandono**
  - **Given** un paciente con tratamiento multisesión (ej. Endodoncia 1 de 3 sesiones completada).
  - **And** han transcurrido más de 15 días desde su última visita sin próxima cita registrada en agenda.
  - **Then** el sistema lo lista en la sección "Seguimiento de tratamientos" con la etiqueta visual `En riesgo`.
  - **And** muestra una barra de progreso indicando el porcentaje de avance del tratamiento.

- **Escenario 2: Reactivación vía mensaje clínico preventivo**
  - **Given** un paciente marcado `En riesgo`.
  - **When** hago clic en "Escribir por WhatsApp".
  - **Then** se genera un mensaje enfocado en salud dental recordando que, aunque no haya dolor, suspender la sesión compromete el resultado del tratamiento.

---

## 3. Modelo de Datos Lógico (Solo lectura / Estado local)

### Entidad Cita (`Appointment`)
- `id`: string
- `patientName`: string
- `phone`: string
- `treatment`: string (ej. "Limpieza dental", "Endodoncia", "Ortodoncia")
- `sessionInfo`: string opcional (ej. "Sesión 2 de 3")
- `date`: string (ISO date)
- `time`: string (formato HH:mm)
- `status`: `'pendiente' | 'confirmada' | 'cancelada'`
- `notes`: string opcional

### Entidad SeguimientoTratamiento (`TreatmentTracking`)
- `id`: string
- `patientName`: string
- `phone`: string
- `treatment`: string
- `completedSessions`: number
- `totalSessions`: number
- `lastVisit`: string (días transcurridos o fecha)
- `nextAppointmentDate`: string | null
- `status`: `'al-dia' | 'en-riesgo'`

---

## 4. HU-04: Ergonomía visual y accesibilidad en mostrador
**Como** asistente dental
**Quiero** distinguir rápidamente acciones prioritarias y estados de agenda sin fatiga visual
**Para** operar la jornada matutina con precisión en listas largas.

- **Escenario 1: Acción de WhatsApp prioritaria**
  - **Given** un paciente en riesgo de abandono.
  - **When** visualizo su tarjeta de seguimiento.
  - **Then** el botón de WhatsApp usa el verde oficial sólido `#25D366`, icono y texto blancos, y un hover `#20ba5a`.

- **Escenario 2: Riesgo clínico legible**
  - **Given** una lista con varios tratamientos en riesgo.
  - **When** reviso el panel de seguimiento.
  - **Then** cada tarjeta permanece blanca y usa un acento izquierdo `border-l-4 border-l-rose-500`, sin rellenar toda la tarjeta de rojo.

- **Escenario 3: Hueco libre distinguible**
  - **Given** una cita cancelada.
  - **When** reviso la agenda.
  - **Then** la fila aparece con borde punteado y fondo ámbar tenue, y el botón “Asignar paciente en espera” tiene alta jerarquía visual.

- **Escenario 4: Fecha operativa actual**
  - **Given** que abro el panel cualquier día.
  - **When** consulto el encabezado.
  - **Then** la fecha mostrada corresponde al día actual y está formateada en español.

## 5. Criterios de Aceptación Técnicos y Verificación
1. **Zero Console Errors:** La aplicación debe compilar con `pnpm build` sin fallos de TypeScript ni hydration mismatches.
2. **Interactividad Local:** Las acciones de confirmar cita, cancelar cita y filtrar por fecha (Hoy / Mañana) deben actualizar el DOM al instante sin recarga de página.
3. **Responsive:** Vista adaptable a pantallas de escritorio y tablets de mostrador.
