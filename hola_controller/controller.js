angular.module("MyFirstApp",[])
.controller("FirstController",function($scope){
	$scope.nombre = "Uriel";
	$scope.nuevoComentario = {};
	$scope.comentarios = [
		{
			comentario : "Bueno",
			username : "jpiro"
		},
		{
			comentario : "Malo",
			username : "jpiro"
		}
	];
	$scope.agregarComentario = function(){
		$scope.comentarios.push($scope.nuevoComentario);
		$scope.nuevoComentario = {};
	}
})
