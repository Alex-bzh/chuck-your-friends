// main.js
let app = new Vue({
    el: '#app',
    data: {
        joke: null,
        firstName: null,
        lastName: null
    },
    mounted() {
        // Retrieves a fact
        this.fetchJoke();
    },
    computed: {
        /*
        *   Changes on the fly the first and last names
        *   of Chuck Norris by those entered by the user.
        */
        chucking() {
            let chucked = this.joke;
            if (this.firstName) {
                chucked = chucked.replace(/Chuck/i, this.firstName, this.joke);
            }
            if (this.lastName) {
                chucked = chucked.replace(/Norris/i, this.lastName, this.joke);
            }
            return chucked;
        }
    },
    methods: {
        /*
        *   Fetches a fact from the Chuck Norris Fact API
        */
        fetchJoke() {
            let url = 'http://api.icndb.com/jokes/random';
            fetch(url)
                .then(stream => stream.json())
                .then(data => {
                    this.joke = data.value.joke;
                })
            ;
        }
    }
});