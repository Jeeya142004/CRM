import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function ManViewEnq() {
    const [enq, setEnq] = useState([]);
    const [user, setUser] = useState([]);
    const [filterUser, setFilterUser] = useState([]);
    const [editId, setEditId] = useState(null);
    const [uid, setUid] = useState("");
    const [rem, setRem] = useState("");
    const [selectedEnq, setSelectedEnq] = useState(null);
    const [status, setStatus] = useState("");
    const [nextDate, setNextDate] = useState("");
    const [programme, setProgramme] = useState("");
    const [remark, setRemark] = useState("");
    const [filterFollowup, setFilterFollowup] = useState([]);
    const [myData, setMyData] = useState({});

    const getEnq = async ()=>{
        const res = await axios.get('http://localhost:3000/api/enq')
        const res2 = await axios.get(`http://localhost:3000/api/user/${localStorage.getItem("Manager")}`);
        if(res.data.msg == "Success" && res2.data.msg == "Success"){
          console.log(res2.data);
          setMyData(res2.data.enq);

          var enquries = res.data.enq.filter((a)=>{
            return a.center == res2.data.user.centers;
          });
          console.log(enquries);
          setEnq(enquries);
          // console.log(res.data.enq);
        }
    }

    const getUser = async ()=>{
        const res = await axios.get('http://localhost:3000/api/user')
        if(res.data.msg == "Success"){
          setUser(res.data.user);
        }
    }

    const updateEnq = async (e)=>{
      e.preventDefault();
      const data = {'assignto': uid, 'assignby': localStorage.getItem('Counselor'), 'assigndate': Date()};
      const res = await axios.put(`http://localhost:3000/api/enq/${editId}`, data);
      console.log(res);
      const assignData = {'enqId': editId, 'assignto': uid, 'assignby': localStorage.getItem('Counselor'), 'assignbyModel': "user", "remark": rem};  //"user" ko "" me hi likhna pdega tbhi vo as STRING jayega vrna vo as VARIABLE act krega or data nhi jayega backend me
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

    useEffect(()=>{
        getEnq();
        getUser();
    }, []);

    const assignFun = (e)=>{
      console.log(e);
      setEditId(e._id);
      var fu = user.filter((u)=>{
        if(localStorage.getItem("Counselor") == u._id) 
          return false;
        else {return u.centers == e.center;}
      });
      setFilterUser(fu);
    }
    
    const handleRowClick = (data) => {
    setSelectedEnq(data);
    if(data.assignto && data.assignto._id == localStorage.getItem('Counselor')){ //assignto exist krta h to us obj(qki hmne propogate kia tha) ki id me jo id h or localstrorage me COUNSELOR ki id h vo match kr rhi h to setD (lock div) false ho jayega mtlb nhi dikhega vrna true hone pr Lock div dikhega
      setD(false);
    }
    else{ setD(true) }

    const offcanvas = new window.bootstrap.Offcanvas(
        document.getElementById("enqOffcanvas")
    );
    getFollowup(data._id);
    offcanvas.show();
    };

    async function addFollowup(e) {
      e.preventDefault();
      const followupData = {'enqId': selectedEnq._id, 'uid': localStorage.getItem('Counselor'), status, nextDate, remark, programme};
      const res = await axios.post('http://localhost:3000/api/followup', followupData);
      if(res.data.msg == "Success"){
        window.alert("Follow Up Added Successfully");
        setStatus("");
        setNextDate("");
        setRemark("");
        setProgramme("");
      }
      else{
        window.alert("Something Went Wrong");
      }
    };

    //specific enq ki followup history check krne k liye
    const getFollowup = async (id)=>{
      const res = await axios.get('http://localhost:3000/api/followup');
      console.log(res);
      if(res.data.msg == 'Success'){
        const followupData = res.data.followup; //followup array ka all data
        const fd = followupData.filter((f)=>{
          return f.enqId._id == id;
        });
        setFilterFollowup(fd);
        console.log(fd);
      }
    };


   return (
   <>
     <div className="container-fluid my-4">
      {/* Summary Cards */}
      <div className="row g-3 my-4 p-3 bg-white rounded-4">
        <div className="col-md-3"> <h3>Enquiries</h3> </div>
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

      {/* Enquiry Table */}
      <div className="row g-3 my-4 p-3 bg-white rounded-4">
        <div className="col-12">
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
        </div>
        <div className="col-12">
          <div className="card dash-card">
            <div className="card-body">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Sr. No</th>
                    <th>Date</th>
                    <th>Actions</th>
                    <th>Source</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Center</th>
                    <th>For Programme</th>
                    <th>Assigned</th>
                    <th>Status</th> 
                    <th>Next Follow-Up</th>
                  </tr>
                </thead>
                <tbody>
                  {enq.map((e,i)=>(
                    <tr key={i} onClick={() => {e.status == "Active" ? handleRowClick(e) : toast.error("Enquiry is Deactivated!")}} style={{ cursor: "pointer" }} >
                      <td>{i+1}</td>
                      <td>{e.date}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <a href={`https://api.whatsapp.com/send/?phone=${e.contactNum}`} target="_blank" className="btn btn-sm btn-outline-success rounded-pill" onClick={(e)=>{e.stopPropagation()}}>WA</a>
                          <a href='/' className="btn btn-sm btn-outline-secondary rounded-pill" onClick={(e)=>{e.stopPropagation()}}>Copy</a>
                          
                        </div>
                      </td>
                      <td>{e.source}</td>
                      <td> <b>{e.fullName}</b> <br /> {e.contactNum} <br/> {e.course}  <br/> {e.email} </td>
                      <td>{e.college}</td>
                      <td>{e.center}</td>
                      <td>{e.forprogram || "-"}</td>
                      <td>{e.assignto ? e.assignto.name : "Not Assigned"}</td>
                      <td>{e.status || "New"}</td>
                      <td>{e.nextfollowupdate || "-"}</td>
                    </tr> ))}
                </tbody>
              </table>
              <div className="text-muted small">
                Showing {enq.length > 10 ? 10 : enq.length} of {enq.length} entries
              </div>
            </div>
          </div>
        </div>
      </div>

     </div>


      {/* Offcanvas */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="enqOffcanvas" style={{ width: "420px" }}>
        <div className="offcanvas-header border-bottom">
          <div>
            <h5 className="mb-0">Enquiry Details</h5>
            <small className="text-muted">
              {selectedEnq?.course} • {selectedEnq?.center}
            </small>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          {selectedEnq ? (
            <>
              {/* USER HEADER */}
              <div className="mb-3">
                <h6 className="mb-0">{selectedEnq.fullName}</h6>
                <small className="text-muted">
                  {selectedEnq.course} • {selectedEnq.center}
                </small>
                <span className="badge bg-warning float-end">New</span>
              </div>
              <hr />

              {/* DETAILS */}
              <div className="mb-3">
                <p><b>Mobile:</b> {selectedEnq.contactNum}</p>
                <p><b>Email:</b> {selectedEnq.email || "-"}</p>
                <p><b>Course:</b> {selectedEnq.course}</p>
                <p><b>Center:</b> {selectedEnq.center}</p>
                <p><b>Assigned:</b> {selectedEnq.assignto?.name || "Not Assigned"}</p>
                <p><b>Created:</b> {selectedEnq.createdAt?.split("T")[0]}</p>
              </div>

              {/* ACTION BUTTONS */}
              { selectedEnq.assignto &&     // jaha ASSIGNTO true ho mtlb kisi ko assigned ho vhi ye 3 btns show ho vrna nhi
                <div className="d-flex gap-2 mb-3">
                  <a href={`tel:${selectedEnq.contactNum}`} className="btn btn-outline-primary w-100">Call</a>
                  <a href={`https://api.whatsapp.com/send/?phone=${selectedEnq.contactNum}`} target="_blank" className="btn btn-outline-success w-100">WhatsApp</a>
                  <button className="btn btn-outline-warning w-100 " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={()=>{assignFun(selectedEnq)}} disabled>Transfer</button>
                </div>
              }

              <hr />

              {/* FOLLOW-UP SECTION */}
              <h6>Add Follow-Up</h6>

              <div className="position-relative">
                {   
                  d && <div style={{backgroundColor: "rgba(255, 0, 0, 0.3)"}} className='d-flex justify-content-center align-items-center display-1 rounded-3 position-absolute w-100 h-100'> <i className='fa-solid fa-lock'></i> </div>
                }
                
                <form onSubmit={addFollowup} className='p-3'>
                  <div className="mb-2">
                    <label>Status</label>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)} className="form-control">
                      <option>Follow Up</option>
                      <option>Hot Enquiry</option>
                      <option>Warm Enquiry</option>
                      <option>Cold Enquiry</option>
                      <option>Registered</option>
                      <option>Not Interested</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label>Next Follow-Up Date</label>
                    <input type="date" value={nextDate} onChange={(e)=>setNextDate(e.target.value)} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label>For Programme</label>
                    <select className="form-control" value={programme} onChange={(e)=>setProgramme(e.target.value)}>
                      <option>Select Programme</option>
                      <option>Summer Training</option>
                      <option>Vocational Training</option>'
                      <option>Industrial Training</option>'
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Remark</label>
                    <textarea value={remark} onChange={(e)=>setRemark(e.target.value)} className="form-control" placeholder="Write exact conversation notes..."></textarea>
                  </div>
                  <input type='submit' className="btn btn-warning w-100 mb-3" value="Save Follow-Up"/>
                </form>
              </div>
              <hr />

              {/* TIMELINE */}
              <div className="d-flex justify-content-between align-items-center">
                <h6>Follow-Up Timeline</h6>
                <button className="btn btn-sm btn-outline-secondary">Refresh</button>
              </div>

              {filterFollowup.map((f)=>(
                <div>{f.status}</div>))
              }
            </>
          ) : ( <p className="text-muted">No enquiry selected</p> )}
        </div>
      </div>

      {/* Modal */}
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
                        <option key={e._id} value={e._id}>{e.name}</option>
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
   </>
  )
}

export default ManViewEnq