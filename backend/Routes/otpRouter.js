const express = require('express');
const otpRouter = express.Router();
const nodemailer = require('nodemailer');
const userModel = require('../Models/userModel');

const tp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "jeeyaagrawal14@gmail.com",
        pass: "jjiipzqjhqmzmzxf"
    }
});

otpRouter.post('/send_otp', async(req, res)=>{
    try {
        const {email} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({"msg": "User Not Found!"});
        }
        const otp = Math.floor(100000 + Math.random()* 900000).toString() // Math.random() runs b/w 0 to 1 bt nvr comes EXACT 0 or 1 || 6 digit random OTP Generated!
        user.otp = otp;
        user.otpExpire = Date.now() + (5*60*1000) // (5 min * 60 sec *1000 mili sec) - dat.now() se time mili sec(1000) me chlta h to usko min me convert krne k liye pehle secons(60 sec = 1min) then kitna min(5) se multiply krte hn
        user.otpVerified = false;

        await user.save();

        await tp.sendMail({
            from: "jeeyaagrawal14@gmail.com",
            to: email,
            subject: "OTP Verfication",
            text: `Your OTP is ${otp}`
        });

        return res.json({"msg": "Success"});
    } 
    catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

otpRouter.post('/verify_otp', async(req, res)=>{
    try {
        const {email, otp} = req.body;
        const user = await userModel.findOne({email}); //await needy nhi h async k baad, but async needy h await likhne k baad || time taking process jo hoti h vaha await lgaate hn
        if(!user){
            return res.json({"msg": "User Not Found!"});  //this nvr run bcz agar user nhi hota to yaha tk aata hi nhi
        }
        if(user.otp != otp){
            return res.json({"msg": "OTP Not Matched!"});
        }
        if(user.otpExpire < Date.now()){
            return res.json({"msg": "OTP Expired!"});
        }
        user.otpVerified = true;
        user.save();
        res.json({"msg": "Success"});
    } 
    catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

otpRouter.post('/create_pass', async (req, res)=>{
    try {
        const {email, newPass} = req.body;
        const user = await userModel.findOne({email});
        if(!user.otpVerified){ // false pr chlega
            return res.json("NOT Verified!");  
        }
        user.password = newPass;
        user.save();
        return res.json({"msg": "Success"});
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }
});

module.exports = otpRouter;