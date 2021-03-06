'use strict';

const mongoose = require('mongoose');
const SequenceGenerator = require('mongoose-sequence-plugin');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookId: {
        type: String
    },
    title: {
        type: String
    },
    dateOfPublish: {
        type: String
    },
    ISBN: {
        type: String
    },
    description: {
        type: String
    },
    publisher: {
        type: String
    },
    pages: {
        type: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    genre:{
        type: Schema.Types.ObjectId,
        ref:'Genre'
    }
});

BookSchema.plugin(SequenceGenerator, {
    field: 'bookId',
    startAt: '001',
    prefix: 'BK-'
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
