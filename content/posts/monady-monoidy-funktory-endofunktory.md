---
title: Monady, monoidy, funktory i endofunktory
date: 2025-08-31
tags: ["functional", "programming", "fsharp", "monads", "monoids", "functors", "endofunctors"]
language: "pl"
---

![Func](/img/func-prog-1.png)

## 📖 Spis treści

- [📖 Spis treści](#-spis-treści)
- [🧠 Wprowadzenie](#-wprowadzenie)
- [🔃 Endofunktor](#-endofunktor)
- [📦 Funktor](#-funktor)
- [➕ Monoida](#-monoida)
- [🧩 Monada](#-monada)
- [💊 Podsumowanie](#-podsumowanie)
  - [☠️ Post scriptum](#️-post-scriptum)
- [🔎 Źródła](#-źródła)

## 🧠 Wprowadzenie

    A monad is just a monoid in the category of endofunctors (...)
    - Philip Wadler

To chyba najbardziej znany cytat ze świata programowania funkcyjnego, autorstwa Philipa Wadlera.

Tłumacząc to na język polski, nie brzmi wcale prościej:

    Monada to po prostu monoida w kategorii endofunktorów (...)

Ale co to właściwie oznacza? Aby to zrozumieć, musimy najpierw przyjrzeć się kilku kluczowym pojęciom: monadom, monoidom, funktorom i endofunktorom.

Te abstrakcyjne koncepcje mogą wydawać się skomplikowane na pierwszy rzut oka, ale są niezwykle potężne i użyteczne w praktyce.

W tym artykule przyjrzymy się każdemu z tych pojęć, wyjaśniając je na prostych przykładach w języku `F#` i rozprawiając się z tą "wiedzą tajemną" raz na zawsze.

## 🔃 Endofunktor

`Endofunktor` to nic innego jak po prostu `typ`, który `'opakowuje'` jakąś wartość, lecz nadal pozostaje w tej samej kategorii typów.

W przypadku języka `F#`, jest Nim każdy generyczny typ jak np. `list` czy własny `Box<'T>`:

```fsharp
type Box<'T> = Box of 'T'
let x = Box 666 // x: Box<int>

printfn "%A" x // Box 666
```

Idąc dalej, `endofunktor` to `funktor`, lecz który jak już wspomniałem - działą w obrębie jednej kategorii, np. funkcja `SaleTransaction` -> `Sale Transaction`.

By łatwiej to zobrazować, przyjmijmy, że mamy poniższy typ reprezentujący transakcję:

```fsharp
type SaleTransaction = {
    Id: int
    Amount: decimal
    Currency: string
    IsRefunded: bool
}
```

Dla którego mamy poniższą funkcję:

```fsharp
let applyDiscount percentage transaction = // decimal -> SaleTransaction -> SaleTransaction
    let discountAmount = transaction.Amount * (percentage / 100M)

    { transaction with
        Amount = transaction.Amount - discountAmount }
```

I transakcję:

```fsharp
let transaction1 = // SaleTransaction
    { Id = 1
      Amount = 100.0M
      Currency = "USD"
      IsRefunded = false }
```

```fsharp
let discountedTransaction = applyDiscount 13m transaction1 // SaleTransaction
printfn "Original transaction: \n\n %A" transaction1
printfn "Discounted transaction: \n\n %A" discountedTransaction
```

Której wynikiem jest:

    Original transaction:

    { Id = 1
    Amount = 100.0M
    Currency = "USD"
    IsRefunded = false }
    Discounted transaction:

    { Id = 1
    Amount = 87.000M
    Currency = "USD"
    IsRefunded = false }

Tym samym, `applyDiscount` jest `endofunktorem`, gdyż przyjmuje on `SaleTransaction` i zwraca także `SaleTransaction`.

## 📦 Funktor

No dobrze, więc skoro `endofunktor` to `funktor`, ale w obrębie jednej kategorii, to czym jest sam `funktor`?

`Funktor` to `endofunktor` z umiejętnością `mapowania` funkcji przez strukturę.

![Troll](/img/trollllllf.jpeg)

Generalizując, `funktory` to `opakowania, które umieją się mapować` np. `List<SaleTransaction>` albo `Async<SaleTransaction>`.

Dla przykładu, do istniejącej już pojedyńczej transakcji, dodajmy jeszcze dwie:

```fsharp
let transaction2 =
    { Id = 2
      Amount = 200.0M
      Currency = "USD"
      IsRefunded = false }

let transaction3 =
    { Id = 3
      Amount = 300.0M
      Currency = "USD"
      IsRefunded = false }
```

Następnie, posiadając funkcję:

```fsharp
let mapTransaction f transactionList = // ('a -> 'b) -> list<'a> -> list<'b>
    List.map f transactionList
```

Możemy zmapować dane:

```fsharp
let discountedTransactions = // list<SaleTransaction>
    mapTransaction (applyDiscount 10m) [ transaction1; transaction2; transaction3 ]

printfn "Discounted transactions: \n\n %A" discountedTransactions
```

Otrzymując wynik:

    Discounted transactions:

    [{ Id = 1
    Amount = 90.00M
    Currency = "USD"
    IsRefunded = false }; { Id = 2
                            Amount = 180.00M
                            Currency = "USD"
                            IsRefunded = false }; { Id = 3
                                                    Amount = 270.00M
                                                    Currency = "USD"
                                                    IsRefunded = false }]

Innymi słowy, `mapTransaction` to `funktor`, gdyż pozwala on `podnieść` funkcję `SaleTransaction` -> `SaleTransaction` do poziomu `list<SaleTransaction>`.

Tym samym, skoro już rozumiemy, że:

- **Endofunktor** to **funktor**.
- A, **funktor** to **endofunktor**.

Możemy ze świętym spokojem przejść do kolejnej kwestii jaką jest **Monoida** (huh ☠️).

## ➕ Monoida

`Monoida` tudzież `monoid` to struktura z operacją łączenia (`append`) oraz elementem neutralnym (`identity`).

Na przykładzie `retail'u`, możey to być suma transakcji:

```fsharp
let combinedTransactions tx1 tx2 =
    { Id = 0
      Amount = tx1.Amount + tx2.Amount
      Currency = tx1.Currency
      IsRefunded = tx1.IsRefunded && tx2.IsRefunded }

let emptyTransaction =
    { Id = 0
      Amount = 0.0M
      Currency = "USD"
      IsRefunded = false }
```

```fsharp
let msg =
    [ transaction1; transaction2; transaction3 ]
    |> List.fold combinedTransactions emptyTransaction

printfn "Combined transaction: \n\n %A" msg
```

Wynik:

    Combined transaction:

    { Id = 0
    Amount = 600.0M     // 100 + 200 + 300 = 600
    Currency = "USD"
    IsRefunded = false }

W takim przypadku, `combineTransactions` to operacja `monoidalna`, a `emptyTransaction` to element neutralny.

Dla lepszego zobrazowania możey służyć ten bardziej trywialny przykład:

```fsharp
let strEmpty = "" // string
let strAppend a b = a + b // string -> string -> string
```

```fsharp
let msgx = ["A"; "B"; "C"] |> List.fold strAppend strEmpty // string
```

Lub bardziej `magazynowy` view:

```fsharp
type Inventory = (string * int) list

let emptyInventory: Inventory = [] // Inventory
let appendInventory (item1: Inventory) (item2: Inventory) =
    item1 @ item2 // Inventory -> Inventory -> list<string * int>

let stock1 = [ ("item1", 10); ("item2", 5) ] // list<string * int>
let stock2 = [ ("item3", 7); ("item4", 3) ] // list<string * int>
```

```fsharp
let warehouse =
    emptyInventory
    |> appendInventory stock1
    |> appendInventory stock2 // list<string * int>

printfn "Combined inventory: \n\n %A" warehouse
```

Wynik:

    Combined inventory:

    [("item3", 7); ("item4", 3); ("item1", 10); ("item2", 5)]

Na `monoidy` można patrzeć przez pryzmat zbioru zapasów z pustym magazynem i regułą dokupowania, w którego przypadku kolejność ta nie ma znaczenia.

## 🧩 Monada

`Monada` tudzież `monad` to struktura (opakowanie) jak `funktor` z dodatkowymi regułamy sekwencyjnego działania. Innymi słowy: `monada` pozwala na `łączenie` operacji z kontekstem.

Jest to ważny element tzw `Railway Oriented Programming`, o którym więcej możecie przeczytać u Scotta Wlaschin'a: [tutaj](https://fsharpforfunandprofit.com/rop/).

W tym przypadku z pomocą przychodzi typowy `pattern matching`, który pozwala Nam na odrzucanie niechcianych wartości.

Dla przykładu weźmy walidowanie zwrotów i np. waluty:

```fsharp
let validateCurrency transaction =
    match transaction.Currency with
    | "USD"
    | "EUR"
    | "GBP" -> Ok transaction
    | _ -> Error(
        sprintf "Unsupported currency: %s in transaction with id: %A" transaction.Currency transaction.Id
        )

let refund transaction =
    if transaction.IsRefunded then
        Error(
            sprintf "Transaction with id: %A already refunded." transaction.Id
            )
    else
        Ok { transaction with IsRefunded = true }
```

Następnie tworzymy funkcję do procesowania transakcji, która binduje Nam zarówno `validateCurrency` jak i `refund`:

```fsharp
let processTransaction transaction = // SaleTransaction -> Result<SaleTransaction,string>
    validateCurrency transaction |> Result.bind refund
```

Dla dobrobytu tworzymy kilka transakcji na potrzeby ewualuacji:

```fsharp
let goodTransaction = // SaleTransaction
    { Id = 1
      Amount = 100.0M
      Currency = "USD"
      IsRefunded = false }

let badCurrencyTransaction = // SaleTransaction
    { Id = 2
      Amount = 100.0M
      Currency = "AUD"
      IsRefunded = false }

let isRefundedTransaction = // SaleTransaction
    { Id = 3
      Amount = 100.0M
      Currency = "USD"
      IsRefunded = true }
```

Finalnie, całość możemy zwalidować korzystając już z wcześnie utworzonej funkcji `mapTransaction`:

```fsharp
let validateTransactions =
    mapTransaction processTransaction [ goodTransaction; badCurrencyTransaction; isRefundedTransaction ]

validateTransactions |> printfn "Validated transactions: \n\n %A"
```

Wynik:

    Validated transactions:

    [Ok { Id = 1
        Amount = 100.0M
        Currency = "USD"
        IsRefunded = true };
    Error "Unsupported currency: AUD in transaction with id: 2";
    Error "Transaction with id: 3 already refunded."]

Tym samym, `Result.bind` to operacja monadyczna - tj. taka, która pozwala łączyć funkcje `SaleTransaction` -> `Result<SaleTransaction, string>`.

A sama `monada` to `funktor` posiadający reguły sekwencyjnego działania (`bind` / `let!` i `return`), pozwalający łaczyć kroki, nawet te które mogą się nie udać.

## 💊 Podsumowanie

Podsumowowując w sposób `prosty`:

- `Endofunktor` to `funktor`, ale mający opakowanie wartości (`Box<'T>`, `option`, `list`).
- `Funktor` to `endofunktor` z funkcją map do przekształcania zawartości.
- `Monoid` to typ z pustym elementem i łączem, spełniający prawo łączności.
- `Monada` to `funktor` z dodatkowymi operacjami `bind` (`let!`) i `return`, umożliwiająca sekwencyjne łączenie obliczeń.

Natomiast patrząc na to bardziej `matematycznie` możemy to podsuwować, tak:

- `Endofunktor` to `funktor` `F: C -> C`, który działa w obrębie jednej kategorii zachowując przy tym strukturę `morfizmów`.
- `Funktor` to `homomorfizm` kategorii `F: C -> D`, który odwzorowuje obiekty i morfizmy zachowując ich identyczność oraz kompozycję.
- `Monoida` to `obiekt` (`M, *, e`) z operacją łączną i neutralnym elementem `e`, który spełnia łączność oraz tożsamość.
- `Monada` to `endofunktor` `T: C -> C` posiadający transformacje `Id => T` i `T2 => T`, które spełniają aksjomaty jedności i łączności.

### ☠️ Post scriptum

Jak widzicie nie było raczej tak źle jak wydawać by się mogło, a i sam zapewne raz, a dobrze finalnie rozprawiłem się z powyższą wiedzą tajemną, w końcu zapamietując definicje.

Drugą wypadkową tego post'u zapewne będzie to, że zacznę pisać w `F#`, który zwyczajnie mi się spodobał - a jego zgodność z ekosystemem `.NET` jest kolejnym mocnym argumentem.

## 🔎 Źródła

- [Functional Programming Patterns @ F# for fun and profit](https://fsharpforfunandprofit.com/fppatterns/)
- [Functors, applicatives and monads in pictures @ Adit](https://www.adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
- [Haskell & Category Theory @ Wikipedia](https://en.wikibooks.org/wiki/Haskell/Category_theory)
- [Patterns in F# @ Software Patterns Lexicon](https://softwarepatternslexicon.com/patterns-f-sharp/7/2/)
- [A monad is just a monoid... @ Felix Kuehl](https://medium.com/@felix.kuehl/a-monad-is-just-a-monoid-in-the-category-of-endofunctors-lets-actually-unravel-this-f5d4b7dbe5d6)
- [Monoids and endofunctors @ Alex Westphal](https://alexwestphal.github.io/2014/09/17/monoids-and-endofunctors/#:~:text=All%20told%2C%20a%20monad%20in%20X%20is%20just,of%20and%20relationships%20between%20monoids%2C%20monads%20and%20endofunctors.)
- [A monad is a monoid in the category of... @ RockTheJvm](https://rockthejvm.com/articles/a-monad-is-a-monoid-in-the-category-of-endofunctors-scala)
