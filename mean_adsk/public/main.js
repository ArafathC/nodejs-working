// The name of this module corresponds so the "ng-app" value in line 2 of the HTML
var todo = angular.module('todo', []);

todo.controller('TodoController', function($scope, $http) {
  $scope.formData = {};
  // USE $HTTP GET REQUEST TO GATHER ALL TODOS FROM THE DATABASE
  // SEND A GET REQUEST TO '/api/todos'
  
  // $scope.names = ['Hello','Hi','This','Is']
  $http({
    method: 'GET',
    url: '/api/todos'
    }).then(function successCallback(response){
        // Called asyncronously when the response is available, if no error
        $scope.todos = response.data;
        console.log("received data from the server:", response);
    }, function errorCallback(response){
        // Called asyncronously if an error occurs or the server returns
        // a response with an error status
        console.log("received an error from the server:", error); 
    });

  // WRITE A FUNCTION ON THE $SCOPE OBJECT THAT WILL CREATE A NEW TODO
  // IT WILL MAKE A POST REQUEST TO THE '/api/todos' ENDPOINT
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
        .success(function(data){
            $scope.formData = {};
            $scope.todos = data;
        })
        .error(function(error){
            console.log("Error:", error);
        });
    };
  // Manilpulate $scope to add the html for a new TODO
  

  // WRITE A FUNCTION ON THE $SCOPE OBJECT THAT WILL DELETE A TODO
  // IT WILL MAKE A DELETE REQUEST TO THE '/api/todos/:todo_id' ENDPOINT

  // Manipulate $scope to remove the HTML for a TODO
  $scope.deleteTodo = function(todo_id){
    $http.delete('/api/todos/' + todo_id)
        .success(function(data){
            $scope.todos = data;
            console.log("item", todo_id, "successfully deleted");
        })
        .error(function(error){
            console.log("Error deleting todo_id", todo_id, ": ", error);
        });
    }; 

});


var QA = angular.module('QA', []);

QA.controller('QAController', function($scope, $http) {
  $scope.formData = {};
  $scope.result = '';
  $scope.createQuestion = function() {
    $http.post('/api/questions', $scope.formData)
        .success(function(data){
            $scope.formData = {};
            $scope.result = data;
        })
        .error(function(error){
            console.log("Error:", error);
        });
    };
})


var QAR = angular.module('QAretrieve', []);

QAR.controller('QARetrieveController', function($scope, $http) {
  $scope.question = {};
  $scope.answerModel = {};
  $http({
    method: 'GET',
    url: '/api/questions'
    }).then(function successCallback(response){
        // Called asyncronously when the response is available, if no error
        $scope.question = response.data[0];
        $scope.answerModel.id = response.data[0].id;
        console.log("received data from the server:", response);
    }, function errorCallback(response){
        // Called asyncronously if an error occurs or the server returns
        // a response with an error status
        console.log("received an error from the server:", error); 
    });
  
  $scope.verifyAnswer = function() {
    $http.post('/api/verifyanswer', $scope.answerModel)
        .success(function(data){
            $scope.result = data[0];
            console.log("Selected: ",$scope.answerModel.answer);
            console.log("Answer: ",data[0].Ans)
            if($scope.answerModel.answer != data[0].Ans){
              $scope.AnswerMessage = "Correct Option is 4"
            }else{
              $scope.AnswerMessage = "You are right !!"
            }
        })
        .error(function(error){
            console.log("Error:", error);
        });
    };
  
})