import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdDash() {
  const [stats, setStats] = useState(null);

  useEffect(()=>{
    try {
      const getStats = async ()=>{
        const res = await axios.get("http://localhost:3000/api/admin/stats");
        if(res.data.msg == "Success"){
          setStats(res.data);
        }
      }
      getStats();
    } 
    catch (error) {
      return res.json({"msg": "Something Went Wrong!", "error": error});
    }
  }, []);

  const navigate = useNavigate();
  function logOut(){
    localStorage.removeItem('admin');
    navigate('/log');
  }
  
  function validate(){
    if(!localStorage.getItem("admin")){
      navigate('/log');
      }
  }
  
  useEffect(()=>{
      validate();
    }, []);

  return (
   <>
   <div className="container px-4">
    <div className="row mt-4 shadow-lg rounded-4 bg-white px-4">
      <div className="col-md-4 px-3 mt-3">
        <h3 className='fw-bold'>Compelete Reports</h3>
        <p className='text-muted'>Quick snapshot of progress - what you did & what's next</p>
      </div>

      <div className="col-md-2 mt-3">
        <select className="form-select dash-input">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      <div className="col-md-2 mt-3">
        <input type="date" className="form-control dash-input" />
      </div>

      <div className="col-md-2 mt-3">
        <input type="date" className="form-control dash-input" />
      </div>

      <div className="col-md-1 mt-3">
        <button type="button" className="btn dash-btn">Apply</button>
      </div>
      
      <div className="col-md-1 mt-3 ">
        <button type="button" className="btn dash-btn" onClick={logOut}>LogOut</button>
      </div>
    </div>

    <div className="row g-4 mb-4 mt-4">
      <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="row g-4 align-items-start">
                  <div className="col-12 col-md-6">
                    <p className="text-muted mb-2">
                      Welcome, <span className="fw-bold text-dark">Admin</span>
                    </p>
                    <h6 className="text-muted mb-1">Overview</h6>
                    <h2 className="fw-bold mb-4">
                      {stats?.allEnq} <span className="fs-5 fw-normal text-muted">enquiries</span>
                    </h2>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <small className="text-muted d-block">Assigned</small>
                        <h3 className="fw-bold mb-0">3</h3>
                      </div>
                      <div className="text-end">
                        <small className="text-muted ">Progress</small>
                      </div>
                    </div>

                    <div className="progress progress-custom mb-2">
                      <div
                        className="progress-bar bg-success rounded-pill"
                        style={{ width: "12%" }}
                      ></div>
                    </div>

                    <div className="text-end">
                      <small className="text-muted">12% assigned</small>
                    </div>
                  </div>
                </div>

                <div className="row gap-4 mt-1">
                  <div className="col-4 col-sm-6 col-xl-3 shadow-lg p-3 rounded-4" style={{width: "14vw"}}>
                    <div className="">
                      <p className="text-muted mb-2">Today's follow-ups</p>
                      <h2 className="fw-bold mb-1">0</h2>
                      <small className="text-muted">
                        Overdue: <span className="text-danger fw-semibold">2</span>
                      </small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-xl-3 shadow-lg p-3 rounded-4" style={{width: "14vw"}}>
                    <div className="mini-stat-card">
                      <p className="text-muted mb-2">Registered</p>
                      <h2 className="fw-bold mb-1">2</h2>
                      <small className="text-muted">Total conversions</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-xl-3 shadow-lg p-3 rounded-4" style={{width: "14vw"}}>
                    <div className="mini-stat-card">
                      <p className="text-muted mb-2">Centers</p>
                      <h2 className="fw-bold mb-1">{stats?.allCenter}</h2>
                      <small className="text-muted">Active centers</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Right Action Items */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">Action Items</h4>
                  <small className="text-muted">What to do next</small>
                </div>

                <div className="action-box mb-3">
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <div>
                      <small className="text-muted d-block">Leads</small>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-0">3 assigned</h5>
                      <small className="text-muted">Assigned across your centers</small>
                    </div>
                    <button className="btn btn-light border ">
                      View Enquiries
                    </button>
                  </div>
                </div>

                <div className="action-box">
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <div>
                      <small className="text-muted d-block">Today</small>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-0">0 calls due</h5>
                      <small className="text-muted">Prioritise overdue first</small>
                    </div>
                    <button className="btn dash-btn fw-semibold">
                      Start Calls
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>

    {/* Centers */}
    <h4 className="fw-bold mb-3">Centers</h4>
    <div className="row g-4">
      {/* Card 1 */}
      <div className="col-12 col-md-6 col-xl-4">
        <div className="card border-0 shadow-sm rounded-4 h-100 center-card">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <h5 className="fw-bold center-title mb-0">
                Softpro Full Stack Academy, Gomtinagar, Lucknow
              </h5>

              <div className="text-center">
                <small className="text-muted d-block">Closed</small>
                <h4 className="fw-bold mb-1">0</h4>
                <div className="circle-progress">
                  <span>0%</span>
                </div>
                <small className="text-muted d-block mt-1">(0%)</small>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">1</h3>
                  <small className="text-muted">Assigned</small>
                </div>
              </div>

              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">0</h3>
                  <small className="text-muted">Follow-ups</small>
                </div>
              </div>

              <div className="col-12">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold text-orange mb-1">8</h3>
                  <small className="text-muted">Enquiries</small>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mb-3 flex-wrap">
              <button className="btn dash-btn fw-semibold">Open Enquiries</button>
              <button className="btn btn-light border fw-semibold">Timeline</button>
            </div>

            <div className="recent-list">
              <div className="recent-item text-muted">No recent follow-ups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-12 col-md-6 col-xl-4">
        <div className="card border-0 shadow-sm rounded-4 h-100 center-card">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <h5 className="fw-bold center-title mb-0">
                Softpro House, Jankipuram, Lucknow
              </h5>

              <div className="text-center">
                <small className="text-muted d-block">Closed</small>
                <h4 className="fw-bold mb-1">0</h4>
                <div className="circle-progress">
                  <span>0%</span>
                </div>
                <small className="text-muted d-block mt-1">(0%)</small>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">1</h3>
                  <small className="text-muted">Assigned</small>
                </div>
              </div>

              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">4</h3>
                  <small className="text-muted">Follow-ups</small>
                </div>
              </div>

              <div className="col-12">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold text-orange mb-1">7</h3>
                  <small className="text-muted">Enquiries</small>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mb-3 flex-wrap">
              <button className="btn dash-btn fw-semibold">Open Enquiries</button>
              <button className="btn btn-light border fw-semibold">Timeline</button>
            </div>

            <div className="recent-list">
              <div className="recent-item">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">Shubham Verma</h6>
                    <p className="text-muted small mb-1">
                      by Dhirendra Patel • 31 Jan, 02:01 PM
                    </p>
                    <p className="text-muted small mb-0">Test by Admin</p>
                  </div>
                  <span className="badge custom-badge badge-light-soft">
                    Hot Enquiry
                  </span>
                </div>
              </div>

              <div className="recent-item">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">Shubham Verma</h6>
                    <p className="text-muted small mb-1">
                      by Dhirendra Patel • 31 Jan, 02:00 PM
                    </p>
                    <p className="text-muted small mb-0">Test by Admin</p>
                  </div>
                  <span className="badge custom-badge badge-light-soft">
                    Cold Enquiry
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-12 col-md-6 col-xl-4">
        <div className="card border-0 shadow-sm rounded-4 h-100 center-card">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <h5 className="fw-bold center-title mb-0">Softpro Noida Office</h5>

              <div className="text-center">
                <small className="text-muted d-block">Closed</small>
                <h4 className="fw-bold mb-1">2</h4>
                <div className="circle-progress">
                  <span>20%</span>
                </div>
                <small className="text-muted d-block mt-1">(20%)</small>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">3</h3>
                  <small className="text-muted">Assigned</small>
                </div>
              </div>

              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">3</h3>
                  <small className="text-muted">Follow-ups</small>
                </div>
              </div>

              <div className="col-12">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold text-orange mb-1">7</h3>
                  <small className="text-muted">Enquiries</small>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mb-3 flex-wrap">
              <button className="btn dash-btn fw-semibold">Open Enquiries</button>
              <button className="btn btn-light border fw-semibold">Timeline</button>
            </div>

            <div className="recent-list">
              <div className="recent-item">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">Mayank Pal</h6>
                    <p className="text-muted small mb-1">
                      by Akshat Pathak • 18 Feb, 11:17 AM
                    </p>
                    <p className="text-muted small mb-0">Reg on 18 Fab</p>
                  </div>
                  <span className="badge custom-badge badge-success-soft">
                    Registered
                  </span>
                </div>
              </div>

              <div className="recent-item">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">Mayank Pal</h6>
                    <p className="text-muted small mb-1">
                      by Akshat Pathak • 18 Feb, 11:16 AM
                    </p>
                    <p className="text-muted small mb-0">Group of 5</p>
                  </div>
                  <span className="badge custom-badge badge-light-soft">
                    Hot Enquiry
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="col-12 col-md-6 col-xl-4">
        <div className="card border-0 shadow-sm rounded-4 h-100 center-card">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <h5 className="fw-bold center-title mb-0">
                Softpro Tower, Kapoorthala, Lucknow
              </h5>

              <div className="text-center">
                <small className="text-muted d-block">Closed</small>
                <h4 className="fw-bold mb-1">0</h4>
                <div className="circle-progress">
                  <span>0%</span>
                </div>
                <small className="text-muted d-block mt-1">(0%)</small>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">1</h3>
                  <small className="text-muted">Assigned</small>
                </div>
              </div>

              <div className="col-6">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold mb-1">0</h3>
                  <small className="text-muted">Follow-ups</small>
                </div>
              </div>

              <div className="col-12">
                <div className="mini-stat-card small-box">
                  <h3 className="fw-bold text-orange mb-1">1</h3>
                  <small className="text-muted">Enquiries</small>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mb-3 flex-wrap">
              <button className="btn dash-btn fw-semibold">Open Enquiries</button>
              <button className="btn btn-light border fw-semibold">Timeline</button>
            </div>

            <div className="recent-list">
              <div className="recent-item text-muted">No recent follow-ups</div>
            </div>
          </div>
        </div>
      </div>
    </div> 
   </div>
   </>
  )
}

export default AdDash