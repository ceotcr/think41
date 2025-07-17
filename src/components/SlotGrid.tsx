'use client'
import { slots, useAppointmentsStore } from '@/stores/appointments'
import { useConfirmationStore } from '@/stores/confirmation'
import SlotButton from './SlotButton'
import React from 'react'

type Props = {
    selectedDate: Date
}

const SlotGrid = ({ selectedDate }: Props) => {
    const { appointments, addAppointment } = useAppointmentsStore()
    const { open } = useConfirmationStore()

    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
            {slots.map((slot) => {
                const slotDate = new Date(
                    `${selectedDate.toISOString().split('T')[0]}T${slot}`
                )
                const now = new Date()

                const isToday = selectedDate.toDateString() === now.toDateString()
                const isPast = isToday && slotDate < now

                const isBooked = appointments.some((appt) => {
                    const appointmentDate = new Date(appt.date)
                    return (
                        appointmentDate.toDateString() === selectedDate.toDateString() &&
                        appt.start === slot
                    )
                })

                const isDisabled = isPast || isBooked

                return (
                    <SlotButton
                        key={slot}
                        slot={slot}
                        selectedDate={selectedDate}
                        isDisabled={isDisabled}
                        onBook={() => {
                            if (!isDisabled) {
                                addAppointment({
                                    id: `${selectedDate?.toISOString()}-${slot}`,
                                    date: selectedDate,
                                    start: slot,
                                })
                                open(
                                    `Appointment booked for ${selectedDate.toLocaleDateString()} at ${slot}`
                                )
                            }
                        }}
                    />
                )
            })}
        </div>
    )
}

export default SlotGrid
