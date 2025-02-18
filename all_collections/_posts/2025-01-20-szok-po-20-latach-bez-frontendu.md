---
layout: post
title: Szok po 20 latach bez frontend'u...
date: 2025-01-20
category:
  [
    "frontend",
    "backend",
    "fullstack",
    "elixir",
    "javascript",
    "typescript",
    "ruby",
    "python",
    "php",
    "go",
    "rust",
  ]
---

![header](/img/fullstack/frontend-backend-disaster.png)

## Spis treści

- [Spis treści](#spis-treści)
- [Wstęp](#wstęp)
- [CSS \& Tailwind](#css--tailwind)
- [PHP](#php)
  - [Laravel](#laravel)
  - [Livewire](#livewire)
  - [PHP - co wkurza?](#php---co-wkurza)
- [Ruby \& Rails](#ruby--rails)
- [Elixir, Phoenix, LiveView \& Ash](#elixir-phoenix-liveview--ash)
  - [Phoenix](#phoenix)
  - [Ash](#ash)
- [Javascript \& Typescript](#javascript--typescript)
  - [Środowiska uruchomieniowe](#środowiska-uruchomieniowe)
    - [Nodejs](#nodejs)
    - [Deno](#deno)
    - [Bun](#bun)
    - [Drobna uwaga](#drobnauwaga)
  - [Bundler'y](#bundlery)
    - [Vite](#vite)
    - [Turbopack](#turbopack)
    - [Webpack](#webpack)
  - [Frontend](#frontend)
    - [React](#react)
    - [Vue](#vue)
    - [Angular](#angular)
    - [Svelte](#svelte)
  - [Backend](#backend)
    - [AdonisJS](#adonisjs)
    - [Koa.js](#koajs)
    - [NestJS](#nestjs)
  - [Fullstack](#fullstack)
    - [Inertia](#inertia)
    - [Meteor](#meteor)
    - [NextJS](#nextjs)
- [Pozostałe](#pozostałe)
  - [Go](#go)
  - [Gleam](#gleam)
  - [Rust](#rust)
- [Konluzja](#konluzja)
- [Źródła](#źródła)

## Wstęp

Jak szybko można nabawić się depresji? A no wystarczy po 20 latach zechcieć pogodzić się z frontend'em.

Oczywiście to nie tak, że mieszkałem w krypcie pod skałą i nie zauważyłe, że co chwilę na tzw. frontendzie niczym grzyby po deszczu, wyrastają nowe framework'i, biblioteki czy run engine'y.

Natomiast nie wgryzałem się w to nadmiernie - gdyż mój obszar zainteresowań ograniczał się do backend'u i Big Data.

Tak naprawdę ostatni raz pisałem cokolwiek na froncie gdy byłem jeszcze w technikum czyli w okolicy 2005/2006 roku, gdzie prym na froncie wiódł PHP i JS w przeglądarce. Od tego czasu zarówno `PHP` czy `CSS` jak i `JS` przeszły sporą metamorfozę, która niezwykle miło mnie zaskoczyła.

Poniższy artykuł to bardziej takie podsumowanie dla mnie samego niżeli ogółu, aczkolwiek komuś może się przydać.

Idea jest taka, że chcę być w miarę samowystarczalny w projektach, które mógłbym robić dla siebie czy dla firmy - a, nie mogę gdyż moje prehistoryczne `know-how` związane z frontem, pamięta czas manualnego kopiowania plików na FTP i zapisywania build'ów w osobnym archiwum folderów i plików.

## CSS & Tailwind

W tym obszarze zmian trochę było, szczególnie animacje, przejścia etc. Być może one były, natomiast dostępność tutoriali, dokumentacji, przykładów jest praktycznie nieograniczona.

Natomiast najmilszym zaskoczeniem okazał się `TailwindCSS`, który upraszcza znacznie pisanie kodu pod front, który umożliwia szybkie tworzenie nowoczesnych stron internetowych bez opuszczania HTML. Fframework typu utility-first, co oznacza, że dostarcza zestaw klas CSS, które można skrzętnie komponować.

Dorzucając do tego biblioteki komponentów np. `daisyUI`, `Preline UI`, `Flowbite`, czy `Ripple UI` albo `Sira` - możemy dodatkowo skompaktować `potrzebną` Nam składnię do absolutnego minimum.

W przypadku CSS i komponentów - wiem, że mam trochę do nadrobienia - lecz nie ma tu nadmiernej dramy.

## PHP

Stary `pehap` przeszedł długa drogę, od najbardziej popularnego języka i stack'u pod web, po pośmiewisko (powolny, durny dolar w zmiennych itd).

Miłym zaskoczeniem było jednak to, że społeczność się nie poddała: język otrzymał JIT, dużo nowych funkcjonalności, o których można było pomarzyć. Tak - moje czasy to czasy `phpbb by Przemo` i tym podobnych cudów.

Obecnie wiodącymi framework'ami są `Symfony` oraz `Laravel`. Gdzie największą uwagę swoim pokaźnym ekosystemem i `Livewire`'em przykuł ten drugi.

### Laravel

![Laravel](/img/fullstack/laravel.com_frontend.png)

`Laravel` to obecnie spory kombajn, posiadający obsługę mail'i, kolejek job'ów, wspiera websocket'y i eventy, ma scheduler zadań, ORM'a, wbudowaną autentykację i wiele innych.

W skrócie, od dodatkowych bibliotek i komponentów do Laravel'a można dostać lekkiego zawrotu głowy, w którym na froncie używać możemy nietylko JS'a w jego vanilla formie czy wsparcia w formie `React'a` czy `Vue` z pomocą `Inertia`, ale czystego `Php`'a w oparciu o `Livewire` i template'y `Blade`.

### Livewire

![Livewire](/img/fullstack/livewire.laravel.com_.png)

`Livewire` to bilbioteka, tudzież framework fullstack dla Laravel, który upraszcza tworzenie dynamicznych interfejsów użytkownika bez opuszczania PHP. Livewire umożliwia tworzenie interaktywnych komponentów, które są renderowane na serwerze i aktualizowane w czasie rzeczywistym (coś jak `LiveView` (Elixir) lub `Hotwire` (Rails/Ruby))

### PHP - co wkurza?

Jednym z minusów była i jest konfiguracja serwera - w przypadku gdy zechcemy zrobić wszystko sami od A do Z.

Instalowanie zależności nadal potrafi napsuć krwi, choć jest lepiej niż znam z dawnych lat - tu mam nadzieję.

Jeśli o serwerze mowa, w miejsce leciwego Apache'a, możemy użyć `frankenPHP` napisanego w `Go`.

## Ruby & Rails

U `DHH` i w świecie `Ruby` nieustający progres...

Z racji, że trochę pisałem ostatnim czasem w Ruby - dla samego siebie nadmiernie rozwodzić się nie chcę - natomiast zarówno `Ruby` sam w sobie ze swoim nowy `YJIT`'em od `Shopify` jak i rozwojem `Rails` choćby w stronę bycia `fullstack` framework'iem bez nawet potrzeby używania `JS` z racji istnienia `Hotwire`.

Railsy możemy łączyć także z każdym innym front'endem, a sam w sobie podobnie jak Laravel jest `batteries-included` i ma wszystko co na codzień potrzebujemy.

Natomiast `Ruby` sam w sobie to już nie ten sam powolny słoń. Obecny YJIT compiler jest naprawdę szybki i u mnie osobiście obsługuje API łączące się do kilkuset sklepów na żądanie, wykonując różnorakie operacje pod spodem.

Ruby nie trzeba się bać i o dziwo świetnie i bardzo dobrze się skaluje:

## Elixir, Phoenix, LiveView & Ash

Tu zrobiło się ciekawie, gdyż ekosystem `Elixira` rozrasta się w bardzo szybkim tempie.

### Phoenix

`Phoenix` to fullstack framework, pozwalający na tworzenie wysoce skalowalnych i interaktywnych serwisów web'wych z pomocą `JS` na froncie lub i bez niego przy użyciu `Liveview`, który jest analogiczny dla Livewire i Hotwire. Nasz elixirowy przyjaciel jest także framework'iem typu batteries-included (autentykacja, metryki, JSON lub GraphQL, ORM, PubSub, cache, job'y etc)

### Ash

![Ash](/img/fullstack/ash.png)

`Ash` to kolejny choć nie do końca fullstack framework z ekosystemu Elixira, który kładzie mocny nacisk na minimalistyczną składnię i podejście do re-używalnych komponentów. Z ciekawostek - `Ash` może być używany w parze z Phoenix'em. Posiada własny custome'owy DSL, który w pierwszej chwili może sporo namieszać w głowie.

Z rzeczy, która strasznie mi się w Ash'u podoba to, to że pierw kładzie nacisk na komponenty w tym przypadku komponenty backend'u, które następnie już po napisaniu (z podziałem na `domains`, `resources`, `datalayers` etc), obudowujemy z apomocą `AshJsonApi` przy pomocy istniejących już `domains` oraz `resources`.

Front możemy dodać do samego API per se, lub z pomocą Liveview od Phoenixa. Do wyboru do koloru - klasycznie.

## Javascript & Typescript

Tutaj należy się mała pauza - to co zadziało się przez ten cały czas absencji w pisaniu front'u w mojej opinii w świecie `JS'a` - budzi respekt.

Choć na pierwszy rzut oka ekosystem wręcz przytłacza, niemniej jednak po dłuższym wgryzieniu się w temat - obraz zaczyna robić się nieco bardziej klarowny.

W kwestii samych języków rozpisywać się nie będę, gdyż TS'a w 2005 roku nie było, a JS był jaki był.

Doceniam oczywiście fakt, że obecnie vanilla JS jest bardzo przyjemnym w mej opinii językiem do pisania choćby backend, a Typescript jako jego superset to już czysta przyjemność.

### Środowiska uruchomieniowe

Zacznijmy od tego, że ostatnim razem gdy bawiłem się JS'em na froncie to nie było czegoś takiego jak `Nodejs`. Kod uruchamiany był jedynie w przeglądarce, gdzie dziś mamy aż trzy główne środowiska uruchomieniowe.

Miła odskocznia gdyż tak naprawdę - specjalizując się w samym JS/TS - jesteśmy w stanie bez używania innego języka pisać aplikacje od A do Z tylko w nim.

#### Nodejs

`Nodejs` to otwarte środowisko uruchomieniowe dla JavaScript, które pozwala na uruchamianie kodu JavaScript po stronie serwera. Stworzony przez Ryana Dahla w 2009 roku, Node.jszyskał ogromną popularność wśród deweloperów dzięki swojej wydajności, skalowalności i wszechstronności.

Jego ogromny już ekosystem stale się rozwija i jest każdego dnia usprawniany.

#### Deno

`Deno` to nowoczesne środowisko uruchomieniowe dla JavaScript i TypeScript, stworzone przez twórcę Nodejs, `Ryana Dahla`. Deno rozwiązuje problemy związane z wydajnością i bezpieczeństwem, które występują w Node.js. Istotną wadą jest mała i świeża społeczność.

#### Bun

`Bun` to nowoczesne środowisko uruchomieniowe dla JavaScript oraz Typescript, które kładzie nacisk na wydajność i łatwość użycia. Bun jest zaprojektowany, aby być szybkim i kompatybilnym z istniejącymi narzędziami i bibliotekami.

Kwestia społeczności przypomina tą znaną z Deno, jest ona relatywnie nowa i mniejsza niżeli ta znana z Nodejs.

#### Drobna uwaga

Głównym problemem jaki tu zauważam jest fragmentacja sceny, oraz możliwości silników uruchumieniowych, które możemy przeanalizować w tabeli na stronie `Bun`'a, [tutaj](https://bun.sh/).

### Bundler'y

#### Vite

`Vite` to narzędzie do budowania frontendu nowej generacji, które zapewnia szybkie uruchamianie serwera deweloperskiego i natychmiastową wymianę modułów. Vite obsługuje TypeScript, JSX, CSS i inne technologie bez konieczności konfiguracji. Jest zoptymalizowany pod kątem wydajności i prostoty użytkowania.

#### Turbopack

`Turbopack` to inkrementalny bundler zoptymalizowany dla JavaScript i TypeScript, napisany w `Rust` przez twórców webpacka i Next.js. Turbopack wykorzystuje wysoko zoptymalizowany kod maszynowy i silnik obliczeń inkrementalnych, co pozwala na szybkie budowanie aplikacji.

#### Webpack

`Webpack` to narzędzie do bundlingu zasobów, które umożliwia łączenie różnych zasobów, takich jak JavaScript, CSS, obrazy i inne pliki, w jeden lub kilka plików wyjściowych. Webpack jest elastyczny i można go dostosować do praktycznie każdej technologii i rodzaju projektu.

### Frontend

Jeśli chodzi o front w JS'ie to najważniejszymi framework'ami są tak naprawde `React` oraz `Vue` i ew. dla pewnego grona developer'ów `Angular` oraz lekki i przyjemny `Svelte`.

#### React

React to jedna z najbardziej popularnych bibliotek Javascript do budowy interaktywnych interfejsów użytkownika.

Stworzony przez Facebooka, wykorzystuje podejście oparte na komponentach i Virtual DOM, co pozwala na tworzenie wydajnych i responsywnych aplikacji.

Dzięki dużemu wsparciu społeczności i bogatemu ekosystemowi narzędzi jest on domyślnym fundamentem dla wielu nowoczesnych aplikacji webowych.

#### Vue

Vue to elastyczny i progresywny framework JS, który pozwala na stopniowe przyjmowanie nowych funkcji w miarę potrzeb projektu.

Stworzony został przez `Evana You` i jest ceniony za swoją prostotę, łatwość integracji i reaktywne wiązanie danych.

Dzięki komponentowej architekturze, Vue umożliwia budowanie zarówno małych, jak i dużych aplikacji webowych z łatwością.

#### Angular

Angular to opracowany przez Google, kompletny framework do budowy aplikacji webowych, który oferuje wiele funkcji w jednym pakiecie.

Domyślnie wykorzystuje TypeScript i jest często idealnym frameworkiem do tworzenia skomplikowanych aplikacji dla przedsiębiorstw.

#### Svelte

Svelte to innowacyjny framework JavaScript, który różni się od innych tym, że kompiluje się do wysoko zoptymalizowanego kodu JavaScript podczas build'u, co eliminuje konieczność używania Virtual DOM.

Stworzony został on przez `Richarda Harrisa` i pozwala na pisanie bardziej zwięzłego i wydajnego kodu, co przekłada się na szybsze i bardziej responsywne aplikacje.

Dzięki minimalistycznemu podejściu, Svelte jest często wybierany przez deweloperów poszukujących prostych i efektywnych rozwiązań.

### Backend

Do najbardziej znanych backend'owych framework'ów w ekosystemie JS należy `Expressjs`, aczkolwiek celowo go w tym przypadku pominę.

Skupię się na trzech _bardziej na czasie_ reprezentantach, a mianowicie `NestJS` oraz `AdonisJS` i `Koa.js`.

#### AdonisJS

AdonisJS to pełnoprawny framework webowy dla Node.js, który posiada multum takich funkcji jak:

- Autentykację (w tym social media jak Github, Google etc)
- ORM
- Templating
- Mailer, Limiter
- Health-check'i itd.

AdonisJS został zbudowany z myślą o developerach i jest idealny dla tych, którzy cenią sobie produktywność i elegancję kodu.

Typescript jest domyślnym wyborem dla framework'u, dodatkowo dobrze współpracuje z Inertią.

#### Koa.js

Ten nowoczesny framework webowy stworzony przez twórców `Express.js`, oferuje bardziej modularne podejście do tworzenia aplikacji w odróżnieniu do swojego prekursora.

Dzięki wykorzystaniu asynchronicznych funkcji i generatorów, pozwala on na bardziej zwięzły i czytelny kod.

Choć dla mnie, zbytnio przypomina on nadal Express'a.

#### NestJS

To stworzony przez rodaka Kamila Myśliwca - progresywny backend frameworkstworzony do pisania wysoce wydajnych, niezawodnych i skalowalnych aplikacji po stronie serwera, który zapewnia elastyczność dzięki skrupulatnie opracowanej modułowej architekturze.

Wprowadza on wysokiej jakości wzorce projektowe i sprawdzone rozwiązania do krajobrazu JS.

### Fullstack

#### Inertia

`Inertia` to nowe podejście do tworzenia klasycznych aplikacji internetowych opartych na serwerze, która umożliwia tworzenie w pełni renderowanych po stronie klienta aplikacji jednostronicowych bez złożoności, która jest dostarczana z nowoczesnymi SPA.

Inertia to nie framework, a raczej biblioteka przeznaczona do pracy z nimi. Inertia to taki jakby kleju, który łączy te frontend z backendem.

Wykorzystuje ona adaptery i obecnie posiada trzy oficjalne adaptery po stronie klienta (React, Vue i Svelte) oraz trzy adaptery po stronie serwera (Laravel, Rails i Phoenix [`to lubię`...]).

#### Meteor

`Meteor` to fullstack framework do tworzenia nowoczesnych aplikacji webowych i mobilnych, który zawiera kluczowy zestaw technologii do tworzenia aplikacji reaktywnych z połączonym klientem, narzędzie do budowania oraz wyselekcjonowany zestaw pakietów od Node.js.

Wykorzystuje technologię `data-on-the-wire`, co oznacza, że serwer wysyła dane, a nie HTML, a klient je renderuje i zapewnia pełną reaktywność stosu, dzięki czemu interfejs użytkownika płynnie odzwierciedla prawdziwy stan świata przy minimalnym wysiłku programistycznym.

#### NextJS

`NextJS` to bardzo popularny framework JavaScript oparty o React, który pozwala na tworzenie uniwersalnych aplikacji webowych, łączących renderowanie po stronie klienta i serwera.

Został stworzony przez firmę Vercel, Next.jsoferuje szereg funkcji, które ułatwiają tworzenie aplikacji przyjaznych dla SEO i optymalizowanych pod kątem wydajności.

Jedną z głównych jego zalet jest wsparcie dla server-side rendering (SSR) oraz statycznego generowania stron (SSG). Dzięki tym funkcjom, strony są renderowane na serwerze lub generowane w czasie kompilacji, co pozwala na szybsze ładowanie i lepszą widoczność w wyszukiwarkach.

## Pozostałe

### Go

W tym miejscu należy także wspomnieć o fakcie, że np. `Go` bardzo mocno rozpycha się z fullstackiem w postaci `Bud` czy `Beego` oraz `htmx'em`.

### Gleam

Innym wartym wspomnienia są `Lustre` oraz `Wisp` do `Gleam`'a, gdzie sam `Gleam` jako język z rodziny `BEAM` (`Erlang` tak jak w przypadku `Elixira`) - potrafi kompilować się do JS'a.

### Rust

Tu chyba nie mam ochoty się nadmiernie rozpisywać, gdyż jestem zdania, że używanie `Rusta` w web developmencie to jak bombardowanie epicentrum pandemii Eboli z pomocą broni jądrowej.

Niby można, ale czy jest sens używania języka do programowania systemowego do takich rzeczy? Tu mam spore wątpliwości.

## Konluzja

Generalnie każdy z framework'ów czy ekosystem'ów ma swoje plusy i minusy, każdy jest interesujący (na swój sposób i w mym mniemaniu).

Fakt czy będę przeskakiwał między ogólnymi framework'ami web'owymi czy mieszał je w postaci np. Elixir i React czy Rails'y wraz Vue albo Laravel i Livewire - to już: inna para kaloszy.

To są tylko narzędzia, które albo ułatwią mi albo utrudnią tworzenie backend i frontend'u.

Natomiast wiem jedno - by wrócić do front'u muszę pogodzić się z CSS'em i framework'ami do niego i zacząć tworzyć w Nim dobrze wyglądające `UI`.

Choć na ten moment mogę zdradzić, że w mej opinii bardzo kuszącym w tym przypadku jest albo minimalistyczny `Svelte` wraz `backendem` napisanym w `Ash'u`, lub po prostu fullstack w `NextJS`.

## Źródła

- [TailwindCSS](https://tailwindcss.com)
- [daisyUI](https://daisyui.com/)
- [Ripple UI](https://www.ripple-ui.com/)
- [Sira](https://sira.riazer.com/)
- [Flowbite](https://flowbite.com/)
- [Preline UI](https://preline.co/)
- [Laravel](https://laravel.com/)
- [Livewire](https://livewire.laravel.com/)
- [frankenPHP](https://frankenphp.dev/)
- [Ruby on Rails](https://rubyonrails.org/)
- [Hotwire](https://hotwired.dev/)
- [Hotwire @ Hotrails](https://www.hotrails.dev/)
- [Hotwire @ Community Driven Docs](https://www.hotwire.io/frameworks/rails)
- [Phoenix](https://www.phoenixframework.org/)
- [Ash](https://ash-hq.org/)
- [AshJsonApi](https://hexdocs.pm/ash_json_api/getting-started-with-ash-json-api.html#installing-ashjsonapi)
- [Nodejs](https://nodejs.org/en)
- [Bun](https://bun.sh/)
- [Deno](https://deno.com/)
- [AdonisJS](https://adonisjs.com/)
- [Koa.js](https://koajs.com/)
- [NestJS](https://nestjs.com/)
- [Inertia.js](https://inertiajs.com/)
- [Meteor](https://www.meteor.com/)
- [NextJS](https://nextjs.org/)
