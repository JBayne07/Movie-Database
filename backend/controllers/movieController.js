const Movie = require('../models/movieModel');
const Person = require('../models/personModel');
const mongoose = require('mongoose')

const addPerson = async (p) => {
    let person = new Person({
        name: p.name,
    });

    await person.save(function(err, result){
        if(err) return console.log(err);
        console.log('person save', result);
        return result
    });
}

const addingPeople = async (body) => {
    let people = body.peopleArr;
    
    await Promise.all(people.map(async element => {
        await addPerson(element);
    }));
}

const addingMovie = async (body,res) => {
    let movie = new Movie(
        {
            title: body.title,
            releaseYr: body.releaseYr,
            rated: body.rated,
            runtime: body.runtime,
            plot: body.plot,
            genres: body.genres,
            directors: [],
            writers: [],
            actors: [],
            reviewRating: 0
        }
    );

    for(let i = 0; i < body.directors.length; ++i){
        Person.findOne({name: body.directors[i]}, function(err, result){
            movie.directors.push(result._id);

            if(i === body.directors.length -1){
                for(let j = 0; j < body.writers.length; ++j){

                    Person.findOne({name: body.writers[j]}, function(err, result){
                        movie.writers.push(result._id);

                        if(j === body.writers.length-1){
                            for(let k = 0; k < body.actors.length; ++k){

                                Person.findOne({name: body.actors[k]}, function(err, result){
                                    movie.actors.push(result._id);

                                    if(k === body.actors.length-1){
                                        
                                        movie.save(function(err, result){        
                                            if(err) return console.log(err);
                                            console.log('saved movie', result);
                                            res.status(200).json(result);
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    // let m = await Promise.all(body.directors.map(async element => {
    //     Person.findOne({name: element}, function(err, result){
    //         movie.directors.push(result._id);
    //     });
    // }));

    // await Promise.all(body.writers.map(async element => {
    //     Person.findOne({name: element}, function(err, result){
    //         movie.writers.push(result._id);
    //     });
    // }));

    // await Promise.all(body.actors.map(async element => {
    //     Person.findOne({name: element}, function(err, result){
    //         movie.actors.push(result._id);
    //     });
    // }));
    
    // setTimeout(() => {
    //     movie.save(function(err, result){        
    //         if(err) return console.log(err);
    //         console.log('saved movie', result);
    //         res.status(200).json(result);
    //     });  
    // }, 1000);    
}

module.exports.addMovie = async (req, res) => {
    console.log('addMovie', req.body);

    await addingPeople(req.body);
    await addingMovie(req.body,res);
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