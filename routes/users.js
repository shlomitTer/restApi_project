const express= require("express");
const bycrypt = require ("bcrypt");
const {validateUser,UserModel, loginValidete, genToken } = require("../models/userModel");
const {auth } = require("../middleWares/auth");
const router = express.Router();

router.get("/", (req,res) => {
  res.json({msg:"Users work ****"});
})



//add new user
router.post("/", async(req,res) => {
 let validBody = validateUser(req.body);
 if(validBody.error){
  return res.status(400).json(validBody.error.details);
 }

 try{
  let user = new UserModel(req.body);
  user.password=await bycrypt.hash(user.password,10);
  await user.save();
  user.password = "****";
  res.status(201).json(user);
 }

 catch(err){
if(err.code==11000){
  return res.status(400).json({code:11000, err_msg:"Email is alreay in the system, please try log in"});
  }
  console.log(err);
  res.status(500).json(err);
 }
})

//login request
router.post("/login", async(req,res) => {
  let validBody = loginValidete(req.body);
  if(validBody.error){
   return res.status(400).json(validBody.error.details);
  }
  
 
  try{
    let user=await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.status(401).json({err_msg:"Invalid email or password"}); 
    }

    let validatePass=await bycrypt.compare(req.body.password, user.password);
    if(!validatePass){
      return res.status(401).json({err_msg:"Invalid email or password"}); 
    }
    let token=genToken(user._id);
    res.json({token});
  
  }
 
  catch(err){
   console.log(err);
   res.status(500).json(err);
  }
 })
 
 //user's info
router.get("/userInfo", auth , async(req,res) => {
  try{
    let data = await UserModel.findOne({_id:req.tokenData._id},{password:0})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err)
  }

})
module.exports = router;