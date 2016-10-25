var express = require('express');

var app = express();

app.get('/alice.md', function(req, res) {
	res.sendfile('alice.md');
});

app.get('/example.md', function(req, res) {
    res.sendfile('example.md');
});

app.get( '/menu.json' , function(req, res) {
	res.sendfile('menu.json');
});


app.listen(2000);