var express = require('express');
var app = express();
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var err = require('./app/helpers/err');
var success = require('./app/helpers/success');
var cors = require('./app/helpers/cors');

app.set('port', (process.env.PORT || 8080));
app.set('view engine', 'ejs');
app.set('views',__dirname + '/public/views');

app.use(err);
app.use(success);
app.use(cookieParser());
app.use(cors);

mongoose.connect('mongodb://localhost/bboysBlog');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public')); 

require('./app/routes')(app);

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
 