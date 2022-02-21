// name spacing
const movieApp = {};

const movieAppUrl = new URL("https://api.themoviedb.org/3/discover/movie");
const apiKey = '4313ef3612655092b3c706f021f3d6bc';

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
        });
    });
};

// grabbing form element in variable
movieApp.form = document.querySelector('form');

movieApp.button = document.querySelector('button');
movieApp.buttonUnfocused = function() {
    movieApp.button.addEventListener('click', (e)=>{
        e.target.blur();
    });
};

// method for event listener on the form
movieApp.formSubmit = function() {
    movieApp.form.addEventListener('submit', function(e) {
        // preventing automatic refresh
        e.preventDefault();
    
        const genre = document.getElementById('genreSelect').value;

        const era = document.getElementById('eraSelect').value;
        let eraRangeGte = '';
        let eraRangeLte = '';
        
        if (era === 'modern') {
            eraRangeGte = '2000-01-01';
        } else if (era === 'oldSchool') {
            eraRangeGte = '1980-01-01';
            eraRangeLte = '2000-01-01';
        } else if (era === 'retro') {
            eraRangeGte = '1960-01-01'
            eraRangeLte = '1980-01-01';
        } else if (era === 'goldenAge') {
            eraRangeGte = '1940-01-01'
            eraRangeLte = '1960-01-01';
        }

        movieApp.getData(genre, eraRangeGte, eraRangeLte);

        // to reset to random selection, but its more convinient in the app not to, so we were like 'no bitch'
        // movieApp.form.reset();
    });
};

// generating a random array index number
const randomNumber = (array)=>{
    const arrayIndex = Math.floor(Math.random() * array.length);
    return array[arrayIndex];
}

// making method getData()
movieApp.getData = (genreID, eraRangeGte, eraRangeLte) => {
    // search parameters
    movieAppUrl.search = new URLSearchParams({
        api_key: apiKey,
        'vote_average.gte': 2,
        'vote_average.lte': 5,
        with_genres: genreID,
        with_original_language: 'en',
        'primary_release_date.gte': eraRangeGte,
        'primary_release_date.lte': eraRangeLte,
        sort_by: 'revenue.desc'
    })

    // fetching a movie with the users inputed query
    fetch(movieAppUrl)
        .then(function (data) {
            return data.json();
        })
        .then(function (response) {
            const movieArray = randomNumber(response.results);

            const overview = movieArray.overview;
            const poster = movieArray.poster_path;
            const voteAvg = movieArray.vote_average;
            const movieTitle = movieArray.title;
            const releaseDate = movieArray.release_date;
            const language = movieArray.original_language;

            const fullPoster = `https://image.tmdb.org/t/p/original/${poster}`;

            // grabbing movieSelectionContainer to append generated movie to, and clearing it before we do
            const movieSelectionContainer = document.querySelector('.movieSectionContainer');
            movieSelectionContainer.innerHTML="";

            // creating section element for the generated movie
            const generatedMovie = document.createElement('section');
            generatedMovie.classList.add('generatedMovie');

            // ---------MOVIE POSTER---------

            // create div.imgContainer with an img.poster in it
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('imgContainer');

            const posterElement = document.createElement('img');
            posterElement.classList.add('poster');


            // --------MOVIE INFO DIV STUFF---------

            // create div.movieInfo with an h3, div.ratingDiv, div.dateLanguage, p.overview
            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movieInfo');

            // creating and filled h3 which is the movie title
            const h3 = document.createElement(`h3`);
            h3.textContent = movieTitle;

            // created and filled div with genre rating
            const ratingDiv = document.createElement(`div`);
            ratingDiv.classList.add('ratingDiv');

            // created and filled p tag with the movie rating
            const rating = document.createElement(`p`);
            rating.classList.add(`rating`);
            rating.innerHTML = `Rating: ${voteAvg}/10`;
            
            // -------DATE LANGUAGE CONTAINER----
            
            // created div that holds date and language p tags and content
            const dateLanguage = document.createElement(`div`);
            dateLanguage.classList.add(`dateLanguage`);
            
            // created p tag with original language
                const languageP = document.createElement(`p`);
            languageP.classList.add(`language`);
            languageP.textContent = `Original Language: ${language}`;
            
            // created p tag with release date
            const releaseDateP = document.createElement(`p`);
            releaseDateP.classList.add(`releaseDate`);
            releaseDateP.textContent = `Release Date: ${releaseDate}`;

            // created p tag for movie overview (with content)  
            const description = document.createElement(`p`);
            description.classList.add(`overview`);
            description.textContent = overview;
            
            // -------APPENDING STUFF-------

            // appending poster stuff into the section
            generatedMovie.appendChild(imgContainer).appendChild(posterElement);

            // appending rating into rating div
            ratingDiv.appendChild(rating);

            // appending content into dateLanguage
            dateLanguage.append(languageP, releaseDateP);

            // appending all of the elements we created into movieInfo
            movieInfo.append(h3, ratingDiv, dateLanguage, description);

            // appending movieInfo div into generatedMovie section
            generatedMovie.appendChild(movieInfo);

            // appending section onto the page
            movieSelectionContainer.append(generatedMovie);

            // putting img src in the poster
            const posterImg = document.querySelector(`.poster`);
            if (poster !== null) {
                posterImg.setAttribute('src', fullPoster);
                posterElement.alt = `${movieTitle} movie poster`;
            } else {
                
                posterElement.alt = `This movie is so bad, they didn't want you to see their poster. Here's a picture of gudetama instead`;
                posterImg.setAttribute('src', `./assets/gudetama-confused-alt.png`);
            }
        });
    };

// initialization method to start the page doing things
movieApp.init = function () {
    movieApp.genreOptions();
    movieApp.formSubmit();
    movieApp.buttonUnfocused();
}

// calling the initialization method
movieApp.init();