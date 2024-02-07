const mongoose = require("mongoose");

const schema = mongoose.model('görevAlanlar', new mongoose.Schema({
   _id: String,
   Görevi: String,
   Tarihi: Date,
   yapmasıGereken: String
}));

module.exports = schema;