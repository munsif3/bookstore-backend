'use strict';

// Adding Dependencies
const mongoose = require('mongoose');
const SequenceGenerator = require('mongoose-sequence-plugin');

// Requiring the Mongoose Schema
const Schema = mongoose.Schema;

// Declaring the User Schemas
const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }
});

// Plugging in an auto generated field
UserSchema.plugin(SequenceGenerator, {
    field: 'userId',
    startAt: '001',
    prefix: 'US-'
});


const User = mongoose.model('User', UserSchema);

// Making the Schema available
module.exports = User;
