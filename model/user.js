const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
// user model
const User = mongoose.model('User', userSchema);
module.exports = User;

