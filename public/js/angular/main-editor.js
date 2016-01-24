var app = angular.module('devblogeditor', ['ui.tinymce']);

app.controller('mainController', ['$scope', '$http',  function ($scope, $http) {

	$scope.currentPost = {};
	$scope.settingsBeingUpdated = false;

	$scope.setCurrentPost = function (post) {
		$scope.currentPost = post;
	}

	$scope.updatePosts = function () {
		console.log('gets');
		$http.get('/api/post/all').success(function (data) {
			console.log(data);
			$scope.posts = data.data;
		});
	}

	$scope.submitForm = function () {
		console.log($scope.currentPost);
		$http({
			method: 'POST', 
			url: '/api/post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $scope.transformRequest,
			data: $scope.currentPost
		}).success(function (data) {
			console.log(data);
			showNotification({
				msg: data.msg,
				good: data.success
			});
			$scope.updatePosts();
		});
	}

	$scope.deletePost = function (post) {
		$http({
			method: 'delete',
			url: '/api/post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: $scope.transformRequest,
			data: post
		}).success(function (data) {
			showNotification({
				msg: data.msg,
				good: data.success
			});
			$scope.updatePosts();
		});
	}

	$scope.updatePosts();

	$scope.transformRequest = function (data) {
		var str = [];
		for (var p in data) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
		}
		return str.join('&');
	}

}]);
