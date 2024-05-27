---
layout: post
title: Hash'owanie haseł w .zshrc
date: 2024-05-01
category: ["linux", "passwords", "good", "practises"]
---

![raccoons](</img/OIG2%20(1).jpeg>)

## Wstęp

Jeszcze do niedawna, jednym z sugerowanych rozwiązań na przechowywanie haseł w Linuxie w postaci np. kluczy do API - było używane czystego tekstu w `.zshrc`.

Dziś wiadomo, że mimo szyfrawnia dysków - nie jest to najlepszy pomysł.

W tej sytuacji na ratunek przychodzi Nam standardowy Unix'owy password manager o mało kreatywnej nazwie: `pass`.

## Zależności

Pakiet instalujemy prz pomocy:

```shell
sudo apt update && sudo apt install pass -y
```

## GPG

Na początek musimy wygenerować swój klucz GPG, którego użyjemy przy inicjalizacji `credential store'u` w **Pass'ie**:

```shell
gpg --full-generate-key
```

Po wybraniu stosownych opcji, prompt poprosi Nas o utworzenie hasła do klucza, następnie zgodnie z poniższym musimy odszukać key id.

Jeżeli klucz już posiadamy, to potrzebujemy wylistować ich listę:

```shell
gpg --list-secret-keys --keyid-format=long
```

Klucz powinien być podobny do tego:

```shell
66644X73F79...82ABD6DD8B
```

## Pass

Następnie inicjalizujemy `credentials store` dla Naszych haseł:

```shell
pass init 66644X73F79...82ABD6DD8B
```

Powinniśmy otrzymać informację: `Password store initialized for 6644X73F79...82ABD6DD8B`.

## Dodawanie haseł

Aby dodać hasło, używamy komendy:

```shell
pass insert App/Foo
```

Gdzie _App_ to Nasza grupa, a _Foo_ to nazwa aplikacji:

```shell
mkdir: created directory '/home/USER/.password-store/App'
Enter password for App/Foo:
Retype password for App/Foo:
```

Gdy wykonamy `cat'a` na nowo utworzonym pliku, dostaniemy zwrotnie zaszyfrowane hasło:

```shell
$ cat .password-store/App/Foo.gpg
J@a^%6+Y4Fq8d.,YwR0 2)f:sud <ZnXܼT e?	f̂g^WP!9Ҷ!:oǎR[pU
                                                        |m.Z	%
```

## Odczyt haseł

W celu odczytu, wykonujemy proste:

```shell
$ pass show App/Foo
123
```

## Ładowanie haseł do zmiennych

Teraz dla bezpieczeństwa zabezpieczamy swój `.zshrc`:

```shell
chmod 600 ~/.zshrc
```

A do pliku dodajemy przykładowo:

```shell
export Foo="$(pass show App/Foo)"
```

Następnie, na spokojnie będziemy mogli wywołać swoje hasło poprzez:

```shell
echo $Foo
```

I użyć go do np. uruchomienia aplikacji, kontenera etc.
