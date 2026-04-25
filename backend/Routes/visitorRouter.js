const express = require("express");
const visitorModel = require("../Models/visitorModel");
const visitorRouter = express.Router();

visitorRouter.get("/", async (req, res)=>{
    try {
        const visitor = await visitorModel.find();
        return res.json({"msg": "Success", "visitors": visitor});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

visitorRouter.post('/', async (req, res)=>{
    try {
        await visitorModel.create(req.body);
        return res.json({"msg": "Post Success"})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

visitorRouter.get("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const visitor = await visitorModel.findById(id);
        return res.json({"msg": "Success", "visitor": visitor})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

visitorRouter.put("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const visitor = await visitorModel.findByIdAndUpdate(id, req.body);
        return res.json({"msg": "Update SUCCESS"})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

visitorRouter.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        await visitorModel.findByIdAndDelete(id);
        return res.json({"msg": "Deleted"})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

module.exports = visitorRouter;