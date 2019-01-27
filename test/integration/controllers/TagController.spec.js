var chai = require('chai');
var supertest = require('supertest');
var faker = require('faker');
var expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('TagController', function() {
  var name = faker.lorem.sentence();
  beforeEach(done => {
    return Tag.create({ name }).then(done());
  });
  describe('#getTags()', function() {
    it('should get all questions', function (done) {
      supertest(sails.hooks.http.app)
        .get('/tags')
        .expect(200)
        .then(response => {
          expect(response.body)
            .to.be.an('array')
            .that.contains.something.like({name});
          done();
        })
    });
  });
  describe('#postTag()', function() {
    it('should create tag', function (done) {
      supertest(sails.hooks.http.app)
        .post('/tags')
        .send({name})
        .expect(200)
        .then(response => {
          expect(response.body)
            .include({name});
          done();
        })
    });
  });
});
