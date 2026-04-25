import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function ViewCenters({ openEdit }) {
    const [centers, setCenters] = useState([]);

    try {
        const getCenters = async ()=>{
            const response = await axios.get('http://localhost:3000/api/center');
            console.log(response.data);
            if(response.data.msg == "Success"){
                setCenters(response.data.center);
                // getCenters();
            }
        };
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    useEffect(()=>{
        getCenters();
    }, []);

    try {
        async function changeStatus(id, st) {
            const res = await axios.put(`http://localhost:3000/api/center/${id}/${st}`);
            if(res.data.msg == "Update SUCCESS") {
                toast.success("STATUS Updated!");
                getCenters();
            }
            else{ toast.error("Something Went Wrong")}
        }
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    // // open edit mode → existing values डाल दो
    // function opnEdit(center){
    //     setEditCen(center._id);  // उस center का id रख लो
    //     setName(center.name); setAddress(center.address); setStatus(center.status); // existing value input में दिखेगी
    // }

    // // save edit
    // async function saveEdit(e) {
    // e.preventDefault();
    // const updateCen = { name, address, status };
    // console.log("Updating Center:", updateCen);

    // const response = await axios.put(`http://localhost:3000/api/center/${editCen}`, updateCen);

    // if(response.data.msg == "Update SUCCESS"){
    //     window.alert("Center Updated Successfully");
    //     setEditCen(null);   // edit mode बंद कर दो
    //     setName("");       // inputs reset
    //     setAddress("");
    //     setStatus("");
    //     getCenters();      // fresh list reload
    // } else {
    //     window.alert("Something Went Wrong");
    //     }
    // }

    try {
        const dltCen = async (id)=>{
        if(window.confirm("Are you sure to DELETE it?")){
          const res = await axios.delete(`http://localhost:3000/api/center/${id}`);
          if(res.data.msg === "Deleted"){
            window.alert("Center DELETED Successfully");
            getCenters();   // ✅ fresh list reload
          } else {
            window.alert("Something went wrong");
          }
        }
        };
    } catch (error) {
        return res.json({"msg": "Something Went Wrong!", "error": error});
    }

  return (
    <>
    <div className="dash-card dash-table">
     <h4 className="dash-title">Existing Centers</h4>
     <div className="row">
        <div className="col-9">
            <button className='btn bg-light border border-1 my-3 me-3'>Copy</button>
            <button className='btn bg-light border border-1 my-3 me-3'>Excel</button>
            <button className='btn bg-light border border-1 my-3 me-3'>PDF</button>
            <button className='btn bg-light border border-1 my-3 me-3'>
                Column Visibility <select name="" id=""></select>
            </button>
            <button className='btn bg-light border border-1 my-3 me-3'>
                Show 10 rows <select name="" id=""></select>
            </button>
        </div>
        <div className="col-3"></div>
     </div>
    <div className="row">
        <div className="col-12" style={{overflow: 'auto'}}>
             <table className='center_table w-100'>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th colSpan={2}>Status</th>                
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {centers.map((e,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{e.name}</td>
                            <td>{e.address}</td>
                            <td><small style={{color: `${e.status == "Active" ? "green" : "red"}`}}>{e.status}</small></td>
                            <td>
                                <button onClick={()=>{changeStatus(e._id, e.status)}} className={`btn btn-sm ${e.status == "Active" ? "btn-danger" : "btn-success"}`}>{e.status == "Active" ? "Deactive" : "Active"}</button>
                            </td>
                            <td><i className="fa fa-edit  text-primary" style={{cursor:"pointer"}} onClick={()=>openEdit(e)}></i></td>
                            <td><i className="fa fa-trash text-danger" style={{cursor:"pointer"}} onClick={()=>dltCen(e._id)}
                        ></i></td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </div>
    </div>
    </>
  )
}

export default ViewCenters