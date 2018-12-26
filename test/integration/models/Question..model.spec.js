var chai = require('chai');
var expect = chai.expect;
var faker = require('faker');

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('Question (model)', () => {
  var title = faker.lorem.sentence();
  var description = faker.lorem.paragraphs();
  beforeEach(done => {
    return Question.create({ title, description  }).then(done());
  });
  describe('get all Questions', () => {
    it('should get all questions', done => {
      Question.find()
        .then(topics => {
          expect(topics)
            .to.be.an('array')
            .that.contains.something.like({title, description, isHidden: false});
          done();
        })
        .catch(done);
    });
  });
});
