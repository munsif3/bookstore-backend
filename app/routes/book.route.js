'use strict';

// Adding Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Generating the Log File
mongoose.set('debug', false);

// Requiring the Schema
const BookModel = mongoose.model('Book');
const AuthorModel = mongoose.model('Author');
const GenreModel = mongoose.model('Genre');

// Creating the Express Router
const Router = express.Router();

// Get all
Router.get('/', (req, res) => {
    BookModel.find().then(books => {
        res.json(books);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

// Get by Id
Router.get('/:id', (req, res) => {
    BookModel.findById(req.params.id).exec().then(books => {
        res.json(books);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

// Post
Router.post('/', (req, res) => {
    const Book = new BookModel(req.body);
    console.log('Model '+Book);
    const authorId = Book.author;
    const genreId = Book.genre;
    //Book.authorId = authorId;
    //Book.genreId = genreId;
    Book.save().then(book => {
        console.log('before A '+ authorId);
        return AuthorModel.findByIdAndUpdate(authorId, { $push: { "books": book } });
        console.log('after A '+ authorId);
    }).then(book => {
        console.log('before G '+ genreId);
        return GenreModel.findByIdAndUpdate(genreId, { $push: { "books": book } });
        console.log('after G '+ genreId);
    }).then(() => {
        res.sendStatus(201);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

// Making the Router available
module.exports = Router;