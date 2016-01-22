var express = require('express');
var app = express();
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 80));

app.set('view engine', 'ejs');
app.set('views',__dirname + '/public/views');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
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
	res.render('index.ejs');
	next();
});

app.get('/login', function (req, res, next) {
	res.render('login.ejs');
	next();
});

app.get('/blog', function (req, res, next) {
	res.render('blog.ejs');
	next();
});

app.get('/api', function (req, res, next) {
	res.render('api.ejs');
	next();
});

require('./app/routes')(app);

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
 