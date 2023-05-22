---
layout: post
title: Crystal - Cute as Ruby, fast as C.
date: 2023-05-07
category: ["crystal", "ruby", "programming", "languages", "software", "developer"]
---

## Table of contents

TBA

## Ruby

Imagine, programming language with a simplicity and cuteness of Ruby, that is still fast as C and statically typed.
Sounds like a little bit too much of dream isn't it? 

Don't get me wrong, once I thought, that `Go` would be `that` language, but it didn't.
Of course `Go` is still great language, with a great idea of simplicity in mind, filled with great performance and interesting syntax - but it's not that... 

It's not a secret that once you spent some time in Ruby - you simply fall in love in its syntax and productivity.

Unfortunately, this has some of its night `slow speed`. 

Every developer who works or worked with Ruby would say that is the most beautiful languages to work with, but: `It's sad that it's not that fast.`.
The reason why Ruby looses against other languages is its nature, as an authors of language say:

    Ruby

    A dynamic, open source programming language with a focus on simplicity and productivity.
    It has an elegant syntax that is natural to read and easy to write.

Let's be honest, any interpreted dynamic language can't beat `C` or `Rust` or `Go`.

While `Ruby` beats for example `Python` in various places, it still can't deliver the speed of compiled languages:
    
    | source       | secs    | mem     | gz   | cpu secs  |
    |--------------|---------|---------|------|-----------|
    | Ruby #4      | 46.86   | 569,364 | 364  | 46.85     |
    | Ruby #2      | 48.74   | 569,392 | 378  | 48.73     |
    | Ruby         | 48.74   | 569,348 | 376  | 48.74     |
    | Ruby #3      | 50.83   | 402,724 | 400  | 50.80     |
    | Ruby #5      | 18.36   | 565,588 | 1008 | 52.32     |
    | Python 3 #2  | 104.73  | 271,98  | 338  | 104.72    |
    | Python 3 #5  | 35.33   | 274,884 | 660  | 125.79    |
    | Python 3 #4  | 34.53   | 276,752 | 472  | 125.93    |
    | Python 3     | 35.93   | 276,952 | 589  | 126.44    |
    | Python 3 #3  | 50.99   | 672,016 | 1238 | 142.94    |

    source: https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/ruby-python3.html
 
## Crystal

TBA

## Syntax

TBA

## Benchmarks

TBA

## Conclusion

TBA

## AI sh*t

Crystal is a high-level, general-purpose, object-oriented programming language that combines the elegance and productivity of Ruby with the speed, efficiency, and type safety of a compiled language. It was designed and developed by Ary Borenszweig, Juan Wajnerman, Brian Cardiff and more than 400 contributors. In this blog post, we will explore some of the features and benefits of Crystal, as well as its future prospects and challenges.

## Language history

Crystal was born in June 2011, with the aim of merging the best aspects of Ruby and C. The initial name of the language was Joy, but it was soon changed to Crystal. The first version of the Crystal compiler was written in Ruby, but it was later rewritten in Crystal itself, becoming self-hosting in November 2013. The first official release of Crystal was in June 2014. Since then, Crystal has been steadily growing in popularity and adoption, reaching the TIOBE index in July 2016.

## Language syntax

Crystal's syntax is heavily inspired by Ruby's, so it feels natural to read and easy to write. It has the added benefit of a lower learning curve for experienced Ruby developers. 
Here are some examples of Crystal code:

crystal
# A very basic HTTP server
require "http/server"

server = HTTP::Server.new do |context|
context.response.content_type = "text/plain"
context.response.print "Hello world, got #{context.request.path}!"
end

puts "Listening on http://127.0.0.1:8080"
server.listen(8080)

# A simple class definition
class Person
property name : String
property age : Int32

def initialize(@name, @age)
end

def greet
puts "Hello, I'm #{name} and I'm #{age} years old."
end
end

person = Person.new "Alice", 25
person.greet

# A macro that defines a method that returns its name
macro def_name
def name
{{@type.name.stringify}}
end
end

class Foo
def_name
end

class Bar < Foo
end

foo = Foo.new
bar = Bar.new
puts foo.name # => Foo
puts bar.name # => Bar
```

As you can see, Crystal code is concise, expressive, and readable. It also supports many features that make programming more enjoyable and productive, such as:

- Blocks and lambdas
- Multiple dispatch
- Method overloading and overriding
- Modules and mixins
- Enums and structs
- Generics and aliases
- Exceptions and fibers
- Metaprogramming and macros

## Language speed

One of the main goals of Crystal is to achieve high performance without sacrificing developer happiness. Crystal achieves this by being a compiled language with static type checking, but without requiring explicit type annotations. Crystal uses an advanced global type inference algorithm that can deduce the types of variables and method arguments from their usage. This way, the compiler can generate efficient native code using an LLVM backend, without losing the flexibility and expressiveness of a dynamic language.

Crystal also supports concurrency through green threads called fibers. Fibers communicate with each other using channels, as in Go or Clojure, without having to resort to shared memory or locks. This makes concurrency easier to reason about and more scalable.

To illustrate the speed of Crystal, let's compare it with Ruby and C using some simple benchmarks. We will use the following code snippets to measure the time it takes to calculate the sum of the squares of the first 10 million integers:

```ruby
# Ruby code
sum = 0
(1..10_000_000).each do |i|
sum += i * i
end
puts sum
```

```crystal
# Crystal code
sum = 0
(1..10_000_000).each do |i|
sum += i * i
end
puts sum
```

```c
// C code
#include <stdio.h>

int main() {
long long sum = 0;
for (int i = 1; i <= 10000000; i++) {
sum += i * i;
}
printf("%lld\n", sum);
}
```

so it feels natural to read and easy to write. It has the added benefit of a lower learning curve for experienced Ruby developers. 