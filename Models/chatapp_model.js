const mongoose = require('mongoose');

const chatUser = mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

module.exports = mongoose.model('chatUser',chatUser);