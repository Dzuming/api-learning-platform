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
  },
  beforeCreate: function (user, cb) {
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
  }
};
