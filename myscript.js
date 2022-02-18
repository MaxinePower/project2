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
        });
    });
};

console.log(movieApp.genreList);

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
        // console.log(movieApp.form[1]);
        e.target.blur();
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
            // console.log(genreId);
            const language = movieArray.original_language;

            const fullPoster = `https://image.tmdb.org/t/p/original/${poster}`;

            


            // grabbing main to append generated movie to
            const movieSelectionContainer = document.querySelector('.movieSectionContainer');
      
            movieSelectionContainer.innerHTML="";
            // creating section element for the generated movie
            const generatedMovie = document.createElement('section');
            // generatedMovie.innerHTML = '';
            generatedMovie.classList.add('generatedMovie');

            // create div.imgContainer with an img.poster in it
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('imgContainer');

            const posterElement = document.createElement('img');
            posterElement.classList.add('poster');
            posterElement.alt = 'movie poster';

            // appending poster stuff into the section
            generatedMovie.appendChild(imgContainer).appendChild(posterElement);
            // this is up here for now 
            movieSelectionContainer.append(generatedMovie);
            
            // create div.movieInfo with an h3, div.genreRating, div.dateLanguage, p.overview
            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movieInfo');

            // creating and filled h3 which is the movie title
            const h3 = document.createElement(`h3`);
            h3.textContent = movieTitle;

            // created and filled div with genre rating
            const genreRating = document.createElement(`div`);
            genreRating.classList.add('genreRating');

            
            // created and filled p tag with the movie rating
            const rating = document.createElement(`p`);
            rating.classList.add(`rating`);
            rating.innerHTML = `Rating: ${voteAvg}/10`;

            
            const genre = document.createElement(`p`);
            genre.classList.add(`genre`);
            // genre.innerHTML = genreList[];
            // foreach loop that goes through genre_ids then puts that indexNumber in like movieApp.genreList[indexNumber]
            

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
            
    
            movieInfo.append(genreRating, dateLanguage,description);
            genreRating.appendChild(rating);
            dateLanguage.append(languageP, releaseDateP);
            
            
            // instead of finding these elements, maybe create them????
            
            const posterImg = document.querySelector(`.poster`)
            posterImg.setAttribute('src', fullPoster);
            
            generatedMovie.appendChild(movieInfo);
            // appending into the end of the main
            // main.append(generatedMovie);
        });
    };
    
    movieApp.init = function () {
        movieApp.genreOptions();
        movieApp.formSubmit();
    }
    
movieApp.init();