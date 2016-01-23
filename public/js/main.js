var app = angular.module('devblog', []);

app.controller('mainController', ['$scope', '$sce', '$http',  function ($scope, $sce, $http) {

	$http.get('/api/post/all').success(function (data) {
		$scope.posts = data.data;

		// unsanitize contents
		for (var i = 0; i < $scope.posts.length; i++) {
			$scope.posts[i].content = $sce.trustAsHtml($scope.posts[i].content);
		}
	});
}]);