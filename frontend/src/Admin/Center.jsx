import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ViewCenters from './ViewCenters';
import Footer from '../Components/Footer';

function Center() {
  // states
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [editCen, setEditCen] = useState(null); // किस center को edit कर रहे हैं

    async function addCenter(e){
      e.preventDefault();
      const newCenter = {name, address, status};
      console.log("Saving Center:", newCenter);
      if(editCen){ 
        // ✅ Edit Mode
        try {
          const response = await axios.put(`http://localhost:3000/api/center/${editCen}`, newCenter);
          if(response.data.msg == "Update SUCCESS"){
            window.alert("Center Updated Successfully");
            getCenters();   // fresh list reload
            setEditCen(null); // edit mode बंद
            setName(""); setAddress(""); setStatus("");
          } else {
            window.alert("Something Went Wrong");
          }
        } 
        catch (error) {
          return res.json({"msg": "Something Went Wrong!", "error": error});
        }
      } 
      else {
        // ✅ Add Mode
        try {
         const response = await axios.post('http://localhost:3000/api/center', newCenter);
         if(response.data.msg =="Added SUCCESS"){
            window.alert("Center Added Successfully");
            getCenters();   // fresh list reload
            setName("");
            setAddress("");
            setStatus("");
         } else{
             window.alert("Something Went Wrong");
             setStatus("");
         }
        } 
        catch (error) {
         return res.json({"msg": "Something Went Wrong!", "error": error});
        }
        }
      };

    // open edit mode → inputs में values भर दो
    function openEdit(center){
      setEditCen(center._id);
      setName(center.name);
      setAddress(center.address);
      setStatus(center.status);
    }

  return (
    <>
      <div className="dash-container">
            {/* Create Center Form */}
            <div className="dash-card dash-form">
              <h4 className="dash-title">{editCen ? "Edit Center" : "Create New Center"}</h4>
        
              <form onSubmit={addCenter} className="row g-3">
                <div className="col-md-4">
                  <label className="dash-label">Center Name *</label>
                  <input 
                    type="text" 
                    className="dash-input w-100" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    placeholder="Enter center name" 
                  />
                </div>

                <div className="col-md-4">
                  <label className="dash-label">Location *</label>
                  <input 
                    type="text"
                    className="dash-input w-100" 
                    value={address} 
                    onChange={(e)=>setAddress(e.target.value)} 
                    placeholder="Enter location"
                  />
                </div>

                <div className="col-md-2">
                  <label className="dash-label">Status</label>
                  <select 
                    className="dash-input w-100" 
                    value={status} 
                    onChange={(e)=>setStatus(e.target.value)}
                  >
                    <option value="">--</option>
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" className="dash-btn w-100">
                    {editCen ? "Update Center" : "Save Center"}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Centers Table */}
            <ViewCenters openEdit={openEdit} />

            <Footer />
      </div>
    </>
  )
}


export default Center