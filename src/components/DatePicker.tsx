'use client'
import React from 'react'

type Props = {
    selectedDate: Date | null
    setSelectedDate: (date: Date) => void
}

const DatePicker = ({ selectedDate, setSelectedDate }: Props) => {
    return (
        <input
            className="border p-2 rounded w-full mb-4"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
        />
    )
}

export default DatePicker
