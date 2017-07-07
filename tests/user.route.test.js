'use strict';

const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');

//const app = require('server.js');
const app = require('./server');

const agent = request.agent(app);

//create a test suite and pass a callback function
describe('User route tests', function () {

    const user = {
        username: 'Munsif',
        password: 'Musthafa',
        role: 'Doctor'
    };

    it('should add a new user', done => {
        agent.post('/users')
            .send(driver)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            })
    });
});
