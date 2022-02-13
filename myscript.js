// name spacing
const movieApp = {};

    // url and apikey variables
    movieApp.apiURL = 'https://api.themoviedb.org/3/discover/movie';
    movieApp.apiKey = '4313ef3612655092b3c706f021f3d6bc';

    // form element in variable
    movieApp.form = document.querySelector('form');
    // method for event listener
    movieApp.formSubmit = function() {
        movieApp.form.addEventListener('submit', function(e) {
            e.preventDefault();

            const genre = document.getElementById('genre').value;
            movieApp.getData(genre);
        });
    };

    // make method getData()
    movieApp.getData = (genreID) => {
        const url =
            `${movieApp.apiURL}?api_key=${movieApp.apiKey}&vote_average.gte=2&vote_average.lte=5&with_genres=${genreID}`;
        // url.movie = new URLSearchParams({
        //     query: 'cat',
        //     api_key: apiCall.apiKey
        // });
        fetch(url)
            .then(function (data) {
                return data.json();
            })
            .then(function (response) {
                console.log(response);
            });
    };

    movieApp.init = function () {
        movieApp.formSubmit();
    }
    
    movieApp.init();