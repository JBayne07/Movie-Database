const mongoose = require('mongoose');
const {Schema} = mongoose;
const reviewSchema = new Schema({

});

const Review = module.exports = mongoose.model('Review', reviewSchema);