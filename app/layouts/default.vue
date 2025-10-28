<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <AppHeaderComponent />
    <AppMainComponent class="flex-1 w-full px-2 py-2 sm:px-4 sm:py-4">
      <slot />
    </AppMainComponent>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
