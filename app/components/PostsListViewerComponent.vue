<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

interface Post {
  id: string | number;
  path: string;
  title: string;
  date: string;
  summary: string;
  language?: string;
  draft?: boolean;
}

defineProps<{ posts: Post[] }>();

const filterPosts = (
  lang: string,
  posts: Post[],
): Post[] => {
  if (!lang) return posts;
  return posts.filter((post) => post.language === lang);
};

const route = useRoute();
const language = computed(() => {
  const l = route.query.lang;
  if (Array.isArray(l)) return l[0] || "";
  return l || "";
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full px-2 sm:px-0">
    <div class="flex flex-col items-center justify-center mt-2 mb-4 w-full">
      <div class="flex flex-wrap gap-2 sm:gap-4 mb-4 justify-center">
        <h2 class="mr-2 text-base sm:text-lg">filter by language:</h2>
        <NuxtLink class="badger badger-primary text-xs sm:text-base" :to="{ query: { lang: 'pl' } }">polish</NuxtLink>
        <NuxtLink class="badger badger-secondary text-xs sm:text-base" :to="{ query: { lang: 'en' } }">english
        </NuxtLink>
        <NuxtLink class="badger badger-success text-xs sm:text-base" to="/posts"> reset </NuxtLink>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col mt-2 mb-4 w-full">
        <ul class="list-none w-full">
          <li v-for="post in filterPosts(language, posts)" :key="post.id" class="mb-4 text-center w-full px-2 sm:px-0">
            <NuxtLink :to="post.path" class="hover:underline text-lg sm:text-xl font-semibold block w-full truncate">
              {{ post.title }}
            </NuxtLink>
            <p class="text-gray-600 text-xs sm:text-sm">{{ post.date }}</p>
            <p class="text-gray-800 text-sm sm:text-base">{{ post.summary }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
