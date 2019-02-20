/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createUser:  async (req, res) => {
    try {
      await User.create({ name: req.body.name, email: req.body.email, password: req.body.password  });
      return res.status(200).send({success: true})
    } catch (err) {
      res.status(500).send({err, status: false})
    }
  },
};

