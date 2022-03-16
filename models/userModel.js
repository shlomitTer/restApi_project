const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require('../config/secret');


let userSchema=new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  date_created:{
    type:Date, default:Date.now() 
  },
  role:{
    type:String, default:"USER"
  }
});

exports.UserModel=mongoose.model("users",userSchema);

// generate token
exports.genToken=(_id,role)=>{
let token=jwt.sign({_id, role},config.secretWord,{expiresIn:"60mins"});
return token;
};

//sign up valdate 
exports.validateUser=(_reqBody)=>{
  let joiSchema=  Joi.object({
    name:Joi.string().min(2).max(99).required(),
    email:Joi.string().min(2).max(99).email().required(),
    password:Joi.string().min(2).max(99).required(),
  })
  return joiSchema.validate(_reqBody);
};

//login valdate 
exports.loginValidete=(_reqBody)=>{
  let joiSchema=  Joi.object({
    email:Joi.string().min(2).max(99).email().required(),
    password:Joi.string().min(2).max(99).required(),
  })
  return joiSchema.validate(_reqBody);
};






 