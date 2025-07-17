import { create } from 'zustand'

type ConfirmationStore = {
    text: string
    isOpen: boolean
    close: () => void
    open: (text: string) => void
}

export const useConfirmationStore = create<ConfirmationStore>((set) => ({
    text: '',
    isOpen: false,
    close: () => set({ isOpen: false }),
    open: (text: string) => set({ text, isOpen: true }),
}))