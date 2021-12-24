const Movie = require('../models/movieModel');

module.exports.addMovie = async (req, res) => {
    console.log('addMovie', req.body);

    let movie = new Movie();
    movie.save(function(err, result){
        if(err) return console.log(err);
        console.log('saved movie', result);
        res.status(200).json(result);
    });
}

module.exports.getAllMovies = async (req, res) => {
    console.log('getAllMovies', req.body);

    Movie.find(function(err, result){
        if(err) return console.log(err);
        console.log(result);
        res.status(200).json(result);
    });
}

module.exports.getMovie = async (req, res) => {
    console.log('getmovie', req.body);
    
    Movie.findById(req.params.id, function(err, result){
        if(err) return console.log(err);
        console.log(result);
        res.status(200).json(result);
    });
}