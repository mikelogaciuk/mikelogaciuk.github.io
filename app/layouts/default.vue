<template>
  <div class="flex flex-col h-screen">
    <AppHeaderComponent />
    <AppMainComponent class="flex-1 overflow-y-visible">
      <!-- <AppMainComponent class="flex-1 w-full m-4 mx-5 bg-base-300 overflow-y-visible"> -->
      <slot />
    </AppMainComponent>

  </div>
</template>

<script lang="ts" setup></script>

<style></style>
