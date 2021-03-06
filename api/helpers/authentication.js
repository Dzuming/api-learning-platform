const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Authentication',


  description: 'Authentication something.',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    },
    res: {
      type: 'ref',
      description: 'The current response (res).',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const {req, res} = inputs;
    passport.authenticate('local', (err, user) => {
      if (!user) {
        res.status(400).send({
          success: false,
          message: 'invalidLogin'
        });
      } else {
        if (err) {
          res.status(400).send({
            success: false,
            message: 'unknownError',
            error: err
          });
        } else {
          //token expired in 1 day
          const token = jwt.sign(user[0], sails.config.custom.secret, {expiresIn: 60 * 60 * 24});
          // Set persistent cookie
          req.session.cookie.token = token;
          res.send({
            success: true,
            user: {email:user[0].email, username:user[0].username },
            token: token
          });
        }
      }
    })(req, res);
  }
};
