// Composant "Chuck"
Vue.component('chuck', {
	template: '\
		<div class="card m-auto w-20rem">\
			<img class="card-img-top" src="icon.png" alt="Card image cap" />\
			<div class="card-body">\
				<h4 class="card-title">Chuck Norris Fact</h4>\
				<p class="card-text"><q v-html="joke"></q></p>\
				<form>\
					<div class="form-group form-row">\
						<div class="col">\
							<input type="text" class="form-control" placeholder="First Name" id="firstName" v-bind:value="firstName" v-on:input="setFirstName($event.target.value)" />\
						</div>\
						<div class="col">\
							<input type="text" class="form-control" placeholder="Last Name" id="lastName" v-bind:value="lastName" v-on:input="setLastName($event.target.value)" />\
						</div>\
					</div>\
					<button type="submit" class="btn btn-danger" v-on:click="getJoke($event)">Roundhouse kick me!</button>\
				</form>\
			</div>\
		</div>',
	/*
	*	Données récupérées de l'API
	*	firstName et lastName servent à la liaison dynamique entre le formulaire et le texte de la joke
	*/
	data: function() {
		return {
			url: 'https://api.icndb.com/jokes/random',
			joke: 'Waiting to be roundhouse kicked…',
			firstName: '',
			lastName: '',
		};
	},
	/*
	*	Construction du composant au montage
	*/
	mounted: function () {
		this.$nextTick(function () {
			this.getJoke();
		});
	},
	methods: {
		// Pour récupérer un fact de l'API
		getJoke: function(event) {
			// Désactive le submit du formulaire
			if (event) {
				event.preventDefault();
			}
			var self = this;
			// Récupération des valeurs courantes du nom et du prénom
			var firstName = document.getElementById('firstName').value;
			var lastName = document.getElementById('lastName').value;
			// Restauration de l'état initial en dessous de trois caractères
			this.firstName = (firstName.length > 2) ? firstName : '';
			this.lastName = (lastName.length > 2) ? lastName : '';
			// Appel XHR
			var xhr = new XMLHttpRequest();
			// API permet de personnaliser le nom
			var url = (firstName != '' && lastName != '') ? self.url + '?firstName=' + firstName + '&lastName=' + lastName : self.url;
			xhr.open('GET', url);
			xhr.onload = function() {
				self.joke = JSON.parse(xhr.responseText).value.joke;
			}
			xhr.send();
		},
		setFirstName: function(value) {
			if (value.length > 2) {
				if (this.firstName == '') {
					var re = new RegExp('Chuck', 'g');
				} else {
					var re = new RegExp(this.firstName, 'g');
				}
				this.joke = this.joke.replace(re, value);
				this.firstName = value;
			}
		},
		setLastName: function(value) {
			if (value.length > 2) {
				if (this.lastName == '') {
					var re = new RegExp('Norris', 'g');
				} else {
					var re = new RegExp(this.lastName, 'g');
				}
				this.joke = this.joke.replace(re, value);
				this.lastName = value;
			}
		}
	},
});
// Elément Vue racine
var vm = new Vue({
	el: '#vm-chuck',
});