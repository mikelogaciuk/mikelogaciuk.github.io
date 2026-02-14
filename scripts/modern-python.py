from collections import defaultdict
from collections import namedtuple
from functools import lru_cache
from itertools import groupby
from typing import Any, NamedTuple

# Iterators
fake_data_from_range: range = range(1, 15)
evens: list[int] = list[int](filter(lambda x: x % 2 == 0, fake_data_from_range))
print(evens)  # Outputs: [2, 4, 6, 8, 10, 12, 14]

# List comprehensions
squares: list[int] = [x**2 for x in range(10)]
print(squares)  # Outputs: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Dictionary comprehension
cubes: dict[int, int] = {x: x**3 for x in range(5)}
print(cubes)  # Outputs: {0: 0, 1: 1, 2: 8, 3: 27, 4: 64}

# List comprehensions with filters
evens: list[int] = [x for x in range(10) if x % 2 == 0]
print(evens)  # Outputs: [0, 2, 4, 6, 8]

# Dictionary comprehension with condition
cubes: dict[int, int] = {x: x**3 for x in range(5) if x % 2 == 0}
print(cubes)  # Outputs: {0: 0, 2: 8, 4: 64}

# Iterators and Generators
data: list[tuple[str, int]] = [("apple", 1), ("banana", 2), ("apple", 3), ("banana", 4)]

for k, g in groupby(sorted(data), lambda x: x[0]):
    print(k, list[Any](g))


# Functools
@lru_cache(maxsize=256)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


# Collections - defaultdict
products_dict: defaultdict[Any, defaultdict[Any, dict[str, str | float | int]]] = (
    defaultdict(
        lambda: defaultdict[Any, dict[str, str | float | int]](
            lambda: {"warehouse": "main", "sku": "", "price": 0.0, "quantity": 0}
        )
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

# Collections - namedtuple
Opts = namedtuple("Opts", ["host", "port", "debug"])
opts: Opts = Opts(host="localhost", port=8080, debug=True)
print(opts.host)  # Outputs: localhost
print(opts.port)  # Outputs: 8080
print(opts.debug)  # Outputs: True


# NamedTuple from typing
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
