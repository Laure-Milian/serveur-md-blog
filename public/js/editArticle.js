(function() {

	var app = {

		endpoint : 'http://localhost:2000',
		
		init : function() {
			this.initialRequest();
		},


		// Pour récupérer les titres dans le select

		initialRequest : function() {
			$.ajax(this.endpoint + '/menu.json')
			.done(this.displaySelect)
			.fail(this.requestFail)
		},

		displaySelect : function(response) {
			var allArticles = response.menu;
			var len = allArticles.length;
			for (var i = 0; i < len; i++) {
				var optionSelect = '<option value="' + response.menu[i].path + '">' + response.menu[i].title + '</option>';
				$('#selectArticle').append(optionSelect);
			}
			app.listeners();
		},

		//Listeners boutons

		listeners : function(){
			$('#btnSelectArticle').on('click', this.getInfoArticle.bind(this));
			$('#btnModify').on('click', this.modifyArticle.bind(this));
		},


		// Récupérer toutes les infos concernant l'article
		getInfoArticle : function() {
			var pathSelectedArticle = $('select option:selected').val();
			$.ajax(this.endpoint + pathSelectedArticle)
			.done(this.displayInfoArticle)
			.fail(this.requestFail)
		},

		displayInfoArticle : function(response) {
			//Markdown converter (showdown)
			var converter = new showdown.Converter();

			// Pour afficher le titre
			var splitArticle = response.split("\n");
			var len = splitArticle.length;

			for (var i = 0; i < len; i++) {
				if (splitArticle[i].charAt(0) === '#' && splitArticle[i].charAt(1) === ' ') {
					var currentTitle = (splitArticle[i]);

					var currentConvertedTitle = converter.makeHtml(currentTitle);
					$('#displayCurrentTitle').html(currentConvertedTitle);
					var textTitle = $('h1').text();
					$('#inputNewTitle').val(currentTitle);
				}
			}

			// Pour afficher le contenu dans le textArea
			$('textarea').text("");
			for (var i = 0; i < len; i++) {
				if (splitArticle[i].charAt(0) !== '#' && splitArticle[i].charAt(1) !== ' ') {
					$('textarea').append(splitArticle[i] + "\n");
				}
			};

		},


		// Pour modifier le titre & le contenu

		modifyArticle : function() {

			var pathSelectedArticle = $('select option:selected').val();
			var newContentArticle = $('#inputNewTitle').val() + "\n" + $('#textAreaEdit').val();
			console.log(newContentArticle)

			$.post({
				url: this.endpoint + '/modifyArticle',
				dataType: 'html',
				data: {path: pathSelectedArticle, content: newContentArticle}
			})
			.done(this.requestDone)
			.fail(this.fail)
		},

		// Communs à toutes les requêtes Ajax

		requestDone : function() {
			console.log("requete envoyée");
		},

		requestFail : function() {
			console.log("failRequest"); // alert utilisateur
		}
	}



	app.init();
})();