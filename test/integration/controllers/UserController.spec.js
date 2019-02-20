const chai = require('chai');
const faker = require('faker');
const supertest = require('supertest');
const expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('UserController', () => {
  const name = faker.lorem.sentence();
  const email = faker.internet.email();
  const password = faker.internet.password();
  before(function (done) {

    done()
  });
  it('should create account', function (done) {
    supertest(sails.hooks.http.app)
      .post('/user')
      .send({name, email, password})
      .expect(200)
      .then(response => {
        expect(response.body.success).to.equal(true);
        done();
      })
  });
});
