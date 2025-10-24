---
title: "Where Everything Started - The Php notes"
date: 2025-10-11
tags: ["php", "fullstack", "nostalgia", "webdev", "backend", "programming", "coding", "history"]
language: "en"
---

![Pic](/img/php_005.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [💊 What is all this about?](#-what-is-all-this-about)
- [☢️ The prep](#️-the-prep)
- [📝 Syntax](#-syntax)
  - [Variables and Data Types](#variables-and-data-types)
  - [Constants and Operators](#constants-and-operators)
  - [Collection types](#collection-types)
  - [Control Structures (functions, loops, conditionals etc.)](#control-structures-functions-loops-conditionals-etc)
  - [OOP](#oop)
- [Standard library (extras)](#standard-library-extras)
  - [Filesystem and file I/O](#filesystem-and-file-io)
  - [Streams, locking and atomics](#streams-locking-and-atomics)
  - [Environment, INI and process / OS interaction](#environment-ini-and-process--os-interaction)
  - [Networking and sockets](#networking-and-sockets)
  - [Utilities: JSON, serialization, date/time, hashing, compression](#utilities-json-serialization-datetime-hashing-compression)
  - [SPL and standard containers / iterators](#spl-and-standard-containers--iterators)
- [References](#references)

## 💊 What is all this about?

This is a part of my nostalgic journey to the roots of my programming adventure: the **Php**.

More specifically, this is a collection of re-newed notes and somekind of cheat-sheet for the **Php** language which I decided lately to revisit. About which you can read more in my [previous post](https://mikelogaciuk.github.io/posts/what-the-hell-haphpened/).

Since no one is really reading my blog and the site is more like a personal archive, I can always come back to it when needed - which makes it a best place to store notes in this way.

## ☢️ The prep

    PHP is like a Swiss Army knife. It’s not the best tool for any one job, but it’s incredibly versatile.

In order to get Php running in your local environment, you should at least have Php installed, which can be done in multiple ways, depending on your OS.

Since I work in hybrid environment, I usually use mix of local installation and Docker containers and WSL2 - it would take a while to describe all the options, so I will just point you to the [official Php installation guide](https://www.php.net/manual/en/install.php) or the easier way: the [Laravel Herd](https://herd.laravel.com/) or [Laragon](https://laragon.org/download) if your are on Windows or official CLI installers for your Linux distro.

Once you have Php installed, you can check if everything is working by running:

```bash
php -v
```

Now create a directory to store your Php files, e.g. `php-notes`, and inside create a file named `index.php` with the following content:

```php
<?php
echo "Hello, World! \n";
```

Which is the same as `console.log` in JavaScript or `print` in Python.

And we are ready to go. You can run your script using the built-in Php server by executing:

```shell
php index.PHP
```

Or with a local server:

```shell
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000` to see the output.

## 📝 Syntax

### Variables and Data Types

As you probably already know, to declare a variable we use the famous dollar sign `$` followed by the variable name:

```php
$name = "John Doe"; // String
$age = 30;          // Integer
$height = 5.9;     // Float
$isStudent = false; // Boolean
$nullValue = null;  // Null
```

To delete a variable, you can use the `unset()` function:

```php
unset($name);
```

### Constants and Operators

Contants can be defined using the `define()` function or the `const` keyword:

```php
define("PI", 3.14);
echo "Value of PI is " . PI . "\n";

const E = 2.71;
echo "Value of E is " . E . "\n";
```

Spaceship operator (`<=>`) is used for three-way comparison

 - Returns 0 if values on either side are equal
 - Returns 1 if value on the left is greater
 - Returns -1 if the value on the right is greater

```php
$result = 5 <=> 10; // -1
$result2 = 10 <=> 5; // 1
$result3 = 5 <=> 5; // 0
echo "Spaceship operator results: $result, $result2, $result3\n";
```

All other operators are pretty much standard and similar to other languages.

### Collection types

The Php has two main collection types: arrays and objects (associative arrays):

```php
$fruits = ["Apple", "Banana", "Cherry"]; // Array
$fruits[] = "Mango"; // Adding an element to the array
array_push($fruits, "Orange"); // Another way to add an element
unset($fruits[1]); // Removing an element (Banana)

// Looping through an array
foreach ($fruits as $fruit) {
    echo "Fruit: $fruit\n";
}

$person = ["name" => "John", "age" => 30]; // Associative Array, most commonly used
echo "The name is: $person[name] and age is: $person[age] \n";
$person["height"] = 5.9; // Adding a new key-value pair
echo "The height is: $person[height] \n";

// Looping through an associative array
foreach ($person as $key => $value) {
    echo "$key: $value\n";
}
```

The arrays can be "mixed", meaning they can hold different data types:

```php
$mixed = [
    "name" => "Alice",
    18,
    "other value",
    "isStudent" => true,
];

$mixed["email"] = "alice@queen.co";

foreach ($mixed as $key => $value) {
    echo "$key: $value\n";
}
```

Those can be also more complex, nested arrays:

```php
$config = [
    "database" => [
        "host" => "localhost",
        "user" => getenv("DB_USER"),
        "password" => getenv("DB_PASSWORD"),
    ],
    "app" => [
        "debug" => true,
        "version" => "1.0.0",
    ],
];

echo "Database host: " . $config["database"]["host"] . "\n";
```

### Control Structures (functions, loops, conditionals etc.)

Control structures in Php are similar to other C-like languages:

- **Functions**: Defined using the `function` keyword, or by using arrow functions (PHP 7.4+).
- **Loops**: `for`, `foreach`, `while`, and `do...while` loops are available.
- **Conditionals**: `if`, `else`, `elseif`, and `switch` statements are used for branching logic.

Few examples:

```php
// The data
$nums = [1, 2, 3, 4, 5];

// Arrow functions with map
$squared = array_map(fn($n) => $n * $n, $nums);
echo "Squared numbers: " . implode(", ", $squared) . "\n";

// Arrow functions with filter
$even = array_filter($nums, fn($n) => $n % 2 === 0);
echo "Even numbers: " . implode(", ", $even) . "\n";

// Classic arrow function
$double = fn($x)  => $x * 2;
echo "Doubled value of 4 is: " . $double(4) . "\n";

// Optionals
function add(int $a, int $b, ?int $c = null): int
{
    return $a + $b + ($c ?? 0);
}

echo "Sum: " . add(5, 10) . "\n"; // 15
echo "Sum with optional: " . add(5, 10, 5) . "\n"; // 20

// Classic while loop
while ($age < 18) {
    echo "Age is $age, still a minor.\n";
    $age++;
}

// Do while loop
$age = 13;
do {
    echo "Age is $age, still a minor.\n";
    $age++;
} while ($age < 18);

// Classic for loop
for ($i = 0; $i <= count($fruits); $i++) {
    echo "Fruit at index $i is: " . $fruits[$i] . "\n";
}
```

```html
// Alternative syntax for control structures (useful in templates)
?>

<?php if ($x): ?>
This is displayed if the test is truthy.
<?php else: ?>
This is displayed otherwise.
<?php endif; ?>
```

But there are some interesting things like **match expression** (Php 8.0+) in more functional style, together with arrow functions (Php 7.4+) or more newer pipe operator (Php 8.5+) or `array_first()` or `array_last()`.

```php
$age = 15;

$cat = match (true) {
    $age < 13 => "Child",
    $age >= 13 && $age < 20 => "Teenager",
    $age >= 20 && $age < 65 => "Adult",
    default => "Senior",
};

echo "Category: $cat \n"; // Category: Teenager
```

```php
$output = " Docker Runner "
    |> trim(...)
    |> strtolower(...)
    |> (fn($str) => str_replace(" ", "_", $str));

echo "Transformed output: $output \n"; // Transformed output: docker_runner
```

### OOP

Php supports object-oriented programming (OOP) with classes, objects, inheritance, interfaces, and traits.

```php

```

## Standard library (extras)

Here are some common standard library functions for OS, files, env, and related tasks, grouped by purpose.

### Filesystem and file I/O

- **file_get_contents, file_put_contents** — simple reads/writes to files; common for config and small files.
  Example: `$s = file_get_contents('data.txt'); file_put_contents('out.txt', $s);`
- **fopen, fread, fwrite, fclose, fgets, fread, feof** — low-level stream-based file handling for large files or incremental IO.
- **fopen wrappers / readfile** — open URLs or stream to output (when `allow_url_fopen` is enabled).
- **file_exists, is_file, is_dir, is_readable, is_writable, filesize, filemtime, fileperms** — file metadata and checks.
- **rename, unlink, copy, mkdir, rmdir, scandir, glob** — file and directory operations.

### Streams, locking and atomics

- **flock** — advisory file locking for safe concurrent writes.
- **stream_select, stream_get_contents, stream_copy_to_stream** — advanced stream utilities for sockets and pipes.

### Environment, INI and process / OS interaction

- **getenv, putenv, $_ENV** — read/write environment variables from PHP runtime.
- **php_ini_loaded_file, ini_get, ini_set, ini_restore** — inspect and change `php.ini` settings at runtime.
- **getcwd, chdir, realpath, sys_get_temp_dir, getenv('TMPDIR')** — working directory and temp directories.
- **exec, shell_exec, system, passthru, proc_open, proc_close, proc_get_status** — run external processes and capture output; use `proc_*` for fine-grained control.

### Networking and sockets

- **fsockopen, stream_socket_client, stream_socket_server** — simple TCP/UDP client and server sockets using streams.
- **socket_* family** (socket_create, socket_bind, socket_listen, socket_accept, socket_recv, socket_send) — low-level sockets extension for raw control.
- **curl_* functions (cURL extension)** — HTTP client for requests with advanced options (timeouts, headers, auth).

### Utilities: JSON, serialization, date/time, hashing, compression

- **json_encode, json_decode** — JSON serialization/parsing (ubiquitous for APIs).
- **serialize, unserialize** — PHP native serialization (use with care for security).
- **DateTime, date, strtotime** — date/time creation and formatting classes/functions.
- **hash, hash_hmac, password_hash, password_verify** — hashing and password utilities.
- **gzopen, gzwrite, gzread, gzcompress, gzuncompress, ZipArchive** — compression APIs and zip archive management.

### SPL and standard containers / iterators

- **ArrayObject, ArrayIterator, Iterator, IteratorAggregate** — object wrappers around arrays and custom iterable implementations.
- **SplDoublyLinkedList, SplStack, SplQueue, SplHeap, SplPriorityQueue, SplFixedArray** — built-in data structures for stacks, queues, heaps and fixed arrays.

## References

- [PHP Manual](https://www.php.net/manual/en/)
- [Learn in X minutes](https://learnxinyminutes.com/php/)
- [Laravel Bootcamp @ Php Fundamentals](https://laravel.com/learn/php-fundamentals/why-php)
- [Modern Php @ Cheat Sheet](https://front-line-php.com/cheat-sheet)
