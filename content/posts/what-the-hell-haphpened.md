---
title: "What the hell haPhpened?"
date: 2025-10-10
tags: ["php", "fullstack", "nostalgia", "webdev", "backend", "programming", "coding", "technology", "history"]
language: "en"
---

![Pic](/img/php_001.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [🐳 The context](#-the-context)
- [🤔 What's the point?](#-whats-the-point)
- [🛣️ Fast-forward](#️-fast-forward)
- [🧂Future](#-future)

## The context

    I've never thought of PHP as more than a simple tool to solve problems
    — Rasmus Lerdor

Since the general story about **Php** is usually known, I would rather not dive in it.

But, since **Php** was my very first language I touched: I decided to share my personal attachment to the language as it was the first programming language I tried to learn (sort off).

I remember when I started my journey in *coding*, the decision was simple: the **Php**. Why? Becuase my friends were using it, so it was obvious to take the same path as them.

But those were early **2000s**, the **2005** to be exact, and I was:

- Still a kid, so I didn't have a clue what I was doing.
- I knew how computer works, how to build it, how to install OS, how to use it.
- I just wanted to create a website for my **Counter-Strike** clan.
- I didn't know anything about programming, web development or so (apart from basics of html and styling).
- I just knew that I wanted to create a website.
- Back then, it felt not so hard to do so (at least I thougt so).

So I found a free hosting service that supported **Php** and started my journey and back then, code would like this:

```php
<html>
<head>
  <title><?php echo $clanName; ?> - Official Clan Site</title>
  <style>
    body { background-color: #000; color: #0f0; font-family: "Courier New", monospace; }
    a { color: #0ff; text-decoration: none; }
    .header { font-size: 24px; margin-bottom: 10px; }
    .match { border-bottom: 1px solid #0f0; padding: 5px 0; }
  </style>
</head>
<body>
  <div class="header"><?php echo $clanName; ?> [CS 1.6]</div>
  <p>Welcome to our official clan site. Today is <?php echo date("l, F j, Y"); ?></p>

  <?php if ($isLoggedIn): ?>
    <p>Logged in as <strong><?php echo $username; ?></strong> | <a href="logout.php">Logout</a></p>
  <?php else: ?>
    <p><a href="login.php">Login</a> to access member-only content.</p>
  <?php endif; ?>

  <h2>Latest Matches</h2>
  <?php foreach ($recentMatches as $match): ?>
    <div class="match">
      <strong><?php echo $match['opponent']; ?></strong> -
      <?php echo $match['result']; ?>
      (<?php echo $match['score']; ?>) on <?php echo $match['map']; ?>
    </div>
  <?php endforeach; ?>

  <h2>Clan Navigation</h2>
  <ul>
    <?php foreach ($menuItems as $item): ?>
      <li><a href="<?php echo $item['url']; ?>"><?php echo $item['label']; ?></a></li>
    <?php endforeach; ?>
  </ul>

  <footer>
    <p>&copy; <?php echo date("Y"); ?> <?php echo $clanName; ?> Clan. All frags reserved.</p>
  </footer>
</body>
</html>
```

It was an era of Php **4.x** and early **5.x**, **LAMP** stack, **phpbb** by **przemo** (which was a big thing back then).

The introduction of Php 5, marked a shift from procedural spaghetti code to more structured applications. Frameworks like `CakePHP` and `Symfony` began to emerge, though many devs still wrote inline templates with `<?php echo $title; ?>` scattered across HTML as I did.

There was no such thing as `CI/CD`, so deploying meant manually uploading files via FTP, stopping the application and re-starting it. Dependency management was a nightmare, as there was no `Composer` yet, and developers often had to bundle libraries directly into their projects and so did I.

The website lived for about a year or so and then removed it.

Then the Ruby on Rails hype came, and I switched to **Ruby**, **Python** and **JavaScript** - but it was only for fun, as I was not doing any serious projects back then.

Then, about **2007** I moved on to other things, didn't code for a few years until I joined **TERG S.A.** in **2014**, but that is a different story.

## 🤔 What's the point?

    But why I am telling you all this?

Because lately I have been thinking about my early days in programming and even since I am **DevOps Engineer** now, I still feel a need of writing things down, creating stuff, building things. Even if it's just for myself, the satisfaction of creating something from scratch is rewarding. But to do so, I need a stack that is easy to set up, has great tooling and is batteries included - which allows to see results quickly.

While the modern web development landscape is dominated by **JavaScript** (with frameworks like React, Angular, and Vue.js) and even this blog is built with *Nuxt 4*, I felt a nostalgic pull towards **Php**. Especially while working in internal projects and seing all the Php codebase around me.

So I decided to revisit **Php** and to give it another go, but this time with a modern twist.

## 🛣️ Fast-forward

Fast forward to today, and the landscape has transformed dramatically: the modern Php (`8.x`) boasts features like union types, attributes, and the much-anticipated pipes operator `|>` in 8.5, enhancing code readability and maintainability.

Tools like `FrankenPHP`, `RoadRunner`, are pushing the boundaries of what Php can do, allowing for asynchronous programming and real-time applications. The ecosystem has flourished with `Composer`, making dependency management a breeze, and frameworks like `Laravel` have set new standards for web development.

The community has grown, embracing best practices, testing, and continuous integration/deployment (CI/CD).

Php is no longer just a language for simple web pages; it's a powerful tool for building complex, scalable applications, especially when you decide to use **Laravel**.

Which I must say is a joy to work with, as it provides a clean and elegant syntax, a robust set of features, and a vibrant ecosystem:

- Eloquent ORM for database interactions
- LiveWire for reactive components (without a need of writing JavaScript)
- Octane for high performance server
- Blade templating engine for clean views
- Built-in authentication and authorization
- Task scheduling and queues for background jobs
- Extensive documentation and a supportive community
- and so on...

In other words, Laravel is the promise of what the full-stack development should be, without a need of touching JavaScript (unless you want to). Something like **Ruby on Rails** for **Ruby**, but a little bit less opinionated (but still great).

## 🧂 Future

So, what does the future hold for me and **Php**?

I plan to continue exploring the language and its ecosystem, building small projects to hone my skills. I want to dive deeper into **Laravel**, mastering its features and best practices. In order to be able to deliver full-stack applications on my own, without a need of working with anyone else except myself.

I just want to have fun of coding again, and **Php** seems to be a great fit for that.
