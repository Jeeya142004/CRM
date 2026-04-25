const express = require("express");
const userModel = require("../Models/userModel");
const stEnqModel = require("../Models/stEnqModel");
const userRouter = express.Router();
const upload = require("../Middleware/upload");

userRouter.get("/", async (req, res)=>{
    try {
        const user = await userModel.find();
        return res.json({"msg": "Success", "user": user});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

userRouter.post('/', async (req, res)=>{
    try {
        await userModel.create(req.body);
        return res.json({"msg": "User Added"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

userRouter.patch('/:id', upload.single('profilePic'), async (req, res)=>{ // ye upload file h jo hmne EXPORT kri h UPLOAD.JS se 
    try {
        const id = req.params.id;
        console.log(req.file);
        const user = await userModel.findByIdAndUpdate(id, {"profilePic": req.file.filename});
        return res.json({"msg": "Success"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

userRouter.get("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        return res.json({"msg": "Success", "user": user});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

userRouter.put("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, req.body);
        return res.json({"msg": "Update SUCCESS"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

userRouter.put("/:id/:st", async (req, res)=>{
    try {
        const {id, st} = req.params;
        const status = (st == "Active"?"Deactive":"Active");
        const user = await userModel.findByIdAndUpdate(id, {status});
        if(st == "Active"){
            await stEnqModel.updateMany({assignto: user._id}, {$set: {assignto: null}});
        }
        return res.json({"msg": "Update SUCCESS"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

userRouter.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        return res.json({"msg": "Deleted"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

module.exports = userRouter;