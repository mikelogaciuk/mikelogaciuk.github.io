<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

defineProps<{ posts: Array<any> }>();

// const language = ref("");

// const setLanguage = (lang: string) => {
//   language.value = lang;
// };

const filterPosts = (
  lang: ComputedRef<string | LocationQueryValue[]>,
  posts: Array<any>,
): Array<any> => {
  if (!lang) return posts;
  return posts.filter((post) => post.language === lang);
};

const route = useRoute();
const language = computed(() => route.query.lang || "");
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-col items-center justify-center mt-2 mb-4 w-full">
      <div class="flex flex-wrap gap-4 mb-4 justify-center">
        <h2 class="mr-2">filter by language:</h2>
        <!-- <button class="badger badger-accent" @click="setLanguage('')">all</button>
        <button class="badger badger-primary" @click="setLanguage('pl')">polish</button>
        <button class="badger badger-secondary" @click="setLanguage('en')">english</button> -->
        <!-- <NuxtLink class="badger badger-accent" :to="{ query: { lang: '' } }"
          >all</NuxtLink
        > -->
        <NuxtLink class="badger badger-primary" :to="{ query: { lang: 'pl' } }">polish</NuxtLink>
        <NuxtLink class="badger badger-secondary" :to="{ query: { lang: 'en' } }">english</NuxtLink>
        <NuxtLink class="badger badger-success" to="/posts"> reset </NuxtLink>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col mt-2 mb-4 min-w-full">
        <ul class="list-none">
          <li v-for="post in filterPosts(language, posts)" :key="post.id" class="mb-4 text-center">
            <NuxtLink :to="post.path" class="hover:underline">
              {{ post.title }}
            </NuxtLink>
            <p class="text-gray-600">{{ post.date }}</p>
            <p class="text-gray-800">{{ post.summary }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
