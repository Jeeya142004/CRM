const express = require("express");
const AdModel = require("../Models/AdModel");
const userModel = require("../Models/userModel");
const stEnqModel = require("../Models/stEnqModel");
const centerModel = require("../Models/centerModel");
const AdRouter = express.Router();

AdRouter.post("/log", async (req, res)=>{
    try{
        const {email, password} = req.body;
        const admin = await AdModel.findOne({email});
        if(admin){
            if(admin.password == password){
                res.json({"msg": "Success", role: "admin", id: admin._id});
            }
            else{
                res.json({"msg": "Password NOT Matched"})
            }
        }
        else{
            const user = await userModel.findOne({email});
            if(user){
                if(user.password == password){
                    if(user.status != "Active"){
                        res.json({msg: "Your Account is blocked!"})
                    }
                    res.json({msg: "Success", role: user.role, id: user._id});
                }
                else{
                    res.json({"msg": "Password NOT Matched"})
                }
            }
            else{
                res.json({"msg": "User Not Found"})
            }
        }
    }
    catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    } 
});

AdRouter.get("/stats", async (req, res)=>{      //http://localhost:3000/api/admin/stats
    try {
        const enq = await stEnqModel.find();
        const user = await userModel.find();
        const center = await centerModel.find();
        res.json({"msg": "Success", "allEnq": enq.length, "allUser": user.length, "allCenter": center.length})
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
})

module.exports = AdRouter;