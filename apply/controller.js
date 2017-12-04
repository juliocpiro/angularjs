angular.module("mainModule",[])
	.controller("filtersController",function($scope){
		$scope.nombre = "JCSAR";
		document.querySelector("#btnApply").addEventListener("click",function(){
			$scope.$apply(function(){
				$scope.nombre = "JPIRO";
				console.log($scope.nombre);	
			});
			
		});
	})
