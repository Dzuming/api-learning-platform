/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createUser:  async (req, res) => {
    try {
      const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password  }).fetch();
      const latestUser = await User.findOne({id: user.id}).populate('activationCodes');
      const activationCodes = latestUser.activationCodes
      await sails.helpers.sendSingleEmail({
        to: req.body.email,
        from: sails.config.custom.nodemail.from,
        subject:'Subject',
        html: await sails.renderView('authentication', {
          name: latestUser.name,
          activationCode: activationCodes[activationCodes.length - 1].code
        })
      });
      return res.status(200).send({success: true});
    } catch (err) {
      res.status(500).send({err, status: false});
    }
  },
};
