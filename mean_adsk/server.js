// Define variables to hold all of the imported modules.
var express = require('express'); 
var mongoose = require('mongoose'); // Mongoose is an ORM for MongoDB
var bodyParser = require('body-parser'); // Middleware that parses JSON
var morgan = require('morgan'); // Middleware that logs HTTP requests to the console

var port = process.env.PORT || 8080; // Defining the port that we're going to be using
var app = express(); // Creating the application with express

app.use(express.static(__dirname + '/public')); // Sets the location of the static files that we'll be serving
app.use(morgan('dev')); // Logs every HTTP request to the console
app.use(bodyParser.json()); // Parses app

// CONNECT TO MONGO/MONGOOSE
mongoose.connect('mongodb://localhost/app');

// DEFINE MONGOOSE SCHEMA
var toDoSchema = new mongoose.Schema({ 
    text: {
        type: String, 
        default: ''}, 
    complete: {
        type: Boolean, 
        default: false} 
});

var QAcreatenumber = 1;
var QAretrievenumber = 1; 

var QASchema = new mongoose.Schema({
  id: {
    type: Number
  },
  text: {
    type: String,
    default: ''},
  ans1: {
    type: String,
    default: ''},
  ans2: {
    type: String,
    default: ''},
  ans3: {
    type: String,
    default: ''},
  ans4: {
    type: String,
    default: ''},
  Ans: {
   type: Number, 
   min: 1, 
   max: 4 
}
})


var QA = mongoose.model('QA',QASchema);

//QA.remove(function(err,removed) {
//  console.log("Number of Questions Removed: ", removed);
   // where removed is the count of removed documents
//});

QA.count(function (err, count) {
  if (err) console.log('there are %d jungle adventures', count);
  QAcreatenumber = count + 1 ;
});
// Setup the `/GET` route for `/api/quesions`
app.get('/api/questions',function(request,response){
  
  console.log("Retrieve Number now:",QAretrievenumber);
  console.log("Create Number now:",QAcreatenumber);
  
  if(QAretrievenumber < QAcreatenumber-1)
      QAretrievenumber = QAretrievenumber + 1; 
  else
      QAretrievenumber = 1;
  
  console.log("Retrieve Number after:",QAretrievenumber);
  
  QA.where('id').equals(QAretrievenumber).exec(
    function(err,question){
      // Error handling - if we receive an error from Mongo, send it back as a response. Nothing after res.send(err) will execute
        if (err) {
            response.send(err);
        }
        response.json(question)
        
  }
  );
})

// Set up the `/POST` route for `/apiquestions`
app.post('/api/verifyanswer', function(request, response){
    // Use Mongoose's .create() method to create a new item. 
    QA.where('id').equals(request.body.id).select('Ans').exec(
      function(err,question){
      // Error handling - if we receive an error from Mongo, send it back as a response. Nothing after res.send(err) will execute
        if (err) {
            response.send(err);
        }
        console.log("Question: %j",question);
        response.json(question)
        
  }
      );
  
});


// Setup the `/GET` route for `/api/quesions`
app.get('/api/allquestions',function(request,response){
  // Use Mongoose's .find() method to retrieve all todos from database
    QA.find(
      function(err, questions){
        // Error handling - if we receive an error from Mongo, send it back as a response. Nothing after res.send(err) will execute
        if (err) {
            response.send(err);
        }
        // If no error, respond with the todos as a json object
        response.json(questions);
    }
    );
})

// Set up the `/POST` route for `/apiquestions`
app.post('/api/questions', function(request, response){
    // Use Mongoose's .create() method to create a new item. 
    QA.create({
        // The text comes from the AJAX request sent from Angular.
        id: QAcreatenumber,
        text: request.body.text,
        ans1: request.body.ans1,
        ans2: request.body.ans2,
        ans3: request.body.ans3,
        ans4: request.body.ans4,
        Ans: request.body.Ans
        
  });
  
  QAcreatenumber = QAcreatenumber + 1;
  
  response.json("Question is created")
  
});






// DEFINE MONGOOSE MODEL
var ToDo = mongoose.model('ToDo', toDoSchema);

// Set up the `/GET` route for `/api/todos`
app.get('/api/todos', function(request, response){
    // Use Mongoose's .find() method to retrieve all todos from database
    ToDo.find(
      function(err, todos){
        // Error handling - if we receive an error from Mongo, send it back as a response. Nothing after res.send(err) will execute
        if (err) {
            response.send(err);
        }
        // If no error, respond with the todos as a json object
        response.json(todos);
    }
    );
});

// Set up the `/POST` route for `/api/todos`
app.post('/api/todos', function(request, response){
    // Use Mongoose's .create() method to create a new item. 
    ToDo.create({
        // The text comes from the AJAX request sent from Angular.
        text: request.body.text,
        complete: false
        }, function(err, todo){
            // Error Handling
            if (err) { 
                response.send(err); 
            }
            // Retrieve all Todos after creating another, in order to repopulate the entire list on the page
            ToDo.find(function(err, todos){
                if (err) {
                    response.send(err);
                }
                response.json(todos);
            });
    });
});

// Set up the `/DELETE` route for `/api/todos/:todo_id`
app.delete('/api/todos/:todo_id', function(request, response){
    ToDo.remove({
        _id: request.params.todo_id
    }, function(err, todo){
        if (err) {
            response.send(err);
        }
        // Retrieve all Todos after deleting one, in order to repopulate the entire list on the page
        ToDo.find(function(err, todos){
            if (err) {
                response.send(err);
            }
            response.json(todos);
        });
    });
});

// Set up the GET route handler for all otherwise unspecified routes. 
// This will render the HTML page.

app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(port); 
console.log("App listening on port: ", port);

