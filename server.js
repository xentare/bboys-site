var express = require('express');
var app = express();
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8080));

// View engine searches .ejs files from the specified 'views' folder
app.set('view engine', 'ejs');
app.set('views',__dirname + '/public/views');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

// just shitty remote connection, fix later
mongoose.connect('mongodb://bboy:qwe123asd@46.101.231.65:27017/bboysBlog'); 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', function (req, res, next) {
	console.log('asd');
	res.render('index.ejs');
	next();
});

require('./app/routes')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
 