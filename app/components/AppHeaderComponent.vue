<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between px-2 py-2 sm:px-4 sm:py-4 min-h-[50px] rounded-lg w-full">
    <div class="w-full sm:w-2/12 flex justify-center sm:justify-start mb-2 sm:mb-0">
      <!-- <UIcon name="devicon-plain:gardener" /> -->
    </div>
    <div class="w-full sm:w-8/12 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 justify-center text-center">
      <NuxtLink to="/" class="px-2 py-1 rounded hover:bg-base-200">home</NuxtLink>
      <!-- <NuxtLink to="/skills" class="px-2 py-1 rounded hover:bg-base-200">Skills</NuxtLink> -->
      <NuxtLink to="/posts" class="px-2 py-1 rounded hover:bg-base-200">posts</NuxtLink>
    </div>
    <div class="w-full sm:w-2/12 flex justify-center sm:justify-end mt-2 sm:mt-0">
      <input type="checkbox" value="nord" class="toggle toggle-xs theme-controller">
    </div>
  </div>
</template>

<style></style>
