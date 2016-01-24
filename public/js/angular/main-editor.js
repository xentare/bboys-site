var app = angular.module('devblogeditor', ['ui.tinymce']);

app.controller('mainController', ['$scope', '$http',  function ($scope, $http) {

	$scope.currentPost = {};
	$scope.settingsBeingUpdated = false;
	$scope.user = {};

	$scope.setCurrentPost = function (post) {
		$scope.currentPost = post;
	}

	$scope.updatePosts = function () {
		$http.get('/api/post/all').success(function (data) {
			console.log(data);
			$scope.posts = data.data;
		});
	}

	$scope.updateUser = function () {
		$http.get('/api/user/current').success(function (data) {
			$scope.user = data.data;
			console.log(data);
		});
	}

	$scope.submitForm = function () {
		var isnew = true;

		if ($scope.currentPost._id) {
			isnew = false;
		}

		$http({
			method: isnew ? 'POST' : 'PUT', 
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

	$scope.generateInvitation = function () {
		$http.get('/api/invite').success(function (data) {
			$scope.invitationKey = data.data;
			setTimeout(function () {
			$('#inputInviteKey').select();
			}, 100);
		});
	}

	$scope.transformRequest = function (data) {
		var str = [];
		for (var p in data) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
		}
		return str.join('&');
	}

	$scope.updatePosts();
	$scope.updateUser();

}]);
