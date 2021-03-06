const mongoose = require('mongoose');
const {Schema} = mongoose;

const movieSchema = new Schema({
    title: String,
    releaseYr: Number,
    rated: String,
    releaseDate: String,    
    runtime: Number,
    plot: String,
    awards: String,
    poster: String,
    genres: [String],
    directors: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    writers: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    actors: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    similar: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

const Movie = module.exports = mongoose.model('Movie', movieSchema);