angular.module("ToDoList",["LocalStorageModule"])
.controller("ToDoController",function($scope,localStorageService){
	if(localStorageService.get("angular-todolist")){
		$scope.todo = localStorageService.get("angular-todolist");
	}else{
		$scope.todo = [];	
	}
	$scope.addAct = function(){
		$scope.todo.push($scope.newActv);
		$scope.newActv = {};		
	};
	$scope.clean=function(){
		$scope.todo = [];
	}
	$scope.$watchCollection("todo",function(newValue,oldValue){
		localStorageService.set("angular-todolist",$scope.todo);
	});
})
