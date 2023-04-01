const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // add other fields as needed
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
