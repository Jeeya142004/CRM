const mongoose = require("mongoose");

const followupSchema = mongoose.Schema({
    enqId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "StudentEnquiry:"},
    uid: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
    status: {type: String, required: true},
    nextDate: {type: String},
    programme: {type: String, required: true},
    remark: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("followup", followupSchema);