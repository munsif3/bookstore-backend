'use strict';

// Adding Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Generating the Log File
mongoose.set('debug', false);

// Requiring the Schema
const AuthorModel = mongoose.model('Author');

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

// Post
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

// Making the Router available
module.exports = Router;