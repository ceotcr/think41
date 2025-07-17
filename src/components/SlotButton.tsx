'use client'
import React from 'react'

type Props = {
    slot: string
    selectedDate: Date
    isDisabled: boolean
    onBook: () => void
}

const SlotButton = ({ slot, selectedDate, isDisabled, onBook }: Props) => {
    return (
        <button
            key={slot}
            disabled={isDisabled}
            className={`rounded p-2 border ${isDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 cursor-pointer hover:bg-blue-600 text-white'
                }`}
            onClick={onBook}
        >
            {slot}
        </button>
    )
}

export default SlotButton
