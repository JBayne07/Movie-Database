const movieData = require('./movie-data-10.json');
const axios = require('axios');

for(let i = 0; i < 1; ++ i){
    // console.log(movieData[i]);
    movieData[i].Year = parseInt(movieData[i].Year)
    movieData[i].Runtime = parseInt(movieData[i].Runtime)

    let people = []

    for(let j = 0; j < movieData[i].Director.length; ++j){
        let person = {};
        console.log(j);
        person.name = movieData[i].Director[j];
        people.push(person);
    }

    for(let j = 0; j < movieData[i].Writer.length; ++j){
        let person = {};
        person.name = movieData[i].Writer[j];
        people.push(person);
    }

    for(let j = 0; j < movieData[i].Actors.length; ++j){
        let person = {};
        person.name = movieData[i].Actors[j];
        people.push(person);
    }

    for(let j = 0; j < people.length; ++j){
        let arr = [];
        for(let k = 0; k < people.length; ++k){
            if(j === k){
                continue;
            }
            arr.push(people[k].name);
        }
        people[j].collaborated = arr;
    }

    // console.log(people);
    const options = {
        url: 'http://localhost:9000/api/movies',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            data:{
                title       : movieData[i].Title,
                releaseYr   : movieData[i].Year,
                rated       : movieData[i].Rated,
                releaseDate : movieData[i].Released,
                runtime     : movieData[i].Runtime,
                plot        : movieData[i].Plot,
                awards      : movieData[i].Awards,
                poster      : movieData[i].Poster,
                genres      : movieData[i].Genre,
                directors   : movieData[i].Director,
                writers     : movieData[i].Writer,
                actors      : movieData[i].Actors,
                peopleArr   : people
            }
    }

    axios(options).then(response => {
        console.log(response.data);
    });
}

// const options = {
//     url: 'http://localhost:9000/api/movies/61caf47d0853ecb4515e87ec',
//         method: 'GET',
//         headers: {
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json;charset=UTF-8'
//         }
//     }

// axios(options).then(response => {
//     console.log(response.data);
// });

console.log('All Done!');