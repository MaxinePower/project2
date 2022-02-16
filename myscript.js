// name spacing
const movieApp = {};

    // url and apikey variables
    // movieApp.apiURL = 'https://api.themoviedb.org/3/discover/movie';
    // movieApp.apiKey = '4313ef3612655092b3c706f021f3d6bc';


const movieAppUrl = new URL("https://api.themoviedb.org/3/discover/movie");
const apiKey = '4313ef3612655092b3c706f021f3d6bc';

// making a list object for genres
movieApp.genreList = {};

// making method to create genre dropdown list
movieApp.genreOptions = function() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4313ef3612655092b3c706f021f3d6bc&language=en-US').then(function(res) {
        return res.json();
    }).then(function(jsonRes) {
        jsonRes.genres.forEach(function(genre) {
            // creating dropdown menu
            genreDropdown = document.getElementById('genreSelect');
            genreDropdownEntry = document.createElement('option');
            genreDropdownEntry.value = genre.id;
            genreDropdownEntry.textContent = genre.name;
            genreDropdown.append(genreDropdownEntry);
            // this is adding it to a variable for later use
            movieApp.genreList[genre.id] = genre.name;
            console.log(movieApp.genreList);
        });
    });
};


    // form element in variable
    movieApp.form = document.querySelector('form');
    // method for event listener
    movieApp.formSubmit = function() {
        movieApp.form.addEventListener('submit', function(e) {
            e.preventDefault();

            const genre = document.getElementById('genreSelect').value;
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
        movieAppUrl.search = new URLSearchParams({
            api_key: apiKey,
            'vote_average.gte': 2,
            'vote_average.lte': 5,
            with_genres: genreID,
            with_original_language: 'en',
        // with_original_language: 'it en',

        })

        fetch(movieAppUrl)
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
                // used in a for each to name each genre num before display
                const genreId = movieArray.genre_ids;
                const language = movieArray.original_language;

                const fullPoster = `https://image.tmdb.org/t/p/original/${poster}`;

                const h3 = document.querySelector(`h3`);
                h3.innerHTML= movieTitle;


                // const genre = document.querySelector(`.genre`);
                // genre.innerHTML = 
                // foreach loop that goes through genre_ids then puts that indexNumber in like movieApp.genreList[indexNumber]

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
        movieApp.genreOptions();
        movieApp.formSubmit();
    }
    
    movieApp.init();