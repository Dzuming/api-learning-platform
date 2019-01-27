/**
 * TagController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getTags: (req, res) => {
    Tag
      .find()
      .then((tag) => res.status(200).send(tag))
      .catch(err => res.status(500).send(err));
  },
  postTag:  async (req, res) => {
    try {
      const createTag =  Tag.create({ name: req.body.name});
      const latestTag = await createTag.fetch();
      return res.status(200).send(latestTag)
    } catch (err) {
      res.status(500).send(err)
    }
  }
};

