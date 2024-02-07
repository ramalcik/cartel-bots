const mongoose = require("mongoose");

const schema = mongoose.model('rapor', new mongoose.Schema({
_id: String,
Cezalandırmalar: { type: Object },
Kayıtlar: { type: Object}
})
)

module.exports = schema;