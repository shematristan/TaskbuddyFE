<template>
  <div class="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-slate-200/50">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Welcome Back</h1>
      <p class="text-slate-500 text-sm">Sign in to your TaskBuddy account</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <div v-if="errorMsg" class="p-4 bg-rose-50 border border-rose-200 rounded-xl">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-rose-500 mr-3"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <p class="text-rose-700 text-sm font-medium">{{ errorMsg }}</p>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-slate-700">Email Address</label>
        <div class="relative">
          <input
            v-model="email"
            type="email"
            required
            class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400 shadow-sm pl-12"
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
            class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400 shadow-sm pl-12"
            placeholder="••••••••"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-3.5 text-slate-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-200 shadow-lg shadow-indigo-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing In...
        </span>
        <span v-else class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Sign In
        </span>
      </button>
    </form>

    <div class="mt-8 text-center">
      <p class="text-sm text-slate-500">
        Don't have an account?
        <router-link to="/register" class="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors ml-1">
          Create one here
        </router-link>
      </p>
    </div>

    <!-- Features Preview -->
    <div class="mt-8 pt-6 border-t border-slate-200">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <span class="text-xs text-slate-500 font-medium">Priority Tasks</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <span class="text-xs text-slate-500 font-medium">Progress Tracking</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-purple-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <span class="text-xs text-slate-500 font-medium">Smart Filters</span>
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

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true

  try {
    const result = await authStore.login(email.value, password.value)
    if (result.success) {
      router.push('/')
    } else {
      errorMsg.value = result.message || 'Invalid email or password'
    }
  } catch (error) {
    errorMsg.value = 'Network error. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
