angular.module("MyFirstApp",[])
.controller("FirstController",function($scope,$http){
	$scope.loading = true;
	$scope.posts = [];
	$scope.newPost = [];
	$http.get("http://jsonplaceholder.typicode.com/posts")
		.then(
			function (response){
				$scope.posts = response.data;
				$scope.loading = false;
			},
			function (response){
				$scope.loading = false;
			}
		);
})
