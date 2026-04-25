import React, { useEffect, useState } from 'react'
import bg1 from '../assets/bg1.png'
import p1 from '../assets/p1.png'
import axios from 'axios';
import { toast } from 'react-toastify';

function CProfile() {
    const [user, setUser] = useState({});
    const [check, setCheck] = useState(false);
    const [qua, setQua] = useState("");
    const [skill, setSkill] = useState("");
    const [exp, setExp] = useState("");
    const [address, setAddress] = useState("");

    try {
        const getUser = async ()=>{
            const res = await axios.get(`http://localhost:3000/api/user/${localStorage.getItem('Counselor')}`);
            if(res.data.msg == "Success"){
                setUser(res.data.user);
                setQua(res.data.user.qua || "");
                setSkill(res.data.user.skill || "");
                setExp(res.data.user.exp || "");
                setAddress(res.data.user.address || "");
            }
        }
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    useEffect(()=>{
        getUser();
    }, []);

    async function updateProfile() {
        try {
            if(check){
                const dataUser = {qua, skill, exp, address};
                const res = await axios.put(`http://localhost:3000/api/user/${localStorage.getItem('Counselor')}`, dataUser);
                if(res.data.msg == "Update SUCCESS"){
                    toast.success("Update SUCCESS");
                    getUser();
                }
                else{
                    toast.error("Something Went Wrong");
                }
            }
        } catch (error) {
            return res.json({"msg": "Something Went Wrong!", "error": error});
        }
    }

    async function uploadPic(p){
        try {
            if(p){
                const res = await axios.patch(`http://localhost:3000/api/user/${localStorage.getItem("Counselor")}`, {'profilePic': p} ,{headers: {"Content-Type": "multipart/form-data"}});
                console.log(res);
                if(res.data.msg == "Success"){
                    toast.success("Profile Pic Updated");
                    getUser();
                }
                else{ 
                    toast.error("Something Went Wrong!");
                } 
            }
            else{ toast.error("No Image Selected!"); }
        } catch (error) {
            return res.json({"msg": "Something Went Wrong!", "error": error});
        }
    }

    
return (
    <>
     <div className="row py-4" style={{backgroundImage: `url(${bg1})`, height: '85vh', backgroundSize: 'cover', overflow: 'auto'}}>

        <div className="col-md-5 p-3 mx-auto rounded-4 shadow-lg" style={{backgroundColor: 'white'}}>
            <div className="position-relative">
                <img src={`http://localhost:3000/upload/${user.profilePic}`} className='w-50 h-25 mx-auto d-block rounded-5 shadow p-2' alt="" style={{filter: "drop-shadow(5px 5px 10px grey)"}}/>
                <label htmlFor="profilePic" className='bg-danger'>
                    <i className='fa fa-pen position-absolute py-2 text-warning bg-dark rounded-circle' style={{right: "27%", bottom: "12%", width: "30px", boxShadow: "2px 2px 5px inset grey, 2px 2px 5px grey"}}></i>
                </label>
                <input type="file" id='profilePic' className='d-none' onChange={(e)=>{uploadPic(e.target.files[0])}}/>
            </div>

            <div className="row mt-4 px-3">
                <div className="col-md-12"><h6>Name: {user.name}</h6></div>
                <div className="col-md-12"><h6>Mobile: {user.num}</h6></div>
                <div className="col-md-12"><h6>Email: {user.email}</h6></div>
                <div className="col-md-12"><h6>Role: {user.role}</h6></div>
                <div className="col-md-12"><h6>Center: {user.centers}</h6></div>
                <div className="col-md-12">
                    <h6>Qualification: {check? <input className='w-100 form-control my-2' type="text" value={qua} onChange={(e)=>{setQua(e.target.value)}}/> : qua || "--"}</h6>
                </div>
                <div className="col-md-12">
                    <h6>Skills: {check? <input className='w-100 form-control my-2' type="text" value={skill} onChange={(e)=>{setSkill(e.target.value)}}/> : skill || "--"}</h6>
                </div>
                <div className="col-md-12">
                    <h6>Experience: {check? <input className='w-100 form-control my-2' type="text" value={exp} onChange={(e)=>{setExp(e.target.value)}}/> : exp || "--"}</h6>
                </div>
                <div className="col-md-12">
                    <h6>Address: {check? <textarea className='w-100 form-control my-2' value={address} onChange={(e)=>{setAddress(e.target.value)}}></textarea> : address || "--"}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className='btn btn-warning form-control mt-5' onClick={()=>{setCheck(!check); updateProfile()}}>Update</button>
                </div>
            </div>

        </div>

        <div className="col-md-6 mx-auto">
            <div className="row h-50 pb-2">
                <div className="col-md-12 p-3 rounded-3 shadow-lg" style={{backgroundColor: 'white'}}></div>
            </div>
            <div className="row h-50 pt-2">
                <div className="col-md-12 p-3 rounded-3 shadow-lg" style={{backgroundColor: 'white'}}></div>
            </div>
        </div>
     </div>
    </>
)
}

export default CProfile