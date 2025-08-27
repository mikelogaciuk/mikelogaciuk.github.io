<script setup lang="ts">
defineProps<{ posts: Array<any> }>();

const language = ref('')

const setLanguage = (lang: string) => {
  language.value = lang
}

const filterPosts = (lang: string, posts: Array<any>): Array<any> => {
  if (!lang) return posts;
  return posts.filter(post => post.language === lang);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-col items-center justify-center mt-2 mb-4 w-full">
      <div class="flex flex-wrap gap-4 mb-4 justify-center">
        <h2 class="mr-2">filter by language:</h2>
        <button class="badger badger-accent" @click="setLanguage('')">all</button>
        <button class="badger badger-primary" @click="setLanguage('pl')">polish</button>
        <button class="badger badger-secondary" @click="setLanguage('en')">english</button>
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
