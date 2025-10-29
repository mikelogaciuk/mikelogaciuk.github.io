<template>
    <div class="px-2 sm:px-0">
        <div class="flex flex-col items-center mx-auto my-auto space-y-6 mt-10 sm:mt-20 w-full">
            <p class="sm:text-4xl text-4xl font-bold mb-5">About Me</p>
        </div>
        <section class="about-cover-letter">
            <div class="cover-letter-card">
                <h1 class="mb-5">👋 Hi, I'm <strong>Michał</strong>!</h1>
                <p>
                    If you're reading this, you're probably curious about the person behind the code, the blog
                    posts, and the occasional bad pun. Welcome!<br><br>
                    <strong>Who am I?</strong><br>
                    A passionate <strong>DataOps & DevOps Engineer</strong> and how I like to call myself: a
                    <strong>Code
                        Writer</strong>,
                    relentless tinkerer, and lifelong learner. My journey started with
                    curiosity and a keyboard, and has taken me through the wilds of Architecture, Design, Data
                    Engineering and DevOps chaos, to the elegance of
                    functional programming, and the art of building things that (usually) work.<br><br>
                    <strong>What drives me?</strong><br>
                    I thrive on solving real problems, automating the boring stuff, and making complex things
                    simple. Whether it's scripting, architecting cloud solutions, or writing about the latest tech
                    rabbit hole I've fallen into, I bring energy and a touch of humor to everything I do.<br><br>
                    <strong>Why work with me?</strong><br>
                    I believe in clear communication, creative solutions, and never settling for "just works". I
                    love collaborating with people who challenge me, and I’m always up for a chat about code,
                    coffee, or the best way to automate your morning routine.<br><br>
                    <strong>My Journey so far:</strong>

                    <TimeLineComponent class="timeline-align-left" :events="[
                        { year: 2014, title: 'Helpdesk Support & Team Leader' },
                        { year: 2016, title: 'L3 Support & IT Operations' },
                        { year: 2016, title: 'SQL Server Applications Administrator' },
                        { year: 2023, title: 'Senior DevOps & DataOps Engineer' }
                    ]" />
                </p><br><br>
                <div class="signature">
                    <span>— Michał Logaciuk</span>
                </div>
            </div>
        </section>
    </div>

</template>
<script lang="ts" setup>
import TimeLineComponent from '~/components/TimeLineComponent.vue';


</script>

<style scoped>
.timeline-align-left {
    display: flex;
    justify-content: flex-start;
    margin-top: 1.5rem;
}
</style>