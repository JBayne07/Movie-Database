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

    let m = await Promise.all(body.directors.map(async element => {
        Person.findOne({name: element}, function(err, result){
            movie.directors.push(result._id);
        });
    }));

    await Promise.all(body.writers.map(async element => {
        Person.findOne({name: element}, function(err, result){
            movie.writers.push(result._id);
        });
    }));

    await Promise.all(body.actors.map(async element => {
        Person.findOne({name: element}, function(err, result){
            movie.actors.push(result._id);
        });
    }));
    
    setTimeout(() => {
        movie.save(function(err, result){        
            if(err) return console.log(err);
            console.log('saved movie', result);
            res.status(200).json(result);
        });  
    }, 1000);    
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