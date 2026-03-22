<script setup lang="ts">
const allPosts = await queryCollection("blog").order("date", "DESC").all();
</script>

<template>
  <div class="flex flex-col w-full mx-auto">
    <PostsListViewerComponent :posts="allPosts" />
  </div>
</template>

<style></style>
