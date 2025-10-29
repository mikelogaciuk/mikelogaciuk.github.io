<script lang="ts" setup>
import TimeLineMiddleSvgComponent from './TimeLineMiddleSvgComponent.vue';

defineProps<{
  events: { year: number; title: string }[];
}>();
</script>

<template>
  <div>
    <ul class="timeline timeline-vertical">
      <li v-for="(event, idx) in events" :key="idx">
        <div class="timeline-start text-sm">{{ event.year }}</div>
        <TimeLineMiddleSvgComponent />
        <div class="timeline-end timeline-box text-xs">{{ event.title }}</div>
        <hr v-if="idx < events.length - 1" />

      </li>
    </ul>
  </div>
</template>

<style></style>