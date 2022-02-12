 
//  name spacing
 const movieApp = {};
       
// form element in variable
movie.movieApp.form = document.querySelector(`form`);
// method for even listeners

//  url and api key variables
 movieApp.apiURL = 'https://api.themoviedb.org/3/discover/movie';
        movieApp.apiKey = '4313ef3612655092b3c706f021f3d6bc';

// make method getData
        movieApp.getData = () => {
            const url =
                `${movieApp.apiURL}?api_key=${movieApp.apiKey}&vote_average.gte=2&vote_average.lte=5`;
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
        }
        apiCall.init = function () {
            apiCall.getData();
        }
        apiCall.init();