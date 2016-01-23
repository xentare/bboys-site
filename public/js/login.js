$('form').submit(function () {
	$.ajax({
		method: 'POST',
		url: '/api/login',
		crossDomain: true,
		dataType: 'json',
		data: $(this).serialize(),
		success: function (data) {
			if (data && data.msg == 'Login succesfull') {
				window.location.replace('/edit');
			}
		}
	});

	return false;
});