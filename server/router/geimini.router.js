const express = require("express");
const {
  GetOutPut,
  GetUserOutPut,
} = require("../controller/gemini.controller.js");
const authmiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/prompt", authmiddleware,GetOutPut);
router.get("/prompt/:id", authmiddleware, GetUserOutPut);

module.exports = router;
