<script lang="ts" setup>
import TimeLineMiddleSvgComponent from './TimeLineMiddleSvgComponent.vue';

defineProps<{
  events: { year: number; title: string }[];
}>();
</script>

<template>
  <!-- <div class="w-full overflow-hidden"> -->
  <ul class="timeline timeline-vertical">
    <li v-for="(event, idx) in events" :key="idx" class="w-full">
      <div class="timeline-start text-sm">{{ event.year }}</div>
      <TimeLineMiddleSvgComponent />
      <div class="timeline-end timeline-box text-xs whitespace-normal wrap-break-word sm:text-sm">{{ event.title }}
      </div>
      <hr v-if="idx < events.length - 1" />
    </li>
  </ul>
  <!-- </div> -->
</template>

<style scoped>
ul.timeline-vertical > li {
  grid-template-columns: auto auto minmax(0, 1fr);
  justify-items: start;
}
</style>