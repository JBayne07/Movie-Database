const Movie = require('../models/movieModel');
const Person = require('../models/personModel');

const addPerson = async (p) => {
    Person.findOne({name: p.name}, function(err, result){
        
        if(result !== null){
            let arr = [];
            // for(let i = 0; i < p.collaborated.length; ++i){
            //     Person.findOne({name: p.collaborated[i]}, function(err, result){
                    
            //         arr.push(result._id);
            //         if(i === p.collaborated.length-1){
            //             Person.findOneAndUpdate({name: element.name}, {collaborators: arr}, function(err, result){
            //                 console.log(result);
            //             });
            //         }
            //     })
            // }
        }else{
            let person = new Person({
                name: p.name,
            });
        
            person.save(function(err, result){
                if(err) return console.log(err);
                // console.log('person save', result);
                return result
            });
        }
    })
    
}

const addingPeople = async (body) => {
    let people = body.peopleArr;
    people.map((element) => {
        addPerson(element);
    });
}

const addingMovie = async (body,res) => {

    let movie = new Movie(
        {
            title: body.title,
            releaseYr: body.releaseYr,
            rated: body.rated,
            runtime: body.runtime,
            plot: body.plot,
            genres: body.genres
        }
    );

    for(let i = 0; i < body.directors.length; ++i){
        Person.findOne({name: body.directors[i]}, function(err, result){
            if(err) return console.log(err);
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
                                            // console.log('saved movie', result);
                                            updatePeople(body);
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
}

const updatePeople = (body) => {
    let people = body.peopleArr;
    Movie.findOne({title: body.title}, function(err, result){
        if(err) return console.log(err);
        Promise.all(people.map(async element => {
            
            if(element.directed){                         
                Person.findOneAndUpdate({name: element.name}, {$push:{directed: result._id}}, function(err, result){
                    // console.log(result);
                });
            }else if(element.written){                
                Person.findOneAndUpdate({name: element.name}, {$push:{written: result._id}}, function(err, result){
                    // console.log(result);
                })
            }else if(element.acted){                
                Person.findOneAndUpdate({name: element.name}, {$push:{acted: result._id}}, function(err, result){
                    // console.log(result);
                })
            }            
        }));
    })
    
    people.map(async element => {
        console.log(element.collaborated);
        let arr = [];
        for(let i = 0; i < element.collaborated.length; ++i){
            Person.findOne({name: element.collaborated[i]}, function(err, result){
                console.log('-------',element.name, '||',element.collaborated[i], result._id)
                arr.push(result._id);
                if(i === element.collaborated.length-1){
                    Person.findOneAndUpdate({name: element.name}, {collaborators: arr}, function(err, result){
                        // console.log('added collaborators', result);
                    });
                }
            })
        }
    });
}

module.exports.addMovie = async (req, res) => {
    // console.log('addMovie', req.body);
    await addingPeople(req.body, res);
    setTimeout(() =>{
        addingMovie(req.body,res);
    }, 900)
    
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