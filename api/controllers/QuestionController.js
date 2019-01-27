/**
 * QuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getQuestions: async (req, res) => {
    Question
      .find()
      .then((question) => res.status(200).send(question))
      .catch(err => res.status(500).send(err));
  }

};

