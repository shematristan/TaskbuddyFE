import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';

const API_URL = 'http://localhost:8080/api/tasks';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTasks() {
      const authStore = useAuthStore();
      if (!authStore.user) return;
      
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}?userId=${authStore.user.id}`);
        this.tasks = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addTask(name, priority = 'medium') {
      const authStore = useAuthStore();
      if (!authStore.user) return;
      
      try {
        const response = await axios.post(API_URL, { 
          name, 
          completed: false,
          priority: priority,
          userId: authStore.user.id,
          createdAt: new Date().toISOString()
        });
        this.tasks.unshift(response.data);
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateTask(id, updates) {
      try {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;
        const response = await axios.put(`${API_URL}/${id}`, { ...task, ...updates });
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks.splice(index, 1, response.data);
        }
      } catch (err) {
        this.error = err.message;
      }
    },
    async toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        await this.updateTask(id, { completed: !task.completed });
      }
    }
  }
});
