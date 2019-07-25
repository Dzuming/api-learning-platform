/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    name: {
      type: 'STRING',
      required: true,
      unique: false
    },
    email: {
      type: 'STRING',
      required: true,
      unique: true
    },
    password: {
      type: 'STRING',
      required: true
    },
    isDeleted: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    isActive: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    activationCodes:{
      collection: 'useractivation',
      via: 'user',
    }
  },
  beforeCreate: function (user, cb) {
    //TODO move it into helpers
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        return;
      }
      bcrypt.hash(user.password, salt, () => {
      }, (err, hash) => {
        if(err) {
          return;
        }
        user.password = hash;

        cb(null, user);
      });
    });
  },
  afterCreate: async function (user, cb) {
    await UserActivation.create({user: user.id, code: await sails.helpers.uuid()})
    cb(null, user);
  }
};
