const mongoose = require("mongoose");

const assignSchema = mongoose.Schema({
    enqId: {type: String, ref: "StudentEnquiry"},
    assignby: {type: mongoose.Schema.Types.ObjectId, refPath: "assignbyModel"},
    assignbyModel: {type: String, enum: ['user' ,'admin']},         // enum tb uz krte hn jb hme limited ya 2-3 opsn hi rkhne ho
    assignto: {type: mongoose.Schema.Types.ObjectId, ref: "user"}, //assign kevl user (manager ya counselor) ko hi kr skte hn
    remark: {type: String},
    status: {type: String, default: "u"}
}, {timestamps: true}); 

module.exports = mongoose.model('assign', assignSchema);