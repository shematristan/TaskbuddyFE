<template>
  <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
    <div class="mb-8 text-center">
      <h1 class="text-slate-800 text-4xl font-extrabold tracking-tight mb-2">TaskBuddy</h1>
      <p class="text-slate-500">Manage your tasks effortlessly</p>
    </div>

    <form @submit.prevent="addTask" class="flex gap-3 mb-8">
      <input
        v-model="newTask"
        type="text"
        placeholder="What needs to be done?"
        class="flex-1 border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-slate-700 placeholder:text-slate-400 shadow-sm"
      />
      <button 
        type="submit" 
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Add
      </button>
    </form>

    <div class="space-y-3 relative">
      <TransitionGroup name="list" tag="div" class="space-y-3">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="group flex justify-between items-center bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          :class="{'opacity-75 bg-slate-50': task.completed}"
        >
          <div class="flex items-center gap-4 flex-1 min-w-0 pr-4">
            <button 
              @click="toggleTask(task.id)"
              class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              :class="task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-400 text-transparent'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
            
            <div v-if="editingId === task.id" class="flex-1 flex gap-2">
              <input 
                v-model="editTaskName"
                @keyup.enter="saveEdit(task.id)"
                @keyup.escape="cancelEdit"
                v-focus
                class="flex-1 border-b-2 border-indigo-500 px-2 py-1 bg-transparent focus:outline-none text-slate-700"
              />
              <button @click="saveEdit(task.id)" class="text-indigo-600 hover:text-indigo-700 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </button>
              <button @click="cancelEdit" class="text-slate-400 hover:text-slate-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <p v-else
              :class="{ 'line-through text-slate-400': task.completed, 'text-slate-700': !task.completed }"
              class="flex-1 truncate font-medium transition-colors duration-200"
            >
              {{ task.name }}
            </p>
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
      
      <div v-if="tasks.length === 0" class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-300"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <p class="text-slate-500 font-medium">All caught up!</p>
        <p class="text-slate-400 text-sm mt-1">Add a new task to get started.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { storeToRefs } from 'pinia';

// Custom directive to auto-focus the input when editing starts
const vFocus = {
  mounted: (el) => el.focus()
}

const store = useTaskStore();
const { tasks } = storeToRefs(store);

const newTask = ref('');

// Edit state
const editingId = ref(null);
const editTaskName = ref('');

onMounted(() => {
  store.fetchTasks();
});

const addTask = async () => {
  if (newTask.value.trim()) {
    await store.addTask(newTask.value.trim());
    newTask.value = "";
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
};

const saveEdit = async (id) => {
  if (editTaskName.value.trim()) {
    await store.updateTask(id, { name: editTaskName.value.trim() });
  }
  cancelEdit();
};

const cancelEdit = () => {
  editingId.value = null;
  editTaskName.value = '';
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
