# Rust Syntax Cheat Sheet

## Table of Contents

- [Rust Syntax Cheat Sheet](#rust-syntax-cheat-sheet)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Variables and Mutability](#variables-and-mutability)
    - [Data Types](#data-types)
    - [Functions](#functions)
    - [Control Flow](#control-flow)
      - [If/Else Statements](#ifelse-statements)
      - [Loops](#loops)
    - [Collections](#collections)
      - [Vectors (Dynamic Arrays)](#vectors-dynamic-arrays)
      - [HashMaps (Key-Value Pairs)](#hashmaps-key-value-pairs)
    - [Structs (Custom Data Types)](#structs-custom-data-types)
    - [Enums (Multiple Variants)](#enums-multiple-variants)
    - [Pattern Matching](#pattern-matching)
    - [Error Handling](#error-handling)

## Introduction

### Variables and Mutability

In Rust, variables are **immutable by default**. This means once you set a value, you can't change it unless you explicitly say so:

```rust
// Immutable variable - this is the default
let x = 5;
// x = 6; // ❌ This would cause an error!

// Mutable variable - use 'mut' keyword
let mut y = 5;
y = 6; // ✅ This works fine!
println!("y is now: {}", y);
```

### Data Types

Rust is **statically typed**, but the compiler is smart enough to infer types most of the time:

```rust
// Integer types
let age: i32 = 25;           // 32-bit signed integer
let population: u64 = 8000000000; // 64-bit unsigned integer

// Floating point
let temperature: f64 = 98.6;

// Boolean
let is_raining: bool = false;

// Character (note: single quotes for char, double quotes for strings!)
let emoji: char = '🦀';

// String types
let greeting: &str = "Hello";     // String slice (immutable reference)
let owned_string: String = String::from("Hello, world!"); // Owned string
```

### Functions

Functions in Rust are straightforward. Use `fn` keyword and specify return types with `->`:

```rust
// Function that takes parameters and returns a value
fn add(a: i32, b: i32) -> i32 {
    a + b  // Note: no semicolon = this is the return value!
}

// Function with explicit return
fn subtract(a: i32, b: i32) -> i32 {
    return a - b;  // Using 'return' keyword is also fine
}

// Function that doesn't return anything
fn say_hello(name: &str) {
    println!("Hello, {}!", name);
}

// Using the functions
let sum = add(5, 3);
say_hello("Rustacean");
```

### Control Flow

#### If/Else Statements

```rust
let number = 7;

if number < 5 {
    println!("Number is less than 5");
} else if number == 5 {
    println!("Number is exactly 5");
} else {
    println!("Number is greater than 5");
}

// If as an expression (returns a value!)
let status = if number > 0 { "positive" } else { "negative" };
```

#### Loops

```rust
// Infinite loop (use 'break' to exit)
let mut counter = 0;
loop {
    counter += 1;
    if counter == 5 {
        break;
    }
}

// While loop
let mut n = 3;
while n > 0 {
    println!("{}!", n);
    n -= 1;
}

// For loop (most common for iteration)
for i in 1..5 {  // 1..5 means 1, 2, 3, 4 (excludes 5)
    println!("{}", i);
}

// Iterating over an array
let numbers = [10, 20, 30, 40];
for num in numbers.iter() {
    println!("Number: {}", num);
}
```

### Collections

#### Vectors (Dynamic Arrays)

```rust
// Creating a vector
let mut my_vec: Vec<i32> = Vec::new();

// Adding elements
my_vec.push(1);
my_vec.push(2);
my_vec.push(3);

// Easier way using macro
let mut numbers = vec![1, 2, 3, 4, 5];

// Accessing elements
let first = numbers[0];
let second = &numbers[1];  // Borrow instead of move

// Iterating
for num in &numbers {
    println!("{}", num);
}
```

#### HashMaps (Key-Value Pairs)

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

// Inserting values
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Red"), 50);

// Accessing values
let team_name = String::from("Blue");
let score = scores.get(&team_name);  // Returns Option<&i32>

// Iterating
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

### Structs (Custom Data Types)

Structs let you create your own types with named fields:

```rust
// Define a struct
struct Person {
    name: String,
    age: u32,
    email: String,
}

// Create an instance
let person = Person {
    name: String::from("Alice"),
    age: 30,
    email: String::from("alice@example.com"),
};

// Access fields
println!("Name: {}, Age: {}", person.name, person.age);

// Struct with methods
impl Person {
    // Associated function (like a constructor)
    fn new(name: String, age: u32, email: String) -> Person {
        Person { name, age, email }
    }

    // Method (takes &self as first parameter)
    fn introduce(&self) {
        println!("Hi, I'm {} and I'm {} years old", self.name, self.age);
    }

    // Mutable method
    fn have_birthday(&mut self) {
        self.age += 1;
    }
}

// Using the methods
let mut bob = Person::new(
    String::from("Bob"),
    25,
    String::from("bob@example.com")
);
bob.introduce();
bob.have_birthday();
```

### Enums (Multiple Variants)

Enums are super powerful in Rust and can hold data:

```rust
// Simple enum
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

// Enum with data
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

// Using enums with match
let light = TrafficLight::Red;

match light {
    TrafficLight::Red => println!("Stop!"),
    TrafficLight::Yellow => println!("Slow down"),
    TrafficLight::Green => println!("Go!"),
}

// The famous Option enum (Rust's way to handle null)
let some_number: Option<i32> = Some(5);
let no_number: Option<i32> = None;

match some_number {
    Some(value) => println!("Got a number: {}", value),
    None => println!("No number here"),
}
```

### Pattern Matching

Pattern matching is one of Rust's superpowers:

```rust
let number = 13;

match number {
    1 => println!("One!"),
    2 | 3 | 5 | 7 | 11 => println!("This is a prime"),
    13..=19 => println!("A teen"),
    _ => println!("Ain't special"),  // _ is the catch-all pattern
}

// if let - shorter syntax for matching one pattern
let favorite_color: Option<&str> = Some("blue");

if let Some(color) = favorite_color {
    println!("Your favorite color is {}", color);
}
```

### Error Handling

Rust uses `Result<T, E>` for operations that might fail:

```rust
use std::fs::File;
use std::io::ErrorKind;

// Result is an enum: Ok(T) or Err(E)
let file_result = File::open("hello.txt");

let file = match file_result {
    Ok(file) => file,
    Err(error) => match error.kind() {
        ErrorKind::NotFound => {
            println!("File not found, creating it...");
            File::create("hello.txt").unwrap()
        },
        other_error => panic!("Problem opening file: {:?}", other_error),
    },
};

// Shorter way with unwrap_or_else
let file = File::open("hello.txt").unwrap_or_else(|error| {
    if error.kind() == ErrorKind::NotFound {
        File::create("hello.txt").unwrap()
    } else {
        panic!("Problem opening file: {:?}", error);
    }
});

// Even shorter with ? operator (propagates errors up)
fn read_username_from_file() -> Result<String, std::io::Error> {
    let mut file = File::open("username.txt")?;
    let mut username = String::new();
    file.read_to_string(&mut username)?;
    Ok(username)
}
```
