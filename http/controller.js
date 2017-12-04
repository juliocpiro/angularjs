angular.module("MyFirstApp",[])
.controller("FirstController",function($scope,$http){
	$scope.posts = {};
	$scope.newPost = {};
	$http.get("http://jsonplaceholder.typicode.com/posts")
		.then(
			function (response){
				$scope.posts = response.data;
			},
			function (response){

			}
		);
	$scope.addPost = function(){
		$http.post("http://jsonplaceholder.typicode.com/posts",{
			title : $scope.newPost.title,
			body : $scope.newPost.body,
			userId : 1
		})
			.then(
				function(response){
					console.log(response);
					$scope.posts.push(response.data);
				},
				function(response){
					console.log(response);
				}
			);
	}
})
