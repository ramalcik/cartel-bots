const mongoose = require("mongoose");

const schema = mongoose.model("MonthlyMember", new mongoose.Schema({
   _id: String,
   Role: false,

}));


module.exports = schema;