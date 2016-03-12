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


  }]);
