const express = require("express");
const Blog = require("../models/blogSchema");
const router = express.Router();

router.post("/create-blog", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;