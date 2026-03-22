<script setup lang="ts">
import { mapBadges } from "@/helpers/badgeMapper";

const specializations: string[] = [
  "DataOps & DevOps Engineering",
  "Data Analysis & Architecture",
  "Back-End Development",
  "ERP & POS Integration",
];

const skillCategories: Record<string, string[]> = {
  "Infrastructure & Cloud": [
    "docker", "kubernetes", "terraform", "linux", "windows", "networking", "iac"
  ],
  "Development": [
    "python", "go", "ruby", "elixir", "crystal", "bash", "sql", "plsql"
  ],
  "DevOps & SRE": [
    "cicd", "devops", "sre", "sdlc", "microservices", "architecture"
  ],
  "Data & Observability": [
    "etl", "bi", "data modeling", "data warehousing", "grafana", "kibana", "elasticsearch", "splunk"
  ],
};

const mappedCategories = computed(() => {
  const result: Record<string, ReturnType<typeof mapBadges>> = {};
  for (const [category, skills] of Object.entries(skillCategories)) {
    result[category] = mapBadges(skills);
  }
  return result;
});
</script>

<template>
  <div class="px-4 py-8 sm:py-12 mx-auto max-w-6xl">
    <!-- Hero Section -->
    <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
      <div class="flex-1 space-y-6 text-center md:text-left w-full">
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary pb-2">
          Michał Logaciuk
        </h1>
        <p class="text-xl sm:text-2xl font-medium text-base-content/80">
          Senior DevOps Engineer <span class="hidden sm:inline">|</span><span class="sm:hidden"><br></span> TERG S.A. (Media Expert)
        </p>
        
        <div class="pt-6">
          <h2 class="text-sm font-bold uppercase tracking-widest text-base-content/60 mb-6">
            Core Expertise
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-2xl mx-auto md:mx-0">
            <li 
              v-for="spec in specializations" 
              :key="spec" 
              class="bg-base-200/50 hover:bg-base-200 p-4 rounded-xl border border-base-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm flex items-center gap-4"
            >
              <div class="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
              <span class="font-semibold text-base-content/90">{{ spec }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider my-12 opacity-50" />

    <!-- Skills Section -->
    <div class="space-y-10">
      <div class="text-center md:text-left mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold mb-3">Tech Stack</h2>
        <p class="text-xl font-medium text-base-content/80">Technologies, languages, and tools I work with</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          v-for="(badges, category) in mappedCategories" 
          :key="category"
          class="bg-base-200/30 p-6 sm:p-8 rounded-2xl border border-base-300 hover:border-primary/40 transition-colors duration-300"
        >
          <h3 class="text-xl font-bold mb-6 text-base-content/90 border-b border-base-300 pb-3">
            {{ category }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="item in badges" 
              :key="item.badge" 
              :class="`badger badger-${item.badge} transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-pointer`"
            >
              <NuxtLink :to="`/posts/tag/${String(item.element)}`" class="block w-full h-full">
                {{ String(item.element) }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
