---
title: "Rust is Not That Scary... At first."
date: 2025-11-01
tags: ["rust", "programming", "programming"]
language: "en"
---

![Header](/img/rusty-cartoon-01.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [🦀 Introduction](#-introduction)
- [�‍⬛ The syntax overview](#-the-syntax-overview)
- [🚀 More syntax](#-more-syntax)
  - [Quick Tips](#quick-tips)
- [References and Further Reading](#references-and-further-reading)

## 🦀 Introduction

The `Rust` programming language has been gaining popularity for its performance, safety, and concurrency features. However, many newcomers find it intimidating due to its strict compiler and unique concepts like ownership and borrowing. In this post, we'll explore why Rust is not as scary as it seems at first glance and how to get started with it.

But I will not cover the basics of installing Rust or setting up your development environment. Instead, I will focus on the mindset and approach needed to overcome the initial fear of Rust.

For those who are new to Rust, here are some tips to help you get started:

1. **Compiler is your Teacher**: Rust's compiler is known for its helpful error messages. Don't be discouraged by errors; instead, see them as learning opportunities. The compiler will guide you to write better code.
2. **Immutability by Default**: Rust encourages immutability, which can be a shift in thinking for those used to mutable variables. Embrace this concept as it leads to safer and more predictable code.
3. **Ownership and Borrowing**: These concepts are central to Rust's safety guarantees. For those who wrote code languages like C or C++, this may seem foreign at first. Take your time to understand these concepts, as they are key to mastering Rust. While for those who wrote some functional programming languages, some concepts may feel more familiar and easier to grasp.
4. **In-line documentation**: Rust has excellent documentation, especially that one that pops up in your IDE. Make use of resources like the [Rust Book](https://doc.rust-lang.org/book/) and [Rust by Example](https://doc.rust-lang.org/rust-by-example/) to learn and practice.
5. **Practice, Practice, Practice**: Like any programming language, the best way to learn Rust is through practice. Start with small projects and gradually increase the complexity as you become more comfortable with the language.

## 🐦‍⬛ The syntax overview

## 🚀 More syntax

Let's dive into Rust's core syntax with practical, easy-to-understand examples. Don't worry if everything doesn't click immediately - that's totally normal!

### Quick Tips

- **Semicolons matter**: An expression without a semicolon returns its value, with a semicolon it doesn't.
- **String vs &str**: `String` is owned, `&str` is a borrowed reference. Start with `&str` for simplicity.
- **Use `println!` for debugging**: The `{:?}` format specifier is super helpful: `println!("{:?}", my_variable);`
- **Don't fight the compiler**: If it complains, there's usually a good reason. Read the error messages carefully!

This covers the essential syntax you'll use daily in Rust. Remember, the best way to learn is by writing code and making mistakes - the compiler will teach you along the way! 🦀

## References and Further Reading

- [The Rust Programming Language (The Rust Book)](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Cheat.rs - Rust Cheat Sheets](https://cheat.rs/)
