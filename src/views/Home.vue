<template>
  <div class="w-full flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Top Navigation Bar -->
    <header class="bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-10 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div>
            <span class="text-2xl font-bold text-slate-800 tracking-tight">TaskBuddy</span>
            <p class="text-xs text-slate-500 -mt-1">Professional Task Management</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2 text-sm">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="font-medium text-slate-600">System Online</span>
          </div>
          <div class="text-sm font-medium text-slate-600 hidden sm:block">
            Welcome, <span class="text-indigo-600 font-semibold">{{ authStore.user?.name || 'User' }}</span>
          </div>
          <button
            @click="handleLogout"
            class="text-sm text-slate-500 hover:text-rose-600 font-medium px-4 py-2 rounded-lg hover:bg-rose-50 transition-all duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-4 sm:mt-8">
      <TaskList />
    </main>

    <!-- Footer -->
    <footer class="bg-white/80 backdrop-blur-md border-t border-slate-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="bg-indigo-100 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-600"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <span class="text-sm text-slate-600 font-medium">TaskBuddy v2.0</span>
          </div>
          <div class="flex items-center gap-6 text-xs text-slate-500">
            <span>Built with Vue.js & Spring Boot</span>
            <span>•</span>
            <span>MongoDB Database</span>
            <span>•</span>
            <span>{{ new Date().getFullYear() }} TaskBuddy</span>
          </div>
        </div>
      </div>
    </footer>
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
