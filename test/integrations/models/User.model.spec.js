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
    return User.create({ name, email, password }).fetch().then(done());
  });
  describe('get all users', () => {
    it('should get users', done => {
      User.find().populate('activationCodes')
        .then(users => {
          expect(users)
            .to.be.an('array')
            .that.contains.something.like({
              name,
              email,
              isDeleted: false,
              isActive: false,
            });
          expect(users[0].activationCodes).to.have.lengthOf(1)
          done();
        })
        .catch(done);
    });
  });
});
