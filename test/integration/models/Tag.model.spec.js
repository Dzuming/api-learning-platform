var chai = require('chai');
var expect = chai.expect;
var faker = require('faker');

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('Tag (model)', () => {
  var name = faker.lorem.sentence();
  beforeEach(done => {
    return Tag.create({ name }).then(done());
  });
  describe('get all Tags', () => {
    it('should get all tags', done => {
      Tag.find()
        .then(tags => {
          expect(tags)
            .to.be.an('array')
            .that.contains.something.like({
              name
            });
          done();
        })
        .catch(done);
    });
  });
});
