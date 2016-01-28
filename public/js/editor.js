
$.fn.parseHref = function () {
	return this.attr('href').replace('#', '');
}

$('.page').hide();
if (window.location.hash) {
	console.log(window.location.hash);
	showPage(window.location.hash.replace('#', ''));
}

$('#navBar ul li a').click(function (e) {
	showPage($(this).parseHref());
});

function showPage (pagename) {
	$('.page').hide();
	$('.page[data-name=\"' + pagename + '\"]').show();
}

function showNotification (opts) {
	opts = opts || {};
	$('#notify').html(opts.msg || 'Something happened')
	.removeClass('good bad').addClass(opts.good ? 'good' : 'bad')
	.animate({
		padding: '10px',
		height: '20px',
	}, 200, function () {
		setTimeout(function () {
			$('#notify').animate({
				padding: '0px',
				height: '0px'
			}, 200);
		}, opts.timeout || 2000);
	});
}

$('#uploadForm').submit(function() {
	$(this).ajaxSubmit({
		error: function (xhr) {
			console.log(xhr);
		},

		success: function (response) {

			// call angular function to update images in tinymce
			var scope = angular.element('#mainController').scope();
			scope.$apply(function () {
				scope.updateImages();
			});

			showNotification({
				msg: response.msg,
				good: response.success
			});
		}
	});
	return false;
});
