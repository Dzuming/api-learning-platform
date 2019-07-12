const nodemailer =  require('nodemailer');
const cleanDeep = require('clean-deep');
module.exports = {


  friendlyName: 'Send single email',


  description: '',


  inputs: {
    options:{
      type:'json'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    // create reusable transporter object using the default SMTP transport
    const params = {
      host: sails.config.custom.nodemail.host,
      port: sails.config.custom.nodemail.port,
      ignoreTLS: sails.config.custom.nodemail.ignoreTLS,
      secure: sails.config.custom.nodemail.secure, // true for 465, false for other ports
      auth: {
        user: sails.config.custom.nodemail.user,
        pass: sails.config.custom.nodemail.password
      }
    };
    try {
      let transporter = nodemailer.createTransport(cleanDeep(params));
      let info = await transporter.sendMail(inputs.options);
      return exits.success(info);
    } catch (e) {
      return exits.error(e);
    }
  }
};
