import { create } from 'zustand'
type AppointmentsStore = {
    appointments: Appointment[]
    addAppointment: (appointment: Appointment) => void
    removeAppointment: (id: string) => void
    clearAppointments: () => void
}

type Appointment = {
    id: string
    date: Date
    start: string
}
export const useAppointmentsStore = create<AppointmentsStore>((set) => {
    return {
        appointments: [],
        addAppointment: (appointment: Appointment) => set((state) => ({
            appointments: state.appointments.some((appt) =>
                (appt.start === appointment.start)
            ) ? state.appointments : [...state.appointments, appointment]
        })),
        removeAppointment: (id: string) => set((state) => ({
            appointments: state.appointments.filter((appt) => appt.id !== id)
        })),
        clearAppointments: () => set({ appointments: [] })
    }
})
export const activeHours = {
    start: '09:00',
    end: '17:00'
}
export const slots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30'
]