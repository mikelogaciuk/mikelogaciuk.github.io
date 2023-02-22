---
layout: post
title: Go Notes - The Goofer Land
date: 2023-02-21
category: ["go", "golang", "handbook", "notes"]
---

![gonotes_header](/img/GOPHER_SHARE.png)

<!-- TOC -->

- [About](#about)
- [Setup](#setup)
- [Starting a project](#starting-a-project)
- [Standard libraries](#standard-libraries)
- [CLI](#cli)
- [Entry point and main package](#entry-point-and-main-package)
- [Basics](#basics)
  - [Variables declaration](#variables-declaration)
  - [Data types](#data-types)
  - [Type conversion](#type-conversion)
  - [Zero values](#zero-values)
  - [Variable printing](#variable-printing)
- [Pointers](#pointers)
- [Types declaration](#types-declaration)
- [The flow](#the-flow)
  - [If/else](#ifelse)
  - [Switch](#switch)
  - [For loops](#for-loops)
  <!-- TOC -->

## About

`Go` or so called `Golang` is a programming language developed in Google since 2007.

Authors of a language wanted to combine best parts of Python and C and take an advantage of multicore CPU's.

Go is easy to learn, multipurpose language, compiled and statically typed.

It has concise syntax which uses only 25 keywords.

Up to now (v1.20) those keywords are:

    break     default      func    interface  select
    case      defer        go      map        struct
    chan      else         goto    package    switch
    const     fallthrough  if      range      type
    continue  for          import  return     var

## Setup

In order to setup Golang on e.g. `Ubuntu`, we should do like this:

```shell
cd ~/Downloads
wget https://go.dev/dl/go1.16.linux-amd64.tar.gz
sudo tar -C /usr/lib/ -xzf go1.20.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

Now you can type:

```shell
$ go

Go is a tool for managing Go source code.

Usage:

        go <command> [arguments]

The commands are:

        bug         start a bug report
        build       compile packages and dependencies
        clean       remove object files and cached files
        doc         show documentation for package or symbol
        env         print Go environment information
        fix         update packages to use new APIs
        fmt         gofmt (reformat) package sources
        generate    generate Go files by processing source
        get         add dependencies to current module and install them
        install     compile and install packages and dependencies
        list        list packages or modules
        mod         module maintenance
        work        workspace maintenance
        run         compile and run Go program
        test        test packages
        tool        run specified go tool
        version     print Go version
        vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

        buildconstraint build constraints
        buildmode       build modes
        c               calling between Go and C
        cache           build and test caching
        environment     environment variables
        filetype        file types
        go.mod          the go.mod file
        gopath          GOPATH environment variable
        gopath-get      legacy GOPATH go get
        goproxy         module proxy protocol
        importpath      import path syntax
        modules         modules, module versions, and more
        module-get      module-aware go get
        module-auth     module authentication using go.sum
        packages        package lists and patterns
        private         configuration for downloading non-public code
        testflag        testing flags
        testfunc        testing functions
        vcs             controlling version control with GOVCS

Use "go help <topic>" for more information about that topic.
```

## Starting a project

In order to start coding, we need to install `Go`, for this you can use a little googling.

Next, just init a module and start coding:

```shell
cd repos && mkdir example && go mod init example && touch main.go
```

## Standard libraries

All standard libraries (which you can import into your code), can be found [here](https://pkg.go.dev/std).

## CLI

Standard `Go` CLI can be accessed via shell:

```shell
go
```

The commands are:

    bug         start a bug report
    build       compile packages and dependencies
    clean       remove object files and cached files
    doc         show documentation for package or symbol
    env         print Go environment information
    fix         update packages to use new APIs
    fmt         gofmt (reformat) package sources
    generate    generate Go files by processing source
    get         add dependencies to current module and install them
    install     compile and install packages and dependencies
    list        list packages or modules
    mod         module maintenance
    work        workspace maintenance
    run         compile and run Go program
    test        test packages
    tool        run specified go tool
    version     print Go version
    vet         report likely mistakes in packages

For more you can type:

```shell
go help
```

## Entry point and main package

Main package is initiated with a phrase:

```go
package main
```

Main entry point of an code, similar to languages like Kotlin, C, Java or C# goes into:

```go
package main

func main() {

}
```

In order to quick testing, compile on fly, we can use:

```shell
go run main.go
```

As you can imagine, we can build it with a command like:

```shell
go build main.go
```

## Basics

### Variables declaration

For variables declaration we use `var` for variables and `consts` for constants (you should know what it means).

```shell
var foo string // Without initialization.
var bar string = "I am an initialized variable."
quaz := "I am short hard declared variable." // Only inside functions.
```

### Data types

In `Go` we can find such data types as:

```go
package main

//String
var thisIsTheString string = "I am a string"


// Bool
var isItTrue bool = true
var isItRobot bool = false

// Numeric types (ripped from -> https://kps.hashnode.dev/learn-go-the-complete-course)
var i int = 404                         // Platform dependent
var i8 int8 = 127                       // -128 to 127
var i16 int16 = 32767                   // -2^15 to 2^15 - 1
var i32 int32 = -2147483647             // -2^31 to 2^31 - 1
var i64 int64 = 9223372036854775807     // -2^63 to 2^63 - 1
var ui uint = 404                       // Platform dependent
var ui8 uint8 = 255                     // 0 to 255
var ui16 uint16 = 65535                 // 0 to 2^16
var ui32 uint32 = 2147483647            // 0 to 2^32
var ui64 uint64 = 9223372036854775807   // 0 to 2^64
var uiptr uintptr                       // Integer representation of a memory address

// Floats
var fl32 float32 = 1.1333
var fl64 float64 = 4.5551

// Complex
var compl128 complex128 = 20 + 2
var compl64 complex64 = 10 + 46

// Array -> [n]T
var arry [5]int // where 5 is a length
var arr [4]string = [4]string{"a", "b", "c"}
var arrx [5]int = [5]int{3, 6, 8, 9, 99}

// Slices -> []T
var arrx []string
var s []int = []int{0, 1, 2, 3, 4, 5}

// Maps -> map[K]V
var receipts map[string]int
invoices := make(map[string]int)
documents := map[string]float64{
	"ZS123405/500/2023/12": 5600.12,
	"INV00033/322/2022/01": 999312.87,
	"COR00231/001/2016/11": 123.93
}
```

In case of integers, it is recommended to use an `int` if there is no other reason to use a specific signed or unsigned integers.

There are also two complex types, where for complex128 both parts (real and imaginary) are float64 and complex64 where real and imaginary are float32.

There are also two additional integer types: the `byte` (`uint8`) and `rune` (`int32`), which are simple aliases...

```go
package main

type byte = uint8
type rune = int32
```

### Type conversion

We can convert data types as easy as:

```go
package main

var inty int = 42
var f = float64(inty)
```

### Zero values

Quite opposite to other languages like Python or Ruby, the variables without an explicit initial values are given `zero value`.

For numbers the returned number will be `0`, while for booleans it will be `false` and `""` for strings.

### Variable printing

In order to print variables, we can use standard library `fmt`:

```go
package main

import "fmt"

var x string = "Hello <3"

func main () {
	fmt.Println("x")
}
```

Additionally, we can use `f-strings in Python` equivalent:

```go
package main

import "fmt"

var x string = "Mike"

func main () {
	fmt.Printf("Hello: %s", x)
}
```

As you can think, the `%s` is the annotation verb which tell how to format arguments.
And... as you can imagine there are few of them e.g.:

```xf
bool:                    %t
int, int8 etc.:          %d
uint, uint8 etc.:        %d, %#x if printed with %#v
float32, complex64, etc: %g
string:                  %s
chan:                    %p
pointer:                 %p
```

For more info you can visit [this](https://pkg.go.dev/fmt) place.

## Pointers

Pointers are variables that are used to store the memory address of another variable.

So if we declare variable of type int with pointer that points it as below:

```go
package main

import "fmt"

var x int = 1
p := &x
*p = 2
fmt.Println(x)
fmt.Println(p)
fmt.Println(*p)
```

It would give `2`, while `p` it self would return memory address and `*p` would return it's value..

## Types declaration

In `Go`, we can also declare already existing types as a base of new types.

```go
// This is tempconversion package
package tempconversion

type Celsius float64
type Fahrenheit float64

const (
    AbsoluteZeroC Celsius = -273.15
    FreezingC Celsius = 0
    BoilingC Celsius = 100
)
func CelsiusToFarenheit(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }
func FahrenheitToCelsius(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }
```

```go
package main

import "tempconversion"
import "fmt"

func main() {

}
```

![Gopher in the fire](/img/This_is_Fine_Gopher.png)

## The flow

### If/else

The `if/else` clause works quite similar to other languages.

The parentheses `()` around expression is not mandatory.

Sample if:

```go
package main

import "fmt"

func main() {
	var foo string = "xd"

	if foo == "abc" {
		fmt.Println("Correct")
	}
}
```

Another sample if:

```go
package main

import "fmt"

func main() {
	var numbs int = 666

	if numbs <= 333 {
		fmt.Println("Number is too low...")
    } else if numbs > 334 && <= 665 {
		fmt.Println("Number is kinda close...")
    } else if numbs >= 667 {
		fmt.Println("Seek lower...")
    } else {
		fmt.Println("Welcome to HELL.")
    }
}
```

Another way of doing this is if/else shorthand:

```go
package main

import "fmt"

func main() {
	if x:= 555; x > 444 {
		fmt.Println("Variable 'x' is greater than 444...")
    }
}
```

_Please note that there is no ternary operator in Go (e.g. like in Python: min = a if a < b else b)_

### Switch

Like in other languages, there a `switch/case` in `Go`:

```go
package main

import "fmt"

func main() {
    day := "wednesday"

    switch day {
    case "monday":
        fmt.Println("Back to Mordor...")
    case "friday":
        fmt.Println("It's weekend finally...")
    default:
        fmt.Println("I don't care.")
    }
}
```

There is also a shorthand version:

```go
package main

import "fmt"

func main() {
    day := "monday"

    switch day {
	case "monday":
		fmt.Println("Back to Mordor...")
		fallthrough
	case "friday":
		fmt.Println("It's weekend finally...")
	default:
		fmt.Println("I don't care.")
    }
}
```

_Please note the `fallthrough` keyword that is used to transfer control to the next case even though the current case might have matched._

### For loops

Basic loop in `Go` looks like this:

```go
package main

import "fmt"

func main() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
}
```

Keep in mind, that `basic loop` has three elements:

- init statement
- condition expression
- post statement

Taking loop above as an example, the first is `init statement` where we initiate starting point to `0`. Then we define `condition` where the loop iterates until `i` is below `10`.
Third is `post statement` which says that we the loop has to increment `i` everytime it loops over it.

Another example, are `for/range loops`:

```go
package main

import "fmt"

var arr [4]string = [4]string{"a", "b", "c"}
var arrx [5]int = [5]int{3, 6, 8, 9, 99}

func iterate(fw [4]int, fwx [5]int) {
	// Values
	for _, v := range fw {
		fmt.Printf("%d\n", v)
	}

	// Keys and values
    for i, v := range fwx {
        fmt.Printf("%d %d\n", i, v)
	}
}
```

```go
package main

import "fmt"

var runes []rune

for _, r := range "Hi, Mike" {
    runes = append(runes, r)
}

fmt.Printf("%q\n", runes) // "['H' 'i' ',' ' ' ' M' 'i' 'k' 'e']"
```

```go
package main

import "fmt"

func equal(x, y map[string]int) bool {
    if len(x) != len(y) {
        return false
    }
    for k, xv := range x {
        if yv, ok := y[k]; !ok || yv != xv {
        return false
        }
    }
    return true
}
```
