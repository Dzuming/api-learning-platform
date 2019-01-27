/**
 * QuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getQuestions: (req, res) => {
    Question
      .find()
      .then((question) => res.status(200).send(question))
      .catch(err => res.status(500).send(err));
  },
  postQuestion:  async (req, res) => {
    try {
      const createQuestion =  Question.create({ title: req.body.title, description: req.body.description  });
      const latestQuestion = await createQuestion.fetch();
      return res.status(200).send(latestQuestion)
    } catch (err) {
      res.status(500).send(err)
    }
  }

};

