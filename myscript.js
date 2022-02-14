// name spacing
const movieApp = {};

    // form element in variable
    movieApp.form = document.querySelector('form');
    // method for event listener
    movieApp.formSubmit = function() {
        movieApp.form.addEventListener('submit', function(e) {
            e.preventDefault();

            const genre = document.getElementById('genre').value;
            movieApp.getData(genre);
            // to reset to random se
            // movieApp.form.reset();
        });

    };

    const randomNumber = (array)=>{
        const arrayIndex = Math.floor(Math.random() * array.length);
        return array[arrayIndex]
    }
    
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

                const movieArray = randomNumber(response.results);
                console.log(movieArray);

                // console.log(response.results[randomNumber(response.results)] );
                const overview = movieArray.overview;
                const poster = movieArray.poster_path;
                const voteAvg = movieArray.vote_average;
                const movieTitle = movieArray.title;
                const releaseDate = movieArray.release_date;
                const genreId = movieArray.genre_ids;
                const language = movieArray.original_language;

                const fullPoster = `https://image.tmdb.org/t/p/w300/${poster}`;

                const h3 = document.querySelector(`h3`);
                h3.innerHTML= movieTitle;


                // const genre = document.querySelector(`.genre`);
                // genre.innerHTML = 

                const rating = document.querySelector(`.rating`);
                rating.innerHTML = `Rating: ${voteAvg}/10`

                const description = document.querySelector(`.overview`);
                description.innerHTML = overview
                

                const languageP = document.querySelector(`.language`)
                languageP.innerHTML = `Original Language: ${language}`;

                const releaseDateP = document.querySelector(`.date`)
                releaseDateP.innerHTML = `Release Date: ${releaseDate}`;

                const posterImg = document.querySelector(`.poster`)
                posterImg.setAttribute('src', fullPoster);












            });
    };

    movieApp.init = function () {
        movieApp.formSubmit();
    }
    
    movieApp.init();