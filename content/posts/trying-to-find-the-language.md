---
title: "Trying to find that one language... sort of"
date: 2025-11-22
tags: [programming, languages, development, burnout, elixir, scala, go, golang, rust, fsharp]
language: en
---

![Trying to Find...](/img/rusty-and-others.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [🤔 The Dilemma](#-the-dilemma)
- [🐘 Php](#-php)
- [🐦‍⬛ Crystal](#-crystal)
- [🐋 Go](#-go)
- [🧰 Scala](#-scala)
- [📘 Typescript](#-typescript)
- [🦀 Rust](#-rust)
- [💷 The functional shift](#-the-functional-shift)
- [👽 FSharp](#-fsharp)
- [🧴 Elixir](#-elixir)
- [❤️ Conclusion](#️-conclusion)

## 🤔 The Dilemma

Since few years, I've been exploring various programming languages, trying to find the one that truly resonates with me. Each language has its own strengths and weaknesses, and the choice often depends on the specific use case. However, the journey to find the "right" language can be both exciting and overwhelming.

As some already know, my journey started with Php back in the early 2000s, then I moved to Python and Ruby few years later. Together with Javascript and Typescript, these four languages have been my main tools for data engineering, automation and scripting stuff. While pure JS was mostly used in pre-TERG era days.

    However, as time went on, I started to feel a sense of burnout.

I found myself longing for a language that could offer both performance and modern features, while also being approachable for someone without a formal CS background (if it even matters)

Thats why I started my journey of language searching crusade and it was kinda surprising and refreshing...

## 🐘 Php

Php is a language that I have a long history with, having started my programming journey with it back in early 2000s. While Php has its strengths, I stopped coding in it around 2008, when I left the high-school.

That's why I decided to revisit Php during my language exploration journey.

While Php is still widely used for a web development, I found it to be kind of troublesome in terms of use apart from web development context. While both Laravel and Symfony are great frameworks, I found myself fighting with the language's inconsistencies and quirks, especially on Windows.

Wish there were better options for building command-line applications and scripts in Php, but overall, I found the language to be less enjoyable to work with compared to other languages like Python or Ruby.

Another problem is the Laravel and its strange idea of starters.

For example, I could find over 5 different ways to start a new Laravel project, each with its own pros and cons. This fragmentation made it difficult to choose the right approach for my projects.

## 🐦‍⬛ Crystal

Crystal is one hell of a language that I explored during my journey. Its syntax is similar to Ruby, which made it easy for me to pick up. The language's focus on performance and concurrency made it a great fit for building scalable applications and it is damn really fast, as fast as C or Go in many cases.

But the Crystal major problem is not its syntax or performance, but rather its ecosystem:

- The tooling in terms of packaging and dependency management, is not as mature as other languages.
- The second problem is the lack of official language server (LSP), which made it difficult to get proper IDE support and code completion.

Thus, while Crystal has a lot of potential, I abandoned it fairly quickly.

## 🐋 Go

Go, on the other hand, felt like a `C` for idiots (like me). Its simplicity and focus on performance made it a great fit for building efficient applications. The language's built-in concurrency model allowed me to easily write code that could take advantage of multi-core processors.

But Go's simplicity also meant that I stumbled upon the all and mighty: `if err != nil` pattern, which while being explicit and clear, felt a bit repetitive and verbose at times.

Once the code grows and the error handling becomes a must - the `if err != nil` starts to pile up and make the code less readable and because of that I had few times when I couldn't find the bug in my code because of the excessive error handling, which made it hard to spot the actual logic of the code.

## 🧰 Scala

Scala is another language that I explored during my journey (mainly by studying its syntax). Its combination of object-oriented and functional programming paradigms made it a versatile language for building complex applications.

The language's strong type system and support for higher-order functions allowed me to write some dummy code that was both expressive and safe - reducing the chances of runtime errors.

The Scala is not so hard as it is often portrayed, it has nice Ruby / Python-like syntax, which makes it approachable for someone without a formal CS background but with a strong Python / Ruby experience.

However, the Scala partitioning between Scala 2 and Scala 3, becomes a real hurdle for me. And while Scala 2 is not that bad, the Scala 3 with its new features and syntax changes is more appealing to me. But the lack of backward compatibility makes it hard to justify using it for production applications.

I hope that the Scala community will finally grow-up and start to focus on the language's strengths, rather than getting bogged down in versioning issues.

## 📘 Typescript

And here comes the Typescript, the superset of Javascript, which became my go-to language for example for this blog itself.

Typescript offers a great balance between performance, modern features, and community support. Its static typing system allows me to catch errors at compile-time, reducing the chances of runtime errors. The language's support for modern JavaScript features, such as async/await and modules, makes it easy to write clean and maintainable code.

Another huge advantage is the vast front-end ecosystem, which allows to create full-stack applications with ease, using frameworks like Nuxt.js.

With a companion of Bun, the modern JavaScript runtime, Typescript becomes even more appealing. Bun's focus on performance and developer experience makes it a great fit for building efficient applications and thus you can even build single-file executables with it.

## 🦀 Rust

Rust is a systems programming language that has gained popularity in recent years for its focus on safety, performance, and concurrency. Its unique ownership model and strong type system make it a great fit for building reliable and efficient applications.

While the borrow-checker and ownership model are supposedly hard to grasp, I found them to be quite intuitive for more functional oriented programmers. Once you get the hang of it, Rust's memory safety guarantees and zero-cost abstractions make it a joy to work with.

The main downside of Rust is its steep learning curve in terms of really broad syntax, while the basic cheat-sheets look really simple - once you got into complex topics it becomes slight a mess in terms of syntax.

## 💷 The functional shift

For me, the functional programming paradigm was always more interesting than typical object-oriented programming, code felt always more elegant and expressive when written in a functional style.

Less prone to side effects and easier to reason about, especially when dealing with complex data transformations.

That's why in the later part of my journey, I found myself watching Youtube video about `some universal programming language` that allows you to program on `paper` without a hassle.

It was obviously a story, about `lambda calculus` and it easily reminded me of how programming can be beautiful and elegant when approached from a functional perspective.

## 👽 FSharp

While FSharp is a powerful language with elegant, expressive and really interesting syntax, I found it to be a bit too niche or extravagant for my taste at first.

But after some research, I found that it is very popular in complex financial systems and that it is widely used in Domain Driven Design; and that made me appreciate the language more.

While I didn't end up using FSharp as my primary language, I did learn a lot from it. The functional programming concepts and the emphasis on immutability have influenced my coding style, especially in Python and our all data engineering pipelines.

To this day, I still occasionally use FSharp for specific tasks, especially when working with domain modelling, just to experiment and prototype. Its concise syntax and powerful type system make it a joy to work with, even if it's not my main language and used mainly for fun.

But its occasional ability to interop with C# and .NET ecosystem, makes it a viable option if C# makes you feel sick.

## 🧴 Elixir

Elixir is another functional programming language that caught my attention during my journey. Its focus on concurrency and fault-tolerance made it a great fit for building scalable applications. The actor model and the use of lightweight processes allowed me to build mock-up apps that could handle a vast number of concurrent tasks with ease.

Elixir uses the Erlang VM, which has a long history of reliability and uptime. This made me feel confident in building API's that could handle failures gracefully.

But the language, while interesting, with beautiful Ruby-like syntax, can be a bit too overwhelming at start, but not in a terms of pure functional programming, but rather in terms of the Erlang ecosystem and its conventions... However, once you get past the initial learning curve, Elixir becomes a joy to work with. You just need to switch your mind and it will finally click.

Another great reason for Elixir is its community; that is passionate and supportive and the author of the language, `José Valim`, is very active and engaged with the community.

I met José in person at `2004 EuRuKo Conference in Sarajevo`, and his presentation about Elixir was extremely inspiring.

## ❤️ Conclusion

In conclusion, my journey to find the "right" programming language has been both exciting and challenging. Each language has its own strengths and weaknesses, and the choice often depends on the specific use case. It's obvious, that I have learned a lot from each language I have explored.

**Ultimately, the "right" language is the one that best fits your needs** and allows you to build the applications you envision. Whether it's FSharp, Elixir, Go, Scala, Rust or Typescript, or any other language, the key is to keep learning and growing as a developer. After all, the journey is just as important as the destination.

I'll still keep using Python and Ruby for specific tasks, as I written hundreds of thousands lines of code. And yet this code still runs in production. Even today...

But for new projects, especially private ones, I find myself increasingly drawn to `Elixir` or `Typescript`, for their modern features, and strong community support, but will also stay in touch pretty much with `F#`, `Ruby` and `Python`.

Time will show, because I would like to avoid the burnout in future, by sticking to one or two languages only, instead of jumping between many different ones.
After all, the goal is to find a language that not only meets my technical needs but also brings joy and satisfaction to my work as a developer.
