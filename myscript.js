 const apiCall = {};
        apiCall.apiURL = 'https://api.themoviedb.org/3/discover/movie';
        apiCall.apiKey = '4313ef3612655092b3c706f021f3d6bc';


        apiCall.getData = () => {
            const url =
                `${apiCall.apiURL}?api_key=${apiCall.apiKey}&vote_average.gte=2&vote_average.lte=5`;
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