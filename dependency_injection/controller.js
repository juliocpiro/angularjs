angular.module("MyFirstApp",[])
.controller("FirstController",["$scope",function(m){
	m.nombre = "Uriel";
	m.nuevoComentario = {};
	m.comentarios = [
		{
			comentario : "Bueno",
			username : "jpiro"
		},
		{
			comentario : "Malo",
			username : "jpiro"
		}
	];
	m.agregarComentario = function(){
		m.comentarios.push(m.nuevoComentario);
		m.nuevoComentario = {};
	}
}])
