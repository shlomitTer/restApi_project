const mongoose = require('mongoose');
const {config}=require('../config/secret');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userMongo}:${config.mongoPass}@cluster0.do2lk.mongodb.net/toysDB`);
  console.log("mongo connect");
}