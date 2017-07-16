'use strict';

// Adding Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Generating the Log File
mongoose.set('debug', false);

// Requiring the Schema
const AuthorModel = mongoose.model('Author');
const BookModel = mongoose.model('Book');

// Creating the Express Router
const Router = express.Router();

// Get all
Router.get('/', (req, res) => {
    AuthorModel.find().then(authors => {
        res.json(authors);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

// Get by Id
Router.get('/:id', (req, res) => {
    AuthorModel.findById(req.params.id).exec().then(authors => {
        res.json(authors);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

// Post author
Router.post('/', (req, res) => {
    const Author = new AuthorModel(req.body);
    Author.save().then(author => {
        res.json(author);
        res.sendStatus(201);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

// Post a Book
Router.post('/:id/books', (req, res) => {
    let book = new BookModel(req.body);
    const authorId = req.params.id;
    book.author = authorId;
    book.save().then(books => {
        return AuthorModel.findByIdAndUpdate(authorId, { $push: { "books": books } });
    }).then(() => {
        return BookModel.findById(authorId).populate("books").exec;
    }).then(authors => {
        res.json(authors);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Post a Book,author and genre
Router.post('/:id/books', (req, res) => {
    let book = new BookModel(req.body);
    const authorId = req.params.id;
    book.author = authorId;
    book.save().then(books => {
        return AuthorModel.findByIdAndUpdate(authorId, { $push: { "books": books } });
    }).then(() => {
        return BookModel.findById(authorId).populate("books").exec;
    }).then(authors => {
        res.json(authors);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

//UserModel.count({ role: "Administrator" }).exec()

// Making the Router available
module.exports = Router;