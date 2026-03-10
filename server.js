const express = require("express");
const connectDB = require("./config");
const blogRoute = require("./routes/blogRoute");
const PORT = 5000;
const app = express();
//const Blog = require("./models/blogSchema");
//const { default: mongoose } = require("mongoose");

//Middleware to parse incoming json request body
app.use(express.json());

//Connect to MongoDB using Mongoose
connectDB();

//User the user routes
app.use("/api",blogRoute);




// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});