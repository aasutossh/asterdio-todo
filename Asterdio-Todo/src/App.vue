<script setup>
import ToDo from "./components/ToDo.vue";
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-200">
    <div class="container mx-auto">
      <header class="py-8">
        <div class="text-center text-4xl font-black text-slate-600 underline">
          To-Do app
        </div>
      </header>

      <main>
        <ToDo />
      </main>
    </div>
  </div>
</template>
