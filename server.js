const express = require("express");
const connectDB = require("./config");
const Blog = require("./blogSchema");

const app = express();
app.use(express.json());

connectDB();

app.post("/api/blogs", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});