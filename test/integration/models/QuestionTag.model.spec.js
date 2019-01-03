var chai = require('chai');
var expect = chai.expect;
var faker = require('faker');

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('QuestionTag (model)', () => {
  var name = faker.lorem.sentence();
  var title = faker.lorem.sentence();
  var description = faker.lorem.paragraphs();

  beforeEach(async () => {
    await Tag.create({ id: 1, name });
    await Question.create({ id: 1, title, description });
    await Question.addToCollection(1, 'tags', 1);
  });
  describe('get all QuestionTag', () => {
    it('should get all QuestionTag', done => {
      Question.find().populate('tags')
        .then(questions => {
          console.log(questions)
          expect(questions)
            .to.be.an('array')
            .that.contains.something.like({
              title,
              description,
              tags: [{name}]
            });
          done();
        })
        .catch(done);
    });
  });
});
