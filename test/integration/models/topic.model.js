var util = require('util');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('Topic (model)', function() {
  beforeEach((done) => {
    Topic.create({test: 'test'}).then(
      done()
    )
  });
  describe('get all Topics', function() {
    it('should get all topics', function (done) {
      Topic.find()
        .then(function(topics) {
          console.log(topics)
          expect(topics).to.be.an('array').that.contains.something.like({test: 'test'});
          done();
        })
        .catch(done);
    });
  });

});
