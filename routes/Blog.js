const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { createBlog , editBlog, getAllBlogs, myBlogs, searchBlog} = require("../controllers/Blogs");

router.post("/create-blog", auth, createBlog);
router.post("/edit-blog", auth, editBlog);
router.get("/blogs", auth, getAllBlogs);
router.get("/myblogs", auth, myBlogs);
router.get("/search-blog", auth, searchBlog);


module.exports = router; 