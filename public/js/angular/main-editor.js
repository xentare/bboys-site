var app = angular.module('devblogeditor', []);

app.controller('mainController', ['$scope', '$http',  function ($scope, $http) {

	$http.get('/api/post/all').success(function (data) {
		$scope.posts = data.data;


	});
}]);