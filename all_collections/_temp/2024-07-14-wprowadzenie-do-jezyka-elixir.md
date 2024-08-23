---
layout: post
title: Wprowadzenie do języka Elixir
date: 2024-07-14
category:
  ["elixir", "programowanie", "funkcjonalne", "funkcyjne", "fp", "erlang"]
---

![header](/img/elixir_006.jpeg)

## Spis treści

- [Spis treści](#spis-treści)
- [Wstęp](#wstęp)
  - [Czym jest Elixir?](#czym-jest-elixir)
  - [Zastosowanie języka Elixir](#zastosowanie-języka-elixir)
- [Programowanie funkcjonalne](#programowanie-funkcjonalne)
- [Instalacja](#instalacja)
- [Praca z kodem](#praca-z-kodem)
- [Biblioteki](#biblioteki)
- [Typy danych](#typy-danych)
- [Zmienne i dopasowywanie wzorców](#zmienne-i-dopasowywanie-wzorców)
- [Źródła](#źródła)

## Wstęp

### Czym jest Elixir?

Elixir to funkcyjny i współbieżny język programowania, który został stworzony w 2012 roku przez **José Valim'a** (twórca należał min. do zespołu rozwojowego `Rails`). Jego głównym celem było połączenie produktywności i elegancji języka Ruby z wydajnością i skalowalnością Erlang

Elixir jest językiem w korzystającym pełnymi garściami z ekosystemu języka `Erlang`. Elixir kompiluje się do kodu Erlanga i jest uruchamiany przez maszynę wirtualną `BEAM` (ang. `Bogdan's Erlang Abstract Machine`) nazywaną także jako Erlang VM.

Jest często on nazywany jako następca Ruby'ego, z którego czerpie wiele w swojej składni, jednak w przeciwieństwie do Ruby ten jest kompilowany, a i także także korzysta z tzw. `modelu aktora` (ang. `actor model`), który charakteryzuje go wysoką niezawodnością oraz wydajnością.

Dlatego też spisuje się idealnie wszędzie tam, gdzie wymagana jest wydajność oraz niezawodność. Z racji faktu, że wywodzi się z Erlanga to mamy do dyspozycji wszystko to co oferuje Nam Erlang z zakresu `OTP` (ang. `Online Telecom Protocol`) - o którym będę pisał w następnych artykułach.

### Zastosowanie języka Elixir

Elixir znajduje zastosowanie w wielu różnych dziedzinach, dzięki swojej wydajności i skalowalności:

1. Aplikacje Webowe: Framework Phoenix, zbudowany na Elixirze, jest często używany do tworzenia skalowalnych aplikacji webowych. Dzięki wsparciu dla WebSockets i LiveView, Phoenix umożliwia tworzenie interaktywnych aplikacji w czasie rzeczywistym.

2. Systemy Rozproszone: Elixir, działający na maszynie wirtualnej Erlanga, jest idealny do budowy systemów rozproszonych. Jego model współbieżności pozwala na łatwe zarządzanie wieloma procesami, co jest kluczowe w systemach wymagających wysokiej dostępności.

3. IoT (Internet of Things): Elixir jest używany w projektach IoT, gdzie wymagana jest obsługa wielu urządzeń jednocześnie. Jego zdolność do zarządzania wieloma równoczesnymi połączeniami sprawia, że jest idealnym wyborem do takich zastosowań.

4. Telekomunikacja: Dzięki swojej niezawodności i wydajności, Elixir jest używany w branży telekomunikacyjnej do budowy systemów, które muszą obsługiwać ogromne ilości danych i połączeń w czasie rzeczywistym.

5. Finanse: W sektorze finansowym, gdzie niezawodność i szybkość są kluczowe, Elixir jest używany do budowy systemów transakcyjnych i analitycznych.

6. Gry: Elixir znajduje również zastosowanie w branży gier, szczególnie w tworzeniu serwerów gier, które muszą obsługiwać dużą liczbę graczy jednocześnie.

Język Elixir jest używany przez takie firmy jak:

- **Discord**: Popularna platforma komunikacyjna używa Elixira do obsługi milionów równoczesnych połączeń.
- **Pinterest**: Wykorzystuje Elixira do zarządzania swoją infrastrukturą back-end'ową.
- **Bleacher Report**: Używa Elixira do obsługi swoich aplikacji mobilnych i webowych.

## Programowanie funkcjonalne

Na temat programowania funkcjonalnego na przykładzie Elixir'a, oraz po części Haskell'a możecie dowiedzieć się z tego [artykułu](https://mikelogaciuk.github.io/posts/wstep-do-pogramowania-funkcjonalnego/).

## Instalacja

Elixir wymaga Erlang'a, więc najpierw należy zainstalować go, a potem zgodną z Nim wersję Elixira.

O tym jak zainstalować Erlanga, dowiecie się [tutaj](https://mikelogaciuk.github.io/posts/przygotowanie-linuxa-do-pracy-sre/#erlang), a w przypadku Elixira [tu](https://mikelogaciuk.github.io/posts/przygotowanie-linuxa-do-pracy-sre/#elixir).

## Praca z kodem

W przypadku Elixira mamy dwie opcje:

- Interaktywny Shell Elixira (IEx)
- Klasyczna praca z kodem

W celu rozpoczęcia projektu, używamy w tym celu narzędzia `Mix`, które jest domyślnym narzędziem do zarządzania projektami.

```shell
$ mix help
mix                   # Runs the default task (current: "mix run")
mix app.config        # Configures all registered apps
mix app.start         # Starts all registered apps
mix app.tree          # Prints the application tree
mix archive           # Lists installed archives
mix archive.build     # Archives this project into a .ez file
mix archive.install   # Installs an archive locally
mix archive.uninstall # Uninstalls archives
mix clean             # Deletes generated application files
mix cmd               # Executes the given command
mix compile           # Compiles source files
mix deps              # Lists dependencies and their status
mix deps.clean        # Deletes the given dependencies' files
mix deps.compile      # Compiles dependencies
mix deps.get          # Gets all out of date dependencies
mix deps.tree         # Prints the dependency tree
mix deps.unlock       # Unlocks the given dependencies
mix deps.update       # Updates the given dependencies
mix do                # Executes the tasks separated by plus
mix escript           # Lists installed escripts
mix escript.build     # Builds an escript for the project
mix escript.install   # Installs an escript locally
mix escript.uninstall # Uninstalls escripts
mix eval              # Evaluates the given code
mix format            # Formats the given files/patterns
mix help              # Prints help information for tasks
mix hex               # Prints Hex help information
mix hex.audit         # Shows retired Hex deps for the current project
mix hex.build         # Builds a new package version locally
mix hex.config        # Reads, updates or deletes local Hex config
mix hex.docs          # Fetches or opens documentation of a package
mix hex.info          # Prints Hex information
mix hex.organization  # Manages Hex.pm organizations
mix hex.outdated      # Shows outdated Hex deps for the current project
mix hex.owner         # Manages Hex package ownership
mix hex.package       # Fetches or diffs packages
mix hex.publish       # Publishes a new package version
mix hex.registry      # Manages local Hex registries
mix hex.repo          # Manages Hex repositories
mix hex.retire        # Retires a package version
mix hex.search        # Searches for package names
mix hex.sponsor       # Show Hex packages accepting sponsorships
mix hex.user          # Manages your Hex user account
mix loadconfig        # Loads and persists the given configuration
mix local             # Lists tasks installed locally via archives
mix local.hex         # Installs Hex locally
mix local.phx         # Updates the Phoenix project generator locally
mix local.public_keys # Manages public keys
mix local.rebar       # Installs Rebar locally
mix new               # Creates a new Elixir project
mix phx.new           # Creates a new Phoenix v1.7.12 application
mix phx.new.ecto      # Creates a new Ecto project within an umbrella project
mix phx.new.web       # Creates a new Phoenix web project within an umbrella project
mix profile.cprof     # Profiles the given file or expression with cprof
mix profile.eprof     # Profiles the given file or expression with eprof
mix profile.fprof     # Profiles the given file or expression with fprof
mix profile.tprof     # Profiles the given file or expression with tprof
mix release           # Assembles a self-contained release
mix release.init      # Generates sample files for releases
mix run               # Runs the current application
mix test              # Runs a project's tests
mix test.coverage     # Build report from exported test coverage
mix xref              # Prints cross reference information
iex -S mix            # Starts IEx and runs the default task
```

Projekt tworzymy przy pomocy:

```shell
$ mix new foo

* creating README.md
* creating .formatter.exs
* creating .gitignore
* creating mix.exs
* creating lib
* creating lib/foo.ex
* creating test
* creating test/test_helper.exs
* creating test/foo_test.exs

Your Mix project was created successfully.
You can use "mix" to compile it, test it, and more:

    cd foo
    mix test

Run "mix help" for more commands.
```

Pełną, oryginalną dokumentację języka Elixir znajdziecie [tu](https://hexdocs.pm/elixir/1.17.2/Kernel.html).

## Biblioteki

Bibliotek do użycia z Naszym kodem, możemy szukać w `Hex`'ie: [tutaj](https://hex.pm/).

Te następnie dodajemy do `mix.exs`:

```elixir
  defp deps do
    [
      {:plug, "~> 1.1.0"}
    ]
  end
```

Zależności pobieramy i kompilujemy z pomocą `mix deps.get && mix deps.compile`, a kod uruchamiamy z pomocą `mix run` lub interaktywnie z pomocą `iex -s mix`.

## Typy danych

W Elixirze mamy kilka typów danych (w tym miejscu nie będę tłumaczył każdego z nich gdyż uznaję, że zapewne już coś wiesz o programowaniu).

- Liczby całkowite (ang. integer)
- Liczby zmiennoprzecinkowe (ang. float)
- Wartości logiczne (ang. boolean)
- Atomy (ang. atoms) - Innymi słowy stałe, który nazwa jest równocześnie ich wartością: `:config` etc
- Ciągi znaków (ang. string)
- Listy (ang. lists) - Dynamiczne, dowolnej długości z elementami dowolnego typu: `list = [1, 2, "3", "four"]`
- Krotki (ang. tuples) - Struktury o stałej długości, mogące przechowywać elementy dowolnego typu np. `tuple = {:ok, "hi", 89}`
- Mapy (ang. maps) - Znane w innych językach jako słowniki (para: klucz), które definiujemy z pomocą % np. `map = %{:name => "Alice", "town": "Gdańsk", 1 => "one"}`

## Zmienne i dopasowywanie wzorców

Można by pomyśleć: że poniższy zapis:

```elixir
1 = 1 # Wynik: 1
```

To nic innego jak typowe przypisanie...

Nic bardziej mylnego, ponieważ wywołanie poniższego zwróci Nam to:

```elixir
1 = 2 # Wynik: ** (MatchError) no match of right hand side value: 2
```

## Źródła

- [Elixir v17.2](https://hexdocs.pm/elixir/1.17.2/Kernel.html)
- [From Ruby to Elixir](https://pragprog.com/titles/sbelixir/from-ruby-to-elixir/)
- [Learn Functional Programming with Elixir](https://www.oreilly.com/library/view/learn-functional-programming/9781680505757/)
- [Programming Elixir](https://pragprog.com/titles/elixir16/programming-elixir-1-6/)
- [The Little Elixir & OTP Guidebook](https://www.manning.com/books/the-little-elixir-and-otp-guidebook)
- [Designing Elixir Systems with OTP: Write Highly Scalable, Self-Healing Software with Layers](https://pragprog.com/titles/jgotp/designing-elixir-systems-with-otp/)
- [No Fluff Jobs Log](https://nofluffjobs.com/pl/log/praca-w-it/co-warto-wiedziec-o-jezyku-programowania-elixir/)
