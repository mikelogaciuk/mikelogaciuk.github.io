---
layout: post
title: Podstawy języka Elixir (część pierwsza)
date: 2024-10-01
category:
  ["elixir", "programowanie", "funkcjonalne", "funkcyjne", "fp", "erlang"]
---

![header](/img/elixirc_013.jpeg)

## Spis treści

- [Spis treści](#spis-treści)
- [Wstęp](#wstęp)
- [Struktury](#struktury)
  - [Wartości domyślne](#wartości-domyślne)
  - [Wymagane klucze](#wymagane-klucze)
  - [Derive](#derive)
- [Protokoły](#protokoły)
  - [Definiowanie protokołu](#definiowanie-protokołu)
  - [Implementacja protokołu dla różnych typów produktów](#implementacja-protokołu-dla-różnych-typów-produktów)
    - [Produkt fizyczny](#produkt-fizyczny)
    - [Produkt cyfrowy](#produkt-cyfrowy)
    - [Subskrypcja](#subskrypcja)
  - [Użycie protokołu](#użycie-protokołu)
  - [Uwagi](#uwagi)
  - [Inne przykłady](#inne-przykłady)
- [Typowanie (adnotacje typu)](#typowanie-adnotacje-typu)
  - [Typowanie funkcji za pomocą `@spec`](#typowanie-funkcji-za-pomocą-spec)
    - [Przykład prostej funkcji z adnotacją typu](#przykład-prostej-funkcji-z-adnotacją-typu)
    - [Przykład funkcji z bardziej złożonymi typami](#przykład-funkcji-z-bardziej-złożonymi-typami)
  - [Typowanie z użyciem `@type` i `@typep`](#typowanie-z-użyciem-type-i-typep)
    - [Przykład definiowania własnych typów](#przykład-definiowania-własnych-typów)
  - [Typowanie z użyciem `@spec` i `@callback`](#typowanie-z-użyciem-spec-i-callback)
    - [Przykład użycia `@callback`](#przykład-użycia-callback)
  - [Przykład użycia Dialyzera](#przykład-użycia-dialyzera)
    - [Kroki do użycia Dialyzera](#kroki-do-użycia-dialyzera)
  - [Dodatkowe informacje](#dodatkowe-informacje)
- [Zachowania (interfejsy)](#zachowania-interfejsy)
  - [Przykład](#przykład)
- [Protokoły kontra zachowania](#protokoły-kontra-zachowania)
  - [Protokoły (Protocols)](#protokoły-protocols)
  - [Zachowania (Behaviours)](#zachowania-behaviours)
- [Podsumowanie](#podsumowanie)
- [Referencje](#referencje)

## Wstęp

W poprzedniej [części](https://mikelogaciuk.github.io/posts/podstawy-jezyka-elixir-czesc-pierwsza/), omówiłem podstawy podstaw języka `Elixir`.

Dziś skupimy się na trochę już ciekawszych tematach, zaczynajac od struktur po protokoły etc.

## Struktury

`Struktury` (ang. `structs`) to rozszerzona wersja map, udostępniająca tzw `compile-time checks` oraz wartości domyślne dla modułów.

Struktury definijemy z pomocą `defstruct` wewnątrz modułu (przyp. `defmodule`):

```elixir
defmodule Course.User do
  defstruct name: "John", age: 27
end
```

```elixir
john = %Course.User{}
```

```elixir
alice = %Course.User{age: 18, name: "Alice"}
```

Struktury możemy aktualizować lub odczytywać:

```elixir
alice.age
```

```elixir
andrew = %{john | name: "Andrew"}
```

```elixir
andrew
```

```elixir
john
```

Struktury, jednakże nie dziedziczą żadnych protokołów jak mapy. Dlatego nie można enumerować po strukturze ani uzyskiwać dostępu tak jak w przypadku map np. `john[:age]`.

O tym później w temacie dot. `protokołów`.

### Wartości domyślne

W przypadku braku przypisania domyślnej wartości, do danego pola w strukturze domyślnie przypisywany jest `nil`:

```elixir
defmodule Course.Another.User do
  defstruct mail: nil, name: "John", gender: "Male"
end
```

```elixir
defmodule Course.Fake.Store do
  defstruct [:store, name: "XF001", town: "Zlotow"]
end
```

**UWAGA**: Pola bez domyślnej wartości (a co dalej - typu), muszą być ujętę na początku struktury.

### Wymagane klucze

Dodatkowo mamy możliwość wymuszenia, które klucze mają zostać wypełnione podczas tworzenia struktury (ang. `enforced keys`) z pomocą `@enforce_keys [:field]`:

```elixir
defmodule Course.Fake.Warehouse do

  @enforce_keys [:code]
  defstruct [:code, town: "Warsaw"]
end
```

```elixir
wh_krk = %Course.Fake.Warehouse{:code => "CDK", town: "Cracow"}
```

### Derive

Jak już wspomniano, struktury nie dziedziczą protokołów w takiej postaci jak np. mapy.

Istnieje jednak możliwość użycia `@derive`:

```elixir
defmodule Course.Fake.Hub do

  @enforce_keys [:code]
  @derive {Inspect, only: [:code]}
  defstruct code: nil, town: nil, size: 4000
end
```

## Protokoły

Protokoły (ang. `protocols`) są mechanizmem, który pozwala uzyskać polimorfizm w Elixirze.

Protokoły w Elixirze pozwalają na definiowanie wspólnego interfejsu dla różnych typów danych. Są one podobne do interfejsów w innych językach programowania, ale są bardziej elastyczne, ponieważ można je implementować dla istniejących typów danych bez modyfikacji ich definicji.

Możemy zobrazować użycie protokołów w kontekście sklepu internetowego, gdzie mamy różne typy produktów, a każdy z nich może być wyceniony w inny sposób.

### Definiowanie protokołu

Najpierw zdefiniujemy protokół `Pricable`, który będzie miał funkcję `price/1` do obliczania ceny produktu.

```elixir
defprotocol Pricable do
  @doc "Returns the price of the product"
  def price(product)
end
```

### Implementacja protokołu dla różnych typów produktów

Następnie zdefiniujemy różne typy produktów i zaimplementujemy dla nich protokół `Pricable`.

#### Produkt fizyczny

```elixir
defmodule PhysicalProduct do
  defstruct [:name, :base_price, :weight]

  defimpl Pricable do
    def price(%PhysicalProduct{base_price: base_price, weight: weight}) do
      base_price + weight * 0.5
    end
  end
end
```

#### Produkt cyfrowy

```elixir
defmodule DigitalProduct do
  defstruct [:name, :base_price, :file_size]

  defimpl Pricable do
    def price(%DigitalProduct{base_price: base_price, file_size: _file_size}) do
      base_price
    end
  end
end
```

#### Subskrypcja

```elixir
defmodule Subscription do
  defstruct [:name, :monthly_fee, :months]

  defimpl Pricable do
    def price(%Subscription{monthly_fee: monthly_fee, months: months}) do
      monthly_fee * months
    end
  end
end
```

### Użycie protokołu

Teraz możemy używać protokołu `Pricable` do obliczania cen różnych produktów:

```elixir
physical_product = %PhysicalProduct{name: "Laptop", base_price: 1000, weight: 2}
digital_product = %DigitalProduct{name: "E-book", base_price: 15, file_size: 5}
subscription = %Subscription{name: "Streaming Service", monthly_fee: 10, months: 12}

IO.puts("Price of physical product: $#{Pricable.price(physical_product)}")

IO.puts("Price of digital product: $#{Pricable.price(digital_product)}")

IO.puts("Price of subscription: $#{Pricable.price(subscription)}")
```

### Uwagi

Protokoły w Elixirze pozwalają na definiowanie wspólnego interfejsu dla różnych typów danych, co umożliwia elastyczne i rozszerzalne projektowanie systemów.

W powyższym przykładzie protokół `Pricable` umożliwia obliczanie cen różnych typów produktów w sklepie internetowym, niezależnie od ich specyficznych właściwości.

### Inne przykłady

Kilka innych ciekawych przykładów można znaleźć w oficjalnej dokumentacji pod [tym](https://hexdocs.pm/elixir/protocols.html) linkiem.

## Typowanie (adnotacje typu)

W `Elixirze` typowanie danych odbywa się za pomocą adnotacji typu, które są częścią systemu dokumentacji i statycznej analizy kodu.

Adnotacje te są używane głównie przez narzędzia takie jak `Dialyzer`, które pomagają w wykrywaniu błędów typów w kodzie.

### Typowanie funkcji za pomocą `@spec`

Adnotacje typu dla funkcji są definiowane za pomocą `@spec`. Poniżej kilka `edge-case'ów`.

#### Przykład prostej funkcji z adnotacją typu

```elixir
defmodule Types.Math do
  @spec add(integer, integer) :: integer
  def add(a, b) do
    a + b
  end
end
```

#### Przykład funkcji z bardziej złożonymi typami

```elixir
defmodule Types.User do
  @type t :: %Types.User{name: String.t(), age: non_neg_integer}
  defstruct [:name, :age]

  @spec create_user(String.t(), non_neg_integer) :: t
  def create_user(name, age) do
    %Types.User{name: name, age: age}
  end
end
```

### Typowanie z użyciem `@type` i `@typep`

Można również definiować własne typy za pomocą `@type` (publiczne) i `@typep` (prywatne).

#### Przykład definiowania własnych typów

```elixir
defmodule Types.Shapes do
  @type point :: {number, number}
  @type shape :: :circle | :square | :triangle

  @spec area(shape, number) :: number
  def area(:circle, radius) do
    :math.pi() * radius * radius
  end

  def area(:square, side) do
    side * side
  end

  def area(:triangle, base, height) do
    0.5 * base * height
  end
end
```

### Typowanie z użyciem `@spec` i `@callback`

Jeśli tworzysz `behaviour` (interfejs), możesz użyć `@callback` do definiowania specyfikacji funkcji, które muszą być zaimplementowane.

#### Przykład użycia `@callback`

```elixir
defmodule Types.MyBehaviour do
  @callback my_function(arg :: any) :: any
end

defmodule Types.MyImplementation do
  @behaviour Types.MyBehaviour

  @spec my_function(any) :: any
  def my_function(arg) do
    arg
  end
end
```

### Przykład użycia Dialyzera

Dialyzer to narzędzie do analizy statycznej kodu, które może wykrywać błędy typów w kodzie Elixira.

Aby użyć Dialyzera, musisz najpierw wygenerować PLT (Persistent Lookup Table), a następnie uruchomić Dialyzera na swoim projekcie.

#### Kroki do użycia Dialyzera

1. Dodaj Dialyzera do swojego projektu w

`mix.exs`:

<!-- livebook:{"force_markdown":true} -->

```elixir
defp deps do
  [
    {:dialyxir, "~> 1.0", only: [:dev], runtime: false}
  ]
end
```

1. Zainstaluj zależności:

   ```sh
    mix deps.get
   ```

2. Wygeneruj PLT:

   ```sh
    mix dialyzer --plt
   ```

3. Uruchom Dialyzera:

   ```sh
    mix dialyzer
   ```

Typowanie danych w Elixirze za pomocą `@spec`, `@type`, `@typep` i `@callback` pozwala na bardziej precyzyjne definiowanie interfejsów funkcji i struktur danych, ułatwia utrzymanie i rozwijanie kodu.

### Dodatkowe informacje

Więcej o `typespec` można znaleźć w oficjalnej dokumentacji tutaj.

## Zachowania (interfejsy)

W Elixirze `zachowania` (ang. `behaviours`) są mechanizmem podobnym do interfejsów w innych językach programowania. Pozwalają one definiować zestaw funkcji, które muszą być zaimplementowane przez moduł, który deklaruje, że implementuje dany behaviour.

1. **Definiowanie zachowań:**

```elixir
defmodule MyBehaviour do
  @callback my_function(arg :: any) :: any
end
```

1. **Implementowanie zachowań:**

```elixir
defmodule MyImplementation do
  @behaviour MyBehaviour

  @impl MyBehaviour
  def my_function(arg) do
    # Implementacja funkcji
    arg
  end
end
```

1. **Sprawdzanie implementacji:**

Elixir sprawdza, czy moduł implementujący behaviour rzeczywiście definiuje wszystkie wymagane funkcje. Jeśli nie, kompilator zgłosi błąd.

### Przykład

Załóżmy, że chcemy zdefiniować behaviour dla prostego serwera:

```elixir
defmodule ServerBehaviour do
  @callback start_link(args :: any) :: {:ok, pid} | {:error, reason :: any}
  @callback handle_call(request :: any, from :: {pid, reference}, state :: any) :: {:reply, response :: any, new_state :: any}
end
```

Następnie możemy zaimplementować ten behaviour w konkretnym module:

```elixir
defmodule MyServer do
  @behaviour ServerBehaviour

  def start_link(args) do
    # Implementacja start_link
    {:ok, self()}
  end

  def handle_call(request, _from, state) do
    # Implementacja handle_call
    {:reply, :ok, state}
  end
end
```

Behaviours w Elixirze są potężnym narzędziem do tworzenia elastycznych i modularnych aplikacji, umożliwiającym definiowanie i egzekwowanie kontraktów między różnymi częściami systemu.

## Protokoły kontra zachowania

W języku Elixir zarówno `protokoły` (ang. `protocols`), jak i `zachowania` (ang. `behaviours`) są mechanizmami, które wspierają polimorfizm, ale używane są w różnych kontekstach i mają różne zastosowania.

### Protokoły (Protocols)

1. **Cel**: Protokoły w Elixirze są używane do definiowania wspólnego interfejsu dla różnych typów danych. Dzięki nim można stworzyć zestaw funkcji, które różne typy danych mogą implementować w różny sposób.

2. **Polimorfizm ad hoc**: Protokoły umożliwiają polimorfizm ad hoc, co oznacza, że można definiować, jak dana funkcja powinna działać dla różnych typów danych bez konieczności modyfikowania samych typów.

3. **Jak działają**: Aby użyć protokołów, najpierw definiuje się protokół za pomocą `defprotocol`, a następnie implementuje się go dla różnych typów za pomocą `defimpl`.

4. **Przykład**: Można zdefiniować protokół `String.Chars` do konwersji różnych typów danych na łańcuchy znaków.

### Zachowania (Behaviours)

1. **Cel**: Behaviours są używane do definiowania zestawu funkcji, które moduł musi zaimplementować. Często stosowane są do tworzenia abstrakcji, które będą implementowane przez różne moduły, np. w kontekście generycznych serwerów (`GenServer`), aplikacji `OTP` itp.

2. **Polimorfizm parametryczny**: Behaviours wspierają polimorfizm parametryczny, gdzie różne moduły implementują ten sam zestaw funkcji, co pozwala na wymienne użycie tych modułów.

3. **Jak działają**: Behaviours są definiowane za pomocą `@callback` i `@macrocallback`, a moduł, który implementuje dane zachowanie, musi używać `@behaviour` oraz zaimplementować wszystkie zadeklarowane funkcje.

4. **Przykład**: `GenServer` jest przykładem zachowania w Elixirze, które moduły mogą implementować, aby działać jako serwery generyczne.

## Podsumowanie

Jak widać Elixir to język, który da się lubić i który potrafi zaskoczyć ciekawymi rozwiązaniami.

Mimo faktu bycia językiem funkcjonalnym, posiada jednak ciekawe elementy, umożliwiające pisanie choćby `polimorfistycznego` kodu.

Kontynuacja podstaw, znajdzie się w kolejnym artykule.

## Referencje

- [Elixir v17.2](https://hexdocs.pm/elixir/1.17.2/Kernel.html)
- [From Ruby to Elixir](https://pragprog.com/titles/sbelixir/from-ruby-to-elixir/)
- [Learn Functional Programming with Elixir](https://www.oreilly.com/library/view/learn-functional-programming/9781680505757/)
- [Programming Elixir](https://pragprog.com/titles/elixir16/programming-elixir-1-6/)
