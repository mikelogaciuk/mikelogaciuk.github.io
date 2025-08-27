<script setup lang="ts"></script>

<template>
  <div class="flex m-4 gap-4 items-center justify-evenly min-h-[50px] rounded-lg">
    <div class="min-w-2/12 rounded-lg">
      <!-- <UIcon name="devicon-plain:gardener" /> -->
    </div>
    <div class="min-w-6/12 rounded-lg flex flex-row items-center gap-6 justify-center text-center">
      <p>
        <NuxtLink to="/">home</NuxtLink>
      </p>
      <!-- <p><NuxtLink to="/skills">Skills</NuxtLink></p> -->
      <p>
        <NuxtLink to="/posts">posts</NuxtLink>
      </p>

    </div>
    <div class="min-w-2/12 rounded-lg">
      <input type="checkbox" value="nord" class="toggle toggle-xs theme-controller" />
    </div>
  </div>
</template>

<style></style>
