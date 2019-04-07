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
context is the object, so it mostly depends on how the function is called.
##### Value of this is defined as object only when it is called as a method and not as an independent function.
```javascript
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
//Here the value of this inside makeUser() is undefined, because it is called as a function, not as a method.

function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
};

let user = makeUser();

alert( user.ref().name ); // John
//user.ref() is a method. And the value of this is set to the object before dot .
```
Example for how this flows and use of prompt function. The user is prompted for input and
calculations done on those values.
```javascript
let calculator = {
  sum(){ return this.a + this.b},
  mul(){return this.a * this.b},
  read(){
    this.a = +prompt('enter a', 0);
    this.b = +prompt('enter b', 0);
  }
};
calculator.read();
alert(calculator.sum());
alert(calculator.mul());
```
Below is the code demo for CHAINING multiple calls in sequence. We have to return the object in every method:

```javascript
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert( this.step );
    return this;
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```
Caveat in "use strict" the global object is undefined rather than window:
```javascript
function foo () {
	'use strict';
	console.log("Simple function call")
	console.log(this === window); 
}

foo();	//prints false on console as in “strict mode” value of “this” in global execution context is undefined.
```
Another Example:
```javascript
function foo () {
	'use strict';
	console.log("Simple function call")
	console.log(this === window); 
}

let user = {
	count: 10,
	foo: foo,
	foo1: function() {
		console.log(this === window);
	}
}
user.foo()  // Prints false because now “this” refers to user object instead of global object.
let fun1 = user.foo1;
fun1() // Prints true as this method is invoked as a simple function.
user.foo1()  // Prints false on console as foo1 is invoked as a object’s method
```
>>> Value of this is evaluated at runtime and can be anything depending how the function is called.

Arrow functions don't have their own this context they use the this of enclosing context.
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
Closure are the functions which can remember the previous run.
We can return functions as output of functions.
A closure is a function which remembers its outer variables and can access them. Functions in javascript automatically remember where they were created using a hidden scope chain property of every execution context and the scope chain is a collection of current context's variable object and all parent's lexical variable object.


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
Ans:Using Object.clone() is a pitfall.

We have to use Object.assign({}, myObj);

Q. var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();

// output is undefined and not 21 because JS first checks local finds the hoisted value which is undefined.

#### Execution Context

The JS interpreter in a browser is implemented as a single thread. Only one thing can exceute at a time.
All other actions or events are queued in a Execution stack. The browser by default loads in global execution context.
Now, if the global code calls a function then a new execution context is created and pushed to the top of the execution stack. 
If there is a nested inner function then again samething happens and a new execution context is pushed on top of the execution stack.
When current function is done executing then the current context is popped off and control is given to the next higher context. this happens until we reach global context again.
Hence, the execution stack is single threaded, synchronous execution with one Global Context.

Every call to an execution context has 2 stages:
1. Creation Stage(when fn is called but before any code inside is executed)
> Create Scope Chain
> Create variables, functions and arguments.
> Determine the value of "this".
2. Code Execution Stage:
> Assign values, references to functions and interpret/execute code.

Internally,
executionContextObject ={ scopeChain:{variableObject + all parent execution context's variableObject}
variableObject: { function args/params, inner variable and function declarations.}
this: {}
}

Step 1: Interpretor finds a function call.
Step 2: Before executing function code, it creates a new execution context.
Step 3: Enter creation stage: 
        *Initialize Scope chain
        *Create variable object:
          *Create arguments object, check context for params and create a property for variable name and value as per params.
          *Scan context for function declarations:
            *For each function found, create a property in variable object which is the function name having a reference pointer to the functionn in memory. Overwrite if function name already exists.
          *Scan the context for variable declarations:
            *For each variable declaration, create a property in variable and inititalize its value as undefined. Do nothing if property name already exists.
        * Decide the value of this inside the context.
Step 4: Run the code in context and assign variable values as the code is executed line by line.

Now, hoisting makes perfect sense, for example:
```javascript
(function() {

    console.log(typeof foo); // function pointer
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };

    function foo() {
        return 'hello';
    }

}());​
```   
We can access foo before we declare it as we know functions are created in the variable object first before variables.
Once, assigned we do nothing when the property name already exists when encounter the variable.
bar is undefined because variables are created in creation stage but initialized with value of undefined.
They are assigned real values in code execution phase when declaration line is encountered.
##### Temporal Dead Zone
ES6 variables let and const have a TDZ. When we enter scope of a let, a storage space for it is created in creation phase.
However, it remains uninitialised and causes a ReferenceError if we try to get or set it before its declaration.
When execution reaches its declaration then it is initialized by the assignment value. Const works similarly
but const must be assigned a value at declaration.
### Object Methods

obj.method();

these objects do the same

let user = {
  sayHi: function(){
    alert("Hello");
  }
};
This is shorthand and we can omit function and get same result. Behaviour might be different in inheritance.

let user = {
  sayHi(){
    alert("Hello");
  }
};

=========================================
General Frontend Questions
Q1. What are the most important tools for you?

Ans. It depends on the application, we have to use a tool according to what will get us more bang for our buck.
For me I really like to use a code editor like Sublime or VScode. Chrome dev tools are also essential for any project. Also version control like Github. I also like to use Bootstrap4 or UI kit for the prebuilt features. Modern libraries like React with webpack and npm are great tools for a frontend project.

Q2. What do you like about Node?
Ans. es6 support, async/await, generators
Also, the best thing is the LTS support so you can trust it long term.

Q3. What do you like about css features?
Ans. css grid

Q4. What do you like in javascript?
Ans. async/await, generators, es6 support, map/filter/reduce, Object.freeze, fetch, guarding, modules etc.

Q5. what is the most difficult part of a frontend project?
Ans. To make everything consistent in every browser. Choosing right tools for the job, avoid tech debt.

Q6. How to make a slow website fast?
Ans. Properly size images- have different image sizes of same image for different devices. Compress your images and text and code compression using browser supported content-encoding like gzip or brotli leads to faster load times for text based resources.
Inlining the css required for the page to load. page load will not be blocked by delay in download of main.css which can be large.
Adding progressive web app features like offline, add to home screen, push notifications is another way to make user interactions faster.
using browser profiling tools to investigate, and reduce the number of http calls and using vanilla javascript.

##### CSS Grid Layout

It is a 2D system which can handle both columns and rows. We work with the grid layout by applying CSS rules both to parent element(Grid Container) and to that elements 
children which are Grid items.
Tables, floats, positioning and inline-block are basically hacks and leave out important functionality(vertical centering, for eg)
Flexbox help to that extent but it is meant for simpler one-dimensional layouts, not complex 2D. Using Flexbox with Grid is a good idea though.

###### Get started:
1.Define a container element as grid with ```dispaly: grid``` and set column and row sizes with ```grid-template-columns``` and ```grid-template-rows```

2.Place the child elements into the grid with ```grid-column``` and ```grid-row```.
The source order of the grid items doesn't matter. The css can place them in any order.
Hence, we can change the layout of the entire page to accomodate a different screen size using couple lines of code.

######          Terminology

###### Grid container
The element on which display: grid is applied. It is the direct parent of all the grid items.

```html
<div class="container">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
</div>
```

###### Grid Item
The children of the grid container. In this example the items are grid items but sub-items is not.

```html
<div class="container">
  <div class="item"></div>
  <div class="item">
    <p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
```
###### Grid Line
The dividing lines that make up the structure of the grid. They can vertical or horizontal.

###### Grid Track
The space between two adjacent grid lines.

###### Grid Cell
The space between two adjacent column grid lines. It is the single unit of the grid.

###### Grid Area
specific area bound by row and columns grid lines. For example, grid area between row grid lines 1&3 and column grid lines 1&3.

###### CSS Terms - Digression!

Viewport is the area of the webpage visible to user. It will be smaller to a mobile user and larger for larger devices.

###### Setting the viewport

```css
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This will set the width of the page to follow the screen-width of the device.

initial-scale-1.0 sets the initial zoom level.

###### Responsive grid view before css grid c
1.Set the all html elements to have box-sizing property set to border-box

```css
*{
  box-sizing: border-box;
}
```
2. Then set column widths using css.

```css
.menu{
  width: 25%;
  float: left;
}
.main{
  width: 75%;
  float: left;
}
```

###### Media Query & Breakpoints
```css
@media only screen and (max-width: 600px){
  body{
    background-color: lightblue;
  }
}
```
Above it uses @media rule to include a block of css properties only if certain conditions are true. It will set the background color blue only if the size of the browser window is 600px or smaller.

```css
@media only screen and (max-width: 768px){
  /* For mobile phones : */
  [class*="col-"] {
    width: 100%;
  }
}
```
Above code sets all tags with class like col-1, col-2 etc. to 100% width...rather than having different set widths on a larger device.

Mobile first design means we should set the default width as the appropriate width for mobile and use a breakpoint to apply different widths for larger device.

Explicit and Implicit rows, columns and size properties.

Implicit properties we don't tell how many columns to show, we let the browser decide. The advantage is that we can need really less code to make the design responsive.
for example if we use the grid-template-areas: repeat(auto-fit, minmax(80px, 1fr))

What this tells the browser is "I would like you to make bunch of columns, I'm not gonna tell you how many to make, you decide how many to make. I want each of those columns to be a minimum of 80px and a max of 1fraction." So the moment there is another 80 px to have another column, browser adds another column. Or if there is not enough space subtract a column. And 1fr means that all columns will be same size of 1fr.

grid-auto-rows: how tall the rows should be.
grid-auto-flow: dense enables the browser to predict how to pack the items close to each other and not follow the order of numbering in html elements.








             





















