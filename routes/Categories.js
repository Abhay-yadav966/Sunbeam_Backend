const express = require("express");
const router = express.Router();

const { addCategory, getCategories } = require("../controllers/Categories");
const { auth } = require("../middleware/auth");

router.post("/add-category", auth, addCategory);
router.get("/get-categories", auth, getCategories)

module.exports = router;