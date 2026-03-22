<template>
  <div class="snap-container disable-default-scrollbar w-full relative">

    <!-- Section 1: Hero -->
    <section
      class="snap-section flex flex-col justify-center min-h-[80vh] px-4 py-12 lg:py-20 max-w-6xl mx-auto w-full">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8 w-full relative z-10">
        <div class="flex-1 space-y-6 text-center md:text-left w-full">
          <h1
            class="reveal-on-scroll stagger-1 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r md:bg-linear-to-br from-primary via-primary/80 to-secondary pb-4 drop-shadow-sm">
            Michał Logaciuk
          </h1>
          <div
            class="reveal-on-scroll stagger-2 text-xl sm:text-2xl lg:text-3xl font-medium text-base-content/80 text-balance flex flex-col md:flex-row items-center md:items-start md:gap-2 justify-center md:justify-start overflow-hidden">
            <span class="inline-grid relative text-primary font-bold text-center md:text-left h-8 sm:h-auto">
              <!-- Animated mapped titles -->
              <span 
                v-for="(title, index) in titles" 
                :key="title" 
                class="col-start-1 row-start-1 transition-all duration-700 w-full" 
                :class="[
                  currentTitleIndex === index ? 'opacity-100 translate-y-0' : 
                  (index < currentTitleIndex || (currentTitleIndex === 0 && index === titles.length - 1)) ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-0 translate-y-8 pointer-events-none'
                ]"
              >
                {{ title }}
              </span>
              <!-- Invisible ghost ensures width/height doesn't stutter -->
              <span class="col-start-1 row-start-1 invisible pointer-events-none">Senior DevOps Engineer</span>
            </span>
            <span class="hidden md:inline text-primary opacity-50 px-2 select-none">|</span>
            <span>TERG S.A. (Media Expert)</span>
          </div>


        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Section 2: Skills -->
    <section
      class="snap-section flex flex-col justify-center min-h-[85vh] px-4 py-16 lg:py-24 max-w-6xl mx-auto w-full">
      <div class="space-y-12 w-full">
        <div class="text-center md:text-left reveal-on-scroll stagger-1">
          <h2 class="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Tech Stack</h2>
          <p class="text-xl sm:text-2xl font-medium text-base-content/70">Technologies, languages, and tools I work
            with:
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div v-for="(badges, category, index) in mappedCategories" :key="category"
            class="reveal-on-scroll group bg-base-200/20 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-base-300/60 hover:border-primary/50 hover:bg-base-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
            :class="`stagger-${(index % 4) + 2}`">
            <!-- Decorative gradient bg -->
            <div
              class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />

            <h3 class="text-2xl font-bold mb-6 text-base-content/90 pb-3 flex items-center gap-3 relative z-10">
              <span class="w-2 h-8 rounded-full bg-primary block" /> {{ category }}
            </h3>
            <div class="flex flex-wrap gap-3 relative z-10">
              <div v-for="item in badges" :key="item.badge"
                :class="`badger badger-${item.badge} transition-transform duration-300 hover:scale-110 hover:-rotate-2 hover:shadow-lg cursor-pointer`">
                <NuxtLink :to="`/posts/tag/${String(item.element)}`" class="block w-full h-full">
                  {{ String(item.element) }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Section 3: Key Achievements -->
    <section class="snap-section flex flex-col justify-center min-h-[85vh] px-4 py-16 lg:py-24 max-w-6xl mx-auto w-full">
      <div class="space-y-12 w-full">
        <div class="text-center md:text-left reveal-on-scroll stagger-1">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary pb-2">
            Featured Work
          </h2>
          <p class="text-xl sm:text-2xl font-medium text-base-content/70">
            Real-world impact, architecture, and automation at scale.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Achievement 1 -->
          <div class="bg-base-200/40 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-base-300 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group reveal-on-scroll stagger-2 relative overflow-hidden">
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
            
            <div class="text-primary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold mb-4 text-base-content/90 group-hover:text-primary transition-colors">
              Data Engineering & ERP Modernization
            </h3>
            <p class="text-base-content/70 text-lg leading-relaxed mb-6">
              Completely re-architected legacy POS and ERP (Comarch & D365) integrations. Led the migration of 100+ fragile SSIS packages into robust, hand-crafted Prefect workflows using Python, Pandas, DuckDB, and Polars.
            </p>
            <ul class="text-sm font-bold text-base-content/60 space-y-2">
              <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-secondary" /> Modular, hand-crafted integration logic</li>
              <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-secondary" /> High-performance DuckDB & Polars ETLs</li>
            </ul>
          </div>

          <!-- Achievement 2 -->
          <div class="bg-base-200/40 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-base-300 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group reveal-on-scroll stagger-3 relative overflow-hidden">
            <div class="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all duration-700 pointer-events-none" />
            
            <div class="text-secondary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold mb-4 text-base-content/90 group-hover:text-secondary transition-colors">
              Infrastructure & Security Transformation
            </h3>
            <p class="text-base-content/70 text-lg leading-relaxed mb-6">
              Architected and deployed a custom Prefect cluster from scratch, implementing unique cloud-function capabilities. Established automated, department-wide security scanning standards that directly drove the core IT transformation process.
            </p>
            <ul class="text-sm font-bold text-base-content/60 space-y-2">
              <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary" /> Custom Prefect cluster infrastructure</li>
              <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary" /> Department-wide security integration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Featured Posts -->
    <section
      class="snap-section flex flex-col justify-center min-h-[85vh] px-4 py-16 lg:py-24 max-w-6xl mx-auto w-full">
      <div class="space-y-12 w-full">
        <div
          class="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 reveal-on-scroll stagger-1 text-center sm:text-left">
          <div>
            <h2 class="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Latest Writing</h2>
            <p class="text-xl sm:text-2xl font-medium text-base-content/70">Thoughts, guides, and engineering logs</p>
          </div>
          <NuxtLink to="/posts"
            class="btn btn-outline border-base-300 hover:border-primary hover:bg-primary hover:text-primary-content rounded-2xl font-bold px-8 transition-all hover:scale-105">
            View All Posts
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink v-for="(post, index) in featuredPosts" :key="post.path" :to="post.path"
            class="reveal-on-scroll group bg-base-200/30 p-6 sm:p-8 rounded-3xl border border-base-300 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between h-full"
            :class="`stagger-${(index % 3) + 2}`">
            <div>
              <div
                class="text-xs font-bold text-primary mb-4 tracking-widest uppercase bg-primary/10 inline-block px-3 py-1 rounded-lg">
                {{ new Date(post.date).toLocaleDateString() }}
              </div>
              <h3 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {{ post.title }}</h3>
              <p class="text-base-content/70 text-base line-clamp-3 mb-8 leading-relaxed">{{ post.description || '' }}
              </p>
            </div>
            <div
              class="text-sm font-bold text-base-content/50 group-hover:text-primary flex items-center gap-2 transition-colors mt-auto">
              Read Article <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section 4: Engineering Philosophy & Expertise -->
    <section
      class="snap-section flex flex-col justify-center min-h-[85vh] px-4 py-16 lg:py-24 max-w-6xl mx-auto w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Philosophy Text -->
        <div class="lg:col-span-7 space-y-10 text-center lg:text-left reveal-on-scroll stagger-1">
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary pb-2">
            Engineering Philosophy
          </h2>
          <div class="text-xl sm:text-2xl font-medium text-base-content/80 leading-relaxed text-balance space-y-6">
            <p>
              I believe that the best infrastructure is invisible. It should empower developers to ship faster, safely,
              and without friction.
            </p>
            <p>
              Automation isn't just about saving time; it's about reducing cognitive load and eliminating human error. I
              strive to build systems that are <strong class="text-base-content font-bold">deeply observable</strong>,
              <strong class="text-base-content font-bold">undeniably resilient</strong>, and <strong
                class="text-base-content font-bold">brutally simple</strong>.
            </p>
          </div>
        </div>

        <!-- Core Expertise -->
        <div class="lg:col-span-5 w-full max-w-xl mx-auto lg:mx-0 reveal-on-scroll stagger-2">
          <div
            class="bg-base-200/40 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-base-300 shadow-xl relative overflow-hidden group">
            <div
              class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />

            <h3
              class="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-8 flex items-center justify-center lg:justify-start gap-3 relative z-10">
              <span class="w-1.5 h-1.5 rounded-full bg-primary" /> Core Focus Areas
            </h3>

            <ul class="space-y-4 text-left relative z-10">
              <li v-for="(spec, i) in specializations" :key="spec"
                class="hover-float bg-base-100/50 p-5 rounded-2xl border border-base-300/50 flex items-center gap-4 transition-all duration-300 hover:border-primary/30 hover:bg-base-100"
                :style="`transition-delay: ${i * 50}ms`">
                <div class="w-3 h-3 rounded-full bg-linear-to-br from-primary to-secondary shrink-0" />
                <span class="font-bold text-base-content/90 text-lg">{{ spec }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: CTA / Footer -->
    <section
      class="snap-section flex flex-col justify-center min-h-[85vh] px-4 py-16 lg:py-24 max-w-6xl mx-auto w-full pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Text -->
        <div class="lg:col-span-7 space-y-10 text-center lg:text-left reveal-on-scroll stagger-1">
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary pb-2">
            Let's Connect
          </h2>
          <div class="text-xl sm:text-2xl font-medium text-base-content/80 leading-relaxed text-balance space-y-6">
            <p>
              Whether you want to discuss POS systems architecture or integration, need help scaling your data
              pipelines, or just want to swap tech horror stories — I'm always open to a chat.
            </p>
          </div>
        </div>

        <!-- Social/Contact Links -->
        <div class="lg:col-span-5 w-full max-w-xl mx-auto lg:mx-0 reveal-on-scroll stagger-2">
          <div
            class="bg-base-200/40 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-base-300 shadow-xl relative overflow-hidden group">
            <div
              class="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />

            <h3
              class="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-8 flex items-center justify-center lg:justify-start gap-3 relative z-10">
              <span class="w-1.5 h-1.5 rounded-full bg-primary" /> Profiles & Links
            </h3>

            <div class="flex flex-col gap-4 relative z-10 w-full">
              <a href="https://github.com/mikelogaciuk" target="_blank"
                class="w-full flex items-center gap-4 bg-base-100/50 hover:bg-base-content hover:text-base-100 p-5 rounded-2xl border border-base-300/50 hover:border-base-content transition-all duration-300 font-bold group/btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span class="text-lg">GitHub</span>
                <span
                  class="ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:-translate-x-1 transition-all text-xl">&rarr;</span>
              </a>
              <a href="https://www.linkedin.com/in/michal-logaciuk" target="_blank"
                class="w-full flex items-center gap-4 bg-base-100/50 hover:bg-[#0A66C2] hover:text-white p-5 rounded-2xl border border-base-300/50 hover:border-[#0A66C2] transition-all duration-300 font-bold group/btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span class="text-lg">LinkedIn</span>
                <span
                  class="ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:-translate-x-1 transition-all text-xl">&rarr;</span>
              </a>
              <a href="mailto:michal.logaciuk@hotmail.com"
                class="w-full flex items-center gap-4 bg-primary text-primary-content hover:bg-primary-focus p-5 rounded-2xl border border-primary transition-all duration-300 font-bold shadow-sm hover:shadow-md group/btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span class="text-lg">Send Email</span>
                <span
                  class="ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:-translate-x-1 transition-all text-xl">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { mapBadges } from "@/helpers/badgeMapper";
import { onMounted, onUnmounted, ref } from 'vue';

const featuredPosts = await queryCollection("blog").order("date", "DESC").limit(3).all();

const titles = [
  "Senior DevOps Engineer",
  "POS Architect",
  "Code Writer",
  "Data Engineer"
];
const currentTitleIndex = ref(0);

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

// Intersection Observer for Animations
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  if (typeof window !== 'undefined') {
    setInterval(() => {
      currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length;
    }, 2800);

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        } else {
          // Remove class when out of view to retrigger animation when scrolling back
          entry.target.classList.remove('animate-reveal');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.value?.observe(el);
    });
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<style scoped>
/* Scroll Snapping */
.snap-container {
  height: calc(100vh - 120px);
  /* Fill the AppMainComponent container height */
  overflow-y: auto;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  margin: -1rem;
  /* Negate the AppMainContainer padding for edge-to-edge scroll */
  padding: 1rem;
  /* Re-add padding inside the scroll view */
  width: calc(100% + 2rem);
  scroll-padding-top: 2rem;
}

.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Hide scrollbar for a cleaner full-page look */
.disable-default-scrollbar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.disable-default-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}

/* Pop-out Animations */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25);
}

.animate-reveal {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.stagger-1 {
  transition-delay: 100ms;
}

.stagger-2 {
  transition-delay: 200ms;
}

.stagger-3 {
  transition-delay: 300ms;
}

.stagger-4 {
  transition-delay: 400ms;
}

.stagger-5 {
  transition-delay: 500ms;
}

.hover-float:hover {
  transform: translateY(-4px) scale(1.02);
}
</style>
