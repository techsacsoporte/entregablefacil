'use client'

import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  HeartPulse,
  MessageCircle,
  MoreHorizontal,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  XCircle,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type AppointmentStatus = 'Pendiente' | 'Confirmada' | 'Cancelada'
type Appointment = { id: number; time: string; period: string; name: string; phone: string; type: string; detail: string; status: AppointmentStatus; day: 'Hoy' | 'Mañana' }

type Treatment = { id: number; name: string; phone: string; treatment: string; progress: string; completed: number; total: number; lastVisit: string; frequency: string; risk: boolean; next: string }
type WaitlistPatient = { id: number; name: string; phone: string; treatment: string; reason: string }

const initialAppointments: Appointment[] = [
  { id: 1, time: '09:00', period: 'AM', name: 'Mariana López', phone: '+52 55 1842 9301', type: 'Limpieza dental', detail: 'Primera visita', status: 'Confirmada', day: 'Hoy' },
  { id: 2, time: '10:30', period: 'AM', name: 'Carlos Méndez', phone: '+52 55 6302 1188', type: 'Endodoncia', detail: 'Sesión 2 de 3', status: 'Pendiente', day: 'Hoy' },
  { id: 3, time: '12:00', period: 'PM', name: 'Sofía Ramírez', phone: '+52 55 4401 7290', type: 'Valoración', detail: 'Dolor molar', status: 'Pendiente', day: 'Hoy' },
  { id: 4, time: '16:00', period: 'PM', name: 'Diego Hernández', phone: '+52 55 9120 4631', type: 'Ortodoncia', detail: 'Ajuste mensual', status: 'Cancelada', day: 'Hoy' },
  { id: 5, time: '09:30', period: 'AM', name: 'Valentina Cruz', phone: '+52 55 7721 0084', type: 'Implante dental', detail: 'Sesión 1 de 2', status: 'Pendiente', day: 'Mañana' },
  { id: 6, time: '11:00', period: 'AM', name: 'Jorge Castillo', phone: '+52 55 3620 4408', type: 'Limpieza dental', detail: 'Control semestral', status: 'Confirmada', day: 'Mañana' },
  { id: 7, time: '13:00', period: 'PM', name: 'Lucía Torres', phone: '+52 55 8091 3372', type: 'Rehabilitación', detail: 'Sesión 3 de 5', status: 'Pendiente', day: 'Mañana' },
  { id: 8, time: '17:30', period: 'PM', name: 'Andrés Molina', phone: '+52 55 2270 6193', type: 'Ortodoncia', detail: 'Ajuste mensual', status: 'Pendiente', day: 'Mañana' },
]

const waitlist: WaitlistPatient[] = [
  { id: 1, name: 'Natalia Paredes', phone: '+52 55 4102 8831', treatment: 'Limpieza dental', reason: 'Solicitó cita anticipada' },
  { id: 2, name: 'Mateo Ruiz', phone: '+52 55 2750 1940', treatment: 'Endodoncia', reason: 'Tratamiento pendiente' },
  { id: 3, name: 'Fernanda Soto', phone: '+52 55 8301 6624', treatment: 'Ortodoncia', reason: 'Ajuste pendiente' },
]

const treatments: Treatment[] = [
  { id: 1, name: 'Paola Gómez', phone: '+52 55 3021 7720', treatment: 'Endodoncia', progress: '1 de 3 sesiones', completed: 1, total: 3, lastVisit: 'Hace 24 días', frequency: 'Cada 15 días', risk: true, next: 'Sin próxima cita' },
  { id: 2, name: 'Ricardo Silva', phone: '+52 55 9018 2334', treatment: 'Ortodoncia', progress: '1 de 12 sesiones', completed: 1, total: 12, lastVisit: 'Hace 31 días', frequency: 'Cada 30 días', risk: true, next: 'Sin próxima cita' },
  { id: 3, name: 'Ana Beltrán', phone: '+52 55 7612 0041', treatment: 'Endodoncia', progress: '2 de 3 sesiones', completed: 2, total: 3, lastVisit: 'Hace 21 días', frequency: 'Cada 15 días', risk: true, next: 'Sin próxima cita' },
  { id: 4, name: 'Emilio Vargas', phone: '+52 55 1170 2899', treatment: 'Rehabilitación', progress: '3 de 5 sesiones', completed: 3, total: 5, lastVisit: 'Hace 8 días', frequency: 'Cada 15 días', risk: false, next: 'Jue 24 oct · 15:30' },
  { id: 5, name: 'Gabriela Ríos', phone: '+52 55 8832 1200', treatment: 'Implante dental', progress: '1 de 2 sesiones', completed: 1, total: 2, lastVisit: 'Hace 6 días', frequency: 'Cada 30 días', risk: false, next: 'Mar 29 oct · 10:00' },
  { id: 6, name: 'Tomás Navarro', phone: '+52 55 6721 8450', treatment: 'Ortodoncia', progress: '6 de 12 sesiones', completed: 6, total: 12, lastVisit: 'Hace 14 días', frequency: 'Cada 30 días', risk: false, next: 'Mié 30 oct · 11:30' },
]

function whatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export function DentalDashboard() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [activeDay, setActiveDay] = useState<'Hoy' | 'Mañana'>('Hoy')
  const [showTreatments, setShowTreatments] = useState(false)
  const [search, setSearch] = useState('')
  const [synced, setSynced] = useState(false)
  const [toast, setToast] = useState('')
  const [replacementFor, setReplacementFor] = useState<number | null>(null)

  const filteredAppointments = appointments.filter((item) => item.day === activeDay)
  const pendingTomorrow = appointments.filter((item) => item.day === 'Mañana' && item.status === 'Pendiente').length
  const openSlots = appointments.filter((item) => item.status === 'Cancelada').length
  const riskCount = treatments.filter((item) => item.risk).length
  const visibleTreatments = useMemo(() => treatments.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.treatment.toLowerCase().includes(search.toLowerCase())), [search])

  function updateStatus(id: number, status: AppointmentStatus) {
    setAppointments((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    setToast(status === 'Confirmada' ? 'Cita confirmada' : 'Hueco liberado · busca un paciente para adelantar')
    window.setTimeout(() => setToast(''), 2800)
  }

  function syncCalendar() {
    setSynced(true)
    setToast('Google Calendar sincronizado · 8 citas actualizadas')
    window.setTimeout(() => setToast(''), 2800)
  }

  function assignReplacement(appointmentId: number, patient: WaitlistPatient) {
    setAppointments((current) => current.map((item) => item.id === appointmentId ? { ...item, name: patient.name, phone: patient.phone, type: patient.treatment, detail: 'Reemplazo desde lista de espera', status: 'Confirmada' } : item))
    setReplacementFor(null)
    setToast(`${patient.name} asignado/a al hueco · cita confirmada`)
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc] text-[#162b40]">
      <header className="border-b border-[#dfe8f0] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#0c628c] text-white shadow-sm"><HeartPulse /></div>
            <div><p className="text-[15px] font-semibold tracking-tight">Clínica Laura</p><p className="text-xs text-[#718397]">Asistente de agenda</p></div>
          </div>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-[#718397] sm:inline">Martes, 22 de octubre 2024</span><div className="grid size-9 place-items-center rounded-full bg-[#e4f2f8] text-sm font-semibold text-[#0c628c]">AM</div><button aria-label="Más opciones" className="text-[#718397]"><MoreHorizontal /></button></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-7 lg:px-10 lg:py-9">
        <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#0c789e]"><Sparkles /> Resumen de la mañana</div><h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#122a42] lg:text-4xl">Buenos días, Andrea</h1><p className="mt-2 text-[15px] text-[#718397]">Tu agenda está lista. Aquí tienes lo más importante para hoy.</p></div>
          <Button onClick={syncCalendar} variant="outline" className="h-10 w-fit border-[#cddde8] bg-white text-[#22506c] hover:bg-[#f0f7fa]"><RefreshCw data-icon="inline-start" className={synced ? 'animate-spin' : ''} />{synced ? 'Sincronizado' : 'Sincronizar Google Calendar'}</Button>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <button onClick={() => { setActiveDay('Mañana'); setShowTreatments(false) }} className="stat-card group border-[#c9e0ec] bg-[#edf8fc] text-left"><div className="flex items-start justify-between"><span className="stat-icon bg-white text-[#08739b]"><CalendarDays /></span><span className="text-xs font-medium text-[#5f8398]">Mañana</span></div><p className="mt-4 text-3xl font-semibold text-[#0a5f82]">{pendingTomorrow}</p><p className="mt-1 text-sm font-medium text-[#2b6681]">Por confirmar mañana</p><span className="mt-3 block text-xs text-[#6b8999] group-hover:text-[#0a5f82]">Ver citas pendientes <span aria-hidden="true">→</span></span></button>
          <button onClick={() => { setActiveDay('Hoy'); setShowTreatments(false) }} className="stat-card group border-[#eadfbc] bg-[#fff9eb] text-left"><div className="flex items-start justify-between"><span className="stat-icon bg-white text-[#b47b1b]"><Clock3 /></span><span className="text-xs font-medium text-[#94752f]">Acción rápida</span></div><p className="mt-4 text-3xl font-semibold text-[#9a6d17]">{openSlots}</p><p className="mt-1 text-sm font-medium text-[#806322]">Huecos libres hoy / mañana</p><span className="mt-3 block text-xs text-[#967d47] group-hover:text-[#8b6518]">Buscar reemplazo <span aria-hidden="true">→</span></span></button>
          <button onClick={() => setShowTreatments(true)} className="stat-card group border-[#f0caca] bg-[#fff1f1] text-left"><div className="flex items-start justify-between"><span className="stat-icon bg-white text-[#d04949]"><Zap /></span><span className="rounded-full bg-[#f9d7d7] px-2 py-1 text-[11px] font-semibold text-[#c24040]">Requiere atención</span></div><p className="mt-4 text-3xl font-semibold text-[#c24040]">{riskCount}</p><p className="mt-1 text-sm font-medium text-[#963e3e]">Tratamientos sin cita</p><span className="mt-3 block text-xs text-[#ac6464] group-hover:text-[#bc3434]">Ver alertas rojas <span aria-hidden="true">→</span></span></button>
        </section>

        <div className="grid gap-7 xl:grid-cols-[minmax(0,1.35fr)_minmax(390px,0.65fr)]">
          <section className="panel overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-[#e6edf2] px-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold text-[#19344b]">Confirmación de agenda</h2><p className="mt-1 text-sm text-[#7b8b9b]">Envía recordatorios y actualiza estados en un clic.</p></div><div className="flex rounded-lg bg-[#f1f5f8] p-1"><button onClick={() => setActiveDay('Hoy')} className={`tab-button ${activeDay === 'Hoy' ? 'tab-active' : ''}`}>Hoy <span>{appointments.filter(a => a.day === 'Hoy').length}</span></button><button onClick={() => setActiveDay('Mañana')} className={`tab-button ${activeDay === 'Mañana' ? 'tab-active' : ''}`}>Mañana <span>{appointments.filter(a => a.day === 'Mañana').length}</span></button></div></div>
            <div className="flex items-center justify-between border-b border-[#edf1f4] px-5 py-3"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#91a0ae]">{activeDay}, 22 oct · {filteredAppointments.length} citas</p><button className="flex items-center gap-1 text-xs font-medium text-[#0c7398]">Ordenar por hora <ChevronDown /></button></div>
            <div className="divide-y divide-[#edf1f4]">
              {filteredAppointments.map((appointment) => <AppointmentRow key={appointment.id} appointment={appointment} onStatus={updateStatus} replacementFor={replacementFor} onReplacement={setReplacementFor} onAssign={assignReplacement} />)}
            </div>
          </section>

          <section className="panel overflow-hidden" id="treatment-alerts">
            <div className="border-b border-[#e6edf2] px-5 py-5"><div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold text-[#19344b]">Seguimiento de tratamientos</h2><p className="mt-1 text-sm text-[#7b8b9b]">Evita que tus pacientes abandonen su avance.</p></div><span className="rounded-full bg-[#fff0f0] px-2.5 py-1 text-xs font-semibold text-[#c34242]">{riskCount} en riesgo</span></div><div className="relative mt-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3b1bd]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar paciente o tratamiento" className="h-9 w-full rounded-lg border border-[#dce6ed] bg-[#fbfcfd] pl-9 pr-3 text-sm outline-none focus:border-[#72b5ce] focus:ring-2 focus:ring-[#d8eff7]" /></div></div>
            <div className="max-h-[570px] overflow-auto">{visibleTreatments.map((item) => <TreatmentRow key={item.id} treatment={item} />)}</div>
            <div className="border-t border-[#e6edf2] bg-[#fbfcfd] px-5 py-3"><button onClick={() => setShowTreatments(!showTreatments)} className="w-full text-center text-sm font-medium text-[#0c7398]">{showTreatments ? 'Mostrar menos' : 'Ver todos los tratamientos'} <span aria-hidden="true">→</span></button></div>
          </section>
        </div>
      </main>
      {toast && <div role="status" className="toast"><CheckCircle2 /> {toast}</div>}
    </div>
  )
}

function AppointmentRow({ appointment, onStatus, replacementFor, onReplacement, onAssign }: { appointment: Appointment; onStatus: (id: number, status: AppointmentStatus) => void; replacementFor: number | null; onReplacement: (id: number | null) => void; onAssign: (appointmentId: number, patient: WaitlistPatient) => void }) {
  const isCancelled = appointment.status === 'Cancelada'
  const showingWaitlist = replacementFor === appointment.id
  return <div className={`appointment-row ${isCancelled ? 'appointment-cancelled' : ''}`}><div className="time-block"><strong>{appointment.time}</strong><span>{appointment.period}</span></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="truncate text-[15px] font-semibold text-[#213c52]">{appointment.name}</p><StatusBadge status={appointment.status} /></div><div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8493a0]"><span className="flex items-center gap-1"><Phone />{appointment.phone}</span><span className="font-medium text-[#5d7182]">{appointment.type}</span><span>{appointment.detail}</span></div>{isCancelled && <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-[#ae6e15]"><UsersRound /> Hueco libre · 1 paciente disponible en lista de espera <button onClick={() => onReplacement(appointment.id)} className="ml-1 underline">Ver lista</button></div>}{showingWaitlist && <div className="mt-3 rounded-lg border border-[#eadfbc] bg-[#fffaf0] p-3"><div className="mb-2 flex items-center justify-between"><p className="text-xs font-semibold text-[#806322]">Pacientes sugeridos para {appointment.time}</p><button onClick={() => onReplacement(null)} aria-label="Cerrar lista de espera" className="text-[#9aabb8]"><X /></button></div><div className="flex flex-col gap-2">{waitlist.map((patient) => <button key={patient.id} onClick={() => onAssign(appointment.id, patient)} className="flex items-center justify-between gap-3 rounded-md border border-[#eadfbc] bg-white px-3 py-2 text-left hover:bg-[#fff5d8]"><span className="min-w-0"><strong className="block truncate text-xs text-[#27445a]">{patient.name}</strong><span className="block truncate text-[11px] text-[#8a7a58]">{patient.treatment} · {patient.reason}</span></span><span className="shrink-0 text-[11px] font-semibold text-[#a2701a]">Asignar</span></button>)}</div></div>}</div><div className="flex shrink-0 items-center gap-2">{appointment.status === 'Pendiente' && <a href={whatsappUrl(appointment.phone, `Hola ${appointment.name.split(' ')[0]}, te escribimos de la Clínica Laura para confirmar tu cita de ${appointment.type} el ${appointment.day.toLowerCase()}. ¿Nos confirmas tu asistencia?`)} target="_blank" rel="noreferrer" className="whatsapp-button"><MessageCircle /> WhatsApp</a>}{appointment.status === 'Pendiente' && <Button onClick={() => onStatus(appointment.id, 'Confirmada')} size="icon" variant="outline" aria-label={`Confirmar cita de ${appointment.name}`} className="border-[#b9dfd0] text-[#2f8a68] hover:bg-[#effaf5]"><Check /></Button>}{appointment.status !== 'Cancelada' && <Button onClick={() => onStatus(appointment.id, 'Cancelada')} size="icon" variant="ghost" aria-label={`Cancelar cita de ${appointment.name}`} className="text-[#9aabb8] hover:bg-[#fff2f2] hover:text-[#cf4f4f]"><X /></Button>}{isCancelled && <Button onClick={() => onReplacement(appointment.id)} variant="outline" size="sm" className="border-[#e2c98d] text-[#a2701a]">Buscar paciente</Button>}</div></div>
}

function StatusBadge({ status }: { status: AppointmentStatus }) { const styles = { Pendiente: 'status-pending', Confirmada: 'status-confirmed', Cancelada: 'status-cancelled' }; const label = status === 'Cancelada' ? 'Cancelada / Hueco libre' : status; return <span className={`status-badge ${styles[status]}`}>{status === 'Confirmada' && <CheckCircle2 />}{status === 'Cancelada' && <XCircle />}{status === 'Pendiente' && <Clock3 />}{label}</span> }

function TreatmentRow({ treatment }: { treatment: Treatment }) { const percent = Math.round((treatment.completed / treatment.total) * 100); return <div className={`treatment-row ${treatment.risk ? 'treatment-risk' : ''}`}><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className={`patient-avatar ${treatment.risk ? 'avatar-risk' : ''}`}>{treatment.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-[#27445a]">{treatment.name}</p><p className="mt-0.5 text-xs text-[#8393a0]">{treatment.treatment} · {treatment.progress}</p></div></div>{treatment.risk && <span className="risk-label">En riesgo</span>}</div><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e8edf1]"><div className={`h-full rounded-full ${treatment.risk ? 'bg-[#db5a5a]' : 'bg-[#45a984]'}`} style={{ width: `${percent}%` }} /></div><span className="text-xs font-semibold text-[#748594]">{percent}%</span></div><div className="mt-3 flex items-center justify-between text-[11px] text-[#8a99a5]"><span>Última visita: {treatment.lastVisit}</span><span>{treatment.next}</span></div>{treatment.risk && <a href={whatsappUrl(treatment.phone, `Hola ${treatment.name.split(' ')[0]}, la Dra. Laura nota que llevas el ${percent}% de tu tratamiento de ${treatment.treatment}. Aunque ya no tengas molestia, es clave realizar la siguiente sesión para evitar que la infección regrese o pierdas el avance. ¿Agendamos para esta semana?`)} target="_blank" rel="noreferrer" className="treatment-action"><MessageCircle /> Escribir por WhatsApp <ExternalLink /></a>}</div> }
