'use strict';

// Adding Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Generating the Log File
mongoose.set('debug', false);

// Requiring the Schema
const GenreModel = mongoose.model('Genre');
const BookModel = mongoose.model('Book');

// Creating the Express Router
const Router = express.Router();

// Get all
Router.get('/', (req, res) => {
    GenreModel.find().then(genres => {
        res.json(genres);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

// Get by Id
Router.get('/:id/books', (req, res) => {
    GenreModel.findById(req.params.id).populate('books').exec().then(genres => {
        res.json(genres);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

// Post
Router.post('/', (req, res) => {
    const Genre = new GenreModel(req.body);
    Genre.save().then(genre => {
        res.json(genre);
        res.sendStatus(201);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

Router.delete('/:id', (res, req) => {
    GenreModel.findByIdAndRemove(req.params.id).then((genre) => {
        const genreIds = genre.books.map((genreId => genreId));
        return BookModel.remove({_id: {$in: genreIds}});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});


// Making the Router available
module.exports = Router;