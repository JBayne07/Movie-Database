const Movie = require('../models/movieModel');
const Person = require('../models/personModel');


const processData = async (movieData) => {
    let totalPeople = await Person.find().exec();
    let flag = false;
    let people = [];
    let multiPeople = [];
    // console.log(movieData)
    for(let j = 0; j < movieData.directors.length; ++j){
        let person = {};
        let person2 = {}
        person.name = movieData.directors[j];
        person.directed = movieData.title;
        person2.name = movieData.directors[j];
        // console.log(totalPeople,person.name);
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }

        people.push(person);
        totalPeople.push(person2);
    }

    for(let j = 0; j < movieData.writers.length; ++j){
        let person = {};
        let person2 = {}
        person.name = movieData.writers[j];
        person.written = movieData.title;
        person2.name = movieData.writers[j];
        // console.log(totalPeople,person.name);
        if(people.some(element => element.name === person.name)){
            continue;
        }
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }
              
        people.push(person);
        totalPeople.push(person2);
    }

    for(let j = 0; j < movieData.actors.length; ++j){
        let person = {};
        let person2 = {}
        person.name = movieData.actors[j];
        person.acted = movieData.title;
        person2.name = movieData.actors[j];
        // console.log(totalPeople,person.name);
        if(people.some(element => element.name === person.name)){
            continue;
        }
        if(totalPeople.some(element => element.name === person.name)){
            multiPeople.push(person);
            flag = true;
        }
        
        people.push(person);
        totalPeople.push(person2);
    }    
    
    for(let j = 0; j < people.length; ++j){
        let map = new Map();
//         // let map2 = new Map();
        for(let k = 0; k < people.length; ++k){
            if(j === k){
                continue;
            }
            map.set(people[k].name, 1);
        }
        people[j].collaborated = map;
    }

    for(let j = totalPeople.length-people.length; j < totalPeople.length; ++j){
        let map2 = new Map();
        for(let k = totalPeople.length-people.length; k < totalPeople.length; ++k){
            if(j === k){
                continue;
            }
            map2.set(totalPeople[k].name, 1);
        }
        totalPeople[j].collaborated = map2
    }

    if(flag){
        for(let j = 0; j < multiPeople.length; ++j){
            let multiArr = [];
            
            for(let k = 0; k < totalPeople.length; ++k){
                if(totalPeople[k].name === multiPeople[j].name){
                    console.log(totalPeople[k]);
                    const iterator = totalPeople[k].collaborated.keys();
                    let temp = {};

                    temp.name = totalPeople[k].name;
                    temp.collaborated = new Map();

                    for(let l = 0; l < totalPeople[k].collaborated.size; ++l){
                        const value = iterator.next().value
                        temp.collaborated.set(value,totalPeople[k].collaborated.get(value))
                    }

                    multiArr.push(temp);
                }
            }

            let merged = multiArr[0].collaborated;
            // console.log multiArr);
            for(let k = 1; k < multiArr.length; ++k){
                multiArr[k].collaborated.forEach((value, key) =>{
                    // console.log(merged);
                    if(merged.has(key)){
                        merged.set(key, merged.get(key)+1);
                    }else{
                        merged.set(key, value);
                    }                    
                });
            }

            let sortedMap = new Map([...merged.entries()].sort((a,b) => b[1] -a[1]));
            // console.log(sortedMap);
            let topFive = Array.from(sortedMap).slice(0,5);
            let topFiveMap = new Map(topFive);
            let topFiveArr = [];

            const iterator = topFiveMap.keys();
            let value = iterator.next().value;
            while(value !== undefined){
                topFiveArr.push(value);
                value = iterator.next().value
            }

            for(let k = 0; k < people.length; ++k){
                if(people[k].name === multiArr[0].name){
                    people[k].collaborators = topFiveArr;
                    if(people[k].name === 'Walter Matthau'){
                        console.log('hey',sortedMap);
                    }
                    people[k].collaborated = sortedMap;
                }
            }
        }
    }

    for(let j = 0; j < people.length; ++j){
        if(!(multiPeople.some(element => element.name === people[j].name))){
            let sortedMap = new Map([...people[j].collaborated.entries()].sort((a,b) => b[1] -a[1]));
            let topFive = Array.from(sortedMap).slice(0,5);
            let topFiveMap = new Map(topFive);
            let topFiveArr = [];
            const iterator = topFiveMap.keys();
            let value = iterator.next().value;
            while(value !== undefined){
                topFiveArr.push(value);
                value = iterator.next().value
            }
            if(people[j].name === 'Walter Matthau'){
                console.log('hi',sortedMap);
            }
            people[j].collaborators = topFiveArr;
            people[j].collaborated = sortedMap;
        }
    }
    // console.log(people);
    movieData.peopleArr = people;
    return movieData;

}

const addingPeople = async (body) => {
    let people = body.peopleArr;

    for(let element of people){
        let result = await Person.findOne({name: element.name}).exec();
        // console.log('-----------------------',element.name,result);
        if(result === null){
            let person = new Person({
                name: element.name,
            });
        
            person.save(function(err, result){
                if(err) return console.log(err);
                // console.log('person save', result);
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
        updatePeople(body, res);
        // res.status(200).json(result);
    });
}

const updatePeople = async (body, res) => {
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
        for(let element of person.collaborators){
            const personResult = await Person.findOne({name: element}).exec();
            arr.push(personResult._id);
            count++;
            if(count === person.collaborators.length){
                const updateResult = await Person.findOneAndUpdate({name: person.name}, {collaborators:arr}).exec();
            }
        }
        const result = await Person.findOneAndUpdate({name:person.name}, {collaborated:person.collaborated}).exec();
    }
    res.status(200).json(movieResult);
}

module.exports.addMovie = async (req, res) => {
    // console.log('addMovie', req.body);
    const result = await Movie.findOne({title:req.body.title});
    if(result){
        res.status(400).json({error: 'Movie already added to database'});
        return;
    }
    const data = await processData(req.body);
    await addingPeople(data);
    await addingMovie(data, res);    
}

module.exports.getAllMovies = async (req, res) => {
    console.log('getAllMovies', req.query);


    await Movie.find({$and:[
        {title: new RegExp(req.query.title,'i')},
        {genres: new RegExp(req.query.genre, 'i')}
        ]})
        .populate(
            {path:'directors',
            match: {name: new RegExp(req.query.name, 'i')}}
        )
        .populate(
            {path:'writers',
            match: {name: new RegExp(req.query.name, 'i')}}
        )
        .populate(
            {path: 'actors',
            match: {name: new RegExp(req.query.name, 'i')}}
        ).skip(req.query.count*10).limit(10)
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
    .exec(async (err, result) => {
        if(err) return console.log(err);
        Movie.find({$and:[{$in:result.genres}, {title:{$ne:result.title}}]}).limit(5).exec((err, queryResult) => {
            if(err) return console.log(err);
            result.similar = queryResult;
            res.status(200).json(result);
            console.log(result)
        })
        // console.log(result);
        // res.status(200).json(result);
    });
}