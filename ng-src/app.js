angular.module("CustomDirective",[])
.directive("myAutocomplete",function(){
	function rlink(scope,element,attrs){
		$(element).autocomplete({
			source : scope[attrs.myAutocomplete],
			select:function(ev,ui){
				ev.preventDefault();
				if(ui.item){
					scope.optionSelected(ui.item.value);
				}
			},
			focus :function(ev,ui){
				ev.preventDefault();
				$(this).val(ui.item.label);
			}
		});
	};
	return {
		link : rlink
	}
})
.directive("backImg",function(){
	return function(scope, element, attrs){
		attrs.$observe("backImg",function(value){
			element.css({
				'background' : 'url('+value+')',
				'background-position': 'center',
				'background-size': 'cover'
			});
		})
	}
})
.controller("AppCtrl",function($scope,$http){
	$scope.repos = [];
	$http.get("https://api.github.com/users/juliocpiro/repos")
		.then(
			function (response){
				console.log(response.data);
				$scope.posts = response.data;
				for (var i = response.data.length - 1; i >= 0; i--) {
					var repo = response.data[i];
					$scope.repos.push(repo.name);
				}
			},
			function (response){
				console.log(response);
			}
		);
	$scope.optionSelected = function(data){
		$scope.$apply(function(){
			$scope.main_repo = data;
		})
	}
})
