<script setup lang="ts">

import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

interface Post {
  id: string | number;
  path: string;
  title: string;
  date: string;
  summary?: string;
  description?: string;
  language?: string;
  draft?: boolean;
}

const props = defineProps<{ posts: Post[] }>();

const route = useRoute();
const language = computed(() => {
  const l = route.query.lang;
  if (Array.isArray(l)) return l[0] || "";
  return l || "";
});

const filteredPosts = computed(() => {
  if (!language.value) return props.posts;
  return props.posts.filter((post) => post.language === language.value);
});

const currentPage = ref(1);
const itemsPerPage = ref(5);

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage.value) || 1);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPosts.value.slice(start, start + itemsPerPage.value);
});

watch([language, itemsPerPage], () => {
  currentPage.value = 1;
});

const calculateItemsPerPage = () => {
  if (typeof window === 'undefined') return;
  const postHeight = window.innerWidth < 640 ? 250 : 180;
  const availableHeight = window.innerHeight - 380;
  
  const calculated = Math.floor(availableHeight / postHeight);
  itemsPerPage.value = Math.max(2, Math.min(10, calculated));
  
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

onMounted(() => {
  calculateItemsPerPage();
  window.addEventListener('resize', calculateItemsPerPage, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateItemsPerPage);
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
    <!-- Header & Filters -->
    <div class="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary pb-2">
        Latest Posts
      </h1>
      
      <div class="flex items-center gap-3 bg-base-200/50 p-1.5 rounded-2xl border border-base-300">
        <span class="text-xs font-bold text-base-content/50 uppercase tracking-widest pl-3 hidden sm:block">Filter:</span>
        <div class="flex gap-1">
          <NuxtLink 
            :to="{ query: { lang: 'pl' } }" 
            class="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
            :class="language === 'pl' ? 'bg-primary text-primary-content shadow-md scale-105' : 'hover:bg-base-300/50 text-base-content/70'"
          >
            PL
          </NuxtLink>
          <NuxtLink 
            :to="{ query: { lang: 'en' } }" 
            class="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
            :class="language === 'en' ? 'bg-primary text-primary-content shadow-md scale-105' : 'hover:bg-base-300/50 text-base-content/70'"
          >
            EN
          </NuxtLink>
          <NuxtLink 
            v-if="language"
            to="/posts" 
            class="px-4 py-2 text-sm font-bold rounded-xl hover:bg-error/10 hover:text-error transition-colors text-base-content/50 ml-1"
          >
            Clear
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Posts Grid -->
    <div class="flex flex-col gap-6">
      <NuxtLink
        v-for="post in paginatedPosts" 
        :key="post.id"
        :to="post.path"
        class="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 sm:p-8 bg-base-200/30 border border-base-300 rounded-3xl hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
      >
        <!-- Subtle gradient hover background effect -->
        <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div class="flex flex-col justify-center flex-1 relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-xs font-semibold px-3 py-1 bg-base-300/60 rounded-lg text-base-content/70">
              {{ new Date(post.date).toLocaleDateString() }}
            </span>
            <span v-if="post.language" class="text-xs font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-lg">
              {{ post.language }}
            </span>
          </div>
          
          <h2 class="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {{ post.title }}
          </h2>
          
          <p class="text-base-content/70 text-base sm:text-lg line-clamp-3 leading-relaxed">
            {{ post.summary || post.description || '' }}
          </p>
        </div>
      </NuxtLink>
    </div>
    
    <!-- Pagination Controls -->
    <div v-if="totalPages > 1 && filteredPosts.length > 0" class="flex justify-center items-center gap-4 sm:gap-6 mt-12 mb-4">
      <button 
        class="group flex items-center gap-2 px-5 py-2.5 bg-base-200/50 hover:bg-primary hover:text-primary-content disabled:opacity-50 disabled:hover:bg-base-200/50 disabled:hover:text-base-content border border-base-300 rounded-2xl transition-all duration-300 font-bold"
        :disabled="currentPage === 1"
        @click="currentPage > 1 && currentPage--"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="hidden sm:inline">Prev</span>
      </button>
      
      <div class="flex justify-center items-center min-w-34 px-5 py-2.5 bg-base-200/30 border border-base-300 rounded-2xl font-bold tracking-wide tabular-nums">
        <span class="text-base-content/60">Page</span>
        <span class="text-primary mx-1 w-5 text-center">{{ currentPage }}</span>
        <span class="text-base-content/60">/</span>
        <span class="text-base-content mx-1">{{ totalPages }}</span>
      </div>

      <button 
        class="group flex items-center gap-2 px-5 py-2.5 bg-base-200/50 hover:bg-primary hover:text-primary-content disabled:opacity-50 disabled:hover:bg-base-200/50 disabled:hover:text-base-content border border-base-300 rounded-2xl transition-all duration-300 font-bold"
        :disabled="currentPage === totalPages"
        @click="currentPage < totalPages && currentPage++"
      >
        <span class="hidden sm:inline">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    <!-- Empty State -->
    <div v-if="filteredPosts.length === 0" class="text-center py-20 bg-base-200/20 rounded-3xl border border-base-300 border-dashed mt-8">
      <div class="text-4xl mb-4 opacity-50">📭</div>
      <h3 class="text-xl font-bold mb-2">No posts found</h3>
      <p class="text-base-content/60">Try clearing the language filter to see more content.</p>
    </div>
  </div>
</template>

<style></style>
