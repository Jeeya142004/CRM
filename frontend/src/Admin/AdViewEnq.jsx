import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../Components/Footer';

function AdViewEnq() {
    const [enq, setEnq] = useState([]);
    const [user, setUser] = useState([]);
    const [filterUser, setFilterUser] = useState([]);
    const [editId, setEditId] = useState(null);
    const [uid, setUid] = useState("");
    const [rem, setRem] = useState("");
    const [selectedEnq, setSelectedEnq] = useState(null);

    try {
      const getEnq = async ()=>{
        const response = await axios.get('http://localhost:3000/api/enq')
        if(response.data.msg == "Success"){
          setEnq(response.data.enq);
        }; 
        console.log(response.data.enq);        
      }
    } 
    catch (error) {
      return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    try {
      const getUser = async ()=>{
        const response = await axios.get('http://localhost:3000/api/user')
        if(response.data.msg == "Success"){
          setUser(response.data.user);
        }
      }
    } 
    catch (error) {
      return res.json({"msg": "Something Went Wrong!", "error": error});  
    }

    try {
      const updateEnq = async (e)=>{
        e.preventDefault();
        const data = {'assignto': uid, 'assignby': localStorage.getItem('admin'), 'assigndate': Date()};
        const res = await axios.put(`http://localhost:3000/api/enq/${editId}`, data);
        console.log(res);
  
        const assignData = {'enqId': editId, 'assignto': uid, 'assignby': localStorage.getItem('admin'), 'assignbyModel': "admin", "remark": rem};
        const res2 = await axios.post(`http://localhost:3000/api/assign`, assignData);
        console.log(res2);
          if(res.data.msg == "Updation Success" && res2.data.msg == "Success"){
              window.alert("Update Success")
              setEditId(null);
              setUid("");
              setRem("");
              getEnq("");
          }
      }
    } catch (error) {
      return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    useEffect(()=>{
        getEnq();
        getUser();
    }, []);

    const assignFun = (e)=>{
      console.log(e);
      setEditId(e._id);
      var fu = user.filter((u)=>{
        if(e.assignto && e.assignto._id == u._id) 
          return false;
        else {return u.centers == e.center && u.status=="Active";}
      });
      console.log(fu);
      setFilterUser(fu);
    }

    const handleRowClick = (data) => {
    setSelectedEnq(data);
    setEditId(data._id);

    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal1'));
    modal.show();
};

  return (
    <>
    <div className="container my-4">
       {/* Summary Cards */}
      <div className="row g-3 my-4 p-3 bg-white rounded-4">
        <div className="col-md-3">
        <h3>Enquiries</h3>
        </div>
        <div className="col-md-3">
          <div className="card dash-card text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Enquiries</h6>
              <h2 className="fw-bold text-dark">{enq.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dash-card text-center">
            <div className="card-body">
              <h6 className="text-muted">Assigned</h6>
              <h2 className="fw-bold text-success">
                {enq.filter(e=>e.assigned).length}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dash-card text-center">
            <div className="card-body">
              <h6 className="text-muted">Not Assigned</h6>
              <h2 className="fw-bold text-danger">
                {enq.filter(e=>!e.assigned).length}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 my-4 p-3 bg-white rounded-4">
        <div className="col-md-2">
          <label>Search</label>
          <input type="text" className="form-control dash-input" placeholder="Name, Mobile, etc." />
        </div>
        <div className="col-md-2">
          <label>Status</label>
          <select className="form-select dash-input">
            <option>ALL</option>
            <option>Active</option>
            <option>Deactive</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Assigned To</label>
          <select className="form-select dash-input">
            <option>ALL</option>
            <option>--</option>
            <option>--</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Center</label>
          <select className="form-select dash-input">
            <option>ALL</option>
            <option>Softpro Noida</option>
            <option>Softpro Lucknow</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Source</label>
          <select className="form-select dash-input">
            <option>All</option>
            <option>Walk-in</option>
            <option>Call</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Session</label>
          <select className="form-select dash-input">
            <option>All</option>
            <option>--</option>
            <option>--</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>New Follow-Up</label>
          <select className="form-select dash-input">
            <option>All</option>
            <option>Walk-in</option>
            <option>Call</option>
          </select>
        </div>
        <div className="col-md-2 mt-4">
          <label>From</label>
          <input type="date" className="form-control dash-input" />
        </div>
        <div className="col-md-2 mt-4">
          <label>To</label>
          <input type="date" className="form-control dash-input" />
        </div>
        <div className="col-md-2">
          <button className='btn dash-btn mt-5'>Reset</button>
        </div>
      </div>

      <div className="card shadow-lg rounded-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">View All Enquiries</h4>
        </div>
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>S. No.</th>
                <th>Date</th>
                <th>Action</th>
                <th>Source</th>
                <th>Name</th>
                <th>College</th>
                <th>Center</th>
                <th>For Program</th>
                <th>Assigned</th>
                <th>Status</th> 
                <th>Next Follow-Up</th>         
              </tr>
            </thead>
            <tbody>
              {enq.map((e,i)=>(
                <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >
                  <td>{i+1}</td>
                  <td>{e.createdAt.split("T")[0]}</td>
                  <td>
                    <div className='d-flex gap-1'>
                      <a href={`https://api.whatsapp.com/send?phone=${e.contactNum}`} target='_black' className='btn btn-success rounded-pill' onClick={(e)=>{e.stopPropagation()}}>WA</a>                   
                      <button className="btn btn-outline-primary rounded-pill" onClick={(e)=>{e.stopPropagation()}}>Copy</button>
                      <div className="dropdown d-inline">
                        <button className="btn btn-secondary rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e)=>{e.stopPropagation()}}>
                          <i className='fa-solid fa-ellipsis'></i>
                        </button>
                        <ul className="dropdown-menu text-center">
                          {
                          e.status == "Active" && <li>
                            <button type="button" className="btn dash-btn rounded-pill my-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={(event)=>{ event.stopPropagation(); assignFun(e)}} >Assign</button>
                          </li>
                          }
                          <li><button className="btn btn-sm btn-outline-danger"> <i className="fa fa-trash"></i> Delete </button> </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td>{e.source}</td>
                  <td> <b>{e.fullName}</b> <br /> {e.contactNum} <br/> {e.course} </td>
                  <td>{e.college}</td>
                  <td>{e.center}</td>
                  <td>{e.forprogram || "-"}</td>
                  <td>{e.assignto ? ( <>
                                      <span>{e.assignto.name}</span>
                                      <small className="text-muted"> ({e.assignto.role})</small>
                                    </> ) : ( "Not Assigned" )} </td>
                  <td>{e.status || "New"}</td>
                  <td>{e.nextfollowupdate || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Assign Enquiry</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={updateEnq}>
            <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Assign/Transfer To</label>
                  <select className="form-select" value={uid} onChange={(e)=>setUid(e.target.value)}>
                    <option value="">Select User</option>
                    {
                      filterUser.map((e)=>(
                        <option key={e._id} value={e._id}>{e.name} {e.role == "Manager" ? "(Manager)" : "(Counselor)"}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Note (Optional)</label>
                  <input type="text" className="form-control" value={rem} onChange={(e)=>setRem(e.target.value)} placeholder='Eg: Transferred to manager for closure'/>
                </div>
                <button type="submit" className="btn dash-btn w-100 rounded-3" data-bs-dismiss="modal">Save</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>

     {/* modal */}
    <div className="modal fade" id="exampleModal1" tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <div>
              <h5 className="modal-title">
                Enquiry #{selectedEnq?._id?.slice(-4)} - {selectedEnq?.fullName}
              </h5>
              <small className="text-muted">
                {selectedEnq?.course} • {selectedEnq?.center}
              </small>
            </div>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          {/* FILTER SECTION */}
          <div className="px-3 pt-2 d-flex gap-2">
            <input type="date" className="form-control" />
            <input type="date" className="form-control" />
            <button className="btn btn-warning">Apply Date Filter</button>
            <button className="btn btn-outline-secondary">Reset</button>
          </div>

          {/* STATUS CARDS */}
          <div className="row px-3 mt-3">
            <div className="col-md-3">
              <div className="card p-2">
                <small>Assigned To</small>
                <b>{selectedEnq?.assignto?.name || "Not Assigned"}</b>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-2">
                <small>Status</small>
                <b>{selectedEnq?.status || "New"}</b>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-2">
                <small>Next Follow-up</small>
                <b>{selectedEnq?.nextfollowupdate || "-"}</b>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-2">
                <small>Total Followups</small>
                <b>0</b>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="row p-3">

            {/* LEFT SIDE - USER INFO */}
            <div className="col-md-5">
              <div className="card p-3">
                <h5>
                  {selectedEnq?.fullName}
                  <span className="badge bg-warning ms-2">New</span>
                </h5>

                <hr />

                <p><b>Mobile:</b> {selectedEnq?.contactNumber}</p>
                <p><b>Email:</b> {selectedEnq?.email}</p>
                <p><b>Course:</b> {selectedEnq?.course}</p>
                <p><b>Center:</b> {selectedEnq?.center}</p>
                <p><b>Created:</b> {selectedEnq?.createdAt?.split("T")[0]}</p>

                <div className="d-flex gap-2 mt-3">
                  <a
                    href={`tel:${selectedEnq?.contactNumber}`}
                    className="btn btn-outline-primary w-50"
                  >
                    Call
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send/?phone=${selectedEnq?.contactNumber}`}
                    target="_blank"
                    className="btn btn-outline-success w-50"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - TIMELINE */}
            <div className="col-md-7">
              <div className="card p-3">
                <div className="d-flex justify-content-between">
                  <h6>Follow-up Timeline</h6>
                  <button className="btn btn-sm btn-outline-secondary">Refresh</button>
                </div>

                <p className="text-muted mt-3">
                  No follow-ups in selected range.
                </p>
              </div>
            </div>

          </div>

          {/* ASSIGN SECTION */}
          <form onSubmit={updateEnq}>
            <div className="p-3 border-top">

              <div className="row">
                <div className="col-md-6">
                  <label>Assign To</label>
                  <select
                    className="form-control"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                  >
                    <option value="">-- Not Assigned --</option>
                    {filterUser.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Note</label>
                  <textarea
                    className="form-control"
                    value={rem}
                    onChange={(e) => setRem(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="text-end mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Assign Enquiry
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>

    </>
  )
}

export default AdViewEnq;