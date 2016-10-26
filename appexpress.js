var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', function (req, res) {
  	res.send('Got a POST request');
});

app.post('/createArticle', function (req, res) {
  	res.send('Got a POST request');
	fs.writeFile('public/' + req.body.path, req.body.title + "\n" + req.body.content, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("Article créé !");
	});
});

app.listen(2000);


