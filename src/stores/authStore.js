import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('taskbuddy_user')) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password })
        this.user = response.data
        localStorage.setItem('taskbuddy_user', JSON.stringify(this.user))
        return { success: true }
      } catch (error) {
        return { success: false, message: error.response?.data || 'Server error. Check database connection.' }
      }
    },
    async register(name, email, password) {
      try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password })
        this.user = response.data
        localStorage.setItem('taskbuddy_user', JSON.stringify(this.user))
        return { success: true }
      } catch (error) {
        return { success: false, message: error.response?.data || 'Server error. Check database connection.' }
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('taskbuddy_user')
    }
  }
})
