var express = require('express');
var app = express();
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var checkLogin = require('./app/helpers/checkLogin');

app.set('port', (process.env.PORT || 80));
app.set('view engine', 'ejs');
app.set('views',__dirname + '/public/views');

app.use(cookieParser());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

mongoose.connect('mongodb://localhost/bboysBlog');

// remote connection for developing
//mongoose.connect('mongodb://bboy:qwe123asd@46.101.231.65/bboysBlog');

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

app.get('/logout', function (req, res, next) {
	res.cookie('user', undefined);
	res.redirect('/login');
	next();
});

app.get('/edit', checkLogin, function (req, res, next) {
	res.render('edit.ejs');
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
 