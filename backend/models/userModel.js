const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    contribute: Boolean,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    people: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    reviews: [{type: Schema.Types.ObjectId, ref:'Review'}],
    recommendedMovies: [{type: Schema.Types.ObjectId, ref: 'Movie'}]
});

const User = module.exports = mongoose.model('User', userSchema);