const express = require("express");
const centerModel = require("../Models/centerModel");
const stEnqModel = require("../Models/stEnqModel");
const userModel = require("../Models/userModel");
const centerRouter = express.Router();

centerRouter.get("/", async (req, res)=>{
    try {
        const center = await centerModel.find();
        return res.json({"msg": "Success", "center": center});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

centerRouter.post('/', async (req, res)=>{
    try {
        await centerModel.create(req.body);
        return res.json({"msg": "Added SUCCESS"})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

centerRouter.get("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const center = await centerModel.findById(id);
        return res.json({"msg": "Success", "center": center})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

centerRouter.put("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const center = await centerModel.findByIdAndUpdate(id, req.body);
        return res.json({"msg": "Update SUCCESS"})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

centerRouter.put("/:id/:st", async (req, res)=>{
    try{
        const {id, st} = req.params;
        let status = (st == "Active"?"Deactive":"Active"); //st == Active/Deactive & st ka OPPOSITE hoga status

        let enq_st = (st == "Active"?"b":"u");             //b- block | u-unblock | agr active btn show hoga to mtlb vo Deactive h vo center or usko block (bnd) krdo or agr Deactive btn show hora h mtlb vo center ACTIVE h or usko UNBLOCK (on) rkho

        let u_st = (st == "Active"?"Deactive":"Active");
        const center = await centerModel.findByIdAndUpdate(id, {status}); //status ko obj bnane k liye use {} me rkha h jisse status name ki KEY bn jayegi or uski value ko hm update kr skte hn
        
            await stEnqModel.updateMany({center: center.name}, {$set: {status:enq_st}})
            await userModel.updateMany({center: center.name}, {$set: {status:u_st}})
        return res.json({msg: "Update SUCCESS", center});
    }
    catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

centerRouter.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        await centerModel.findByIdAndDelete(id);
        return res.json({"msg": "Deleted"})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

module.exports = centerRouter;