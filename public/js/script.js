var opts = {
	sliderSpeed: 400,
	pageSpeed: 400
};

$(function () {
	initProjectSlider();
	checkNavbarFixation();

	$.ajax({
		method: 'GET',
		url: '/api/post/all',
		dataType: 'json',
		success: function (data) {
			console.log(data);
		}
	});
});

function checkNavbarFixation () {
	if ($('body').scrollTop() > 50) {
		$('#navBar').addClass('fixed');
		$('#filler').css('display', 'block');
	}
}

function initProjectSlider () {
	$('#projects').css('width', $('.project').length * $('#projectSlider').width());
	$('.project').css('width', $('#projectSlider').width());
}

$('#btnPrevProject').click(function (e) {
	var scrollWrapper = $('#projectSlider #scrollWrapper');
	if (scrollWrapper.scrollLeft() >= 0) {
		var newScrollLeft = scrollWrapper.scrollLeft() - $('#projectSlider').width();
		newScrollLeft = newScrollLeft >= 0 ? newScrollLeft : scrollWrapper.width();
		scrollWrapper.animate({
			scrollLeft: newScrollLeft
		}, opts.sliderSpeed);
	}
});

$('#btnNextProject').click(function (e) {
	var scrollWrapper = $('#projectSlider #scrollWrapper');
	if (scrollWrapper.scrollLeft() <= scrollWrapper.width()) {
		var newScrollLeft = scrollWrapper.scrollLeft() + $('#projectSlider').width();
		newScrollLeft = newScrollLeft <= scrollWrapper.width() ? newScrollLeft : 0;
		scrollWrapper.animate({
			scrollLeft: newScrollLeft
		}, opts.sliderSpeed);
	}
});

$(window).resize(function () {
	initProjectSlider();
});

$(window).scroll(function (e) {
	console.log($(window).scrollTop());
	if ($(window).scrollTop() > 50) {
		$('#navBar').addClass('fixed');
		$('#filler').css('display', 'block');
	} else {
		$('#navBar').removeClass('fixed');
		$('#filler').css('display', 'none');
	}
});

$('ul li a').click(function (e) {
	var href = $(e.target).attr('href');
	href = href.replace('#', '');
	var target = $('[data-link=\'' + href + '\']');
	$('body, html').animate({
		scrollTop: target.offset().top - 70
	}, opts.pageSpeed);
});

$('form').submit(function () {
	$.ajax({
		method: 'POST',
		url: '/api/slack',
		crossDomain: true,
		dataType: 'json',
		data: $(this).serialize(),
		success: function (data) {
			$('form')[0].reset();
		}
	});

	return false;
});