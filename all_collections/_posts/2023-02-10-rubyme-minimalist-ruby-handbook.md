---
layout: post
title:  Rubyme - My minimalist Ruby Handbook
date: 2023-02-09
category: ["ruby", "handbook", "notes"]
---

# rubyme

<!-- TOC -->
* [rubyme](#rubyme)
  * [Introduction](#introduction)
  * [Variables](#variables)
  * [Comments](#comments)
  * [Object methods](#object-methods)
  * [Dates](#dates)
  * [Loops](#loops)
  * [Conditionals](#conditionals)
  * [Methods](#methods)
  * [Object oriented programming](#object-oriented-programming)
    * [Interface inheritance](#interface-inheritance)
  * [Modules](#modules)
    * [Mixins (multiple inheritance)](#mixins--multiple-inheritance-)
  * [Exceptions and errors](#exceptions-and-errors)
  * [Notes](#notes)
<!-- TOC -->

## Introduction

Why I chosen `Ruby` as another backend language?

Well:

- Ruby syntax reminds me native language than any other programming language.
- It is full blown object oriented language, even more than Python (in my opinion).
- It has an elegant and clean syntax, with a great batteries included frameworks such us Rails or Sinatra, Sequel, Thor etc.

Head back to [contents](#rubyme).

## Variables

In `Ruby`, variables are declared using its name and content.

Since Ruby is a dynamic interpreted language, an interpreter sets types automatically depending on a data set in variable.

Ruby has data structures such as:

    booleans
    strings
    integers
    floats
    arrays (list)
    hashes (dictionary for e.g. in Python)
    arrays of hashes
    etc..

For printing (console log) we use keyword `puts 'Some text'` or `print('Some text')`.

There is also a shorthand of letter `p`:

```ruby
def start
  p 'Engine is on'
end
```

Types examples:

```ruby
# String
fruit = 'orange'
full_name 'Mikey Logan'

# Integer
magic_number = 89

# Float
tax_value = 0.23

# Booleans
does_exists = false
has = true

# Array
actors = [
  'Bruce Willis',
  'Pierce Brosnan',
  'Sean Connery',
  'Cristian Bale',
  'Sean Bean',
  'Will Smith'
]

# Hash
magic_numbers = {:one => 1, :two => 2, :three => 3}
settings = {
  :environment => environment,
  :host_name => hostname,
  :app => 'Freya'
}
country = {
  :name => 'Poland',
  :capital => 'Warsaw',
  :population => '38000000',
  :language => 'polish',
  :continent => 'Europe'
}

# Array of hashes
array_of_hashes = [
  {:user_id => 501, :role => 'Administrator'},
  {:user_id => 666, :role => 'CEO'},
  {:user_id => 333, :role => 'IT Architect'}
]
```

We can also convert variables into different types like below:

```ruby
123.to_s
'903'.to_i
'22.33'.to_f
```

Head back to [contents](#rubyme).

## Comments

In Ruby, comments are marked with `#` or `=begin` that ends with... `=end` - usually used for multiline comments.

```ruby
# Single line comment

=begin
This
is
a
multiline
comment
=end
```

Go back to [contents](#rubyme).

## Object methods

Since everything in Ruby is an object, we can easily use builtin methods on all types of data structures.

```ruby
name = 'Alice'
concat = "I love #{name} <3"

# String methods
name.empty? # => false
'How long am I?'.length #=>
name.upcase
name.downcase
' Trim   me    please'.strip
'SERVERX001'.start_with?('SERVER')
'XOR'.gsub('X', 'S')
'I love Ruby'.include? 'Ruby'

# Number methods
magic_number = 89.02
magic_number.round
magic_number.floor
magic_number.ceil

# Array methods
manufacturers = ['Audi', 'Opel', 'Skoda', 'Fiat']
manufacturers = %w[Audi Opel Skoda Fiat]
manufacturers.length
manufacturers.last
manufacturers.first
manufacturers[1]
manufacturers[0..2]
manufacturers.include? 'Ferrari'
manufacturers.pop # remove last element
manufacturers.shift # remove first element
manufacturers.push 'Ferrari' # append at the and
manufacturers << 'Pagani' # append at the end
manufacturers.unshift # append at the start
manufacturers.delete_at(2) # delete third element

# Hash methods
product = {}
product[:name] = 'Intel i5-12600K CPU'
product[:price] = 1599.00
product.keys
product.values

product.each do |key, value|
  puts key
  puts value
end
```

Everything is well documented and behaves in a same way as in any other high-level languages.

Go back to [contents](#rubyme).

## Dates

```ruby
Time.now.utc   
Time.now.to_i

now = Time.now  
now.year   
now.month  
now.day     
now.hour    
now.min     
now.sec     
now.sunday?
```

Time formatting:

```ruby
now.strftime("%Y-%m-%d") # => '2020-01-01' 
```

Snippet:

    %d    Day of the month (01..31)
    %m    Month of the year (01..12) Use %-m for (1..12)
    %k    Hour (0..23)
    %M    Minutes
    %S    Seconds (00..60)
    %I    Hour (1..12)
    %p    AM/PM
    %Y    Year
    %A    Day of the week (name)
    %B    Month (name)

Go back to [contents](#rubyme).

## Loops

In Ruby, there are two extremely native looking keyword, which resemble the native language:

    unless
    until

Example:

```ruby
# Until loop
cars = 0
until cars == 10
  cars += 1
end

# Unless loops
x = 1
y = 666

unless x >= y
  puts "Warning! X: #{x} is less than Y: #{y}."
end
```

There are also more `common` loops:

```ruby
# While loop
foo = 666
while foo < 999
  puts foo
  foo += 1
end
```

Or:

```ruby
# Simple unconventional loop
for i in 1..100
  next if i % 2 == 0
  puts i
end
```

Ruby style loop:

```ruby
# Simple Ruby loop
(1..100).each { |i|
  next if i % 2 == 0
  puts i
}
```

Another example of loop in Ruby is:

```ruby
9.times { puts "Hello World" }
```

Break loop:

```ruby
# Break loop
numbers = [1,2,4,9,12]
numbers.each do |n|
  break if n > 10
  puts n
end
```
Go back to [contents](#rubyme).

## Conditionals

Simple `if-else` statement:

```ruby
a = 10
if a == 10
  puts 'Number equals to .'
elsif a < 10
  puts 'Number is less than 10.'
else
  puts 'Number is higher than 10.'
end
```

Simple `case` statement:

```ruby
# In Ruby, you can use case statement instead of if-elsif-else loop
secret_number = 444

case
when secret_number < 333
  puts "You are not even close..."
when secret_number > 666 && secret_number < 668
  puts "You've almost touched it..."
when
secret_number == 666
  puts "You found the devil."
else
  puts "Oh my gosh... guess that god damn evil number..."
end
```

Ternary operator:

```ruby
# If oneliner aka ternary operator
puts 40 > 100 ? "Greater than" : "Less than"
```

Negated if (unless):

```ruby
puts 'Database connection is not set.' unless database.isactive? == true
```

Ruby short if:

```ruby
num = 2
puts "This number is even!" if num % 2 == 0
```

Go back to [contents](#rubyme).

## Methods

In Ruby, the combined comparison operator, <=>, also known as the spaceship operator is used to compare two objects.
It returns 0 if the first operand equals the second, 1 if the first operand is greater than the second, and -1 if the first operand is less than the second.

```ruby
puts "Freya" <=> "Alice"

puts 4 <=> 6
puts 666 <=> 6
```

In Ruby, there is no need to use `return` keyword at the end of method.

Interpreter automatically evaluates last statement in block as a method return (implicit return):

```ruby
require 'socket'

def hostname
  Socket.gethostname
end

# Interpreter automatically returns the last evaluated expression.
def tax_value(product_price, tax_value)
  product_price * tax_value
end

puts tax_value(1000, 0.17)
```

For methods without parameters, there is no need to use `()`:

```ruby
foo = hostname 
```

Another example:

```ruby
def greeting
  puts "Hello world!"
end

greeting
```

Method with input:

```ruby
def count_tax(income, tax_value)
  # Tax value must be double/float
  result = income + (income * tax_value)
end
    
shop_item_value = 1000
eligible_tax = 0.19
puts count_tax(shop_item_value, eligible_tax)
```

Lambdas:

```ruby
# Ruby Lambda Methods
add = lambda { |x,y| x + y }
sub = lambda { |x,y| x - y }

def math(method, x, y)
  method.call(x,y) * 2
end
```

In Ruby, the `yield` keyword is used to transfer control from a method to a block and then back to the method once executed.

```ruby
def yield_test
  puts "I'm inside the method."
  yield
  puts "I'm also inside the method."
end

yield_test { puts ">>> I'm butting into the method!" }
#Output
# I'm inside the method.
# >>> I'm butting into the method.
# I'm also inside the method.
```

Go back to [contents](#rubyme).

## Object oriented programming

Ruby is a pure object-oriented language, where every value in Ruby is an object, even the most primitive things: strings, numbers and even true and false.

Classes can be declare using:

```ruby
class Warehouse

end

wa01 = Warehouse.new
```

Simple class:

```ruby
class Car
  def initialize(brand, model, type)
    @brand = brand
    @model = model
    @type = type
  end
end

audi_s6 = Car.new('Audi', 'S6', 'sedan')
```

Private methods:

```ruby
class Locomotive
  def initialize(brand, model, type, axes)
    @brand = brand
    @model = model
    @type = type
    @axes = axes
  end

  private
  def is_freight?
    true if @axes > 6 and @axes < 10
  end
end

eu07 = Locomotive.new('Pafag', 'EU07', 'electic', 6)
```

Inheritance in Ruby is quite simple, but you need to take in mind:

    The initialize method is also inherited when creating a child class.
    Any method can be subscribed in a child class in order to custom it by defining a method with the same name.

Inheritance example:

```ruby
class MultipleUnit < Locomotive
  def initialize(brand, model, type, axes, allowed_passengers)
    @brand = brand
    @model = model
    @type = type
    @axes = axes
    @allowed_passengers = allowed_passengers
  end

  private
  def is_freight?
    false
  end
end
```

Simple class with class variable:

```ruby
# In Ruby, class variables are attached to the class in which they are declared. A class variable should be declared with two @ symbols preceding it.
class Store
  @@stores = 0

  def initialize(store, city, voivodeship, county, population)
    @store = store
    @city = city
    @voivodeship = voivodeship
    @county = county
    @population = population
    @@stores += 1
  end

  def self.stores_count
    return @@stores
  end

  def is_town?
    puts @population <= 20000 ? true : false
  end
end

store_a = Store.new("F001", "Zlotow", "Wielkopolskie", "zlotowski", 18000)
store_b = Store.new("F004", "Pila", "Wielkopolskie", "pilski", 80000)
store_a.is_town?
store_b.is_town?
puts Store.stores_count
```

Instead of writing getters or setters manually:

```ruby
class Product
  # set
  def price=(value)
    @price = value
  end
  # get
  def price
    @price
  end
end
```

We can use `attr_reader` or `attr_writer` or combined `attr_accessor` keywords:

```ruby
class Product
  def initialize(name, price)
    @name = name
    @price = price
  end
  
  attr_reader :name   # Read only (getter)
  attr_writer :price  # Write only (setter)
  attr_accessor :name, :price  # Read and write
end
```

Or:

```ruby
class Product

  def initialize(product, name, group, net_price, minimal_price, tax)
    @product = product
    @name = name
    @group = group
    @net_price = net_price
    @minimal_price = minimal_price
    @tax = tax
    @gross_price = net_price + (net_price * tax)

  end

  attr_reader :product
  attr_accessor :net_price, :minimal_price, :tax, :gross_price

  def description
    puts "The product with code: #{@product}, has initial net price set to: #{@net_price} with tax: #{@tax}, which gives: #{@gross_price} gross price in total. "
  end

end

test_product = Product.new("123456", "LG34NW", "TVAXGLED", 1300.00, 1150.00, 0.23)
test_product.description
```

Ruby can be very flexible and elegant:

```ruby
class Attendee
  def initialize(height)
    @height = height
  end

  def issue_pass!(pass_id)
    @pass_id = pass_id
  end

  def revoke_pass!
    @pass_id = nil
  end

  def has_pass?
    true if @pass_id != nil
  end

  def fits_ride?(ride_minimum_height)
    @height >= ride_minimum_height ? true : false
  end

  def allowed_to_ride?(ride_minimum_height)
    true if @height >= ride_minimum_height && @pass_id != nil
  end
end
```

### Interface inheritance

Ruby allows two main types of inheritance:

    class inheritance 
    interface inheritance

Interface inheritance is used to isolate specific behaviours.

For thus, we use modules instead of classes:

```ruby
module Service
  def change_oil
    puts 'Oil has been changed.'
  end
  
  def renew_engine
    puts 'Engine has been renewed.'
  end
end

class DieselUnit < ElectricUnit
  include Service
  def initialize(brand, model, type, axes, allowed_passengers)
    @brand = brand
    @model = model
    @type = 'electric'
    @axes = axes
    @allowed_passengers = allowed_passengers
  end

  private
  def is_freight?
    false
  end
end
```

Go back to [contents](#rubyme).

## Modules

Modules allow us to separate certain parts of logic into tiny little pieces:

```ruby
module Driveable
  def message
    'The object is drivable'
  end
end

class Car
  include Driveable
end

class Tank
  include Driveable
end

Car.new.message
Tank.new.message
```

### Mixins (multiple inheritance)

Ruby does not support multiple inheritance directly, but Ruby Modules have another feature that eliminates the need for multiple inheritance, providing a facility called a mixin.

Mixins give you a way of adding functionality to classes:

```ruby
module Garage
  def g1
  end
  def g2
  end
end

module Warehouse
  def w1
  end
  def w2
  end
end

class Dock
  include Garage
  include Warehouse

  def d1
  end
end

example = Dock.new
example.d1
example.g1
example.g2
example.w1
example.w2
```

Go back to [contents](#rubyme).

## Exceptions and errors

Raising errors is kinda simple:

```ruby
# RuntimeError is implicit here
raise 'This is an exception'
```

```ruby
# Consistent with `raise SomeException, 'message', backtrace`.
raise SomeException, 'message'
```

```ruby
begin
  read_file
rescue Errno:ENOENT => ex
  handle_error(ex)
end
```

```ruby
# Exception handling
begin
  # E.g. ZeroDivision => 0 / 1
  0 / 1 
rescue
  # Will make this code to run
  puts "Exception"
  do_sth()
end
```

Go back to [contents](#rubyme).

## Notes

For further reading, e.g. style guide, please consider those two:

- [rubocop/ruby-style-guide](https://github.com/rubocop/ruby-style-guide)
- [airbnb/ruby](https://github.com/airbnb/ruby)
