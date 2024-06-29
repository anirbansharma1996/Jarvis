const run = require("../utils/Api.js");
const Gemini = require("../model/gemini.model.js");

const GetOutPut = async (req, res) => {
  try {
    const { prompt } = req.body;
    const author = req.user.userId;
    if (!author) {
      return res.status(404).send("invalid user");
    }
    const response = await run(prompt);
    const gemini = new Gemini({
      question: prompt,
      answer: response,
      user: author,
    });
    await gemini.save();
    res.status(200).json({ question: prompt, answer: response });
  } catch (error) {
    return res.status(503).json(error.message);
  }
};

const GetUserOutPut = async (req, res) => {
  try {
    const author = req.params.id;
    const q_a_list = await Gemini.find({ user: author }).populate("user");
    res.status(200).send(q_a_list);
  } catch (error) {
    return res.status(503).json(error.message);
  }
};

module.exports = { GetOutPut, GetUserOutPut };
