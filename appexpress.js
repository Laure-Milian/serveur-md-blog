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

	console.log(req);
	console.log(req.body.title);

	// Créer un nouvel article 
	fs.writeFile('public' + req.body.path, req.body.title + "\n" + req.body.content, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("Article créé !");
		res.send('Got a POST request');
	});

	// Récupérer le menu
	fs.readFile('public/menu.json', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}

		// Transformer le menu string en objet
		var menu = JSON.parse(data);
		// Pousser les modifs dans l'objet
		menu.menu.push({path : req.body.path, title : req.body.titleForMenu});
		// Retransformer l'objet en string
		var str = JSON.stringify(menu);
		//Modifier le menu
		fs.writeFile('public/menu.json', str, 'utf8', function(err){
			if(err) {
				return console.log(err)
			}
			console.log("menu ok");
		});
	});
});

// Pour modifier article (page edit)
app.post('/modifyArticle', function (req, res) {

	fs.writeFile('public' + req.body.path, req.body.content, 'utf8', function(err, data) {
		if(err) {
			return console.log(err);
		}
	});

	res.send('Got a POST request POUR Modifier');
});




/*fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
     
    var result = data.replace(your-regex-or-text,replacement-text);
    fs.writeFile(filePath, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
});*/
app.listen(2000);


