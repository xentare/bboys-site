var urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

$('form').submit(function () {
	$.ajax({
		method: 'POST',
		url: '/api/register',
		crossDomain: true,
		dataType: 'json',
		data: $(this).serialize() + '&apiKey=' + urlParam('invitationKey'),
		success: function (data) {
			console.log(data);
			if (data && data.success) {
				//window.location.replace('/login');
			}
		}
	});

	return false;
});