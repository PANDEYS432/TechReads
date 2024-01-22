const express = require("express");
const router = express.Router();
const User = require("../models/usersModel.jsx");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
// register a new user

//normal call back always async cll and try catch block
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "Email already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //create new user
    const newUser = new User(req.body);
    await newUser.save();
    return res.send({
      success: true,
      message: "User created successfully , please login",
    });
} 
catch(error) {
  return res.send({
    success: false,
    message: error.message,
  });
}
});

//login a user
router.post("/login", async(req,res)=>{
 try {
  // check if user exist
  const user= await User.findOne({email:req.body.email});
  if(!user){
    return res.send({
      success: false,
      message: "User does not exist",

    });
  }

  //check if password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validPassword) {
    return res.send({
      success: false,
      message: "Invalid password",
    });
  }
  //create and assign a token
  const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
    expiresIn: "1d",
  });
  return res.send({
    success: true,
    message: "Login successful",
    data: token,
  });
} catch (error) {
  return res.send({
    success: false,
    message: error.message,
  });
}
});

module.exports = router;