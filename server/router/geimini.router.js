const express = require("express");
const  GetOutPut  = require("../controller/gemini.controller.js");

const router = express.Router();

router.post("/prompt",GetOutPut);

module.exports = router;
