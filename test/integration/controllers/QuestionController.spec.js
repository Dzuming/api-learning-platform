var chai = require('chai');
var supertest = require('supertest');
var faker = require('faker');
var expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('QuestionController.getQuestions', function() {
  describe('#getQuestions()', function() {
    var title = faker.lorem.sentence();
    var description = faker.lorem.paragraphs();
    beforeEach(done => {
      return Question.create({ title, description  }).then(done());
    });
    it('should get all questions', function (done) {
      supertest(sails.hooks.http.app)
        .get('/questions')
        .expect(200)
        .then(response => {
          expect(response.body)
            .to.be.an('array')
            .that.contains.something.like({title, description, isHidden: false});
          done();
        })
    });
  });

});
