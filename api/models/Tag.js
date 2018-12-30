module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    questions:{
      collection: 'question',
      via: 'tag',
      through: 'questiontag'
    }
  }
};
