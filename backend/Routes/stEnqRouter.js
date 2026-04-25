const express = require("express");
const stEnqModel = require("../Models/stEnqModel");
const stEnqRouter = express.Router();

stEnqRouter.get('/', async (req, res)=>{
    try {
        const user = await stEnqModel.find().populate('assignto');
        return res.json({'msg': 'Success', 'enq': user});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

stEnqRouter.post('/', async (req, res)=>{
    try {
        const user = req.body;
        await stEnqModel.create(user);
        return res.json({'msg': 'Post Success'});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

stEnqRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await stEnqModel.findById(id);
        return res.json({"msg": "Fetch Success", "user": user});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

stEnqRouter.put('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        await stEnqModel.findByIdAndUpdate(id, req.body);
        return res.json({"msg": "Updation Success"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

stEnqRouter.delete('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        await stEnqModel.findByIdAndDelete(id);
        return res.json({"msg": "Deleted!"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

module.exports = stEnqRouter;