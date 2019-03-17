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

OOP Solution 2

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








