const Person = require('../models/personModel');

module.exports.addPerson = (req, res) => {
    console.log('addPerson', req.body);

    let person = new Person();

    person.save(function(err, result){
        if(err) return console.log(result);
        console.log('saved person', result);
        res.status(200).json(person);
    });
}

module.exports.getPerson = (req, res) => {
    console.log('getPerson',req.params);

    Person.findById(req.params.id, function(err, result){
        if(err) return console.log(result);
        console.log('got person', result);
        res.status(200).json(result);
    });
}

module.exports.getAllPeople = (req, res) => {
    console.log('getAllPeople', req.body);

    Person.find(function(err, result){
        if(err) return console.log(result);
        console.log(result);
        res.status(200).json(result);
    });
}