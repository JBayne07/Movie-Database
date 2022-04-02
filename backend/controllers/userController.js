const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Person = require('../models/personModel')
//Have to create login authentication and send out error messages

module.exports.addUser = (req, res) => {
    console.log('addUser called me', req.body);
    //Need to error check for bad username or password
    let user = new User({username:req.body.username, password:req.body.password, contribute:false});

    user.save(function(err, user){
        if(err) return console.log(err);
        req.session.userId = user._id.toString();
        console.log('Saved User' + user);
        res.status(201).json(user);
    });    
}

module.exports.getUser = (req, res) => {
    console.log('getUser called me',req.params);

    User.findById(req.params.id)
    .populate('movies')
    .populate('users')
    .populate('people')
    .populate('reviews')
    .exec((err, result) => {
        if(err) return console.log(err);
        
        let arr = [];
        let genreArr = [];
        for(element of result.movies){
            arr.push(element.title);
            for(genre of element.genres){
                if(genreArr.includes(genre)){
                    continue;
                }
                genreArr.push(genre);
            }
        }

        console.log(genreArr);
        Movie.find({$and: [ {$in:result.movies.genres}, {title: {$nin: arr}}]}).limit(5).exec((err, queryResult) => {
            if(err) return console.log(err);
            result.recommendedMovies = queryResult;
            res.status(200).json(result);
            console.log(result)
        });
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
    .populate('users')
    .exec(function(err, result){
        if(err) return console.log(err);
        if(result === null){
            res.status(400).json({error: 'User is not in database'});
        }else{
            req.session.userId = result._id.toString();
            let arr = [];
            let genreArr = [];
            for(element of result.movies){
                arr.push(element.title);
                for(genre of element.genres){
                    if(genreArr.includes(genre)){
                        continue;
                    }
                    genreArr.push(genre);
                }
            }
            console.log(genreArr);
            Movie.find({$and: [ {$in:result.movies.genres}, {title: {$nin: arr}}]}).limit(5).exec((err, queryResult) => {
                if(err) return console.log(err);
                result.recommendedMovies = queryResult;
                res.status(200).json(result);
                // console.log(result)
            });
        } 
    });
}

module.exports.addWatchlist = async (req, res) => {
    console.log('addWatchlist', req.params);
    if(req.session.userId){
        const user = await User.findById(req.session.userId);
        if(user.movies){
            if(user.movies.includes(req.params.id)){
                res.status(400).json({error:'User already added movie to watchlist'});
            }else{
                const result = await User.findByIdAndUpdate(req.session.userId, {$push:{movies:req.params.id}});
                res.status(200).json(result);
            }
        }else{
            const result = await User.findByIdAndUpdate(req.session.userId, {$push:{movies:req.params.id}});
            res.status(200).json(result);
        } 
    }else{
        res.status(400).json({error:'User is not logged in'});
    }
    
}

module.exports.removeWatchlist = async (req, res) => {
    console.log('removeWatchlist', req.params);
    if(req.session.userId){
        let result = await User.findByIdAndUpdate(req.session.userId, {$pull:{movies:req.params.id}});
        res.status(200).json(result); 
    }else{
        res.status(400).json({error: 'User is not logged in'});
    }
    
}

module.exports.followPerson = async (req, res) => {
    console.log('followperson', req.params);
    if(req.session.userId){
        const user = await User.findById(req.session.userId);
        if(user.people){
            if(user.people.includes(req.params.id)){
                res.status(400).json({error: 'User already follows this person'});
            }else{
                const result = await User.findByIdAndUpdate(req.session.userId, {$push:{people:req.params.id}});
                console.log(result);
                res.status(200).json(result);
            }
        }else{
            const result = await User.findByIdAndUpdate(req.session.userId, {$push:{people:req.params.id}});
            console.log(result);
            res.status(200).json(result);
        }
    }else{
        res.status(400).json({error: 'User is not logged in'});
    }
    
}

module.exports.unfollowPerson = async (req, res) => {
    console.log('unfollowperson', req.params);
    if(req.session.userId){
        let result = await User.findByIdAndUpdate(req.session.userId, {$pull:{people:req.params.id}});
        res.status(200).json(result);
    }else{
        res.status(400).json({error: 'User is not logged in'});
    }
    
}

module.exports.followUser = async (req, res) => {
    console.log('followuser', req.params);
    if(req.session.userId){
        const user = await User.findById(req.session.userId);
        if(user.users){
            if(user.users.includes(req.params.id)){
                res.status(400).json({error: 'User already follows this user'});
            }else{
                const result = await User.findByIdAndUpdate(req.session.userId, {$push:{users:req.params.id}});
                console.log(result);
                res.status(200).json(result);
            }
        }else{
            const result = await User.findByIdAndUpdate(req.session.userId, {$push:{users:req.params.id}});
            console.log(result);
            res.status(200).json(result);
        }
    }else{
        res.status(400).json({error: 'User is not logged in'});
    }
}

module.exports.unfollowUser = async (req, res) => {
    console.log('unfollowuser', req.params);
    if(req.session.userId){
        let result = await User.findByIdAndUpdate(req.session.userId, {$pull:{users:req.params.id}});
        res.status(200).json(result);
    }else{
        res.status(400).json({error: 'User is not logged in'});
    }    
}

module.exports.changeContribute = async (req, res) => {
    console.log('change contribute', req.body);

    let result = await User.findByIdAndUpdate(req.session.userId, {contribute:req.body.contribute}).exec();
    console.log(result);
    res.status(200).json(result);
}