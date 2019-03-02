<h1>Thinking in React</h1>
These are some notes that helped me ingrain the basic concepts of React.

## Introduction

React is a javascript library to build fast and interactive user interfaces.
React is not a framework it handles only View part of the MVC framework.
Frameworks like Angular on other hand do everything in one package. With React 
we have to use other libraries like router, redux and so on.

We can use an easy to understand HTML like syntax in React called JSX. Babel 
can compile our JSX code into Javascript the browsers can understand. 

### Function context and THIS Keyword.

To put it simply the this keyword refers to the context(location). Hence inside 
a object method it refers to the object but inside a function it refers to the 
global context as the function is not binded to an object. The solution is to 
bind the function to the object you want to refer to. To be clear if the function
(containing this) is called from global scope then this context is global and if the 
function is called as a method of the object then its context is local, that is the 
context is the object.

### How to bind:
class Foo {
  constructor(name){
    this.name = name
    this.display = this.display.bind(this);
  }
  display(){
    console.log(this.name);
  }
}
var foo = new Foo('Kartik');
foo.display(); // Kartik
var display = foo.display;
display(); // Kartik

There are other ways to bind but binding inside constructor is preferable.
For more:https://reactjs.org/docs/handling-events.html








