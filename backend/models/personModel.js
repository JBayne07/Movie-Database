import mongoose from 'mongoose';
const {Schema} = mongoose;

const personSchema = new Schema({
    directed: [String],
    written: [String],
    acted: [String],
    collaborators: [String]
});

export const Person = mongoose.model('Person}', personSchema);