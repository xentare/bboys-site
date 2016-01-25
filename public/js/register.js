$('form').submit(function () {
	$.ajax({
		method: 'POST',
		url: '/api/register',
		crossDomain: true,
		dataType: 'json',
		data: $(this).serializeArray().push($_POST['apiKey']),
		success: function (data) {
			console.log(data);
			if (data && data.success) {
				//window.location.replace('/login');
			}
		}
	});

	return false;
});