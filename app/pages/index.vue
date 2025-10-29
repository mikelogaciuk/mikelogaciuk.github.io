<script setup lang="ts">
import { mapBadges } from "@/helpers/badgeMapper";

const specializations: string[] = [
  "DataOps & DevOps Engineering",
  "Data Analysis & Architecture",
  "Back-End Development",
  "ERP & POS Integration",
];

const skills: string[] = [
  "cicd",
  "devops",
  "sre",
  "networking",
  "infrastructure",
  "docker",
  "kubernetes",
  "terraform",
  "sdlc",
  "sql",
  "plsql",
  "python",
  "ruby",
  "elixir",
  "go",
  "crystal",
  "bash",
  "windows",
  "linux",
  "bi",
  "etl",
  "data modeling",
  "data warehousing",
  "microservices",
  "iac",
  "architecture",
  "grafana",
  "kibana",
  "elasticsearch",
  "splunk",
];

const skillBadges = ref(mapBadges(skills));
</script>

<template>
  <div class="px-2 sm:px-0">
    <div class="flex flex-col items-center mx-auto my-auto space-y-6 mt-10 sm:mt-20 w-full">
      <h1 class="text-3xl sm:text-5xl font-bold mb-2 text-center font-stretch-expanded">
        Michał Logaciuk
      </h1>
      <p class="text-base sm:text-2xl mb-4 mt-15 text-center">
        Senior DevOps Engineer in TERG S.A. (Media Expert)
      </p>
      <br />
      <p class="text-base sm:text-2xl mb-4 text-center">
        I specialize in:
      </p>
      <ul class="list-none list-inside mb-4 flex flex-col items-center mx-auto w-full">
        <li v-for="spec in specializations" :key="spec" class="text-xs sm:text-lg text-center">
          {{ spec }}
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-base sm:text-2xl mb-4 text-center mt-5">
        The skills:
      </h2>
      <div class="w-full flex flex-wrap gap-2 justify-center mx-auto">
        <div v-for="item in skillBadges" :key="item.badge" :class="`badger badger-${item.badge}`">
          <NuxtLink :to="`/posts/tag/${String(item.element)}`">
            {{ String(item.element) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
