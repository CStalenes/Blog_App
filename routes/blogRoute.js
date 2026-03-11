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

router.get("/my-blogs", async (req, res) => {
    try{
        const myBlogs = await Blog.find();
        res.status(200).json({ 
            myBlogs,
        });
    } catch(err){
        res.status(500).json({
            message: "Error fetching blogs",
            err,
        })
    }
});

//dump clef valeur pour transformer les dico en json

module.exports = router;