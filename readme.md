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
context is the object, so it also depends on how the function is called.

### How to bind:
```javascript
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
```

There are other ways to bind but binding inside constructor is preferable.
For more:https://reactjs.org/docs/handling-events.html


### Why React needs a Root element?

Ans. React is all javascript so it needs an element where it can render out it's own DOM tree. Thats where the component get created.

### What is DOM?
Document Object Model is the representation of structured text in memory. so while HTML is text, the DOM is the in-memory representation of this text. Hence, you can have multiple DOM of the same HTML e.g. the same page loaded on many tabs.

Whenever we want to dynamically change the content of a webpage we modify the DOM.
(using getElementById , etc.)

HTML DOM is always tree structured. Which makes it slow to traverse.
Hence, the need of a virtual DOM, which is an abstraction of the DOM. It is basically React's local copy of the HTML DOM, so React can do all its computations inside its local world and don't need to worry about any browser specific and slow ways of computations.

A ReactElement is a light, stateless, immutable , virtual representation of a DOM element. These live in the virtual DOM. JSX compiles simple HTML tags into ReactElements.

On the other hand ReactComponents are stateful(we use createClass method to define the components). Whenever state changes, the component is rerendered. They don't have access to the VirtualDOM but are a great tool to create dynamic HTML, still they can be easily converted to ReactElements, which is the job of the diff algo. We want to minimize the no. of changes to the real DOM that is why we take this route.

Component is implemented as a JS class which has some state and a render().
Output of the render method is a simple react element. A react element maps or represents a browser DOM element.
Virtual DOM is a light weight representation of the real DOM which is cheap to create.
When we change the state of a component we get a new react element. React will then compare this element and its children with the previous version and figures out what has changed and then it will update a part of the browser DOM to keep it in sync with the virtual DOM.
So, basically we just change the state of our components and React will automatically update the DOM to match that state.

### Difference between state and props?
Ans. State is an internal variable of a component while props are external. Props are used to pass data from parent to child or a component itself---> Unidirectional data flow. Props enable us to write reusable components e.g. a Heading can be reused multiple times with a different  message through prop values passed to it by different components. Prop can not be modified inside the Heading component, a different version has to be passed down to it by different components. Props are can be passed as second argument of createElement() or  tag attributes in JSX.
A parents value of a state variable name becomes the childs this.props.name. From childs perspective the prop is immutable, if it needs to be changed it has to be changed as parents internal state.
However, there is a way for a child to request its parent to change its name prop through a callback or event like onNameChanged and the parent would subscribe to the event by passing a callback handler. The child would pass its new name as an arg to the event callback and parent would use the new name in the event handler.

Props are immutable that is why we have state to manipulate a component data using setState.
We can not update the props of a component using a method like we do for the state using handleIncrement()
The component that owns a piece of the state should be the one modifying it.

### What is global context?
Ans. It is a way to pass data down the component tree without having to pass props manually at every level. Some props might be required globally by many components throughout the app like locale and language preference. 
Context should be used sparingly as it  reduces reusability. Component composition is a simpler alternative when props have to be used through many levels but not all.

### Java question- How do you interact with web in Java?
Ans. We can use GWT Google Web Toolkit. It provides a layer of abstraction for web browsers so the developer can still develop the frontend in backend framework. A webpage is seen as an object oriented 
view as network of interconnected objects instead of a document. GWT java code is transpiled into Javascript which runs in browser. It can be compared to a framework like Angular which handles the MVC in browser. In MVC is separation of concerns like logic from design. Model layer is responsible for Database interaction(select,update, insert, delete). View is the UI layer usually HTML/css. Controller is responsible for receives input from using visiting a page or submitting a form requests like(get,post,put,delete). Gets data from the model and passes data to the view. It is middleman between model and view.

OOP in JavaScript Solution 2

function userCreater(name, score){
  const newUser = Object.create(functionStore);
  newUser.name = name;
  return newUser;
};

const functionStore = {
  increment: function(){this.score++;},
  login: function(){console.log("ur logged in!");}
};

const user1 = userCreater("Will", 3);
user1.increment();



Problem is access control because you can access the entire functionStore and print out all the functions.

JS first looks in object if it doesn't find increment it then looks in
functionStore as the object has a bond which points to a user defined 
functionStore or an inbuilt JS function store.

This is bond is made of chain dunder protos. _ _Proto_ _

Solution 3: new keyword automates return statement, creation of the object. We use the this keyword to refer to this new object as we never did the assignement.

We use the JS concept that every function is also an object.
Inside this object we have another object: prototype object.

function UserCreator(name, score){
  this.name = name;
  this.score = score;
}

UserCreator.prototype.increment = function(){this.score++};
UserCreator.prototype.login = function(){console.log("login");};

const user1 = new UserCreator("Will", 3);

user1.increment();

userCreator function is created also an object with a protype object
in Global Memory. then it doesnt find increment inside prototype so it
just creates that inside the prototype object.

Then on hitting the const user1 = new UserCreator("Will", 3); we 
create a new Execution context with its own local memory.
With a this object this.name = will and score:3. and dunder proto 
which points to userccreater's prototype in global.

Then user1.increment ccreates its own exe context with this.score++ ie 
user1.score++. it looks in lm for score then looks in global and increments it.

Solution 4 is the classes. Classes code is like Java classes.



>>>typeof operator in JS

`console.log(typeof 43);`
output: number

To check for object

`typeof bar === "object" is a reliable way of checking if `bar`
is an object!
```javascript
var bar = [];
console.log(typeof bar ==="object"); //output: true
```
To check if an object is actually an array we have to check its constructor.
```javascript
var bar = [];
console.log(typeof bar ==="object" && bar.constructor === Array); //output: true
```
In ES6:
```javascript
var bar = [];
console.log(Array.isArray(bar)); //output: true
```

But, JS also considers null an object. Gotcha!

```javascript
var bar = null;
console.log(typeof bar ==="object"); //output: true
```

Simply, check if bar is null to avoid this pitfall.
```javascript
var bar = null;
console.log((bar != null) && (typeof bar ==="object"); //output: false
```

types : undefined, object/null, boolean, number, string, symbol, function, NaN etc.
all types have to be put in double quotes for explicit comparison.

### How to make object properties immutable in JS.
Ans. using Object.defineProperty method.
Object.freeze makes the object immutable.
Object.seal - you can change the value of existing properties but can not add new properties.
```javascript
let profile = {
  name: 'panorama'
};

Object.defineProperty(profile, 'age',{
  value:3,
  writable: false
})

profile.name = 'wideshot';
profile.age = 4;
console.log(profile); //output: name: "wideshot", age:3
```
### How to remove duplicates in a Array.
```javascript
let nums = [1, 2, 2, 3];
console.log([...new Set(nums)]); // output: [1, 2, 3]
```
Above the spread operator converts the new set into an array.
In Java we can do this simply by adding the array to a hashset.

```java 
import java.util.*;
class Removedupes{
    public static void main(String[] args){
        int[] a = {1,2,2,3,4,1,1};
        HashSet<Integer> hs = new HashSet<Integer>();
        for(int i=0;i<a.length;i++){
            hs.add(a[i]);
        }
        System.out.println(hs);        
    }
}
```
This takes more memory to store the hashset. If asked to do a inplace removal then:



## let vs const
const means the variable can not be reassigned.
However, if the const stores an object it can be modified but not reinitialized.

Let scope is limited to the code block it is defined in.
var scope is limited to the function it is defined in.
If we declare var global variable it attaches to the window object which is very undesirable because your variable maybe overridden 
by external library we may use.But let global variable doesn't.

We can resolve this problem by wrapping in a automatically invoked anonymous function.

```javascript
(function() {
  //code here

}());

// another way to write
!function(){/*Code here */}();
~function(){/*Code here */}();
+function(){/*Code here */}();
```
If needed we can expose certain constructor like functions to outside world by passing a window variable in anonymous function.

```javascript
(function (window) ) {
  
  function Instance() {
  }
  window.Instance = Instance;
} (window));

//Then we can create multiple instances of our object

var instance1 = new Instance();
var instance2 = new Instance();
```
#### array.sort() in JS

It sorts the elements as strings instead of numbers.

const a = [1,2,15,30,5,45,7];
console.log(a.sort());
// output is [1, 15, 2, 30, 45, 5, 7]

Solution to sort in ascending order

console.log(a.sort((a,b)=> {
  return a-b;
}));

#### Closures in JS
Technically, any function where you are using variables defined outside the scope of the function is a closure.
Closure are the functions with preserved data.

```javascript
function addTo(passed) {
  function add(inner) {
    return passed + inner;
  }
  return add;
}

var add7 = addTo(7); // <-- we put in add7 the function 'add' with passed = 7

/* Because the addTo function returns it's inner function (return add;), what's exactly returning is a picture with this content:

function add(inner) {
	return 7 + inner;
}

We have assigned that 'picture' in add7, which has become effectively a function so now we can call it: */

console.log(add7(3)) // <-- this returns 10
```
Q. typeof undefined == typeof NULL
// returns true
Because NULL is not null. JS is case sensitive hence it understands NULL as userdefined variable which has not been defined yet.

#### Hoisting 
is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.

Hoisting mechanism only moves the declaration. The assignments are left in place.
In JavaScript, an undeclared variable is assigned the value undefined at execution and is also of type undefined.

console.log(variable); // Output: ReferenceError: variable is not defined

```javascript
function hoist() {
  a = 20;
  var b = 100;
}

hoist();

console.log(a); 
/* 
Accessible as a global variable outside hoist() function
Output: 20
*/

console.log(b); 
/*
Since it was declared, it is confined to the hoist() function scope.
We can't print it out outside the confines of the hoist() function.
Output: ReferenceError: b is not defined
*/
```

The following code returns undefined because hoist is hoisted up and declared before the call but the default value assigned to it is undefined.

```java
console.log(hoist); // Output: undefined

var hoist = 'The variable has been hoisted.';
```
Similarly if a variable is declared inside a function it will be hoisted upto function level hence it will reference to undefined if it is declared after being used.

```javascript
function hoist() {
  console.log(message);
  var message='Hoisting is all the rage!'
}

hoist(); // Ouput: undefined
```
If we enable strict mode : 'use strict';
then same code above will output
RefferenceError: hoist not defined

#### In es6 
```javascript
console.log(hoist); // Output: ReferenceError: hoist is not defined ...
let hoist = 'The variable has been hoisted.';
```
Hence, es6 is better at giving proper errors. If we used var then we will get undefined which obviously not what we expect.

Javascript lets us use functions before defining them by hoisting.

```javascript
hoisted(); // Output: "This function has been hoisted."

function hoisted() {
  console.log('This function has been hoisted.');
};
```
Q. To add element at start and end of array.

var myArray = [1,2,2,3,4];
myArray.push('end');
myArray.unshift('start');
console.log(myArray);

//["start", 1, 2, 2, 3, 4, "end"]

Q. How to clone an object?
Using Object.clone() is a pitfall.

We have to use Object.assign({}, myObj);

Q. var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();

// output is undefined not 21 because JS first checks local finds the hoisted value which is undefined.





















