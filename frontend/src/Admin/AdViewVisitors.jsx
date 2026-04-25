import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdViewVisitors() {
  const [visitor, setVisitor] = useState([]);

  try {
    const getVisitor = async ()=>{
      const response = await axios.get('http://localhost:3000/api/visitor');
      console.log(response.data);
      if(response.data.msg == "Success"){
        setVisitor(response.data.visitors);
        getVisitor();
      }
    };
  } 
  catch (error) {
    return res.json({"msg": "Something Went Wrong!", "error": error});
  }

    useEffect(()=>{
      getVisitor();
    }, []);

  return (
    <>
     <h4>View Visitors</h4>
     <table className='table table-light'>
        <thead>
            <tr>
                <th>S. No.</th>
                <th>Role</th>
                <th>Center</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Purpose</th>
                <th>Remark</th>
                <th>Address</th>
                <th colSpan={2}>Action</th>
            </tr>
        </thead>
        <tbody>
            {
            visitor.map((e,i)=>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{e.role}</td>
                    <td>{e.center}</td>
                    <td>{e.name}</td>
                    <td>{e.contact}</td>
                    <td>{e.email}</td>
                    <td>{e.purpose}</td>
                    <td>{e.remark}</td>
                    <td>{e.address}</td>
                    <td><i className="fa fa-edit"></i></td>
                    <td><i className="fa fa-trash text-danger"></i></td>
                </tr>
                ))}
        </tbody>
     </table>
    </>
  )
}

export default AdViewVisitors