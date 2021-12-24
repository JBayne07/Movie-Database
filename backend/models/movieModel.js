const mongoose = require('mongoose');
const {Schema} = mongoose;

const movieSchema = new Schema({
    title: String,
    releaseYr: Number,
    reviewRating: Number,
    runtime: Number,
    plot: String,
    genres: [String],
    directors: [String],
    writers: [String],
    actors: [String]
});

const Movie = module.exports = mongoose.model('Movie', movieSchema);