const mongoose = require("mongoose");

const stEnqSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    college: {type: String, required: true},
    course: {type: String, required: true},
    branch: {type: String, required: true},
    year: {type: String, required: true},
    contactNum: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    purpose: {type: String, required: true},
    role: {type: String},
    center: {type: String},
    status: {type: String, default: "New"},
    assignto: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},  //ref(reference) = join(SQL join) | ref:"user" is foreign key which is buliding relation b/w 2 tables
    assignby: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    assigndate: {type: String},
    nextfollowupdate: {type: String},
    forprogram: {type: String},
    source: {type: String, default: "Walk-in"},
    remark: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('StudentEnquiry:', stEnqSchema);