const express = require("express");
const { toyModel, validateToy } = require("../models/toyModel");
const { auth } = require("../middleWares/auth");
const router = express.Router();

//GET request ?page=x&perPage=y query
router.get("/", async (req, res) => {
  try {
    let perPage = req.query.perPage || 10;
    let page = req.query.page||1;
    let data = await toyModel.find({})
      .limit(perPage)
      .skip((page - 1) * perPage);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg_err: "There is a problem with the server, please try again later" })
  }
})


//GET request/search by ?s= query
router.get("/search", async (req, res) => {
  try {
    let searchQ = req.query.s;
    let perPage = req.query.perPage || 10;
    let page = req.query.page||1;
    let searchReg = new RegExp(searchQ, "i");
    let data = await toyModel.find({ $or: [{ name: searchReg }, { info: searchReg }]})
      .limit(perPage)
      .skip((page - 1) * perPage);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg_err: "There is a problem in the server, please try again later" })
  }
})



//GET request/search by ?min=x&max= query
router.get("/prices", async (req, res) => {
  try {
    let searchMinQ = req.query.min;
    let searchMaxQ = req.query.max;
    let perPage = req.query.perPage || 10;
    let page = req.query.page||1;
    let data = await toyModel.find({ $and: [{ price: {  $gte: searchMinQ } }, { price: { $lte:searchMaxQ } }] })
      .limit(perPage)
      .skip((page - 1) * perPage);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg_err: "There is a problem with the server, please try again later" })
  }
})



//GET request/ search by category
router.get("/cat/:catname", async (req, res) => {
  try {
    let searchP = req.params.catname;
    let perPage = req.query.perPage || 10;
    let page = req.query.page||1;
    let searchReg = new RegExp(searchP, "i");
    let data = await toyModel.find({category:searchReg })
      .limit(perPage)
      .skip((page - 1) * perPage);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg_err: "There is a problem with the server, please try again later" })
  }
})

//POST request /add a toy
router.post("/", auth, async (req, res) => {
  let validBody = validateToy(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let toy = await new toyModel(req.body);
    toy.user_id = req.tokenData._id;
    await toy.save();
    res.status(201).json(toy);

  }
  catch (err) {
    console.log(err);
  }
})

//PUT request/edit a toy
router.put("/:editId", auth, async (req, res) => {
  let validateBody = validateToy(req.body);
  if (validateBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let idReq = req.params.editId;
    let data = await toyModel.updateOne({ _id: idReq, user_id: req.tokenData._id }, req.body);
    res.json(data);

  }
  catch (err) {
    console.log(err);
  }
})

//DELETE request/edit a toy
router.delete("/:delId", auth, async (req, res) => {

  try {
    let idReq = req.params.delId;
    let data = await toyModel.deleteOne({ _id: idReq, user_id: req.tokenData._id });
    res.json(data);

  }
  catch (err) {
    
    console.log(err);
  }
})

//GET request/ user's toys
router.get("/myToys", auth, async (req, res) => {
  try {
    let page=req.query.page||1;
    let data = await toyModel.find({ user_id: req.tokenData._id })
    limit(10)
    .skip((page-1)*page)
    .sort({date_created:-1});
    res.json(data);
  }
catch(err){
  console.log(err);

}
 })
module.exports = router;