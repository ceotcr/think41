'use client'

import { useAppointmentsStore, slots } from '@/stores/appointments'
import { useConfirmationStore } from '@/stores/confirmation'
import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
    isOpen: boolean
    onClose: () => void
}

const AdminDialog = ({ isOpen, onClose }: Props) => {
    const { addAppointment, appointments } = useAppointmentsStore()
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedSlot, setSelectedSlot] = useState('')
    const { open } = useConfirmationStore()
    const handleBook = () => {
        if (!selectedDate || !selectedSlot) return
        addAppointment({
            id: `${selectedDate}-${selectedSlot}-admin`,
            date: new Date(selectedDate),
            start: selectedSlot,
        })
        open(`Admin booked appointment for ${new Date(selectedDate).toLocaleDateString()} at ${selectedSlot}`)
        onClose()
        setSelectedDate('')
        setSelectedSlot('')
    }

    useEffect(() => {
        setSelectedDate(new Date().toISOString().split('T')[0])
    }, [isOpen])
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                    <MdClose className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Admin Panel: Mark Slot as Booked</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Select Date</label>
                        <input
                            type="date"
                            className="w-full border rounded p-2"
                            min={new Date().toISOString().split('T')[0]}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Select Time Slot</label>
                        <select
                            className="w-full border rounded p-2"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                        >
                            <option value="">-- Choose a slot --</option>
                            {slots.map((slot) => {
                                if (!selectedDate) return null; // Skip if no date selected

                                const selected = new Date(selectedDate);
                                if (isNaN(selected.getTime())) return null; // Skip if date is invalid

                                const now = new Date();
                                const isToday = selected.toDateString() === now.toDateString();

                                const slotDate = new Date(`${selectedDate}T${slot}`);
                                const isPast = isToday && slotDate < now;

                                const isBooked = appointments.some((appt) => {
                                    const appointmentDate = new Date(appt.date);
                                    return (
                                        appointmentDate.toDateString() === selected.toDateString() &&
                                        appt.start === slot
                                    );
                                });

                                return (
                                    <option key={slot} value={slot} disabled={isBooked || isPast}>
                                        {slot} {isBooked ? '(Booked)' : ''} {isPast ? '(Past)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <button
                        onClick={handleBook}
                        disabled={!selectedDate || !selectedSlot}
                        className={`w-full py-2 rounded text-white transition ${selectedDate && selectedSlot
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Mark as Booked
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDialog
