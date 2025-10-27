<script setup lang="ts">
import { randomBadge } from "@/helpers/badgeMapper";

const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`posts-${slug}`, () => {
  return queryCollection("blog").path(`/posts/${slug}`).first();
});
</script>

<template>
  <div>
    <div v-if="post" class="mt-10 mb-2 min-w-4xl mx-auto">
      <div class="flex flex-wrap flex-gap gap-1 mb-4">
        <span v-for="tag in post.tags" :key="String(tag)" :class="`badger badger-${randomBadge()}`">
          <NuxtLink :to="`/posts/tag/${String(tag)}`">
            {{ String(tag) }}
          </NuxtLink>
        </span>
      </div>
    </div>

    <div v-if="post" class="mb-10 min-w-4xl mx-auto prose">
      <div class="text-sm mt-2 mb-2">
        <span>{{ new Date(post.date).toLocaleDateString() }}</span>
      </div>
      <div class="text-5xl font-semibold">
        <span>{{ post.title }}</span>
      </div>
      <ContentRenderer :value="post" />
      <div class="flex flex-col items-center">
        <span class="badge badge-secondary">
          <NuxtLink to="/posts">Back to posts</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style></style>
