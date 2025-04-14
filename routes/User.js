const express = require("express");
const router = express.Router();

const { signUp, login} = require("../controllers/Auth");

// login
router.post("/login", login);

// signup
router.post("/signup", signUp);
 

module.exports = router;