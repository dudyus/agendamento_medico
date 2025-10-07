import type { AdminType } from '../utils/AdminType'
import { create } from 'zustand'

type AdminStore = {
    admin: AdminType
    logaAdmin: (adminLogado: AdminType) => void
    deslogaAdmin: () => void
}

export const useAdminStore = create<AdminStore>((set) => ({
    admin: {} as AdminType,
    logaAdmin: (adminLogado) => set({admin: adminLogado}),
    deslogaAdmin: () => set({admin: {} as AdminType})
}))