var mailgun = require('mailgun-js')({apiKey: sails.config.custom.mailgunSecret, domain: sails.config.custom.mailgunDomain});
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
    console.log('hmm');
    mailgun.messages().send(inputs.options, (error, body) => {
      if(error){
        return exits.error(error);
      }

      // All done.
      return exits.success(body);
    });
  }
};
