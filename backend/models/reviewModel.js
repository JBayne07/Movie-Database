const mongoose = require('mongoose');
const {Schema} = mongoose;
const reviewSchema = new Schema({
    score: Number,
    summary: String,
    details: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Review = module.exports = mongoose.model('Review', reviewSchema);