angular.module("ToDoList",["LocalStorageModule"])
.services('ToDoService',function(localStorageService){
	this.key = "angular-todolist";
	if(localStorageService.get(this.key)){
		this.activities = localStorageService.get(this.key);
	}else{
		this.activities = [];
	}
	this.add = function(newActv){
		this.activities.push(newActv);
		this.updateLocalStorage();
		return this.getAll();
	}
	this.updateLocalStorage = function(){
		localStorageService.set(this.key,this.activities);	
	}
	this.clean = function(){
		this.activities = [];
		this.updateLocalStorage();
		return this.getAll();
	}
	this.getAll = function(){
		return this.activities;
	}
	this.removeItem = function(item){
		this.activities = this.activities.filter(function(activity){
			return activity !== item;
		});
		this.updateLocalStorage();
		return this.getAll();
	}
})
.controller("ToDoController",function($scope,ToDoService){
	$scope.todo = ToDoService.getAll();
	$scope.newActv = {};
	$scope.addActv = function(){
		$scope.todo = ToDoService.add($scope.newActv);
		$scope.newActv = {};		
	};
	$scope.clean=function(){
		$scope.todo = ToDoService.clean();
	};
	$scope.removeItem = function(item){
		$scope.todo = ToDoService.removeItem(item);
	};
})
