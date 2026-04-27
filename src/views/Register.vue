<template>
  <div class="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-slate-200/50">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 2l-1 1"/><path d="M22 8l-1-1"/><path d="M18 2l1 1"/><path d="M18 8l1-1"/></svg>
      </div>
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Create Account</h1>
      <p class="text-slate-500 text-sm">Join TaskBuddy and start organizing your life</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <div v-if="errorMsg" class="p-4 bg-rose-50 border border-rose-200 rounded-xl">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-rose-500 mr-3"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <p class="text-rose-700 text-sm font-medium">{{ errorMsg }}</p>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-slate-700">Full Name</label>
        <div class="relative">
          <input
            v-model="name"
            type="text"
            required
            class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400 shadow-sm pl-12"
            placeholder="John Doe"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-3.5 text-slate-400"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1"/><path d="M8 11h8"/></svg>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-slate-700">Email Address</label>
        <div class="relative">
          <input
            v-model="email"
            type="email"
            required
            class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400 shadow-sm pl-12"
            placeholder="you@example.com"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-3.5 text-slate-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-slate-700">Password</label>
        <div class="relative">
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400 shadow-sm pl-12"
            placeholder="••••••••"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-3.5 text-slate-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <p class="text-xs text-slate-500 mt-1">Minimum 6 characters required</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-200 shadow-lg shadow-purple-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating Account...
        </span>
        <span v-else class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 2l-1 1"/><path d="M22 8l-1-1"/><path d="M18 2l1 1"/><path d="M18 8l1-1"/></svg>
          Create Account
        </span>
      </button>
    </form>

    <div class="mt-8 text-center">
      <p class="text-sm text-slate-500">
        Already have an account?
        <router-link to="/login" class="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors ml-1">
          Sign in here
        </router-link>
      </p>
    </div>

    <!-- Benefits -->
    <div class="mt-8 pt-6 border-t border-slate-200">
      <div class="text-center mb-4">
        <h3 class="text-sm font-semibold text-slate-700">Why choose TaskBuddy?</h3>
      </div>
      <div class="grid grid-cols-2 gap-3 text-center">
        <div class="flex flex-col items-center">
          <div class="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <span class="text-xs text-slate-500">Free Forever</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <span class="text-xs text-slate-500">Priority Tasks</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const handleRegister = async () => {
  errorMsg.value = ''
  loading.value = true

  try {
    const result = await authStore.register(name.value, email.value, password.value)
    if (result.success) {
      router.push('/')
    } else {
      errorMsg.value = result.message || 'Registration failed'
    }
  } catch (error) {
    errorMsg.value = 'Network error. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
