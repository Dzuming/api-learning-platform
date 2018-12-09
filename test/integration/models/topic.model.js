var util = require('util');

describe('Topic (model)', function() {

  describe('get all Topics', function() {
    it('should get all topics', function (done) {
      Topic.getAll()
        .then(function(topics) {
          return util.inspect(topics, {
            test: test
          });

        })
        .catch(done);
    });
  });

});
