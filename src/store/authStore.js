import { create } from 'zustand'
import { login, logout, refreshToken } from '../api/auth'
import { get } from '../api/client'

export const useAuthStore = create((set, getState) => ({
  user: null,
  status: 'idle',
  error: null,
  async loadProfile() {
    set({ status: 'loading', error: null })
    try {
      const data = await get('/users/getProfile.php')
      set({ user: data.user, status: 'authenticated' })
    } catch (error) {
      set({ user: null, status: 'idle', error: error.message })
    }
  },
  async signIn(payload) {
    set({ status: 'loading', error: null })
    try {
      const data = await login(payload)
      set({ user: data.user, status: 'authenticated' })
      return data
    } catch (error) {
      set({ status: 'idle', error: error.message })
      throw error
    }
  },
  async signOut() {
    set({ status: 'loading', error: null })
    try {
      await logout()
    } finally {
      set({ user: null, status: 'idle' })
    }
  },
  async refresh() {
    try {
      await refreshToken()
      await getState().loadProfile()
    } catch (error) {
      set({ user: null, status: 'idle', error: error.message })
    }
  },
}))
