angular.module("mainModule",[])
	.filter("removeHtml",function(){
		return function(texto){
			return String(texto).replace(/<[^>]+>/gm,'');
		}
	})
	.controller("filtersController",function($scope){
		$scope.mi_html = "<p>Hola Mundo</p>";
		$scope.json = {};
		$scope.json.title = "Practicando";
		$scope.json.body = "Repasando aprendiendo angulajs";
		$scope.costo = 2;
	})
