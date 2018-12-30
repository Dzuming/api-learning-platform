module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    isHidden: {
      type: 'boolean',
      defaultsTo: false
    },
    tags:{
      collection: 'tag',
      via: 'question',
      through: 'questiontag'
    }
  }
};
