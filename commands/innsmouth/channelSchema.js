const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    channelID: {type: String, require: true}
})

const model = mongoose.model('channelModel', channelSchema);

module.exports = model;