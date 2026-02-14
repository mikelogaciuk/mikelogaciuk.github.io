---
title: "Modern Python is actually pretty good"
date: 2026-02-12
tags: ["python", "programming", "course", "notes"]
language: "en"
---

![Pic](/img/pythonista_main.png)

## 📃 Table of Contents

- [📃 Table of Contents](#-table-of-contents)
- [🧠 Introduction](#-introduction)
  - [Important note](#important-note)
- [🗄️ Documenting the code](#️-documenting-the-code)
  - [PEP 257](#pep-257)
  - [Sphinx Style](#sphinx-style)
  - [Google Style](#google-style)
- [🤖 Typing hints](#-typing-hints)
- [🧮 Functional Programming](#-functional-programming)
  - [Args and Kwargs](#args-and-kwargs)
  - [Functions as parameters](#functions-as-parameters)
  - [Lambda functions](#lambda-functions)
  - [List and dict comprehensions](#list-and-dict-comprehensions)
  - [Itertools](#itertools)
  - [Functools](#functools)
  - [Iterators](#iterators)
  - [Generators](#generators)
- [🎫 Colletions](#-colletions)
  - [Defaultdict](#defaultdict)
  - [NamedTuple](#namedtuple)
- [🧑 Object-Oriented Programming](#-object-oriented-programming)
- [📝 To be continued](#-to-be-continued)

## 🧠 Introduction

        Python language, the glue that rules them all.

**Python**, is the language that I professionally use as my daily driver for more than 8 years now, and I still love it, even today.

I find it easy to read and write (but not as beautiful as Ruby is), yet powerful enough to handle almost any task, because of its already mentioned `glue` nature.

Those notes are intended to cover a little bit more non-basic Python concepts, things that are usually scattered around various courses and documentations, and are response to some payware corporate courses about $1000+ per seat.

The material was written, based on:

- Personal knowledge (happily low level, but still some... 🪬).
- Official Python documentation and PEPs.
- Tables of contents of various paid articles scattered on-line.
- Various articles on one and only RealPython site (thanks for inspiration for topics to cover folks).
- And `Claude Sonnet 4.5`, `Claude Haiku 4.5` and `GPT 5.2`... as little army of reviewers and proofreaders.

### Important note

This course is a work in progress and will be updated regularly with new content and examples.
Feel free to check back often for the latest updates and stuff.

It is not going to cover basics of Python and algorithms, as those are widely covered in other free materials.

And one word about algorithms..., while it might feel tempting to cover those a little bit, yet seems to be problematic for personally.

Seems I am living example of a `DevOps Engineer` without `Computer Science` background, I probably never wrote any complex algorithm from scratch during my career as a developer, and lived without problems. Apart from those who cover complex `POS` to `ERP` complex business/corporate logic, but those are mainly Data Engineering algorithms.

And that's why I tend to call my self: `Code Writer` rather of `Developer`.

## 🗄️ Documenting the code

Code documentation is a must and I will not dive too much into it, since it should be always done - especially for more complex stuff to help the IDE and language server to work with the code.

As far as I am concerned there are three major styles of documenting the code in Python, where the probably most known one is the PEP 257 style.

### PEP 257

```python
def pep_style_function(param1, param2):
    """
    This is a sample function that demonstrates docstring conventions.

    Args:
        param1 (int): The first parameter.
        param2 (str): The second parameter.
    Returns:
        bool: The return value. True for success, False otherwise.
    """

    # Function logic goes here...

    return True
```

### Sphinx Style

Another style, *which I personally like more, is the Sphinx style*:

```python
def sphinx_style_function(param1, param2):
    """
    Another function demonstrating Sphinx-style docstrings.

    :param param1: The first parameter.
    :type param1: int
    :param param2: The second parameter.
    :type param2: str
    :return: True if successful, False otherwise.
    :rtype: bool
    """

    # Function logic goes here...

    return True
```

### Google Style

There is also a Google style, which is also quite popular, especially in big companies and nowadays (because you know: Google is the best... pun intended 🚀):

```python
def google_style_function(param1, param2):
    """
    A function demonstrating Google-style docstrings.

    Longer description of the function can go here.

    Args:
        param1 (int): The first parameter.
        param2 (str): The second parameter.

    Returns:
        bool: True if successful, False otherwise.

    Raises:
        ValueError: If an error occurs.
        TypeError: If the parameters are of the wrong type.

    Example:
        >>> google_style_function(10, "example")
        True
    """

    # Function logic goes here...

    raise ValueError("An example exception")
```

## 🤖 Typing hints

As you may noticed in the previous examples, there are typing hints used in the function definitions and docstrings to indicate the expected types of parameters and return values.

And yes, while Python is a dynamically typed language, using typing hints can greatly improve code readability and help with static analysis tools (which nowadays work so great - that I could even think that the language is statically typed).

Having type hints allows language servers and IDEs to provide better code completion, error checking, and overall improved developer experience. It also serves as documentation for other developers who may be reading or using the code.

Personally I prefer to use: `basedpyright`, together with `ruff`, but I will move to `ty` instead of `basedpyright` in the future, once it will go out of a beta stage, because of its better performance, since `basedpyright` can sometimes slow down a little bit on corporate notebooks even at 25k lines of code, while `ty` is supposed to be much faster.

But, going back to the topic, type hints were added in Python 3.5 via the `typing` module and have been widely adopted since then:

```python
def calculate_total_revenue(price: float, quantity: int) -> float:
    """
    Calculate total revenue from sales.

    :param price (float): Price per unit.
    :param quantity (int): Number of units sold.
    :return (float): Total revenue.
    """
    return price * quantity
```

Example above not only shows the typing hints in the function signature, but also in the docstring, while using another documentation style, the **reST** (reStructuredText) which is an abbreviation of Sphinx.

We can also use more complex types from the `typing` module, such as `List`, `Dict`, `Tuple`, `Optional`, and even custom types.

```python
from typing import List, Dict, Union

def process_data(data: List[Dict[str, Union[int, str]]]) -> Dict[str, int]:
    """
    Process a list of data dictionaries and return a summary.

    :param data (List[Dict[str, Union[int, str]]]): List of data dictionaries.
    :return (Dict[str, int]): Summary dictionary with counts.
    """
    summary = {}
    for item in data:
        key = item.get("type", "unknown")
        summary[key] = summary.get(key, 0) + 1
    return summary
```

More complex types and examples will be introduced later down the text, but for now, the main point is that using type hints can greatly enhance the readability and maintainability of your code, and it's a good practice to use them whenever possible, especially in larger codebases or when working in teams.

## 🧮 Functional Programming

Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. It emphasizes the use of functions as first-class citizens, allowing them to be passed as arguments, returned from other functions, and assigned to variables.

But... In Python, functional programming is not the primary paradigm, as Python is a multi-paradigm language that supports both procedural and object-oriented programming, however, it does provide several features that facilitate functional programming.

The most notable anti-feature is that in Python can have a side effects, because of its mutable data structures and stateful objects, but it can be always avoided by following functional programming principles like ensuring immutability (by not over-writing existing values) and avoiding side effects at all costs.

### Args and Kwargs

In Python, `*args` and `**kwargs` are used in function definitions to allow for variable-length arguments.

For example:

```python
def some_args_func(*args):
    for arg in args:
        print(f"Received arguments are: {arg}")

def some_kwargs_func(**kwargs):
    for key, value in kwargs.items():
        print(f"Received keyword arguments are: {key} = {value}")

some_args_func("runner", {"course": "Python"}, 89)
some_kwargs_func(name="runner", course="Python", score=89)

def mixed_args_kwargs_func(*args, **kwargs):
    for arg in args:
        print(f"Arg: {arg}")
    for key, value in kwargs.items():
        print(f"Kwarg: {key} = {value}")

mixed_args_kwargs_func("runner", {"course": "Python"}, 666, name="John", lastname="Doe", score=100)

# Output:
    # Received arguments are: runner
    # Received arguments are: {'course': 'Python'}
    # Received arguments are: 89
    # Received keyword arguments are: name = runner
    # Received keyword arguments are: course = Python
    # Received keyword arguments are: score = 89
    # Arg: runner
    # Arg: {'course': 'Python'}
    # Arg: 666
    # Kwarg: name = John
    # Kwarg: lastname = Doe
    # Kwarg: score = 100
```

Okay, but you may ask... what is the real use of that?

Well, that's easy: it allows you to create functions that can accept a variable number of arguments, making them more flexible and reusable. This is particularly useful when you don't know in advance how many arguments will be passed to the function, for example:

```python
# Without *args - rigid
def add_two_numbers(a, b):
    return a + b

# With *args - flexible
def add_numbers(*args):
    return sum(args)

# Can call with any number of arguments
add_numbers(1, 2)           # 2 args
add_numbers(1, 2, 3, 4, 5)  # 5 args

# Useful for configuration functions
def create_user(**kwargs):
    user = {"id": generate_id()}
    user.update(kwargs)  # Add any additional fields
    return user

# Flexible calls
create_user(name="John", email="john@example.com")
create_user(name="Jane", email="jane@example.com", age=25, role="admin")
```

### Functions as parameters

In Python, functions are first-class citizens, which means they can be passed as arguments to other functions, returned from other functions, and assigned to variables. This allows for higher-order functions, which are functions that operate on other functions.

For example, validation mechanism for email addresses (the simplest one possible) would be looking like this:

```python
def validate_email(email: str) -> bool:
    """Simple email validation function."""
    return "@" in email and "." in email

def validator(func, value):
    """Validates a value using the provided function."""
    match func(value):
        case True:
            print(f"{value} is valid")
        case False:
            raise ValueError(f"{value} is invalid")

validator(validate_email, "test@example.com") # `test@example.com`` is valid
validator(validate_email, "invalid-email") # `invalid-email` is invalid
```

### Lambda functions

Those little ones, are anonymous functions defined using the `lambda` keyword. They can take any number of arguments but can only have a single expression. Lambda functions are often used for short, throwaway functions that are not reused elsewhere in the code.

In JS it would an arrow function like this:

```js
let echo = (x) => console.log(x); // Outputs: x
```

In Php it would look like this:

```php
$shout = fn($x) => strtoupper($x);
echo $shout("Hello, World!"); // Outputs: HELLO, WORLD!
```

But unfortunately in Python it looks like this 👹:

```python
shout = lambda x: x.upper()
print(shout("Hello, World!"))  # Outputs: HELLO, WORLD!
```

While it is still a lambda function, it is not as clean and concise as in some other languages, which can make them less appealing to use, take `Elixir` for example:

```elixir
shout = fn x -> String.upcase(x) end
IO.puts(shout.("Hello, World!"))  # Outputs: HELLO,
```

Isn't that just beautiful? I mean, look at that syntax... it's like poetry in motion, while Python's lambda functions are more like... well, let's just say they are not as elegant.

But we must live with that, so it's nice to know that lambda functions are commonly used in situations where a small function is needed for a short period of time, such as in higher-order functions like `map()`, `filter()`, and `sorted()`.

```python
fake_data_from_range: range = range(1, 15)
evens: list[int] = list[int](filter(lambda x: x % 2 == 0, fake_data_from_range))
print(evens)  # Outputs: [2, 4, 6, 8, 10, 12, 14]
```

In other terms, the arrow (lambda) function syntax is:

```python
lambda arguments: expression
```

### List and dict comprehensions

Python provides a concise way to create lists and dictionaries using comprehensions. List comprehensions allow you to generate lists in a single line of code, while dictionary comprehensions do the same but for dictionaries (kinda logical isn't it?).

```python
# List comprehension
squares: list[int] = [x**2 for x in range(10)]
print(squares)  # Outputs: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Dictionary comprehension
cubes: dict[int, int] = {x: x**3 for x in range(5)}
print(cubes)  # Outputs: {0: 0, 1: 1, 2: 8, 3: 27, 4: 64}
```

Those can be also combined with conditional statements to filter items:

```python
# List comprehension with condition
evens: list[int] = [x for x in range(10) if x % 2 == 0]
print(evens)  # Outputs: [0, 2, 4, 6, 8]

# Dictionary comprehension with condition
cubes: dict[int, int] = {x: x**3 for x in range(5) if x % 2 == 0}
print(cubes)  # Outputs: {0: 0, 2: 8, 4: 64}
```

### Itertools

There is also a module called `itertools` that gives you a lot of useful functions to work with iterators and functional programming concepts, such as `map`, `filter`, `reduce`, `chain`, `combinations`, and many more:

```python
from itertools import groupby

data: list[tuple[str, int]] = [("apple", 1), ("banana", 2), ("apple", 3), ("banana", 4)]

for k, g in groupby(sorted(data), lambda x: x[0]):
    print(k, list[Any](g))

# Output:
# apple [('apple', 1), ('apple', 3)]
# banana [('banana', 2), ('banana', 4)]
```

### Functools

The module called `functools` gives us a bunch of high-order functions that allow us to work with functions in a more functional way, such as `partial`, `lru_cache`, and more.

For example, the `lru_cache` decorator can be used to cache the results of a function based on its arguments, which can improve performance for functions that are called frequently with the same arguments:

```python
from functools import lru_cache

@lru_cache(maxsize=256)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

But probably one of the most important from the `functools` module is the `wraps` decorator, that is used to preserve the metadata of the original function when creating decorators:

```python
from functools import wraps


def loggerx(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling function '{func.__name__}' with arguments: {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function '{func.__name__}' returned: {result}")
        return result
    return wrapper


@loggerx
def dummy_func(foo):
    return f"Function executed with {foo}"


dummy_func("test")

# Output:
# Calling function 'dummy_func' with arguments: ('test',), {}
# Function 'dummy_func' returned: Function executed with test
# 'Function executed with test'
```

While something similar can be achieved without using wraps, example with `mixins`, but it feels more Pythonic to use `wraps` to preserve the original function's metadata, such as its name and docstring, which can be important for debugging and documentation purposes.

### Iterators

Iterators are pretty useful when working with large datasets or streams of data, as they allow you to process data one item at a time without loading the entire dataset into memory.

For example:

```python
iterator = iter(range(5, 100))

print(next(iterator))

place: int = 0
while place < 10:
    print(next(iterator))

    place += 1
```

### Generators

Another handy thing are `generators` which allow to produce values lazily (they are generated only when or once they are needed):

```python
def count_up_to(n: int):
    for i in range(1, n + 1):
        yield i

for number in count_up_to(10):
    print(number)
```

## 🎫 Colletions

Python provides a built-in module called `collections` that offers specialized container datatypes, such as `namedtuple`, `deque`, `Counter`, `OrderedDict`, and more. These can be very useful for various data manipulation tasks and can often provide better performance than using regular lists or dictionaries.

### Defaultdict

Is the one that allows you to specify a default value for keys that do not exist in the dictionary, which can help avoid `KeyError` exceptions:

```python
from collections import defaultdict

products_dict: defaultdict[Any, defaultdict[Any, dict[str, str | float | int]]] = defaultdict(
    lambda: defaultdict[Any, dict[str, str | float | int]](
        lambda: {"warehouse": "main", "sku": "", "price": 0.0, "quantity": 0}
    )
)

# Accessing a non-existent key will return the default value
print(
    products_dict["electronics"]["laptop"]
)  # {'warehouse': 'main', 'sku': '', 'price': 0.0, 'quantity': 0}

# Add a new product and it will work as expected
products_dict["electronics"]["laptop"] = {
    "warehouse": "main",
    "sku": "LAP123",
    "price": 999.99,
    "quantity": 10,
}
print(
    products_dict["electronics"]["laptop"]
)  # {'warehouse': 'main', 'sku': 'LAP123', 'price': 999.99, 'quantity': 10}

```

### NamedTuple

This can be particularly useful when defining a structured data like configuration, where you want to have default values for certain keys, but still allow for overrides when needed:

```python
from collections import namedtuple

Opts = namedtuple("Opts", ["host", "port", "debug"])
opts: Opts = Opts(host="localhost", port=8080, debug=True)
print(opts.host)  # Outputs: localhost
print(opts.port)  # Outputs: 8080
print(opts.debug)  # Outputs: True
```

But you can also use `NamedTuple` from the `typing` module, which is a more modern and flexible way to define named tuples with type hints:

```python
class Opts(NamedTuple):
    host: str
    port: int
    debug: bool

    def is_port_ok(self) -> bool:
        return 8080 <= self.port <= 65535


opts: Opts = Opts(host="localhost", port=6000, debug=True)
print(opts.host)  # Outputs: localhost
print(opts.port)  # Outputs: 6000
print(opts.debug)  # Outputs: True
print(opts.is_port_ok())  # Outputs: False
```

As you can see, using `NamedTuple` from the `typing` module allows us to define methods on the named tuple, which can be useful for adding behavior to our data structures while still maintaining immutability and type safety.

## 🧑 Object-Oriented Programming

While I am not going to cover basic OOP concepts, I will cover some of more non-basic ones like `dataclasses`, `class` or `instance` methods, `properties`, `NamedTuple`s, `attrs` and more.

## 📝 To be continued

Stay tuned for further parts of this course....
