const mongoose = require("mongoose");

//schema are similar to phpmyadmin tables 
const userSchema = mongoose.Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    isAdmin: {type: Boolean, default: false},
});


const User = mongoose.model("User", userSchema);
module.exports = User;