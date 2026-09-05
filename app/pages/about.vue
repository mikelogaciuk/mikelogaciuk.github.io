<template>
  <div class="max-w-6xl mx-auto px-4 py-8 sm:py-16">
    <!-- Header -->
    <div class="text-center md:text-left mb-12 sm:mb-16">
      <h1
        class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary pb-2">
        About Me
      </h1>
      <p class="text-xl sm:text-2xl font-medium text-base-content/80">
        Staff Platform & Systems Engineer, Code Writer and Automation Enthusiast.
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      <!-- Text Section -->
      <div class="lg:col-span-7 space-y-8 text-lg text-base-content/80 leading-relaxed">
        <div
          class="bg-base-200/30 p-8 sm:p-10 rounded-3xl border border-base-300 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
          <h2 class="text-3xl sm:text-4xl font-bold text-base-content flex items-center gap-4 mb-8">
            <span class="text-4xl sm:text-5xl">👋</span> Hi, I'm Michał!
          </h2>
          <div class="space-y-8">
            <p class="text-xl font-medium leading-relaxed">
              If you're reading this, you're probably curious about the person behind the code, the blog
              posts, and the occasional bad pun. Welcome!
            </p>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold text-base-content flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-primary block" /> Who am I?
              </h3>
              <p>
                A passionate <strong class="text-primary font-semibold">Staff Platform & Systems Engineer</strong> and
                how I
                like to call myself: a <strong class="text-primary font-semibold">Code Writer</strong>,
                relentless tinkerer, and lifelong learner. My journey started with
                curiosity and a keyboard, and has taken me through the wilds of Architecture, Design, Data
                Engineering and DevOps/SRE chaos, to the elegance of functional programming, and the art of building
                things
                that (usually) work with performance in mind..
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold text-base-content flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-secondary block" /> What drives me?
              </h3>
              <p>
                I thrive on solving real problems, automating the boring stuff, and making complex things
                simple. Whether it's scripting, architecting cloud solutions, or writing about the latest tech
                rabbit hole I've fallen into, I bring energy and a touch of humor to everything I do.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold text-base-content flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-accent block" /> Why work with me?
              </h3>
              <p>
                I believe in clear communication, creative solutions, and never settling for "just works". I
                love collaborating with people who challenge me, and I’m always up for a chat about code,
                coffee, or the best way to automate your morning routine.
              </p>
            </div>

            <div class="pt-8 font-medium text-right text-base-content opacity-50 italic">
              — Michał Logaciuk
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Sidebar -->
      <div class="lg:col-span-5 sticky top-24">
        <div
          class="bg-base-200/30 p-6 md:p-8 rounded-3xl border border-base-300 shadow-sm transition-all hover:border-primary/20">
          <h3 class="text-xl font-bold text-base-content mb-8 border-b border-base-300 pb-4 flex items-center gap-2">
            My Journey
          </h3>
          <div class="pl-2">
            <TimeLineComponent class="timeline-align-left" :events="[
              { year: 2014, title: 'IT Administrator & Systems Support ' },
              { year: 2016, title: 'Senior Data Engineer' },
              { year: 2023, title: 'Senior DevOps Engineer' },
              { year: 2025, title: 'Staff Platform & Systems Engineer ' }
            ]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeLineComponent from '~/components/TimeLineComponent.vue';
</script>

<style scoped>
.timeline-align-left {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}
</style>