'use strict';

const mongoose = require('mongoose');
const SequenceGenerator = require('mongoose-sequence-plugin');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    genreId: {
        type: String
    },
    name: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    }
    ,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

GenreSchema.plugin(SequenceGenerator, {
    field: 'genreId',
    startAt: '001',
    prefix: 'GR-'
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;
