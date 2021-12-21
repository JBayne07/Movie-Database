import mongoose from 'mongoose';
const {Schema} = mongoose;
const reviewSchema = new Schema({

});

export const Review = mongoose.model('Review', reviewSchema);