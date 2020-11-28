const request = require('supertest');
const server = require('../src/index');
const expect = require('chai').expect;

describe('Login API', function() {
    it('Should success if credentials are valid', function(done) {
        request(server)
           .post('api/auth/siginIn')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ username: 'TKkd', email: 'Ta@b@gmail.com', password: 'Mn0r7h9djdj8@#@5' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});