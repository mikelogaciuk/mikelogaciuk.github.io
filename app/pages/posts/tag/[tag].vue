<script setup lang="ts">
const tag: string | string[] = useRoute().params.tag?.toString() || "";

const allPosts = await queryCollection("blog").order("date", "DESC").all();
const filteredPosts = allPosts.filter((post) => post.tags.includes(tag));
</script>

<template>
  <div>
    <PostsListViewerComponent :posts="filteredPosts" />
  </div>
</template>

<style></style>
