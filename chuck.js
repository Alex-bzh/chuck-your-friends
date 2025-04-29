let app = new Vue({
    el: '#app',
    data: {
        joke: null,
        originalJoke: null,
        name: ''
    },
    mounted() {
        this.fetchJoke();
    },
    computed: {
        chucking() {
            let chucked = this.originalJoke;
            if (this.name && chucked) {
                chucked = chucked.replace(/\bChuck Norris\b/g, this.name);
            }
            return chucked || '';
        }
    },
    methods: {
        fetchJoke() {
            let url = 'https://api.chucknorris.io/jokes/random';
            fetch(url)
                .then(stream => stream.json())
                .then(data => {
                    this.originalJoke = data.value;
                });
        }
    }
});
