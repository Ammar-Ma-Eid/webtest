const express = require("express");
const Router = express.Router();
const cors = require("cors");
const User = require("../models/userSchema.js");

Router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

Router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("Fetch users error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
Router.post("/login",async(req,res)=>{
try {
    const {Email,Password}=req.body;
    //check if use exist
    const user=await User.findOne({Email});
    if(!user){
        return res.json({
            error:"No User Found"
        })
    }
    //check if password match
    var match=false;
    if(Password===user.Password){
        match =true;
    }
    else{
        match=false;
    }
    if(!match){
        return res.json({
            error:"Incorrect Password"
        })
    }
    else{
        res.json('Password Match Login Successfully');
    }
} catch (error) {
    console.log(error);
}
});
Router.post("/register", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    console.log(Name, " ", Email, " ", Password);

    if (!Name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    if (!Password || Password.length < 6) {
      return res.status(400).json({
        error: "Password is required and must be more than 6 characters",
      });
    }
    const exist = await User.findOne({ Email });
    console.log("Exist result:", exist);

    if (exist) {
      return res.status(400).json({
        error: "Email Already Exists",
      });
    }
    const user = new User({ Name, Email, Password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = Router;
