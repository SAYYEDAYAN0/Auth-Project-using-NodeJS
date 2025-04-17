const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/login")


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);





