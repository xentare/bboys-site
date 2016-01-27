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
			$scope.tempSettings = data.data;
			console.log(data);
		});
	}

	$scope.updateImages = function () {
		$http.get('/api/image').success(function (data) {
			$scope.images = [];
			for (var i = 0; i < data.data.length; i++) {
				$scope.images.push({
					title: data.data[i].title || 'undefined',
					value: data.data[i].path || 'asd'
				});
			}

			$scope.tinymceOptions = {
				plugins: 'image',
				image_list: $scope.images
			};

			$scope.$broadcast('$tinymce:refresh');
		});
	}

	$scope.updateSettings = function () {
		console.log($scope.tempSettings);
		$http({
			url: '/api/user/current',
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: $scope.tempSettings,
			transformRequest: $scope.transformRequest
		}).success(function (data) {
			showNotification({
				msg: data.msg,
				good: data.success
			});
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

            $http.post('/api/slack/blog',{
				data: $scope.currentPost,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				transformRequest: $scope.transformRequest
            });
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
	$scope.updateImages();

}]);

