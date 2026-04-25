import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function AdViewUser({ onEdit }) {
  const [user, setUser] = useState([]);

  // Fetch users
  try {
    const getUser = async ()=>{
      const response = await axios.get('http://localhost:3000/api/user');
      if(response.data.msg === "Success"){
        setUser(response.data.user);
      }
    };
  } 
  catch (error) {
    return res.json({"msg": "Something Went Wrong!", "error": error});  
  }
 
  useEffect(()=>{
    getUser();
  }, []);

  // Delete user
  try {
    const dltUser= async (id)=>{
      if(window.confirm("Are you sure to DELETE it?")){
        const res = await axios.delete(`http://localhost:3000/api/user/${id}`);
        if(res.data.msg === "Deleted"){
          toast.success("User DELETED Successfully");
          getUser();
        } else {
          toast.error("Something went wrong");
        }
      }
    };
  } 
  catch (error) {
    return res.json({"msg": "Something Went Wrong!", "error": error});
  }

  // Change status
  try {
    async function changeStatus(id, st) {
      const res = await axios.put(`http://localhost:3000/api/user/${id}/${st}`);
      if(res.data.msg === "Update SUCCESS") {
        toast.success("STATUS Updated!");
        getUser();
      }
      else{ toast.error("Something Went Wrong")}
    }
  } 
  catch (error) {
    return res.json({"msg": "Something Went Wrong!", "error": error});
  }

  return (
    <>
     <div className="userdash-card">
        <h4 className="userdash-title">Existing Users</h4>
        <table className="userdash-table">
            <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Center</th>
                  <th>Status</th>
                  <th colSpan={3} className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((e,i)=>(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.num}</td>
                        <td>{e.role}</td>
                        <td>{e.centers}</td>
                        <td><small>{e.status === "Active" ? "Active" : "Deactive"}</small></td>
                        <td>
                          <button 
                            onClick={()=>{changeStatus(e._id, e.status)}} 
                            className={`btn text-white ${e.status === "Active" ? "btn-danger" : "btn-success"}`}
                          >
                            {e.status === "Active" ? "Deactive" : "Active"}
                          </button>
                        </td>
                        <td>
                          <button 
                            className="userdash-action userdash-edit" 
                            onClick={()=>onEdit(e)}   
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button 
                            className="userdash-action userdash-delete" 
                            onClick={()=>dltUser(e._id)}
                          >
                            Delete
                          </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
     </div>
    </>
  )
}

export default AdViewUser;
