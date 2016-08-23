# Project Structure, Server Setup and Database Setup
This part of the workshop should take no more than 60 minutes. If you find yourself stuck on any one step for more than 10 minutes, ask for help.

##What we'll cover in this section
+   [Package.json and Installing Dependencies with NPM](#packagejson-and-installing-dependencies-with-npm)
+   [Node/Express Configuration](#nodeexpress-configuration)
+   [Connect to database](#connect-to-database)
+   [Define schema](#define-schema)
+   [Define model](#define-model)

##Package.json and Installing Dependencies with NPM

`package.json` is used to configure the [npm](https://docs.npmjs.com/getting-started/what-is-npm) package manager. We can list dependencies and set up commands in this file. 

If you haven't already, run the following command:

    npm install 

npm will check `package.json` and install Express and Mongoose. You should now see a file structure in your terminal that looks like this: 

![](http://i68.tinypic.com/10hr8mq.jpg)

## Node/Express Configuration
In `package.json`, `server.js` is set as our `main` file. This is where we will configure the entirety of our back-end. The back-end will perform the following tasks for our app: 
* Connect to our MongoDB database
* Create our Mongoose database model
* Define routes for our [API](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=what%20is%20an%20api)
* Define routes for our Angular app

In this course, we'll be building our back-end in one file. For extra credit, you can separate your files into a more modular file structure that is typically used in production applications.

At the top of `server.js`, you should see the code that imports the modules we'll be using to build our application:

```javascript
// Define variables to hold all of the imported modules.
var express = require('express'); 
var mongoose = require('mongoose'); // Mongoose is an ORM for MongoDB
var bodyParser = require('body-parser'); // Middleware that parses JSON
var morgan = require('morgan'); // Middleware that logs HTTP requests to the console (for debugging)
``` 

You'll also see that we have some code that defines the port and defines use of middleware:

```javascript
var port = process.env.PORT || 8080; // Defining the port that we're going to be using
var app = express(); // Creating the application with express

app.use(express.static(__dirname + '/public')); // Sets the location of the static files that we'll be serving
app.use(morgan('dev')); // Logs every HTTP request to the console
app.use(bodyParser.json()); // Parses app
```

It's not super important that you understand all the details. But can you see some patterns around the use of the functions `require(...)` and `app.use(...)`?

###Connect to database
In this section, we want to connect to the database and set up a model. A model is a constructor function that will return an instance of a specially formatted object that is stored in the database. Mongoose is an abstraction layer between the server and the database that makes it easy to model objects using plain JavaScript.

In `server.js`, connect to Mongoose. Not sure how? Copy/paste or type the following code on the line under the appropriate comment. Comments in JavaScript often look like this `//Some comment text`:

```javascript
mongoose.connect('mongodb://localhost/app');
```

###Define schema
We need to define the variable `toDoSchema` that will be used to define the Mongoose schema (structure) of the ToDo object in the database. Add the following code to `server.js`, under the appropriate comment:

```javascript
var toDoSchema = new mongoose.Schema({ 
    text: {
        type: String, 
        default: ''}, 
    complete: {
        type: Boolean, 
        default: false} 
});
```

Let's take a minute to walk through this code.

We started by declaring a variable called `toDoSchema`...

```javascript
var toDoSchema 
```

... and then setting it equal to a `new mongoose.Schema({...})`...

```javascript
var toDoSchema = new mongoose.Schema({ 
```

... and inside of the function call, we passed it an object that defines the properties of that model: 

```javascript
// DEFINE MONGOOSE SCHEMA**:
var toDoSchema = new mongoose.Schema({ 
    text: {
        type: String, 
        default: ''}, 
    complete: {
        type: Boolean, 
        default: false} 
});
```

We haven't covered objects or for that matter properties, but see if you can identify the two properties, and their `types`.

###Define model
Now let's create a Mongoose model called `ToDo`:

```javascript
var ToDo = mongoose.model('ToDo', toDoSchema);
```

Here, we initialized a variable called `ToDo` and set it equal to `mongoose.model('ToDo', toDoSchema)`. The first argument to `mongoose.model(...)` is the name of the model, `'ToDo'`, and the second argument is the schema that defines the properties on that model, `toDoSchema`, which is the same schema you defined earlier. Mongoose automatically creates an `_id` for every instance of the `ToDo` object in the database.

Now is a good time to save `server.js`.

For more information: [Mongoose Connect](http://mongoosejs.com/docs/connections.html) | [Mongoose Models](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications#defining-a-model)

## Next Section

[Setting up routes](./branch1.md)