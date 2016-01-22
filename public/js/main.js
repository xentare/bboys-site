var app = angular.module('devblog', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {

	$http.get('/api/post/all').success(function (data) {
		$scope.posts = data.data;
	});
}]);