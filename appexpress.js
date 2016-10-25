var express = require('express');

var app = express();

app.use(express.static('public'));

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.listen(2000);
