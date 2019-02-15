/**
 * AuthenticationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
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
          const token = jwt.sign(user[0], sails.config.secret, {expiresIn: 60 * 60 * 24});
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

