const express = require("express");
const followupModel = require("../Models/followupModel");
const followupRouter = express.Router();

followupRouter.get('/', async (req, res)=>{
    try {
        const followup = await followupModel.find().populate('enqId').populate('uid');
        return res.json({"msg": "Success", followup});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

followupRouter.post('/', async (req, res)=>{
    try {
        await followupModel.create(req.body);
        return res.json({"msg": "Success"}); 
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

module.exports = followupRouter;