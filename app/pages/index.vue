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
  <div>
    <div
      class="flex flex-col items-center mx-auto my-auto space-y-10 mt-30 md:mt-50"
    >
      <h1
        class="sm:text-lg sm:mb-2 md:text-5xl md:mb-2 text-9xl font-bold mb-4 font-stretch-expanded"
      >
        Mike Logaciuk
      </h1>
      <p class="sm:text-lg sm:mb-2 md:text-2xl md:mb-2 text-3xl mb-6 mt-6">
        Senior DevOps Engineer & Code Writer in TERG S.A. (Media Expert)
      </p>
      <br />
      <p class="sm:text-lg sm:mb-2 md:text-2xl md:mb-2 text-4xl mb-6">
        I specialize in:
      </p>
      <ul
        class="sm:mb-2 list-none list-inside mb-6 flex flex-col justify-items-center mx-auto"
      >
        <li
          v-for="spec in specializations"
          :key="spec"
          class="sm:text-xs text-lg"
        >
          {{ spec }}
        </li>
      </ul>
    </div>
    <div>
      <h2
        class="sm:text-lg sm:mb-2 md:text-2xl md:mb-2 text-3xl mb-6 text-center mt-5"
      >
        The skills list, looks somewhat like:
      </h2>
      <div class="w-xl flex flex-wrap gap-2 justify-center mx-auto">
        <div
          v-for="item in skillBadges"
          :key="item.badge"
          :class="`badger badger-${item.badge}`"
        >
          <NuxtLink :to="`/posts/tag/${String(item.element)}`">
            {{ String(item.element) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
