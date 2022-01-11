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

    Person.findById(req.params.id)
    .populate('directed')
    .populate('written')
    .populate('acted')
    .populate('collaborators')
    .exec(function(err, result){
        if(err) return console.log(result);
        console.log('got person', result);
        res.status(200).json(result);
    });
}

module.exports.getAllPeople = (req, res) => {
    console.log('getAllPeople', req.query);
    if(req.query.person === ''){
        res.status(200).json({message:'No text in textfield'});
        return;
    }
    Person.find({name: new RegExp(req.query.person,'i')}).limit(5).exec((err, result) =>{
        if(err) return console.log(result);
        // console.log(result);
        res.status(200).json(result);
    });
}