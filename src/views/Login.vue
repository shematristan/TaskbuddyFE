<template>
  <div class="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-slate-100">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
      <p class="text-slate-500 mt-2">Sign in to manage your tasks</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <div v-if="errorMsg" class="p-3 bg-rose-50 text-rose-600 rounded-lg text-sm text-center">
        {{ errorMsg }}
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input 
          v-model="email" 
          type="email" 
          required 
          class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 shadow-sm"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input 
          v-model="password" 
          type="password" 
          required 
          class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 shadow-sm"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 py-3 transition-colors shadow-sm shadow-indigo-200 mt-2"
      >
        Sign In
      </button>
    </form>

    <div class="mt-8 text-center text-sm text-slate-500">
      Don't have an account? 
      <router-link to="/register" class="text-indigo-600 font-semibold hover:underline">Register here</router-link>
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

const handleLogin = async () => {
  errorMsg.value = ''
  const result = await authStore.login(email.value, password.value)
  if (result.success) {
    router.push('/')
  } else {
    errorMsg.value = result.message || 'Invalid email or password'
  }
}
</script>
