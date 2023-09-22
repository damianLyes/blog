const mongoose = require("mongoose");

//schema are similar to phpmyadmin tables 
const postSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String},
    content: {type: String},
    image: {type: String},
}, 
{
    timestamps: true
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post;