const run = require("../utils/Api.js");

const GetOutPut = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await run(prompt);
    res.status(200).json({ question: prompt, answer: response });
  } catch (error) {
    return res.status(503).json(error.message);
  }
};

module.exports = GetOutPut;
