import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ChPass(p) {
    const [cPass, setCPass] = useState("");
    const [nPass, setNPass] = useState("");
    const [cfPass, setCfPass] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const chCode = async (e)=>{
        e.preventDefault();
        console.log(p); //id & role=counselor aa rha h

        try {
            if(p.role != 'admin'){
                const res = await axios.get(`http://localhost:3000/api/user/${p.id}`)
                if(res.data.msg == "Success"){
                    setUser(res.data.user)
                    var ogPass = res.data.user.password;
                }
                if(ogPass && ogPass!=cPass){
                    toast.error("Wrong Password");
                    setCPass("");
                    setNPass("");
                    setCfPass("");
                }
    
                else if(ogPass == nPass){
                    toast.error("DO NOT Use Previous Password");
                    setNPass("");
                    setCfPass("");
                }
                else if(nPass != cfPass){
                    toast.error("Confirm Password Not Match");
                    setNPass("");
                    setCfPass("");
                }
                else{
                    if(p.role != 'admin'){
                        const data = {"password": nPass};
                        const res2 =  await axios.put(`http://localhost:3000/api/user/${p.id}`, data);
                        if(res2.data.msg == "Update SUCCESS"){
                            toast.success("Password Changed Successfully");
                            navigate('/log');
                        }
                        else{
                            toast.error("Something went Wrong!");
                            setCPass("");
                            setNPass("");
                            setCfPass("");
                        }
                    }
                }
            }
        } 
        catch (error) {
            return res.json({"msg": "Something Went Wrong!", "error": error});
        }
    }

return (
    <>
     <form action="" onSubmit={chCode} className='w-50 p-5 rounded-3 bg-light mx-auto my-5 shadow-lg'>
        <h4 className='text-center pb-2'>Change Password</h4>
        <input className='form-control' type="password" value={cPass} onChange={(e)=>setCPass(e.target.value)} placeholder="Current Password" name="" id="" />
        <br />
        <input className='form-control' type="password" value={nPass} onChange={(e)=>setNPass(e.target.value)} placeholder="New Password" name="" id="" />
        <br />
        <input className='form-control' type="password" value={cfPass} onChange={(e)=>setCfPass(e.target.value)} placeholder="Confirm Password" name="" id="" />
        <br />
        <input className='form-control btn btn-warning' type="submit" value="Change Password" />
        <br />
     </form>
    </>
)
}

export default ChPass