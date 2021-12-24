const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    users: [String],
    people: [String],
    movies: [String],
    recommendedMovies: [String]
});

const User = module.exports = mongoose.model('User', userSchema);