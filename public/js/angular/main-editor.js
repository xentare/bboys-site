var app = angular.module('devblogeditor', ['ui.tinymce']);

app.controller('mainController', ['$scope', '$http',  function ($scope, $http) {

	$scope.currentPost = {};
	$scope.settingsBeingUpdated = false;

	$http.get('/api/post/all').success(function (data) {
		$scope.posts = data.data;


	});

	$scope.setCurrentPost = function (post) {
		console.log(post);
		$scope.currentPost = post;
	}
}]);
