tinymce.init({
	selector: 'textarea'
});

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

$('#formEdit').submit(function (e) {
	$.ajax({
		method: 'POST',
		url: '/api/post',
		crossDomain: true,
		dataType: 'json',
		data: $(this).serialize(),
		success: function (data) {
			$('#formEdit')[0].reset();
		}
	});

	return false;
});

function showPage (pagename) {
	$('.page').hide();
	$('.page[data-name=\"' + pagename + '\"]').show();
}