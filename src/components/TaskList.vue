<template>
  <div class="space-y-8">
    <!-- Dashboard Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-slate-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-500 text-sm font-medium">Total Tasks</p>
            <p class="text-2xl font-bold text-slate-800">{{ tasks.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-slate-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-500 text-sm font-medium">Completed</p>
            <p class="text-2xl font-bold text-emerald-600">{{ completedTasks }}</p>
          </div>
          <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-slate-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-500 text-sm font-medium">Pending</p>
            <p class="text-2xl font-bold text-amber-600">{{ pendingTasks }}</p>
          </div>
          <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-slate-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-500 text-sm font-medium">Progress</p>
            <p class="text-2xl font-bold text-indigo-600">{{ completionPercentage }}%</p>
          </div>
          <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-600"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-slate-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-slate-800">Task Completion Progress</h3>
        <span class="text-sm text-slate-500">{{ completedTasks }} of {{ tasks.length }} tasks</span>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-3 mb-2">
        <div
          class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          :style="{ width: completionPercentage + '%' }"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-slate-500">
        <span>0%</span>
        <span class="font-medium text-indigo-600">{{ completionPercentage }}% Complete</span>
        <span>100%</span>
      </div>
    </div>

    <!-- Task Management Section -->
    <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
      <div class="mb-8">
        <h1 class="text-slate-800 text-3xl font-extrabold tracking-tight mb-2">Task Management</h1>
        <p class="text-slate-500">Organize and track your tasks efficiently</p>
      </div>

      <!-- Filters and Search -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tasks..."
            class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="filterStatus"
            class="border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 shadow-sm"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            v-model="sortBy"
            class="border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 shadow-sm"
          >
            <option value="created">Created Date</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <!-- Add Task Form -->
      <form @submit.prevent="addTask" class="flex gap-3 mb-8">
        <input
          v-model="newTask"
          type="text"
          placeholder="What needs to be done?"
          class="flex-1 border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 placeholder:text-slate-400 shadow-sm"
        />
        <select
          v-model="newTaskPriority"
          class="border border-slate-200 rounded-xl px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 shadow-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center shrink-0"
          :disabled="!newTask.trim()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Task
        </button>
      </form>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-slate-500">Loading tasks...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-rose-500 mr-3"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <div>
            <p class="text-rose-700 font-medium">Error loading tasks</p>
            <p class="text-rose-600 text-sm">{{ store.error }}</p>
          </div>
        </div>
      </div>

      <!-- Task List -->
      <div v-else class="space-y-3 relative">
        <TransitionGroup name="list" tag="div" class="space-y-3">
          <div
            v-for="task in filteredTasks"
            :key="task.id"
            class="group flex justify-between items-start bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            :class="{
              'opacity-75 bg-slate-50': task.completed,
              'border-l-4 border-l-emerald-500': task.completed,
              'border-l-4 border-l-amber-500': !task.completed && task.priority === 'high',
              'border-l-4 border-l-blue-500': !task.completed && task.priority === 'medium',
              'border-l-4 border-l-slate-300': !task.completed && task.priority === 'low'
            }"
          >
            <div class="flex items-start gap-4 flex-1 min-w-0 pr-4">
              <button
                @click="toggleTask(task.id)"
                class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 mt-0.5"
                :class="task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-400 text-transparent'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </button>

              <div class="flex-1 min-w-0">
                <div v-if="editingId === task.id" class="space-y-3">
                  <input
                    v-model="editTaskName"
                    @keyup.enter="saveEdit(task.id)"
                    @keyup.escape="cancelEdit"
                    v-focus
                    class="w-full border-b-2 border-indigo-500 px-2 py-1 bg-transparent focus:outline-none text-slate-700"
                    placeholder="Task name"
                  />
                  <div class="flex gap-2">
                    <select
                      v-model="editTaskPriority"
                      class="border border-slate-200 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <button @click="saveEdit(task.id)" class="text-indigo-600 hover:text-indigo-700 px-2 py-1 text-sm font-medium">
                      Save
                    </button>
                    <button @click="cancelEdit" class="text-slate-400 hover:text-slate-600 px-2 py-1 text-sm">
                      Cancel
                    </button>
                  </div>
                </div>

                <div v-else>
                  <p
                    :class="{ 'line-through text-slate-400': task.completed, 'text-slate-700': !task.completed }"
                    class="font-medium transition-colors duration-200 mb-1"
                  >
                    {{ task.name }}
                  </p>
                  <div class="flex items-center gap-3 text-xs text-slate-500">
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {{ formatDate(task.createdAt || new Date()) }}
                    </span>
                    <span
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-emerald-100 text-emerald-700': task.completed,
                        'bg-rose-100 text-rose-700': !task.completed && task.priority === 'high',
                        'bg-amber-100 text-amber-700': !task.completed && task.priority === 'medium',
                        'bg-slate-100 text-slate-700': !task.completed && task.priority === 'low'
                      }"
                    >
                      {{ task.priority || 'low' }} priority
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button
                v-if="editingId !== task.id"
                @click="startEdit(task)"
                class="shrink-0 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="Edit task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
              <button
                @click="deleteTask(task.id)"
                class="shrink-0 text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                title="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="filteredTasks.length === 0 && !store.loading" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-300"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <p class="text-slate-500 font-medium">No tasks found</p>
          <p class="text-slate-400 text-sm mt-1">
            {{ searchQuery || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Add a new task to get started' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { storeToRefs } from 'pinia';

// Custom directive to auto-focus the input when editing starts
const vFocus = {
  mounted: (el) => el.focus()
}

const store = useTaskStore();
const { tasks } = storeToRefs(store);

const newTask = ref('');
const newTaskPriority = ref('medium');
const searchQuery = ref('');
const filterStatus = ref('all');
const sortBy = ref('created');

// Edit state
const editingId = ref(null);
const editTaskName = ref('');
const editTaskPriority = ref('medium');

// Computed properties
const completedTasks = computed(() => tasks.value.filter(task => task.completed).length);
const pendingTasks = computed(() => tasks.value.filter(task => !task.completed).length);
const completionPercentage = computed(() => {
  if (tasks.value.length === 0) return 0;
  return Math.round((completedTasks.value / tasks.value.length) * 100);
});

const filteredTasks = computed(() => {
  let filtered = tasks.value;

  // Filter by status
  if (filterStatus.value === 'completed') {
    filtered = filtered.filter(task => task.completed);
  } else if (filterStatus.value === 'pending') {
    filtered = filtered.filter(task => !task.completed);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(task =>
      task.name.toLowerCase().includes(query)
    );
  }

  // Sort tasks
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'status':
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      case 'created':
      default:
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Newest first
    }
  });

  return filtered;
});

onMounted(() => {
  store.fetchTasks();
});

const addTask = async () => {
  if (newTask.value.trim()) {
    await store.addTask(newTask.value.trim(), newTaskPriority.value);
    newTask.value = "";
    newTaskPriority.value = 'medium';
  }
};

const deleteTask = async (id) => {
  await store.deleteTask(id);
};

const toggleTask = async (id) => {
  await store.toggleTask(id);
};

const startEdit = (task) => {
  editingId.value = task.id;
  editTaskName.value = task.name;
  editTaskPriority.value = task.priority || 'medium';
};

const saveEdit = async (id) => {
  if (editTaskName.value.trim()) {
    await store.updateTask(id, {
      name: editTaskName.value.trim(),
      priority: editTaskPriority.value
    });
  }
  cancelEdit();
};

const cancelEdit = () => {
  editingId.value = null;
  editTaskName.value = '';
  editTaskPriority.value = 'medium';
};

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
/* List transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Ensure leaving items are taken out of layout flow so that moving animations work */
.list-leave-active {
  position: absolute;
  width: calc(100% - 3rem); /* rough approximation to prevent weird width jumps */
  z-index: -1;
}
</style>