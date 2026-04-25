const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
    role: {type: String, required: true},
    center: {type: String, required: true},
    name: {type: String, required: true},
    contact: {type: String, required: true},
    email: {type: String},
    purpose: {type: String},
    remark: {type: String},
    address: {type: String},
}, {timestamps: true});

module.exports = mongoose.model('Visitors:', visitorSchema);