<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const links = [
  { path: '/', label: 'Home' },
  { path: '/posts', label: 'Posts' },
  { path: '/about', label: 'About' },
];
</script>

<template>
  <div class="sticky top-0 sm:top-4 z-50 px-2 sm:px-4 max-w-6xl mx-auto w-full pt-2 sm:pt-0">
    <div class="flex items-center justify-between px-4 sm:px-6 py-3 bg-base-100/70 backdrop-blur-lg border border-base-300 shadow-sm rounded-2xl w-full transition-all">
      
      <!-- Brand / Logo area -->
      <div class="w-1/4 flex justify-start">
        <NuxtLink to="/" class="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary hover:opacity-80 transition-opacity">
          ML.
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 flex justify-center gap-1 sm:gap-2">
        <NuxtLink 
          v-for="link in links" 
          :key="link.path"
          :to="link.path" 
          class="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold rounded-xl transition-all duration-300"
          :class="route.path === link.path ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-200/60 hover:text-base-content'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Theme Toggle -->
      <div class="w-1/4 flex justify-end">
        <input 
          type="checkbox" 
          value="nord" 
          class="toggle toggle-sm theme-controller" 
          aria-label="Toggle Theme" 
        >
      </div>
      
    </div>
  </div>
</template>

<style></style>
