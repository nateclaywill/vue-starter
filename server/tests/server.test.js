// ------------------------------------------------------------------------------
// server.test.js
//
// Setup testing for server-side application.
// ------------------------------------------------------------------------------

// Node modules
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

// Import express app
const { app } = require('../../server');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

// Sample test
describe('Create test user', () => {
    it('should create a new user', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((response) => {
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });
});

// ------------------------------------------------------------------------------

