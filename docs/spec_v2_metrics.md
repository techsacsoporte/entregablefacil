# Spec v2: Reasignación Inteligente de Citas y Métricas de Impacto

## 1. Problema y Contexto
Cuando un paciente cancela su cita matutina, el espacio queda vacío provocando pérdidas directas por tiempo de sillón ocioso de la Dra. Laura. Se requiere un mecanismo de reasignación con 1 clic para cubrir huecos en tiempo récord.

## 2. Nueva Característica: Reasignación Inmediata desde Lista de Espera
- La tarjeta de cita cancelada muestra de forma destacada el botón "Asignar paciente en espera".
- Al pulsar, despliega de inmediato a los pacientes que han solicitado adelantar turno o están en riesgo de abandono de tratamiento.
- Al seleccionar uno, actualiza el estado a "Confirmada" y abre una plantilla wa.me: *"Hola [Nombre], se liberó un espacio hoy a las [Hora] con la Dra. Laura. ¿Deseas tomarlo para tu sesión?"*

## 3. Criterios de Aceptación (¿Funciona técnicamente?)
- **CA-01:** La cancelación de una cita actualiza el contenedor a borde discontinuo (`border-dashed`) y eleva el contador superior de "Huecos libres".
- **CA-02:** El modal/dropdown de reasignación carga en menos de 100 ms y lista únicamente pacientes con tratamientos en curso o en espera activa.
- **CA-03:** Al confirmar el reemplazo, el enlace wa.me contiene fecha, hora exacta y tratamiento prellenado con codificación URI correcta.

## 4. Métricas de Éxito de Producto (¿Importó al negocio?)
- **Métrica 1 (Reducción de No-Shows):** Disminución de la tasa de inasistencia del 30% a menos del 12% en las primeras 4 semanas de uso.
- **Métrica 2 (Tiempo de Ocupación de Hueco / Time to Value):** Reducción del tiempo para rellenar una cancelación de 45 minutos (llamadas manuales) a menos de 5 minutos mediante WhatsApp en 1 clic.
- **Métrica 3 (Retención de Tratamientos Multisesión):** Recuperación de al menos el 70% de los pacientes marcados en alerta roja ("Riesgo de abandono").
