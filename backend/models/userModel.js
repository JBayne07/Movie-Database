const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    users: [String],
    people: [String],
    movies: [String],
    recommendedMovies: [String]
});

export const User = mongoose.model('User', userSchema);