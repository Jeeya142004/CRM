import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

function ForgetPass() {
    const [step, setStep] = useState(1);
    const [email,  setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPass,  setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/otp/send_otp", {email});
        if(res.data.msg == "Success"){
            toast.success("OTP Sent!");
            setStep(2);
        }
        else{
            toast.error(res.data.msg || "OTP Not Sent");
        }
        } 
        catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!")
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/otp/verify_otp", {email, otp});
        if(res.data.msg == "Success"){
            toast.success("Verification Done ✅");
            setStep(3);
        }
        else{
            toast.error(res.data.msg || "NOT Verified!");
        }
    }

    const resetPass = async (e) => {
        e.preventDefault();
        if (newPass !== confirmPass){
            return toast.error("Password NOT Mached!");
        }
        const res = await axios.post("http://localhost:3000/api/otp/create_pass", {email, newPass});
        if(res.data.msg == "Success"){
            toast.success("New Password Created! ✅");
            setStep(1);
            navigate('/log');
        }
        else{
            toast.error(res.data.msg || "Password Not Created!");
        }
    };


  return (
    <>
     <div className="row p-0 m-0">
        <div className="col-sm-5 my-5 mx-auto">
            <h5>Forget Password</h5>
            <br />
            {step==1 && (
                <form action="" onSubmit={sendOtp} className='p-5 shadow-lg'>
                Enter Your Email: <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' />
                <br />
                <input type="submit" value="Sent OTP" className='form-control btn btn-primary'/>
            </form>
            )}

            {step==2 && (
                <form action="" onSubmit={verifyOtp} className='p-5 shadow-lg'>
                Enter Your OTP: <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} className='form-control' />
                <br />
                <input type="submit" value="Verify OTP" className='form-control btn btn-primary'/>
            </form>
            )}

            {step==3 && (
                <form action="" onSubmit={resetPass} className='p-5 shadow-lg'>
                Enter Your New Password: <input type="password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} className='form-control' />

                <br />

                Confirm Your New Password: <input type="pasword" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} className='form-control' />
                <br />
                <input type="submit" value="Submit" className='form-control btn btn-primary'/>
            </form>
            )}
        </div>
     </div>
    </>
  )
}

export default ForgetPass