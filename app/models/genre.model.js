'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    books:[{
        type:Schema.Types.ObjectId,
        ref:'Book'
    }]
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;
