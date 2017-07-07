'use strict';

// Adding Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Creating the Express Application
const app = express();

// Requiring Models
require('./app/models/user.model');
require('./app/models/author.model');
require('./app/models/book.model');

// Requiring Routers
const BookStoreRouter = require('./app/routes/bookstore.route');

// Enabling CORS Support
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "GET,POST,PUT,DELETE");
    next();
});

// Requiring the DB Configuration File
const db = require('./config/db');

// Setting the PORT
const port = process.env.PORT || 7070;

// Replacing Mongoose Promise
mongoose.Promise = global.Promise;

// Connecting to DB
mongoose.connect(db.url, err => {
    if (err) {
        console.log('Unable to connect to MongoDB');
        console.log(err);
    }
    console.log('Successfully connected to MongoDB');
});

// Using dependent functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

// Returning for Root Request
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

// Returning other Requests
app.use('/api/authors', BookStoreRouter);

// Create Server and Listen for Requests
app.listen(port, err => {
    if (err) {
        console.log('Error listening on port ' + port);
        return;
    }
    console.log('Accepting Requests on ' + port);
});
