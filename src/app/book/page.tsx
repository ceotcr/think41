'use client'
import AdminDialog from '@/components/AdminDialog'
import Confirmation from '@/components/Confirmation'
import DatePicker from '@/components/DatePicker'
import SlotGrid from '@/components/SlotGrid'
import { useAppointmentsStore } from '@/stores/appointments'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const { clearAppointments } = useAppointmentsStore()
    const [adminOpen, setAdminOpen] = useState(false)

    useEffect(() => {
        setSelectedDate(new Date())
    }, [])

    useEffect(() => {
        clearAppointments()
    }, [selectedDate])

    return (
        <main className="p-4 w-full mx-auto max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Appointment Booking</h1>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
                    onClick={() => setAdminOpen(true)}
                >
                    Admin Access
                </button>
            </div>

            <p className="mb-4">Select a date to view available time slots.</p>

            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {selectedDate && (
                <>
                    <h2 className="text-md mb-2 font-medium">
                        Selected Date: {selectedDate.toLocaleDateString()}
                    </h2>
                    <SlotGrid selectedDate={selectedDate} />
                </>
            )}

            <Confirmation />
            <AdminDialog isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
        </main>
    )
}

export default Page
