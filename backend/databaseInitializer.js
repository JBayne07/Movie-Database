const movieData = require('./movie-data-100.json');
const axios = require('axios');

const init = async () =>{
    for(let i = 0; i < movieData.length; ++i){
        new Promise(resolve => setTimeout(resolve, 1000));
        movieData[i].Year = parseInt(movieData[i].Year)
        movieData[i].Runtime = parseInt(movieData[i].Runtime)
    
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
                }
        }
    
        await axios(options).then(response => {
            console.log(response.data);
            
        });
        if(i === movieData.length-1){
            message();
        }
    }
}

const message = () => {
    console.log('-------------------------------------------------')
    console.log('-----------------All Done!!----------------------')
    console.log('-------------------------------------------------')
}

init();