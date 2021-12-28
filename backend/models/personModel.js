const mongoose = require('mongoose');
const {Schema} = mongoose;

const personSchema = new Schema({
    name: String,
    followers: [{type: Schema.Types.ObjectId, ref:'User'}],
    directed: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    written: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    acted: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    collaborators: [{type: Schema.Types.ObjectId, ref: 'Person'}]
});

const Person =  module.exports = mongoose.model('Person', personSchema);