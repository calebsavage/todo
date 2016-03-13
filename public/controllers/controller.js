var myApp = angular.module('todo',[]);

myApp.controller('AppCtrl',['$scope','$http',
  function($scope,$http){
    console.log("Hello World from da kontrollah");


var refresh = function(){
  $http.get("/todo").success(function(response){
  console.log("Got the data!!");
  $scope.todolist= response;
  $scope.item="";
    });
};

refresh();


$scope.addItem = function(){
    console.log($scope.item)

    $http.post('/todo', $scope.item).success(function(response){
      console.log(response);
      refresh();
    });


  };

$scope.edit = function(id){
  $http.get('/todo/' + id).success(function(response){
    $scope.item = response;
  });
};

$scope.update = function(id){
  $http.put('/todo/' + $scope.item._id, $scope.item).success(function(response){
    refresh();
  });
};

$scope.remove = function(id){
  $http.delete('/todo/' + id).success(function(response){
    refresh();
  });
};


$scope.setStatus = function(id, status){
  $http.put('/status/' + id + '/' + status).success(function(response){
    refresh();
  });
};


  }]);
