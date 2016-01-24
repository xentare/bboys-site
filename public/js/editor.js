
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