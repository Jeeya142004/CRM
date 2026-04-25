const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    num: {type: String, required: true},
    password: {type: String, default: "1234"},
    role: {type: String, required: false},
    centers: {type: String, required: true},
    qua: {type: String},
    skill: {type: String},
    exp: {type: String},
    address: {type: String},
    profilePic: {type: String},
    status: {type: String, default:"Active"},
    otp: String,
    otpExpire: Date,
    otpVerified: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);