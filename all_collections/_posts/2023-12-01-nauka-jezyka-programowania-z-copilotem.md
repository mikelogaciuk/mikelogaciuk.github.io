---
layout: post
title: Nauka języka programowania z Copilotem
date: 2023-07-07
category:
  ["learning", "programming", "languages", "Copilot", "llm", "ai", "rust"]
---

![Header](/img/rusty1.jpeg)

## Uwaga

Artykuł nie jest raczej skierowany do osób, które na codzień korzystają z LLM'ów podczas kodowania, nauki.

Tekst ma raczej zadanie pokazać młodszym adeptom programowania, lub tym którzy nie korzystają na codzień z LLM'ów - jak przydatne one mogą być nie tylko w samej pracy, jak poszerzaniu wiedzy oraz w ogólnym tłumaczeniu kodu.

Nie jestem także w żaden sposób powiązany z firmą **Microsoft** ani **Github'em** i artykuł został napisany jedynie w celach publicystycznych.

## Nauka języków programowania kiedyś i dziś

W przeszłości nauka programowania oraz poznawania nowych języków programowania wymagałą trochę większego reasearch’u niż obecnie. Dawniej, uczono się bezpośrednio z dokumentacji danego języka, postów na grupach mail'owych oraz dyskusyjnych czy po prostu z książek.

Z czasem obszar ten ewoluował do stron dedykowanych programistom, gdzie tysiące developerów zaczęło dzielić się wiedzą.

Następnie jak grzyby po deszczu zaczęły pojawiać się interaktywne strony z kursami (darmowymi jak i płatnymi) czy setki godzin nagrać wideo np. na YouTube'ie, a także chyba już nie kończąca się liczba szkoleń na Udemy.

O ile nauka pierwszego języka bywa bolesna, gdyż musimy zrozumieć np. czym jest stos, a czym sterta. Czym jest bit, a czym bajt. Czym są funkcje, obiekty, zmienne, klasy, struktury, tabele, tablice, słowniki, wskaźniki i inne aspekty programowania.

O tyle nauka następnego z reguły jest sprawą dużo łatwiejszą i raczej przyjemniejszą, dodatkowo poszerzającą już Nasze horyzonty meandrów programowania.

Obecnie w dobie błyskawicznie rozwijających się modeli LLM, w teorii jesteśmy w stanie za prawie darmo, uczyć się bezpośrednio w edytorze kodu. Cena Copilot’a w porównaniu do książek czy kursów jest raczej na ogół niższa.

> Oczywiście musimy mieć na uwadze, że i modele mogą się mylić. Trzeba do przykładów podchodzić z głową i rozwagą.
> Z reguły kod może nie uwzgledniać jakichkolwiek dobrych wzorców. Jednakże napewno nie będzie to brutalny spaghetti-code.

A więc do dzieła, sprawdźmy wspólnie jak taka nauka może wyglądać na przykładzie **Rusta**.

## Czego potrzebujemy?

By móc uczyć się w sposób zaproponowany w moim artykule, na pewno potrzebujemy **Rusta**, wraz z **Visual Studio Code** wraz z pluginami **Rust Analyzer** oraz **Github Copilot** i oczywiście konto na Githubie oraz wykupioną subskrypcję do usługi Copilot.

Mają to wszystko, w lewym rogu programu VS Code, zauważyć będziemy mogli nową ikonę przypominającą czat. I to w dużej mierze z tego miejsca, poza oczywiście kodem będzie korzystać najwięcej.

## Geneza

Kilka dni przed napisaniem tego artykułu, znalazłem zeszyt z czasów szkolnych ze swoimi notkatkami. Przeglądając go, pomyśłałem sobie jak wyglądać by mogła dziś moja nauka programowania, czy poznawania nowego języka mając możliwość korzystania z Copilot'a. Tym samym postanowiłem sprawdzić, jak mogłaby wyglądać taka nauka języka bez użycia książek jak i innych źródeł wiedzy. Zakładając przy tym, że jesteśmy totalnie zieloni w temacie języka spod znaku kraba - a mamy subskrypcję Copilot'a i nie wachamy się jej użyć.

![Starting point](/img/rusty2.jpeg)

## Wstęp do nauki

Na początek w IDE tworzymy folder, po czym w konsoli wpisujemy:

```bash
cargo init --name rustypusty
```

Czy jakąkolwiek inną nazwę dla Naszego 'naukowego projektu'.

Po tym zabiegu Nasz folder powinien wyglądać tak:

```shell
.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── main.rs
└── target

3 directories, 3 files
```

Z racji, że udajemy, że nie wiemy czym jest Rust - powinniśmy pierw zapytać Naszego **Pilota** czym jest w ogóle ten język Rust?

_Czym jest język Rust?_

> Rust to nowoczesny język programowania skoncentrowany na wydajności i bezpieczeństwie, szczególnie bezpiecznym równoległym programowaniu. Rust oferuje kontrolę na niskim poziomie nad systemem w sposób podobny do języka C++, ale z dodatkowymi narzędziami i ochroną przed błędami, które pomagają uniknąć powszechnych problemów związanych z pamięcią, takich jak wyścigi danych, wycieki pamięci i niezdefiniowane zachowanie.

No, a owe Cargo, którego przed chwilą użyliśmy? Co to takiego?

_Czym jest Cargo w języku Rust?_

> Cargo to system zarządzania pakietami i narzędziem do budowania projektów w języku Rust. Umożliwia tworzenie nowych projektów, zarządzanie zależnościami, kompilację kodu, uruchamianie testów i wiele innych zadań związanych z rozwojem oprogramowania w Rust.
>
> Komenda `cargo init --name rustypusty` tworzy nowy projekt Rust o nazwie "rustypusty". Tworzy ona katalog o tej nazwie, jeśli jeszcze nie istnieje, a w nim pliki konfiguracyjne i źródłowe potrzebne do rozpoczęcia pracy nad projektem.

_Jak można zarządzać zależnościami w projekcie Rust przy użyciu Cargo?_

> Zarządzanie zależnościami w projekcie Rust za pomocą Cargo jest proste i odbywa się głównie za pomocą pliku `Cargo.toml`, który jest plikiem konfiguracyjnym dla twojego projektu.
>
> Aby dodać zależność, musisz dodać jej nazwę i wersję do sekcji `[dependencies]` w pliku `Cargo.toml`. Na przykład, aby dodać zależność od biblioteki `serde`, która jest używana do serializacji i deserializacji danych, możesz zrobić to w następujący sposób:

```toml
[dependencies]
serde = "1.0"
```

> Następnie, kiedy uruchomisz `cargo build` lub `cargo run`, Cargo automatycznie pobierze i skompiluje zależności, które są wymagane przez twój projekt.
>
> Możesz również zaktualizować zależności za pomocą `cargo update`, co spowoduje, że Cargo sprawdzi, czy istnieją nowsze wersje zależności, i jeśli tak, zaktualizuje plik `Cargo.lock`, który śledzi dokładne wersje zależności używane w twoim projekcie.

Jak widać model całkiem sprawnie i jasno odpowiada na Nasze pytania. Gdzie jak zresztą wiemy, ten nie przejmuje się tym, aby 'książka' była na tyle długa by spełnić wymogi wydawcy.

Tym samym odpowiedzi są zwięzłe, precyzyjne. Niemniej jednak z tyłu głowy zawsze musimy mieć świadomość, że ten czasem może się mylić i w przypadku nieścisłości powinniśmy odpowiednio umieć zauważyć, że odpowiedź może być błędna.

## Składnia

No dobrze! Skoro coś wiemy już o języku, bez zbędnego oczekiwania - spytajmy go o podstawowe elementy języka.

Oczywiście na potrzeby artykułu nie zbombardowałem chat'a pytaniami dot. samego języka per se, skupmy się bardziej na składni niżeli jego historii.

## Zapytajmy o struktury danych

Na początek zadajmy mu pytanie o typy i struktury danych:

_Jakie typy danych istnieją w języku Rust?_

> W języku Rust dostępne są różne typy danych. Oto kilka z nich:
>
> 1. **Liczby całkowite**: `i8`, `i16`, `i32`, `i64`, `i128`, `u8`, `u16`, `u32`, `u64`, `u128` - są to odpowiednio liczby całkowite ze znakiem i bez znaku o różnej wielkości.
>
> 2. **Liczby zmiennoprzecinkowe**: `f32`, `f64` - są to liczby zmiennoprzecinkowe o pojedynczej i podwójnej precyzji.
>
> 3. **Bool**: `bool` - typ logiczny, który może przyjmować wartości `true` lub `false`.
>
> 4. **Znaki**: `char` - typ znaku, który przechowuje pojedynczy znak Unicode.
>
> 5. **Łańcuchy znaków**: `String` i `&str` - są to typy używane do przechowywania łańcuchów znaków.
>
> 6. **Tablice**: `[T; N]` - tablica o stałej długości `N` i typie elementów `T`.
>
> 7. **Wektory**: `Vec<T>` - dynamiczna tablica o typie elementów `T`.
>
> 8. **Krotki**: `(T1, T2, ..., Tn)` - krotka o różnych typach elementów.
>
> 9. **Wskaźniki**: `Box<T>`, `&T`, `&mut T` - różne typy wskaźników, w tym wskaźniki do pudełka (Box), referencje i referencje mutowalne.
>
> 10. **Funkcje**: `fn(T1, T2, ..., Tn) -> T` - typ funkcji, która przyjmuje argumenty typów `T1` do `Tn` i zwraca wartość typu `T`.
>
> 11. **Option**: `Option<T>` - typ, który może przyjmować wartość `Some(T)` lub `None`.
>
> 12. **Result**: `Result<T, E>` - typ, który może przyjmować wartość `Ok(T)` lub `Err(E)`.
>
> 13. **Struktury i Enumy**: Użytkownik może zdefiniować własne typy danych za pomocą słów kluczowych `struct` i `enum`.

_Jakie struktury danych możemy znaleźć w języku Rust?_

> W języku Rust dostępne są różne struktury danych. Oto kilka z nich:
>
> 1. **Tuples (Krotki)**: Krotki to sekwencje wartości różnych typów. Na przykład, `(1, "a", 4.5)` jest krotką zawierającą wartość całkowitą, łańcuch znaków i liczbę zmiennoprzecinkową.
>
> 2. **Arrays (Tablice)**: Tablice to sekwencje wartości tego samego typu o stałej długości. Na przykład, `[1, 2, 3, 4, 5]` jest tablicą pięciu liczb całkowitych.
>
> 3. **Vectors (Wektory)**: Wektory są podobne do tablic, ale mogą zmieniać swoją wielkość. Są one jednym z najczęściej używanych typów sekwencyjnych w Rust.
>
> 4. **Structs (Struktury)**: Struktury są niemutowalnymi zbiorem pól, które mogą zawierać różne typy danych. Są one podobne do klas w innych językach programowania, ale bez metod.
>
> 5. **HashMaps (Mapy hashujące)**: HashMapy są kolekcjami klucz-wartość, które przechowują dane w sposób, który umożliwia szybkie wyszukiwanie na podstawie klucza.
>
> 6. **Sets (Zbiory)**: Zbiory są kolekcjami unikalnych elementów. Rust oferuje dwa typy zbiorów: `HashSet` i `BTreeSet`.
>
> 7. **LinkedLists (Listy dwukierunkowe)**: Listy dwukierunkowe to sekwencje wartości, które są przechowywane w węzłach z linkami do następnego i poprzedniego węzła.
>
> 8. **Stacks and Queues (Stosy i kolejki)**: Stosy i kolejki to specjalne typy kolekcji, które oferują operacje dodawania i usuwania elementów w określonym porządku.

_Jak można zadeklarować i zainicjalizować tablicę w języku Rust?_

> W języku Rust tablicę można zadeklarować i zainicjalizować na kilka sposobów. Oto najprostszy przykład:

```rust
let arr = [1, 2, 3, 4, 5];
```

> W tym przypadku `arr` to tablica pięciu liczb całkowitych. Rust automatycznie wnioskuje typ i rozmiar tablicy na podstawie kontekstu.
>
> Jeśli chcesz jawnie określić typ i rozmiar tablicy, możesz to zrobić w następujący sposób:

```rust
let arr: [i32; 5] = [1, 2, 3, 4, 5];
```

> W tym przypadku `arr` to tablica pięciu liczb całkowitych typu `i32`.
>
> Jeśli chcesz zainicjalizować tablicę o określonym rozmiarze jedną wartością, możesz to zrobić tak:

```rust
let arr = [0; 10];
```

> W tym przypadku `arr` to tablica dziesięciu liczb całkowitych, wszystkie zainicjalizowane wartością `0`.

Jak widać bezproblemowo otrzymaliśmy odpowiedź wraz z przykładami kodu. Wszak może i trywialnymi, ale od czegoś musimy zaczać.

## To może cheatsheet?

Oczywiście w normalnych warunkach zapewne Nasza nauka wyglądała by w podobny sposób, gdzie kolejno zadawalibyśmy pytania Naszemu 'przyjacielowi' programisty.

Z racji, że to nie jest (zakładam) Nasz pierwszy język, na początek warto po prosić mechanizm o wygenerowanie cheatsheet'u, a potem zadając pytania możemy te informacje poskładać do choćby pliku .markdown z notatkami.

Jeśli chodzi o generowanie takich 'ściągawek' to LLM nie ma z tym raczej wiekszego problemu. Prosta o prośba o wygenerowanie takiego tekstu, kończy się mniejwięcej tak:

```rust
// Rust Cheatsheet

// Zmienne i typy danych

let x = 5; // Zmienna niemutowalna
let mut y = 5; // Zmienna mutowalna
let z: i32 = 5; // Zmienna z określonym typem

// If-Else
if x < 5 {
    println!("x is less than 5");
} else {
    println!("x is not less than 5");
}

// Pętla for
for i in 0..5 {
    println!("{}", i);
}

// Pętla while
while x < 10 {
    x += 1;
}

(...)

// Definicja struktury
struct Point {
    x: i32,
    y: i32,
}

// Utworzenie instancji struktury
let p = Point { x: 0, y: 0 };

// Definicja enuma
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

// Utworzenie instancji enuma
let dir = Direction::Up;
```

W teorii w tego typu nauce ogranicza Nas tylko Nasza wyobraźnia, już posiadana wiedza i chęć jej pogłębiania.

Oczywiście na początku, zwykły Copilot Chat będzie Naszym podstawowym przyjacielem. Natomiast gdy uznamy, że już coś rozumiemy. Warto zwyczajnie usiąść do kodu.

## Nauka 3w1

Skoro, już wiemy, jak min definiować struktury - to może czas coś napisać i sprawdzić jak kombinacja Naszego kodu, autokompletacji oraz asystenta sprawuje się w boju?

### Kod

Na początek w pliku `src/main.rs` zadeklarujmy strukturę - np. lokomotywy (tak tak, takiej która może być parowa bądź elektryczna)?

```rust
struct Locomotive {
    name: String,
    brand: String,
    model: String,
    year: u32,
    weight_kg: f64,
    length_m: f64,
}
```

Skoro mamy już zarys obiektu, spróbujmy go stworzyć:

```rust
fn main() {
    let su45 = Locomotive {
        name: "SU45",
        brand: "Pafawag",
        model: "SU45",
        year: 1967,
        weight_kg: 120000.0,
        length_m: 16.0,
    }
}
```

By skompilować kod, wystarcz w folderze Naszego 'naukowego' projektu wpisać `cargo run`.

Aczkolwiek z racji, że mamy aktywowanego `rust-analyzer'a` to już za wczasu widzimy, że coś z Naszym kodem jest nie tak:

![Broken code](/img/rusty-broken-code.png)

Klikając w `Quick Fix...` i dalej w `Explain using Copilot`, Naszym oczom ukaże się odpowiedź:

> Wydaje się, że masz problem z typami łańcuchów znaków w Rust. W strukturze `Locomotive` pola `name`, `brand` i `model` są typu `String`, ale podczas tworzenia instancji `Locomotive` próbujesz przypisać do nich literały łańcuchów znaków (`&str`), co powoduje błąd.
>
> Aby to naprawić, musisz przekształcić literały łańcuchów znaków (`&str`) na `String`. Możesz to zrobić za pomocą metody `to_string()`. Oto poprawiony kod:

```rust
fn main() {
    let su45 = Locomotive {
        name: "SU45".to_string(),
        brand: "Pafawag".to_string(),
        model: "SU45".to_string(),
        year: 1967,
        weight_kg: 120000.0,
        length_m: 16.0,
    };
}
```

> Pamiętaj, że w Rust `String` i `&str` to dwa różne typy. `String` to typ, który przechowuje łańcuch znaków w pamięci i może być modyfikowany, podczas gdy `&str` to odwołanie do łańcucha znaków, które nie może być modyfikowane.

Czy to nie jest piękne i zarazem wygodne? W przeszłości po ostrzeżeniu o błędach, musiałbym wejść do dokumentacji np. `rustup docs --book` i wyszukać wytłumaczenia problemu.

Teraz mam wszystko w jednym oknie i do momentu przypuszczenia, że LLM lunatykuje - nie muszę odrywać ekranu od edytora kodu nawet na sekundę.

### Brakuje Nam silnika

Mamy lokomotywę, ale brakuje Nam silnika. Jak wiemy lokomotywy mogą być różne: spalinowe, wodorowe, parowe, elektryczne.

W Ruście, nie mamy typowej obiektowości w postaci klas i dziedziczenia, ale mam kompozycję oraz interfejsy.

Na potrzeby artykułu, do struktury lokomotywy dodajmy dodatkowe pole o nazwie `engine` oraz typie `Engine`, a następnie dodajmy strukturę `Engine`:

```rust
struct Engine {
    fuel: String,
    cylinders: u8,
    displacement_cm3: u32,
    power_hp: u32,
    rpm_max: u32,
}

(...)

    let su45 = Locomotive {
        (...)
        engine: Engine {
            fuel: "Diesel".to_string(),
            cylinders: 16,
            displacement_cm3: 16000,
            power_hp: 3000,
            rpm_max: 1000,
        },
    }
```

Oraz trywialną metodę do printowania (normalnie zapewne użył bym `serde` i `json'a`):

```rust
fn print_locomotive(locomotive: &Locomotive) {
    println!("Name: {}", locomotive.name);
    println!("Brand: {}", locomotive.brand);
    println!("Model: {}", locomotive.model);
    println!("Year: {}", locomotive.year);
    println!("Weight (kg): {}", locomotive.weight_kg);
    println!("Length (m): {}", locomotive.length_m);
    println!("Engine Fuel: {}", locomotive.engine.fuel);
    println!("Engine Cylinders: {}", locomotive.engine.cylinders);
    println!(
        "Engine Displacement (cm3): {}",
        locomotive.engine.displacement_cm3
    );
    println!("Engine Power (hp): {}", locomotive.engine.power_hp);
    println!("Engine Max RPM: {}", locomotive.engine.rpm_max);
}
```

Mając to wszystko spróbujmy wyprintować obiekt:

```rust
print_locomotive(su45);
```

Znów ostrzeżenie, tym razem:

```shell
expected &Locomotive, found Locomotiverust-analyzer E0308
let su45: Locomotive // size = 136 (0x88), align = 0x8
```

Znów wybieramy explain i otrzymujemy:

> The error message "expected &Locomotive, found Locomotive" means that a function or method is expecting a reference to a `Locomotive` (i.e., `&Locomotive`), but it received an owned `Locomotive` instead.
>
> In your code, the `print_locomotive` function is defined to take a reference to a `Locomotive`:

```rust
fn print_locomotive(locomotive: &Locomotive) {
    // ...
}
```

> However, in your `main` function, you're passing an owned `Locomotive` to `print_locomotive`:

```rust
print_locomotive(su45);
```

> To fix this, you should pass a reference to `su45` to `print_locomotive`, like this:

```rust
print_locomotive(&su45);
```

> The `&` operator is used to create a reference to `su45`. This allows `print_locomotive` to borrow `su45` for the duration of the function call, rather than taking ownership of it.
> The `&` symbol is used to create a reference to the `su45` variable. This is a common pattern in Rust, known as borrowing.
>
> The `print_locomotive` function is defined to take a reference to a `Locomotive` as an argument (`locomotive: &Locomotive`). By passing a reference, you allow the function to read the data in `su45`, but not modify it. This is known as immutable borrowing.
>
> The benefit of this approach is that it avoids data copying, which can be expensive for large data structures. Instead, a reference (which is a kind of pointer) to the data is passed, which is much cheaper.
>
> In Rust, references are a way to access data without taking ownership, which is a key part of Rust's system for managing memory and other resources safely and efficiently.
>
> In the context of the `print_locomotive` function, the `&Locomotive` type in the function signature means that the function takes an immutable reference to a `Locomotive`. Inside the function, you can access the fields of the `Locomotive` using the dot notation, like `locomotive.name`.

Ponownie, Copilot wytłumaczył Nam kolejne nuanse języka bez wychodzenia z edytoru kodu.

## Podsumowanie

Jak widać, choćby na podstawie tej bądź co bądź biednej demonstracji formy uczenia się w oparciu o pomoc LLM'ów. Można zaobserwować jak wiele możliwości ona daje.

Gdyż nie tylko jest w stanie odpowiadać na Nasze pytania, dawać przykłady kodu czy generować testy, ale także refaktoryzować kod, poprawiać, podpowiadać (czasem zepsuć).
Choć z tym podpowiadaniem to bym delikatnie uważał, gdyż nie nauczymy się tak samo dobrze języka na pamięć, gdy będziemy pozwalać Copilotowi wypełniać za Nas całe połacie kodu.

W tym przypadku musimy znaleźc złoty środek, a najlepszym jest pisanie kodu samemu bez patrzenia nadmiernie na ten podpowiadany i ew. dopytywanie się o informacje w czacie.

    Osobiście, gdybym dziś miał jakieś 15 lat i był na początku swojej informatycznej drogi, a miał dostęp do takich możliwości jakie dają LLM'y.
    Zapewne uczyłbym się w ten sposób, wspomagając się książkami i zapewne dziś był znacznie bardziej doświadczony niż jestem obecnie.

    W młodości, niestety nie miałem możliwości pójścia na studia informatyczne, a nie miałem nikogo pod ręką, kto mógł by mi pomóc w nauce i wytłumaczyć niektóre kwestie jak prostemu człowiekowi.

    Próg wejścia do świata IT wydawał mi się tak duży, że po prostu się nie odważyłem wtedy uczyć samemu.

    Dopiero zrządzenie losu i rozpoczęcie pracy w IT, do którego trafiłem z tzw. niskiego szczebla tj zaczynając od Helpdesk'u. Dało mi na tyle sporego kopniaka motywującego, że znalazłem w sobie na tyle samozaparcia, by jednak tą wiedzę zgłębić. Dziś jestem tylko DevOps'em, programistą bym siebie nie nazwał, ale kto by pomyślał, że będę tu gdzie jestem?

    Szczerze, zazdroszczę dzisiejszej młodzieży, która już na etapie szkoły średniej ma takie możliwości. Mieć wirtualnego asystenta, który wytłumaczy Ci praktycznie wszystko czego potrzebujesz. Zredaguje kod, podpowie, przyspieszy pracę czy przeszuka dokumentację.

    Korzystajcie z tego jak tylko się da, nie marnujcie możliwości, które Wam dano. Możecie wszystko!

Dodatkowo, nie bez powodu wybrałem Rusta do tego artykułu. Gdyż, ten sam w sobie, wraz z jego inteligentnym kompilatorem, w akompaniamencie `rust-analyzera` oraz `Copilota` staje się Naszym nauczycielem, kolegą z ławki, interaktywną dokumentacją.

Praca z kodem, chyba nigdy nie była tak przyjemna jak dziś.
