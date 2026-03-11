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

router.get("/my-blogs/:id", async (req, res) => {
    try{
        const myBlogId = await Blog.findById(req.params.id);
        if(!myBlogId){
            return res.status(400).json({
                 message: "Blog not found",
            });
        }
        res.status(200).json({
            myBlogId,
        });
    } catch(err){
        res.status(500).json({
            message: "Error fetching blogs",
            err,
        });
    }
});


router.put("/update-blog/:id", async (req, res) =>{
    try{
       
        const blogUpdated = await Blog.findOne({ _id: req.params.id });
        if (!blogUpdated) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update the desired fields
        // This line uses the ternary operator to update the blog title:
        // If req.body.title is not undefined (i.e. if the request provides a new title),
        // then blog.title will take this new value. Otherwise, blog.title keeps its current value.
        
        blogUpdated.title = req.body.title !== undefined ? req.body.title : blogUpdated.title;
        blogUpdated.content = req.body.content !== undefined ? req.body.content : blogUpdated.content;
        blogUpdated.author = req.body.author !== undefined ? req.body.author : blogUpdated.author;

        // Save blog update
        await blogUpdated.save();
        res.status(200).json({ 
            message: "Blog updated",
            blogUpdated
        });
    } catch (err){
        res.status(500).json({
            message: "Blog not found",
            err,
        });
    }

});

//dump clef valeur pour transformer les dico en json

module.exports = router;