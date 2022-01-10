const mongoose = require('mongoose');
const {Schema} = mongoose;

const personSchema = new Schema({
    name: String,
    followers: [{type: Schema.Types.ObjectId, ref:'User'}],
    directed: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    written: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    acted: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    collaborators: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    collaborated: {type: Map, of: Number}
});

const Person =  module.exports = mongoose.model('Person', personSchema);