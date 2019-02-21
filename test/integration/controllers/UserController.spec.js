require('mocha-sinon');
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
  beforeEach(function (done) {
    const sendSingleEmail = require('../../../api/helpers/send-single-email');
    const mockedSendSingleEmailFunction = async function(inputs, exits){
      return exits.success(true);
    };
    this.sinon.stub(sendSingleEmail, 'fn').callsFake(mockedSendSingleEmailFunction);
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
