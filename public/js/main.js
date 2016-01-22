var app = angular.module('devblog', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {

	$http.get('http://b-boys.xyz/api/post/all').success(function (data) {
		$scope.posts = data.data;
	});
}]);