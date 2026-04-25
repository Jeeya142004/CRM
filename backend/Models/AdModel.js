const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
    "email": { type: String, required: true, unique:true },
    "password": { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model("admin", adSchema);