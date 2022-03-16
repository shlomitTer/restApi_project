const jwt = require("jsonwebtoken");
const {config}=require('../config/secret');

exports.auth=(req,res,next)=>{
 let token =req.header("auth-token");
 if(!token){
   return res.status(401).json({err_msg:"need to send token to this endpoint url"})
 }

 try{
  let decodeToken = jwt.verify(token, config.secretWord);
  req.tokenData = decodeToken; 
  next()
}
catch(err){
  return res.status(401).json({err_msg:"Token invalid or expired"})
}

}