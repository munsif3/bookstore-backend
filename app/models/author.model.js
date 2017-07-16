'use strict';

const mongoose = require('mongoose');
const SequenceGenerator = require('mongoose-sequence-plugin');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    authorId: {
        type: String
    },
    name: {
        type: String
    },
    dateOfBirth: {
        type: String
    }
    ,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

AuthorSchema.plugin(SequenceGenerator, {
    field: 'authorId',
    startAt: '001',
    prefix: 'AU-'
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
