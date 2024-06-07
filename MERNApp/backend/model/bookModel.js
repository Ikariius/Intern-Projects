const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: true},
    content:{type: String, required: true},
    tags:{type: [String], default: []},
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    isPinned: {type: Boolean, default: false},
    userId: {type: String, required: true},
    createdOn: {type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model("Book", bookSchema);