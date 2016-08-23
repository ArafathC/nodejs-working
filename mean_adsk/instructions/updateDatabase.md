# Allow Updates to Todo Items

Create, Read, Update, and Delete [(CRUD)](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) are the four basic functions of persistent storage. Our application supports Creation, Read, and Deletion. This section will guide you through modifying the application in a way to support Updates to documents in the database. We'll enable two types of changes to the items in the database: marking them as complete, and changing their text.

On the HTML page, we'll update the view so that when a user clicks on a task, we hide the task text and replace it with a text input form. So, the HTML will contain the code for the task text AND the code for the input form, but the code for the input form will be hidden. We can use some logic to switch what elements are hidden. To the user, it will look like a seamless transition from plain text on the page to a form where they can edit that text.

We'll also change the functionality of the checkbox so that it allows the user to mark an item as completed. We will also add an additional button that allows the user to remove an item from the list.

After updating the HTML, we'll need to update the controller to handle those features. We'll add an `editTodo` function that will make an HTTP `PUT` request to the server. The function will grab the new text from the item on the page and send it to the server.

Finally, we need to create a new request handler on the server that will accept these `PUT` requests. In the request handler, we'll use a Mongoose function to update the database.

After these updates, your app will look like this: 
![](http://i64.tinypic.com/bgeclx.jpg)

### Updating the View

In the `ng-repeat` block, we're going to update the layout to include some elements that will be hidden by default.

The code should look like this:

      <div class="checkbox" ng-repeat="todo in todos">
        <input type="checkbox" ng-click="deleteTodo(todo._id)"> {{ todo.text }}
      </div>` 

Let's remove the `{{ todo.text }}` and create a new `<label>` element after the `<input>` tag. This label should contain the `{{ todo.text }}`.

      <label> {{ todo.text }} </label>

After the label element, let's add a `<span>` element that contains two elements, a [text input](http://www.w3schools.com/tags/tag_input.asp) and an [anchor tag](http://www.w3schools.com/tags/tag_input.asp). Your code should look like this:

      <div class="checkbox" ng-repeat="todo in todos">
        <input type="checkbox" ng-click="deleteTodo(todo._id)">
        <label> {{ todo.text }} </label>
        <span>
          <input type="text/>
          <a><a/>
        </span> 
      </div>

We're going to set this up so that when we click on the todo item's text (the label element), that element will become hidden. Use [ngClick](https://docs.angularjs.org/api/ng/directive/ngClick) and [ngHide](https://docs.angularjs.org/api/ng/directive/ngHide) to make this happen. 

      <label ng-click="editing = true" ng-hide='editing'>{{todo.text}}</label>

Now, if you refresh your page, you should be able to click on the text of a todo item and it will now hide that item. The `ng-hide` attribute will hide the element if the expression provided to it is true, so when we click on the item, it sets the value of the `editing` variable equal to true, effectively hiding the element.

We'll also use this `editing` variable to show some other elements to replace the recently hidden element. Let's add an [ngShow](https://docs.angularjs.org/api/ng/directive/ngShow) attribute to the `<span>` element so that it becomes visible when `editing` is true.

        <span ng-show="editing">
          <input type="text"/>
          <a><a/>
        </span>

Make sure the input element is correctly linked using the [ngModel attribute](https://docs.angularjs.org/api/ng/directive/ngModel). 

        <input type="text" ng-model="todo.text"/>

Let's give the anchor element a bootstrap class to give it an image. Head to the [glyphicons](http://getbootstrap.com/components/) page and pick one. Set the class attribute equal to that icon.

        <a class="glyphicon glyphicon-ok"></a>

Now when you click on the text label, it should appear that the text label has changed into an input box with an icon next to it. Now we have to add some logic so that when we click on the icon, it sends the new data to the server AND updates the HTML. So, let's add that to the anchor tag.

        <a data-ng-click="editing = false; editTodo(todo._id, todo.text)" class="glyphicon glyphicon-ok"></a>

When the user clicks on this icon, it will set the `editing` variable to false, hiding the `<span` element and displaying the `<label` element. It will also invoke a function in the `TodoController` (that we haven't built yet) that will send the data to the server and update the database.

### Updating the Controller

Add a new function to the controller that lives on the $scope object. It will be called `editTodo` and will use the [`$http.put(...)`](https://docs.angularjs.org/api/ng/service/$http#put) method to send a `PUT` request to the server. Reference the `$scope.deleteTodo` function to see how this works.

The `$http.put(...)` method will take two arguments. The first is the URL that contains the specific `todo_id`. The second argument is the data object.

The `editTodo` function you create will take two arguments `(todo_id, todo_text)`. Later, we'll refactor this function for both forms of updates (changing todo text and marking an item as complete).

Your code should look something like this:

        $scope.editTodo = function(todo_id, todo_text){
          // Concatenating a string to hold the URL for clarity
          var url = '/api/todos/' + todo_id;    
          // Using the PUT function, passing it the URL and the data object
          $http.put(url, {text: todo_text})
            .success(function(data){
              console.log("item", todo_id, "successfully updated");
              $scope.todos = data;
            })
            .error(function(error){
              console.error(error);
            });
        };

Let's go back to the `index.html` file and take a look at the HTML.

As it currently stands, we should be able to edit tasks on our page. Let's separate the functionality that removes items from the database from the checkbox and move it into another anchor tag. After the checkbox input element, add this element:

        <a data-ng-click="deleteTodo(todo._id)" class="glyphicon glyphicon-trash"></a>

Users can click on the trash can image and delete the task from the list. Now let's allow users to mark items as complete. We do this by doing three things:

Remove the functionality from the checkbox input element so that it stops deleting items. Let's add new functionality to the `ng-click` so that it edits the `complete` value on that `todo` object. 

        <input type="checkbox" ng-click="todo.complete = !todo.complete; editTodo(todo._id, todo.text, todo.complete)">

Update the `editTodo` function in the controller to accept the `todo.complete` value as the third argument. 
        
        $scope.editTodo = function(todo_id, todo_text, todo_complete){
          
          var url = '/api/todos/' + todo_id;    
          
          $http.put(url, {text: todo_text, complete: todo_complete})...

Use the [ngClass](https://docs.angularjs.org/api/ng/directive/ngClass) directive to conditionally set a class onto the element. We'll reference this class in our CSS file so that the text gets appears with a strikethrough to indicate that the item is complete.

        <label ng-click="editing = true" ng-hide='editing' ng-class="{complete: todo.complete}">{{todo.text}}</label>

### Updating the Server

Add a new request handler that accepts `PUT` requests to the `/api/todos/:todo_id` endpoint. This request handler will use the Mongoose [`findByIdAndUpdate(...)`](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate) function to make changes to a single todo item at a time.



