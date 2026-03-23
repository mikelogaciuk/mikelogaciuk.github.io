<script setup lang="ts">
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`posts-${slug}`, () => {
  return queryCollection("blog").path(`/posts/${slug}`).first();
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 sm:py-16 w-full overflow-hidden">
    <article v-if="post" class="prose sm:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl sm:prose-h1:text-4xl prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl prose-a:text-primary">
      
      <!-- Header -->
      <div class="mb-12 text-center sm:text-left">
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
          <span class="text-sm font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-lg">
            {{ new Date(post.date).toLocaleDateString() }}
          </span>
          <div class="flex gap-2">
            <NuxtLink 
              v-for="tag in post.tags" 
              :key="String(tag)"
              :to="`/posts/tag/${String(tag)}`"
              class="px-3 py-1 text-xs font-semibold bg-base-200 hover:bg-base-300 transition-colors rounded-lg border border-base-300 text-base-content/80"
            >
              #{{ String(tag) }}
            </NuxtLink>
          </div>
        </div>
        
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
          {{ post.title }}
        </h1>
      </div>

      <div class="divider opacity-30 mb-12" />

      <!-- Main Content -->
      <div class="bg-base-100 rounded-3xl">
        <ContentRenderer :value="post" />
      </div>

      <div class="divider opacity-30 mt-20 mb-12" />

      <!-- Footer Navigation -->
      <div class="flex justify-center sm:justify-start mb-16">
        <NuxtLink 
          to="/posts" 
          class="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 font-bold bg-base-200/50 border border-base-300 hover:bg-base-200 hover:border-primary/40 rounded-2xl transition-all duration-300 hover:-translate-x-1"
        >
          <span class="text-lg sm:text-xl leading-none">&larr;</span> 
          <span>Back to All Posts</span>
        </NuxtLink>
      </div>
      
    </article>
  </div>
</template>

<style></style>
