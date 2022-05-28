const mongoose = require('mongoose');

const countingSchema = new mongoose.Schema({
    name: {type: String, require: true},
    num: {type: Number, require: true}
})

const model = mongoose.model('countingModels', countingSchema);

module.exports = model;