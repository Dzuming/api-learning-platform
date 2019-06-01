const nodemailer =  require("nodemailer");

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
    try {
      let transporter = nodemailer.createTransport({
        host: sails.config.custom.nodemailHost,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: sails.config.custom.nodemailUser,
          pass: sails.config.custom.nodemailPassword
        }
      });
      let info = await transporter.sendMail(inputs.options);
      return exits.success(info)
    } catch (e) {
      return exits.error(e)
    }
  }
};
