'use strict';

// Adding Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Generating the Log File
mongoose.set('debug', false);

// Requiring the Schema
const BookModel = mongoose.model('Book');

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
    Book.save().then(book => {
        res.json(book);
        res.sendStatus(201);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

// Making the Router available
module.exports = Router;