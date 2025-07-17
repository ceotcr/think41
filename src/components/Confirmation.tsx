import { useConfirmationStore } from '@/stores/confirmation'
import React from 'react'

const Confirmation = () => {
    const { isOpen, text, close } = useConfirmationStore()

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-semibold">Confirmation</h2>
                </div>
                <p className="text-gray-700 mb-6">{text}</p>
                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={close}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation
