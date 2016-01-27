<<<<<<< HEAD
var urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
};
=======
var urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
>>>>>>> 5ce46438271778bc321d1fdd38df95707c1fa519

$('form').submit(function () {
    var apiKey = urlParam('invitationKey');
    var data = $(this).serialize();
    data += '&apiKey='+apiKey;
	$.ajax({
		method: 'POST',
		url: '/api/register',
		crossDomain: true,
		dataType: 'json',
<<<<<<< HEAD
		data: data,
=======
		data: $(this).serialize() + '&apiKey=' + urlParam('invitationKey'),
>>>>>>> 5ce46438271778bc321d1fdd38df95707c1fa519
		success: function (data) {
			console.log(data);
			if (data && data.success) {
				window.location.replace('/login');
			}
		}
	});

	return false;
});