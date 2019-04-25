const chai = require('chai');
const faker = require('faker');
const supertest = require('supertest');
const expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('AuthenticationController', () => {
  const name = faker.lorem.sentence();
  const email = faker.internet.email();
  const password = faker.internet.password();

  before(done => {
    return User.create({name, email, password   }).then(done());
  });
  it('should login success', (done) => {
    supertest(sails.hooks.http.app)
      .post('/login')
      .send({email, password})
      .expect(200)
      .then(response => {
        expect(response.body.success).to.equal(true);
        done();
      });
  });
  it('should login false', (done) => {
    supertest(sails.hooks.http.app)
      .post('/login')
      .send({email: 'random', password: 'random'})
      .expect(400)
      .then(response => {
        expect(response.body.success).to.equal(false);
        done();
      });
  });
});
