const User = require('../models/userModel');

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

    User.findById(req.params.id, function(err, result){
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
    console.log('login', req.body, 'session', req.session);

    User.findOne({username:req.body.username, password:req.body.password}, function(err, result){
        if(err) return console.log(err);
        console.log(result);
        req.session.userId = result._id.toString();
        res.status(200).json(result);
    });
}

module.exports.session = (req, res) => {
    console.log('session', req.query);
    
}