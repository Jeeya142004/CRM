import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/icons8-person-50.png';

function ManLayout() {
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
                <nav className="navbar bg-white rounded-4 p-3 mt-3">
                   {/* Bell Icon */}
                   <div className='bell'>
                       <a href="/" className='bellIcon'><i className="fa-regular fa-bell"></i></a>
                   </div>
                    {/* Logo */}
                   <div><img src={logo} className='setLogo bg-info' alt="hi" /></div>
                </nav>
                
                <Outlet />
            </div>
       </div> 
     </div>
    </>
  )
}

export default ManLayout