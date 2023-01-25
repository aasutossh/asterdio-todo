<template>
  <div class="mx-auto max-w-lg">
    <div v-if="loading" class="p-4 rounded-lg shadow-md">loading...</div>
    <div v-else>
      <div class="mb-12">
        <button class="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600" @click="addTask">
          Add new task
        </button>
      </div>
      <ul v-if="tasks.length > 0" class="grid list-none grid-cols-1 gap-3">
        <li v-for="(task, index) in tasks" :key="index" class="rounded-lg bg-white p-4 shadow-md">
          <div v-if="index === editing" class="flex justify-between">

            <div class="flex items-center gap-1">
              <input type="checkbox" v-model="task.completed"
                class=" text-blue-500 focus:ring-blue-500 border-gray-300 rounded" @change="toggleCompleted(index)">
              <input v-model="task.text" class="rounded-lg bg-gray-200 p-2" @keyup.enter="saveTask(index)" />
            </div>
            <div class="flex gap-2">
              <button class="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600" @click="saveTask(index)">
                Save
              </button>
              <button class="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600" @click="cancelEdit(index)">
                Cancel
              </button>
            </div>
          </div>
          <div v-else class="flex justify-between">
            <div class="flex items-center gap-1">
              <input type="checkbox" v-model="task.completed"
                class=" text-blue-500 focus:ring-blue-500 border-gray-300 rounded" @change="toggleCompleted(index)">
              <p class="p-2 text-gray-700" :class="[task.completed ? 'line-through' : '']">
                {{ task.text }}
              </p>
            </div>
            <div class="flex gap-2">
              <button class="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600" @click="editTask(index)">
                Edit
              </button>
              <button class="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600" @click="deleteTask(index)">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="rounded-lg p-4 shadow-md">No tasks yet. Add a new one.</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://localhost:3000/todo";
export default {
  data() {
    return {
      tasks: [],
      editing: null,
      loading: true,
    };
  },
  mounted() {
    axios.get(API_URL).then((response) => {
      this.tasks = response.data;
      this.loading = false;
    });
  },
  methods: {
    addTask() {
      this.tasks.unshift({ text: "", completed: false });
      this.editing = 0;
    },
    editTask(index) {
      this.editing = index;
    },
    saveTask(index) {
      const id = this.tasks[index]._id;
      if (id) {
        axios.patch(`${API_URL}/${id}`, { text: this.tasks[index].text });
      } else axios.post(API_URL, { text: this.tasks[index].text });
      this.editing = null;
    },
    cancelEdit(index) {
      this.editing = null;
      if (this.tasks[index].text === "") {
        this.deleteTask(index);
      }
      this.tasks[index].editing = false;
    },
    deleteTask(index) {
      const id = this.tasks[index]._id;
      axios.delete(`${API_URL}/${id}`);
      this.tasks.splice(index, 1);
    },
    toggleCompleted(index) {
      const task = this.tasks[index];
      axios.patch(`${API_URL}/${task._id}`, { completed: task.completed });
    },
  },
};
</script>
