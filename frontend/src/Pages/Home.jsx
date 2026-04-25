import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';

function Home() {
    const [fullName, setFullName] = useState("");
    const [name,setName]= useState("");
    const [college, setCollege] = useState("");
    const [course, setCourse] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [contact, setContact]=useState('');
    const [email, setEmail] = useState("");
    const [purpose, setPurpose] = useState("");
    const [role, setRole] = useState("Student");
    const [center, setCenter] = useState("");
    const [centers, setCenters] = useState([]); // dynamic centers from backend
    // const [purpose, setPurposeVO] = useState("");
    const [remark, setRemark] =  useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("u");   //u- unblock
    
    const addEnq = async (e)=>{
      e.preventDefault();
      let enq = {};
      if (role == "Student"){
        enq = {role,center, fullName, college, course, branch, year, contactNum, email, purpose, status};
        var response = await axios.post('http://localhost:3000/api/enq', enq);
        console.log(response);
        if(response.data.msg == "Post Success"){
        // window.alert("Enquiry Submitted Success");
        Swal.fire({
          title: "ADDED!",
          text: "Do You Want to Continue!",
          icon: "success",
          confirmButtonText: "Cool"
        });
        setFullName("");
        setCollege("");
        setCourse("");
        setBranch("");
        setYear("");
        setContactNum("");
        setEmail("");
        setPurpose("");
        // setRole("Student");
        setCenter("");
      }
      else {
        window.alert("Something went Wrong!");
        setContactNum("");
        setEmail("");
        setPurpose("");
        setRole("");
        setCenter("");
      }
    }
      else if (role == "VisitorO"){
        const visit = {role,center, name,  contact, email, purpose,remark};
        var response = await axios.post('http://localhost:3000/api/visitor', visit);
        console.log(response);
        if(response.data.msg == "Post Success"){
        window.alert("Oficially Visitor Added Success");
        // setFullName("");
        // setCollege("");
        // setCourse("");
        // setBranch("");
        // setYear("");
        // setContactNum("");
        // setEmail("");
        // setPurpose("");
      
        // setCenter("");
      }
      else {
        window.alert("Something went Wrong!");
        // setContactNum("");
        // setEmail("");
        // setPurpose("");
    
        // setCenter("");
      }
      }
      else{
        const visitp = {center, name, contact, address ,role};
        var response = await axios.post('http://localhost:3000/api/visitor', visitp);  
        console.log(response);
        if(response.data.msg == "Post Success"){
        window.alert("Personal Visitor Added Success");
        // setFullName("");
        // setCollege("");
        // setCourse("");
        // setBranch("");
        // setYear("");
        // setContactNum("");
        // setEmail("");
        // setPurpose("");
       
        // setCenter("");
      }
      else {
        window.alert("Something went Wrong!");
        // setContactNum("");
        // setEmail("");
        // setPurpose("");
       
        // setCenter("");
      }
      }
      console.log(enq);
    };

    // Fetch centers dynamically
    const getCenter = async ()=>{
        const res = await axios.get("http://localhost:3000/api/center");
        if(res.data.msg == "Success"){
            var x =  res.data.center;
            x = x.filter((e)=>e.status=="Active");
            console.log(x);
            setCenters(x);
        }
    }
    useEffect(()=>{
        getCenter();
    }, []);

  return (

    <>
      <Navbar />

      <div className="row mx-auto pb-5" style={{"background-color": "#ffefe6"}}>
        <div className="col-9 mx-auto">
          <div className="row bg-white p-4 rounded-4 mt-5 gap-5" style={{"border-top": "4px solid #f47501"}}>
            
            {/* Contact Us */}
            <div className="col-12 col-lg-4 order-md-2 order-lg-1 mb-4">
              <h5 className='fw-bold'>Contact Us</h5>
              <h6 className='mt-2'><i className="fa-solid fa-phone-volume fa-shake orng"></i> Call: +91 7080102006, 7080462022</h6>
              <h6 className='mt-2'><i className="fa-solid fa-envelope fa-bounce orng"></i> Email: hr@softproindia.in</h6>

              <div className="row">
                <div className="col-12">
                  <div className="card mt-4">
                    <div className="card-body">
                      <h5 className="card-title fw-bold"><i className="fa-solid fa-location-dot orng"></i> Softpro Head Office</h5>
                      <hr />
                      <h6 className="text-muted">Softpro Tower, Near New Hanuman Temple, Kapoorthala, Aliganj</h6>
                      <h6 className="text-muted">Lucknow - 226006</h6>
                      <h6 className="text-muted"><span className='fw-bold'>Mobile Number:</span> +917080102007</h6>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card mt-4">
                    <div className="card-body">
                      <h5 className="card-title fw-bold"><i className="fa-solid fa-location-dot orng"></i> Softpro House Lucknow</h5>
                      <hr />
                      <h6 className="text-muted">3/213, Sector J, Jankipuram, Kursi Rd</h6>
                      <h6 className="text-muted">Near Gudamba Thana, Lucknow</h6>
                      <h6 className="text-muted">Uttar Pradesh - 226006</h6>
                      <h6 className="text-muted"><span className='fw-bold'>Mobile Number:</span> +917080462022</h6>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card mt-4">
                          <div className="card-body">
                            <h5 className="card-title fw-bold"><i className="fa-solid fa-location-dot orng"></i>Softpro Full Stack Academy</h5> <hr />
                            <h6 className="card-text text-muted">1/6, Vastu Khand, Gomtinagar</h6>
                            <h6 className='text-muted'>Lucknow - 226006</h6>
                            <h6 className='text-muted'><span className='fw-bold '>Mobile Number:</span> +917080422022</h6>
                          </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card mt-4">
                          <div className="card-body">
                            <h5 className="card-title fw-bold"><i className="fa-solid fa-location-dot orng"></i>Softpro Noida Office</h5> <hr />
                            <h6 className="card-text text-muted">Creatons Bussiness park,</h6>
                            <h6 className='text-muted'>Ground Floor, H-35, Sec 63,</h6>
                            <h6 className='text-muted'>Noida gautam Buddha Nagar, UP-201301</h6>
                            <h6 className='text-muted'><span className='fw-bold '>Mobile Number:</span> +917080102006</h6>
                          </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="col-12 col-lg-7 order-md-1 order-lg-2">
              <form method='post' onSubmit={addEnq}>
                <div className="card enquiryCard ps-2">
                  <div className="card-header">
                    <h4 className='orng fw-bold mt-4'>
                      <i className="fa-regular fa-message orng"></i> Enquiry Form
                    </h4>
                    <hr />

                    <div className="row p-2">                
                      <h6 className='text-muted fw-bold'>You are a ?</h6>
                      <div className="col-md-11">
                        <select className="form-control orng-border" value={role} onChange={(e)=>setRole(e.target.value)}>
                          <option value="Student">Student</option>
                          <option value="VisitorO">Visitor (Official)</option>
                          <option value="VisitorP">Visitor (Personal)</option>
                        </select>
                      </div>

                      <h6 className='text-muted fw-bold mt-3'>You are at ?</h6>
                      <div className="col-md-11">
                        <select className="form-control orng-border" value={center} onChange={(e)=>setCenter(e.target.value)}>
                          <option value="">-- Select Center --</option>
                          {centers.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="card-body px-4">
                    {role === "Student" && (
                      <>
                        <h6 className='fw-bold mt-4 orng orng-bg'>
                          <i className="fa-solid fa-graduation-cap orng"></i> Student Information
                        </h6>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Full Name</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="e.g., Aman Verma" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>College</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="Your college name" value={college} onChange={(e)=>setCollege(e.target.value)} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Course</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="e.g., B.Tech / BCA / MCA" value={course} onChange={(e)=>setCourse(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>Branch</h6>
                            <input className="form-control orng-border mt-2" 
                                  placeholder="e.g., CSE / IT / ECE"
                                  value={branch} 
                                  onChange={(e)=>setBranch(e.target.value)} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Year</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="e.g., 2nd Year" value={year} onChange={(e)=>setYear(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>Contact Number</h6>
                            <input className="form-control orng-border mt-2" 
                                  placeholder="📞 10-digit mobile"
                                  value={contactNum} 
                                  onChange={(e)=>setContactNum(e.target.value)} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Email</h6>
                            <input type="email" className="form-control orng-border mt-2" placeholder="📧 name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>Purpose</h6>
                            <select className="form-control orng-border mt-2" 
                                    value={purpose} 
                                    onChange={(e)=>setPurpose(e.target.value)}>
                              <option value="">-- Select Purpose --</option>
                              <option value="Enquiry">Enquiry</option>
                              <option value="Registration">Registration</option>
                              <option value="Reporting">Reporting</option>
                              <option value="Certificate Work">Certificate Work</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {role === "VisitorO" && (
                      <>
                        <h6 className='fw-bold mt-4 orng orng-bg'>
                          <i className="fa-solid fa-user-tie orng"></i> Visitor (Official) Information
                        </h6>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Full Name</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="e.g., Ramesh Kumar" value={name} onChange={(e)=>setName(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>Contact Number</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="📞 10-digit mobile" value={contact} onChange={(e)=>setContact(e.target.value)} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Email</h6>
                            <input type="email" className="form-control orng-border mt-2" placeholder="📧 name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>Purpose of Visit</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="Meeting / Official Work" value={purpose} onChange={(e)=>setPurpose(e.target.value)} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <h6>Remark</h6>
                            <textarea className="form-control orng-border mt-2" placeholder="Any additional notes" value={remark} onChange={(e)=>setRemark(e.target.value)} />
                          </div>
                        </div>
                      </>
                    )}

                    {role === "VisitorP" && (
                      <>
                        <h6 className='fw-bold mt-4 orng orng-bg'>
                          <i className="fa-solid fa-user orng"></i> Visitor (Personal) Information
                        </h6>

                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6>Full Name</h6>
                            <input type="text" className="form-control orng-border mt-2" placeholder="e.g., Priya Sharma" value={name} onChange={(e)=>setName(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                            <h6>Contact Number</h6>
                            <input type="number" className="form-control orng-border mt-2" placeholder="📞 10-digit mobile" value={contact} onChange={(e)=>setContact(e.target.value)} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <h6>Address</h6>
                            <textarea className="form-control orng-border mt-2" placeholder="Your residential address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                          </div>
                        </div>
                      </>
                    )}

                    <div className='mt-3 text-end'>
                      <button className="btn btnColor" type="submit"> Submit Details</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home