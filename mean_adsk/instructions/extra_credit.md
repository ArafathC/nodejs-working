#Extra Credit
If you're at this point, you've probably finished building our little ToDo web app in 1/4 or 1/2 the time we allotted. You're a [bad](https://www.youtube.com/watch?v=dsUXAEzaC3Q) a$$!

Your ToDo app is a pretty simple [SPA](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=single%20page%20application): it queries a database, lists the result of that query to a web page, allows you to add and delete items from the database, and that's about it. You've basically built an app that does CRD (Create, Read, Delete). 

##Requirement 1: Allow updates to existing items in the database

We'd like to see your app support [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). 

You'll need at a minimum to make changes to...
- Routes in `server.js`: add a new route to handle `PUT` requests 
- Add logic to handle updates in `TodoController`: create a function that makes `PUT` requests to the server
- Make changes to the front-end in `index.html`: Add conditional logic to handle the updating view

When you're done writing and testing your code, feel free to make a [pull request](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=how%20to%20make%20a%20pull%20request) to this repo.

[Further instructions for this requirement can be found here.](updateDatabase.md)

##Requirement 2: Sort and filter the items on the web page
We want [this](https://scotch.io/tutorials/sort-and-filter-a-table-using-angular) to all occur on the front-end in `index.html` using Angular.

When you've tested it out, submit a pull request.

##Requirement 3: Test the routes with Jasmine
Use [Jasmine](http://jasmine.github.io/2.4/node.html) to create BDD-style tests for your routes.

Per usual: pull requests wanted.

##Requirement 4: User authorization
1.  Implement simple [user authorization](https://www.sitepoint.com/user-authentication-mean-stack/)
2.  Implement [OAuth](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=oauth%20meaning)
3.  Implement an authentication [service](https://www.sitepoint.com/user-authentication-mean-stack/)

##Requirement 5: Improve application structure
- [Restructure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure) the app so it's more modular and easier to test.

Our application structure looks like this:

        - public         <!-- holds our front-end Angular files -->
        ----- main.js    <!-- Angular code -->
        ----- index.html <!-- main HTML view -->
        - package.json   <!-- npm configuration file -->
        - server.js      <!-- Backend Node file -->
        - instructions   <!-- Step by Step guide to building this application-->

Most of the time, we'll split out the functionality into related files. For instance, our server file would only contain code related to the structure of the server. We'd separate the routes and the database setup into other files.

This is a simple app so our folder structure won't get too crazy, but this is what it would probably look like if we were to modularize it out even further.

        - public/                 <!-- Holds our front-end Angular files -->
        ----- index.html          <!-- Main HTML view -->
        ----- styles.css          <!-- Styles page -->
        ----- js/
        ---------- main.js        <!-- Sets up the Angular module and injects the controllers -->
        ---------- controllers/
        --------------- TodoController.js
        - app/
        ----- routes.js           <!-- Defines the server routes-->
        ----- models/             <!-- Folder to contain files for the different models + schemas we're storing-->
        --------------- todo.js   <!-- todo model and schema -->
        - package.json            <!-- npm configuration file -->
        - server.js               <!-- Backend Node file -->
        - instructions            <!-- Step by Step guide to building this application-->

Angular encourages modularity by design. You can take code you wrote in one file and use it in another file. Having a modularized codebase is generally considered a good practice because it allows for better maintainability and [looser-coupling](https://en.wikipedia.org/wiki/Loose_coupling) of modules. [There are many ways to organize your Angular code file structure.](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)

