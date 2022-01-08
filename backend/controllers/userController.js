const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Person = require('../models/personModel')
let cookie;

module.exports.addUser = (req, res) => {
    console.log('addUser called me', req.body);
    //Need to error check for bad username or password
    let user = new User({username:req.body.username, password:req.body.password});

    user.save(function(err, user){
        if(err) return console.log(err);
        console.log('Saved User' + user);
        res.status(200).json(user);
    });    
}

module.exports.getUser = (req, res) => {
    console.log('getUser called me',req.params);

    User.findById(req.params.id)
    .populate('movies')
    .populate('people').exec((err, result) => {
        if(err) return console.log(err);
        console.log('result: ',result);
        res.status(200).json(result);
    });
}

module.exports.getAllUsers = (req, res) => {
    console.log('getAllUsers called me',req.body);

    User.find(function(err, result){
        if(err) return console.log(err);
        console.log('result', result);
        res.status(200).json(result);
    });
}

module.exports.login = (req, res) => {
    console.log('login', req.body);
    
    User.findOne({username:req.body.username, password:req.body.password})
    .populate('movies')
    .populate('people')
    .exec(function(err, result){
        if(err) return console.log(err);
        // console.log(result);
        req.session.userId = result._id.toString();
        // result.session = req.session;
        cookie = req.session;
        console.log(req.session);
        res.status(200).json(result);
    });  
}

module.exports.addWatchlist = async (req, res) => {
    console.log('addWatchlist', req.params);
    console.log(req.session);
    let result = await User.findByIdAndUpdate(req.session.userId, {$push:{movies:req.params.id}});
    res.status(200).json(result); 
}

module.exports.removeWatchlist = async (req, res) => {
    console.log('removeWatchlist', req.params);
    console.log(req.session);
    let result = await User.findByIdAndUpdate(req.session.userId, {$pull:{movies:req.params.id}});
    res.status(200).json(result); 
}