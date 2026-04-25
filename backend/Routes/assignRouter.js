const express = require("express");
const assignModel = require("../Models/assignModel");
const assignRouter = express.Router();

assignRouter.post('/', async(req, res)=>{
    try {
        await assignModel.create(req.body);
        return res.json({"msg": "Success"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

assignRouter.get('/', async(req, res)=>{
    try {
        const assign = await assignModel.find();
        return res.json({"msg": "Success", assign});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

module.exports = assignRouter;
