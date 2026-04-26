<template>
  <div class="w-full flex flex-col min-h-screen">
    <!-- Top Navigation Bar -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-10 w-full">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="bg-indigo-600 text-white p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <span class="text-xl font-bold text-slate-800 tracking-tight">TaskBuddy</span>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="text-sm font-medium text-slate-600 hidden sm:block">
            Welcome, <span class="text-indigo-600">{{ authStore.user?.name || 'User' }}</span>
          </div>
          <button 
            @click="handleLogout"
            class="text-sm text-slate-500 hover:text-rose-600 font-medium px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 mt-4 sm:mt-8">
      <TaskList />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import TaskList from '../components/TaskList.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
