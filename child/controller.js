angular.module("MyFirstApp",[])
	.run(function($rootScope){
		$rootScope.nombre = "JCSAR";
	})
	.controller("FirstController",function($scope){
		$scope.nombre = "JC";
	})
	.controller("ChildController",function($scope){
		$scope.nombre ="JPIRO"
	})