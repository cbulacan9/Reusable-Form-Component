var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/', urlencodedParser, function(req, res) {
	res.redirect('/');
})

app.listen(3000);