const mongoose = require('mongoose');
const {Schema} = mongoose;

const personSchema = new Schema({
    directed: [String],
    written: [String],
    acted: [String],
    collaborators: [String]
});

const Person =  module.exports = mongoose.model('Person}', personSchema);