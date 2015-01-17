var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.render("index.ejs",{})
});

app.listen(3000);