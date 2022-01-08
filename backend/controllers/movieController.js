const Movie = require('../models/movieModel');
const Person = require('../models/personModel');

const addingPeople = async (body) => {
    let people = body.peopleArr;

    for(let element of people){
        let timeout = await new Promise(resolve => setTimeout(resolve,100));
        let result = await Person.findOne({name: element.name}).exec();
        console.log('-----------------------',element.name,result);
        if(result === null){
            let person = new Person({
                name: element.name,
            });
        
            person.save(function(err, result){
                if(err) return console.log(err);
                console.log('person save', result);
            });
        }
    }
}

const addingMovie = async (body,res) => {

    let movie = new Movie(
        {
            title: body.title,
            releaseYr: body.releaseYr,
            rated: body.rated,
            releaseDate: body.releaseDate,
            runtime: body.runtime,
            plot: body.plot,
            awards: body.awards,
            poster: body.poster,
            genres: body.genres
        }
    );

    for(let element of body.directors){
        const result = await Person.findOne({name: element}).exec();
        // console.log(result);
        movie.directors.push(result._id);
    }

    for(let element of body.writers){
        const result = await Person.findOne({name: element}).exec();
        // console.log('writer');
        movie.writers.push(result._id);
    }

    for(let element of body.actors){
        const result = await Person.findOne({name: element}).exec();
        // console.log('actor');
        movie.actors.push(result._id);
    }

    movie.save((err, result) => {
        if(err) return console.log(err);
        // console.log('saved movie', result);
        updatePeople(body);
        res.status(200).json(result);
    });
}

const updatePeople = async (body) => {
    let people = body.peopleArr;
    const movieResult = await Movie.findOne({title: body.title}).exec();

    Promise.all(people.map(async element => {
        
        if(element.directed){
            const directedResult = await Person.findOneAndUpdate({name: element.name}, {$push:{directed: movieResult._id}}).exec();
        }else if(element.written){
            const writtenResult = await Person.findOneAndUpdate({name: element.name}, {$push:{written: movieResult._id}}).exec();
        }else if(element.acted){
            const actedResult = await Person.findOneAndUpdate({name: element.name}, {$push:{acted: movieResult._id}}).exec();
        }

    }));

    for (const person of people) {
        let arr = [];
        let count = 0;
        for(let element of person.collaborated){
            const personResult = await Person.findOne({name: element}).exec();
            arr.push(personResult._id);
            count++;

            if(count === person.collaborated.length){
                const updateResult = await Person.findOneAndUpdate({name: person.name}, {collaborators:arr}).exec();
            }
        }        
    }
}

module.exports.addMovie = async (req, res) => {
    // console.log('addMovie', req.body);
    await addingPeople(req.body);
    // setTimeout(() =>{
    await addingMovie(req.body,res);
    // }, 1000)
    
}

module.exports.getAllMovies = async (req, res) => {
    console.log('getAllMovies', req.query);


    await Movie.find({$and:[
        {title: new RegExp(req.query.title,'i')},
        {genres: new RegExp(req.query.genre, 'i')}
        ]})
        .populate(
            // {$and:[
                {path:'directors',
                match: {name: new RegExp(req.query.name, 'i')}}

                // {path:'writers',
                // match: {name: new RegExp(req.query.name, 'i')}},

                // {path: 'actors',
                // match: {name: new RegExp(req.query.name, 'i')}}
            // ]}
        )
        .populate(
            {path:'writers',
            match: {name: new RegExp(req.query.name, 'i')}}
        )
        .populate(
            {path: 'actors',
            match: {name: new RegExp(req.query.name, 'i')}}
        )
        .exec((err, result) => {
            let temp1 = result.filter(element => {return element.directors.length !== 0;});
            let temp2 = result.filter(element => {return element.writers.length !== 0;});
            let temp3 = result.filter(element => {return element.actors.length !== 0;});
            if(temp1.length !== 0){
                result = temp1;
            }else if(temp2.length !== 0){
                result = temp2;
            }else if(temp3.length !== 0){
                result = temp3;
            }
            // console.log(result);
            res.status(200).json(result);
        });
}

module.exports.getMovie = async (req, res) => {
    console.log('getmovie', req.params);
    
    Movie.findById(req.params.id)
    .populate('directors')
    .populate('writers')
    .populate('actors')
    .populate({
        path:'reviews',
        populate:{ path: 'user' }
    })
    .exec((err, result) => {
        if(err) return console.log(err);
        console.log(result);
        res.status(200).json(result);
    });
}