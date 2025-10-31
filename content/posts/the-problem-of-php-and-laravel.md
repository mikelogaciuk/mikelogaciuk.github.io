---
title: "The Problem of PHP and Laravel: Overwhelming Choices for Returning Developers"
date: 2025-10-29
tags: ["php", "laravel", "webdev", "fullstack", "programming", "developer-experience"]
language: "en"
---

![PHP and Laravel](/img/the-problem-of-php-laravel.png)

## 📃 Table of Contents

- [📃 Table of Contents](#-table-of-contents)
- [🐘 The plot](#-the-plot)
- [🌈 PHP looks good on paper](#-php-looks-good-on-paper)
- [🤖 The runtime problem](#-the-runtime-problem)
  - [The question is](#the-question-is)
  - [This obviously overwhelms newcomers](#this-obviously-overwhelms-newcomers)
  - [But why I am focusing on Windows here?](#but-why-i-am-focusing-on-windows-here)
- [Laravel’s starter chaos: choice overload disguised as convenience](#laravels-starter-chaos-choice-overload-disguised-as-convenience)
  - [The consequences of this starter diversity are significant](#the-consequences-of-this-starter-diversity-are-significant)
  - [Why does this have to be so complicated?](#why-does-this-have-to-be-so-complicated)
- [🐍 💎 Contrast with Python and Ruby newcomer experience](#--contrast-with-python-and-ruby-newcomer-experience)
- [💰 Real costs for someone trying to get back on track](#-real-costs-for-someone-trying-to-get-back-on-track)
- [🧠 Conclusion](#-conclusion)

## 🐘 The plot

Few weeks ago, I decided to give my very first language I learned, *[the PHP a second chance](https://mikelogaciuk.github.io/posts/what-the-hell-haphpened)*.

This all was driven by curiosity, that was sparked after watching a video about that the **Php** is a new JavaScript, and how **Laravel** is an amazing framework to build web applications quickly.

So I decided, let's get some fun and dived to see how much the ecosystem has evolved and whether I could leverage my past experience to build anything. However, what I encountered was a maze of choices and configurations that made me think that something with **Php** is really off.

## 🌈 PHP looks good on paper

On paper PHP reads like a pragmatic, everywhere language: massive install base, fast iteration, tons of hosting options, and a mature ecosystem of libraries and frameworks.

The syntax is superbly approachable, especially for someone with prior programming experience. Especially the modern PHP versions (7.x, 8.x) have made huge strides in performance, type safety, and developer ergonomics like improved error handling and type declarations, the pipes (8.5+) or property promotion (8.0+) or match expressions (8.0+) and many more.

I really adore the syntax, the options I have to do things in multiple ways, and the overall flexibility of the language; in practice, though, that surface simplicity quickly peels away and becomes kind of maybe interesting at first but overwhelming in practice. When you decide to actually build something beyond a toy app, the number of orthogonal choices—how to run PHP, which scaffolding to use and more to pick—starts to pile up. Each choice has its own trade-offs, and there’s no single “right” answer.

## 🤖 The runtime problem

    There is no single, no canonical PHP runtime option.

Instead of easy choices, you’ll find many competing, completely reasonable ways to run the same code, which for a person who worked with languages as **Python**, **Ruby**, **Typescript** or **Elixir** is quite surprising.

To illustrate, here are some of the most common PHP runtime options I found, each with its own trade-offs:

- **Classic LAMP with Apache + mod_php**: simple and ubiquitous for small projects and shared hosting.
- **Nginx + PHP-FPM**: the production workhorse for higher performance and more control.
- **Local stacks like XAMPP, MAMP, Laragon**: fast to start but easy to drift from production behavior.
- **Containers and Docker images**: great for reproducibility, but require extra configuration and learning.
- **Laravel-specific runners (Sail, Valet, Homestead) and bespoke approaches**: convenient but each imposes its own mental model.
- **Single-process or hybrid runtimes (FrankenPHP-style)**: new, efficient, but yet another model to understand.

### The question is

    But why?
    Why it is so fragmented?
    Why so many valid ways to run the same language?
    Why there is no single easy path with single executable like Python or Node.js?

### This obviously overwhelms newcomers

Tutorials, blog posts and courses often assume different runtimes, so “follow these steps” leads to many incompatible setups. Hence since there is no opinionated default, beginners face:

- “*Works on my machine*” becomes constant friction: differences in PHP version, extensions, server configs, and file permissions surface at the worst moments.
- **Ops and CI/CD** work require standardization; until you choose one, every environment is a potential bug source.
- Few things just do not work on Windows:
  - The official way of starting development instance with `composer run dev` doesn't work on Windows, the workers can't spin up correctly so you need to run it with `php artisan serve` which also doesn't work well for hot-reloading on Windows, so you need to forget about hot-reloading and use `php artisan serve --no-reload`.
  - Another example, the unofficial, but well popular starter with **Nuxt UI** doesn't support Windows at all, pushing Windows users to WSL or VMs.
    - While for me this is not a problem to start a project in WSL or inside **devContainers**, but it is an additional hurdle for beginners who just want to get started quickly.
  - **FrankenPhp** that seems to be a single executable runtime for Php, doesn't work on Windows as well, which again is an additional hurdle for Windows users.

### But why I am focusing on Windows here?

Because Windows is still the most popular desktop OS in the world, and many beginners will start their journey on Windows machines.
And if the ecosystem doesn't support Windows well, it creates an unnecessary barrier to entry for many potential developers, so they choose Javascript or Python instead of Php; because this `sh*t just works` on Windows without any additional hurdles.

## Laravel’s starter chaos: choice overload disguised as convenience

Laravel is an extraordinary framework!

Once you jump onto their website you immediately feel welcomed by the rich set of batteries included, the elegant syntax, and the vibrant community.

But down the rabbit hole of getting started lies a bewildering array of starter kits and frontend options that can paralyse decision-making.

Because instead of single “Laravel way” to scaffold a new app, you have multiple competing starters, each with its own philosophy and trade-offs:

- **Vanilla Laravel**: minimal, predictable, but leaves many architectural decisions to you.
- **Laravel Breeze (Blade)** vs. **Breeze with Livewire**: both start similar, they add auth, sessions, and teams, but push opinions and complexity onto the app up front but Livewire adds new set of directories to the `/resource` directory.
- **Livewire variants**: plain Livewire, Breeze+Livewire, Livewire with Volt or Flux UI (paid), classical vs functional component; to name few.
- **Inertia**, **API-first**, or **full SPA routes**.

Each of them, alters how you structure components, test behavior, and debug the UI. In simple terms, gives you different philosophies that cause teams to reason differently about state, routing, and deployment.

### The consequences of this starter diversity are significant

From very start, the choice of starter shapes the entire development experience:

- Two Laravel apps can look and work entirely differently depending on starter choices.
- The structure of views, components, and assets varies widely and can confuse even experienced Laravel developers.
- New contributors must learn not just Laravel, but the exact stack you picked (Livewire idioms, Volt conventions, or Inertia flow).
- Adding or changing stacks mid-project is costly because they affect how the whole system communicates (server vs client, templating vs components, state flow).

### Why does this have to be so complicated?

Why there is no single recommended starter that balances simplicity and power for most use-cases?

Why they don't just pick one **enemy** to focus on and optimize the experience around that?

For example if the Laravel Team wanted to compete against frameworks like **Django**, **Phoenix** or **Rails**, they could have picked one canonical starter that covers 80% of use-cases well. The Breeze with Blade option seems to be the closest to that, but it is not promoted as the default way to start a new Laravel app and the ecosystem keeps pushing many alternatives that fragment the community.

On the other hand if they wanted to compete against `Next.js` or `Nuxt.js`, they could have picked `Livewire with functional Volt` as the default starter, since it provides a modern component-based approach with server-driven rendering that fits many web app needs. And it could easily fill the gap in the Market for `Next.js` or `Nuxt.js` but with a strong backend integration

## 🐍 💎 Contrast with Python and Ruby newcomer experience

Languages like **Python** and **Ruby** present a different first impression to beginners because their ecosystems are more opinionated about project bootsrapping.

As such:

- **Ruby (Rails)**: one canonical `rails new` flow that scaffolds a conventional structure; conventions guide you so you can learn one idiom deeply.
- **Python (Django)**: also push a clear path (project -> app -> migrations -> templates) with a single recommended dev server and deployment patterns for typical use-cases.

Those opinions reduce cognitive load. You still can pick other tools, but the common tutorials, deploy targets and shared community knowledge converge on a consistent default.

PHP’s multiplicity denies that same safe default: there are many *"right"* ways but no single obvious path, and that’s exhausting for someone returning to their first language.

## 💰 Real costs for someone trying to get back on track

The meta-decisions imposed by PHP’s runtime and starter diversity have real costs.

They all add friction to getting started and maintaining momentum:

- **Mental overhead**: you waste energy choosing between environments and starters instead of learning modern idioms and libraries.
- **Slow onboarding**: getting a reproducible dev environment that matches production takes time and discipline.
- **Fragmented learning paths**: tutorials focus on different stacks—one course teaches Blade, another teaches Livewire, a third teaches Inertia—so progress feels disjointed.
- **Upgrade uncertainty**: starter kits and paid UI kits tie you into upgrade paths that can complicate long-term maintenance.

That friction is real and discouraging.

## 🧠 Conclusion

**PHP’s paradox is simple**: It’s incredibly capable and powers half the web, but its abundance of valid tools and starter permutations makes the first steps messy.

    On paper it looks friendly and pragmatic;
    in practice it often forces you into meta-decisions
    about runtimes and scaffolding that slows progress.

I wish the ecosystem had a clearer, more opinionated path for new or returning developers: one that balances flexibility with simplicity.
Until then, anyone revisiting PHP and Laravel should brace for a journey through a maze of choices—each valid, but none definitive.
