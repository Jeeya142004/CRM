import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/icons8-person-50.png';
import { toast } from 'react-toastify';

function CLayout() {
    const navigate = useNavigate();
    function logOut(){
        localStorage.removeItem('Counselor');
        navigate('/log');
    }

    function validate(){
        if(!localStorage.getItem("Counselor")){
            toast.error("Please Login First!");
            navigate('/log');
            }
        }
    
        useEffect(()=>{
            validate();
        }, []);

    
   return (
    <>
     <div className="container-fluid">
        <div className="row">
            <div className="col-md-2 p-3 bg-white h-75 ">
                <img src="/src/assets/spi.png" alt="" className='w-50 mx-5 justify-content-center'/>
                <p className='asideContent'>
                    <i className="fa-solid fa-chart-line"></i> 
                    <Link to={''} className="px-2 text-black text-decoration-none">Dashboard</Link>
                </p>
                <p className='asideContent'>
                    <i className="fa-regular fa-comment-dots"></i>
                    <Link to={'viewEnq'} className="px-2 text-black text-decoration-none">Enquiries</Link>
                </p>
                <p className='asideContent'>
                    <i className="fa-solid fa-users"></i>
                    <Link to={'visitorEnq'} className="px-2 text-black text-decoration-none">Visitors</Link>
                </p>
                <p className='asideContent'>
                    <i className="fa-solid fa-phone-volume"></i>
                    <Link to={'addEnq'} className="px-2 text-black text-decoration-none">Add Enquiries</Link>
                </p>
            
            </div>
            
            <div className="col-md-10" style={{height:"100vh", overflow: "auto"}}>
                <nav className="navbar row bg-white rounded-4 p-3 mt-3 mx-1">
                    <div className="col-10">
                        {/* Bell Icon */}
                        <div className='bell'>
                            <a href="#" className='bellIcon'><i className="fa-regular fa-bell"></i></a>
                        </div>
                    </div>
                   
                    <div className="col-2">
                        {/* Logo */}
                        <div className="dropdown">
                            <button className="btn btn-outline-warning rounded-circle px-1 py-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={logo} className='setLogo' alt="hi" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={'myProfile'} className="dropdown-item" href="#"><i className='fa-solid fa-user'></i> Profile</Link></li>

                                <li><Link to={'changePass'} className="dropdown-item"><i className='fa-solid fa-key'></i> Change Password</Link></li>

                                <li><Link to={'/log'} className="dropdown-item" onClick={()=>{
                                    logOut();
                                    toast.success("LogOut Success")
                                }}><i className='fa-solid fa-arrow-right-from-bracket'> </i> Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                   
                </nav>
                
                <Outlet />
            </div>
       </div> 
     </div>
    </>
  )
}

export default CLayout
