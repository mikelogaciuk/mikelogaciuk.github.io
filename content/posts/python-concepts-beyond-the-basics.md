---
title: "Python - Some concepts beyond basics"
date: 2025-06-06
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
- [📝 To be continued](#-to-be-continued)

## 🧠 Introduction

        Python language, the glue that rules them all.

**Python**, the language that I professionally use on daily basis for more than 8 years now, and I still love it.

I find it easy to read and write (but not as beautiful as Ruby is), yet powerful enough to handle almost any task, because of its already mentioned `glue` nature.

Those notes are intended to cover a little bit more non-basic Python concepts, things that are usually scattered around various courses and documentations, and are response to some payware corporate courses about $1000+ per seat.

The material was written, based on:

- Personal knowledge (happily low level, but still some... 🪬).
- Official Python documentation.
- Various free and paid courses ToC's available online.
- And `Claude Sonnet` and `GPT 4.1`... as a reviewer and proofreader.

### Important note

This course is a work in progress and will be updated regularly with new content and examples.
Feel free to check back often for the latest updates

It is not going to cover basics of Python and algorithms,
as those are widely covered in other free materials.

And one word about algorithms...

        I probably never wrote any complex algorithm during my career as a developer,
        since those are mostly handled by libraries and frameworks.

        Except from complex sales data processing algorithms,
        but those are usually written in hybrid mode: SQL + Python and others.

And that's why I tend to call my self: `Code Writer` instead of `Developer` (in terms: of software engineering).

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

Another style, *which I personally like more is the Sphinx style* that feels more structured and easier to read:

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

And yes, while Python is a dynamically typed language, using typing hints can greatly improve code readability and help with static analysis tools (which nowadays work so great - that I could think that the language is statically typed).

Hints were added in Python 3.5 via the `typing` module and have been widely adopted since then:

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

## Or
def process_data_alt(data: List[Dict[str, int | str]]) -> Dict[str, int]:
    """
    Process a list of data dictionaries and return a summary.

    :param data (List[Dict[str, int | str]]): List of data dictionaries.
    :return (Dict[str, int]): Summary dictionary with counts.
    """
    summary = {}
    for item in data:
        key = item.get("type", "unknown")
        summary[key] = summary.get(key, 0) + 1
    return summary
```

## 🧮 Functional Programming

Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. It emphasizes the use of functions as first-class citizens, allowing them to be passed as arguments, returned from other functions, and assigned to variables.

But... In Python, functional programming is not the primary paradigm, as Python is a multi-paradigm language that supports both procedural and object-oriented programming. However, Python does provide several features that facilitate functional programming.

The most notable anti-feature is that in Python can have a side effects, because of its mutable data structures and stateful objects, but it can be always be avoided by following functional programming principles like ensuring immutability (by not over-writing existing values) and avoiding side effects at all costs.

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

That's easy, it allows you to create functions that can accept a variable number of arguments, making them more flexible and reusable. This is particularly useful when you don't know in advance how many arguments will be passed to the function, for example:

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

In Python , functions are first-class citizens, which means they can be passed as arguments to other functions, returned from other functions, and assigned to variables. This allows for higher-order functions, which are functions that operate on other functions.

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
let echo = (x) => console.log(x);

echo("Hello, World!"); // Outputs: Hello, World!
```

In Php it would look like this:

```php
$shout = fn($x) => strtoupper($x);
echo $shout("Hello, World!"); // Outputs: HELLO, WORLD!
```

But unfortunately in Python it looks like this:

```python
shout = lambda x: x.upper()
print(shout("Hello, World!"))  # Outputs: HELLO, WORLD!
```

Of course, the unfortunate part is that Python's syntax for lambda functions is not as clean and concise as in some other languages, which can make them less appealing to use.

Lambda functions are commonly used in situations where a small function is needed for a short period of time, such as in higher-order functions like `map()`, `filter()`, and `sorted()`.

```python
fake_data_from_range = range(1, 15)
evens = list(filter(lambda x: x % 2 == 0, fake_data_from_range))
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
squares = [x**2 for x in range(10)]
print(squares)  # Outputs: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Dictionary comprehension
cubes = {x: x**3 for x in range(5)}
print(cubes)  # Outputs: {0: 0, 1: 1, 2: 8, 3: 27, 4: 64}
```

Those can be also combined with conditional statements to filter items:

```python
# List comprehension with condition
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # Outputs: [0, 2, 4, 6, 8]

# Dictionary comprehension with condition
cubes = {x: x**3 for x in range(5) if x % 2 == 0}
print(cubes)  # Outputs: {0: 0, 2: 8, 4: 64}
```

### Itertools

There is also a module called `itertools` that gives you a lot of useful functions to work with iterators and functional programming concepts, such as `map`, `filter`, `reduce`, `chain`, `combinations`, and many more:

```python
from itertools import groupby

data = [('apple', 1), ('banana', 2), ('apple', 3), ('banana', 4)]

for k, g in groupby(sorted(data), lambda x: x[0]):
    print(k, list(g))

# Output:
# apple [('apple', 1), ('apple', 3)]
# banana [('banana', 2), ('banana', 4)]
```

### Functools

The module called `functools` gives us a bunch of high-order functions that allow us to work with functions in a more functional way, such as `reduce`, `partial`, `lru_cache`, and more.

For example, the `lru_cache` decorator can be used to cache the results of a function based on its arguments, which can improve performance for functions that are called frequently with the same arguments:

```python
from functools import lru_cache

@lru_cache(maxsize=256)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

But probably one of the most import from the `pack` is the `wraps` decorator, that is used to preserve the metadata of the original function when creating decorators:

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

### Iterators

Iterators are pretty useful when working with large datasets or streams of data, as they allow you to process data one item at a time without loading the entire dataset into memory.

For example:

```python
iterator = iter(range(5, 100))

print(next(iterator))

place = 0
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

## 📝 To be continued

Stay tuned for further parts of this course....
