var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('Topic (model)', () => {
  beforeEach(done => {
    return Topic.create({ test: 'test' }).then(done());
  });
  describe('get all Topics', () => {
    it('should get all topics', done => {
      Topic.find()
        .then(topics => {
          expect(topics)
            .to.be.an('array')
            .that.contains.something.like({ test: 'test' });
          done();
        })
        .catch(done);
    });
  });
});
