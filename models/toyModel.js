const Joi = require("joi");
const mongoose = require("mongoose");


let toySchema=new mongoose.Schema({
name:String,
info:String,
category:String,
img_url:String,
price:Number,
date_created:{
  type:Date, default:Date.now()
},
user_id:String
})
exports.toyModel=mongoose.model("toys",toySchema);

exports.validateToy=(_reqbody)=>{
  let joiSchema=  Joi.object({
    name:Joi.string().min(2).max(99).required(),
    info:Joi.string().min(2).max(99).required(),
    category:Joi.string().min(2).max(99).required(),
    img_url:Joi.string().min(2).max(99).required(),
    price:Joi.number().min(1).max(9999).required()
  })
  return joiSchema.validate(_reqbody);
}