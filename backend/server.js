//import express package
const express = require("express");
const cors = require("cors");

const { default: mongoose } = require("mongoose");
const User = require("./models/userModel");
const Post = require("./models/postModel");


//configure your app
const app = express();

//GET Requests
//app.use(express());
app.use(express.json());
app.use(cors());

//configuring a database(mongodb)
const MongoDBURL = "mongodb://localhost/blogclass";
mongoose
  .connect(MongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => console.log(err));

//api's
// app.post("/api/users/register", function (req, res) {
//   console.log(req.body);
// });

//REGISTER USER ROUTE
app.post("/api/users/register", async (req, res) => {
  //check if email already exists & cancelling registeration if true
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    res.send({ error: "Email has already been used" }); //sends error message to frontend
    console.log({ error: "Email has already been used" }); //logs error msg to terminal
    return;
  }

  const existingUsername = await User.findOne({ username: req.body.username });
  if (existingUsername) {
    res.send({ error: "Username has already been used" }); 
    console.log({ error: "Username has already been used" }); 
    return;
  }

  //creating a new user in db
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    //isAdmin: true               //creating an admin
  });

  //saving a new user
  const user = await newUser.save();
  res.send({ success: "Registeration Successful" });
  console.log({ success: "Registeration Successful" });
});




//LOGIN ROUTE
app.post("/api/users/login", async (req, res) => {
  //checking if username exists
  const existingUser = await User.findOne({ username: req.body.username });
  if (!existingUser) {
    //if there is no existing username
    res.send({ error: "Username does not exist" });
    console.log({ error: "Username does not exist" });
    return;
  }

  //check for correct password
  if (existingUser.password !== req.body.password) {
    res.send({ error: "Password is Incorrect" });
    console.log({ error: "Password is Incorrect" });
    return;
  }
  let user = {
    _id : existingUser._id,
    username: existingUser.username,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName
    //isAdmin: existingUser.isAdmin,
  }

  res.send({ success: "Login Successful" , user});    // 'user' can also be written as user: user.
  console.log({ success: "Login Successful"}); 
});


//New Post
app.post("/api/posts", async (req, res) => {
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image
  });

  const product = await newPost.save();
  res.send({success : "Blog Posted Successfully"});
  console.log({success : "Blog Posted Successfully"});
});


//Getting posts
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({"updatedAt" : 1}).populate("author");
  res.send(posts);
  //console.log(posts)
});

//getting all posts by single user
app.get("/api/posts/:id", async(req, res) => {
  const uid =  req.params.id;
  const posts = await Post.find().populate("author");
  let currentUserPosts = [];
  for(i=0; i<posts.length; i++){
    if(posts[i].author._id == uid){
      //currentUserPosts.push(posts[i]);
      currentUserPosts = [...currentUserPosts, posts[i]];
      //console.log(posts[i].author.username);
    }
  }
  
  res.send(currentUserPosts);
  //console.log(currentUserPosts.length);
});


//Post page 
app.get("/api/post/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("post id:", postId)
  //get post from the database using postId
  const post = await Post.findById(postId).populate("author");
  res.send(post);   //sending post to the frontend
  console.log("post: ",post);
});

//UPDATE A SINGLE post
app.put("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;
  //get post from the database using postId
  const post = await Post.findById(postId);
  
  //updating post
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;

  //saving product
  await post.save();
  res.send({success: "Post Updated Successfully"});
  console.log({success: "Post Updated Successfully"});
});

 
//DELETE SINGLE POST API
app.delete("/api/posts/:id", async (req, res) => {
  //getting ID of post to delete
  const postId = req.params.id;
  //delete post from DB
  await Post.findByIdAndRemove(postId);
  res.send({success: "Post Deleted Successfully"});
});



//listen on a server(starting a server)
app.listen("5000", () => {
  console.log("Listening on port:5000");
});