var chai = require('chai');
var expect = chai.expect;
var faker = require('faker');

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('User (model)', () => {
  const name = faker.lorem.sentence();
  const email = faker.internet.email();
  const password = faker.internet.password();
  beforeEach(done => {
    return User.create({ name, email, password }).then(done());
  });
  describe('get all users', () => {
    it('should get users', done => {
      User.find()
        .then(users => {
          expect(users)
            .to.be.an('array')
            .that.contains.something.like({
            name,
            email,
            isDeleted: false
          });
          done();
        })
        .catch(done);
    });
  });
});
