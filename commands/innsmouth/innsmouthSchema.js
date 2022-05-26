const mongoose = require('mongoose');

const innsmouthSchema = new mongoose.Schema({
    userID: {type: String, require: true}
})

const model = mongoose.model('innsmouthModel', innsmouthSchema);

module.exports = model;