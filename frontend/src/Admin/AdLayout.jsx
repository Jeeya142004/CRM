import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/icons8-person-50.png';

function AdLayout() {
    
  return (
    <>
     <div className="container-fluid">
        <div className="row shadow-lg" >
            <div className="col-md-12">
                <nav className="navbar">
                    <div className="container-fluid bg-white rounded-4">
                        {/* Toggle Button */}
                        <button className="btn m-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar"  aria-controls="offcanvasSidebar"> ☰ </button>

                        {/* Offcanvas Sidebar */}
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasLabel">
                            <div className="offcanvas-header">
                                <img src="logospi new.png" alt="" className='imgHeader' />
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>

                            <div className="offcanvas-body ps-3">
                                <p className='asideContent'>
                                    <i className="fa-solid fa-chart-line"></i> 
                                    <Link to={''} className="px-2 text-black text-decoration-none">Dashboard</Link>
                                </p>
                                <p className='asideContent'>
                                    <i className="fa-regular fa-hospital"></i>
                                    <Link to={'center'} className="px-2 text-black text-decoration-none">Centers</Link>
                                </p>
                                <p className='asideContent'>
                                    <i className="fa-solid fa-user-group"></i> 
                                    <Link to={'user'} className="px-2 text-black text-decoration-none">Users</Link>
                                </p>
                                <p className='asideContent'>
                                    <i className="fa-regular fa-comment-dots"></i>
                                    <Link to={'viewEnq'} className="px-2 text-black text-decoration-none">Enquiries</Link>
                                </p>
                                <p className='asideContent'>
                                    <i className="fa-solid fa-users"></i>
                                    <Link to={'visitor'} className="px-2 text-black text-decoration-none">Visitors</Link>
                                </p>
                                <p className='asideContent'>
                                    <i className="fa-regular fa-phone-volume"></i>
                                    <Link to={'addEnq'} className="px-2 text-black text-decoration-none">Add Enquiries</Link>
                                </p>
                            </div>
                        </div>

                        {/* Bell Icon */}
                        <div className='bell'>
                            <a href="/" className='bellIcon'><i className="fa-regular fa-bell"></i></a>
                        </div>

                        {/* Logo */}
                        <div><img src={logo} className='setLogo bg-info' alt="hi" /></div>
                    </div>
                </nav>
            </div>

            <Outlet />
        </div>
     </div>
    </>
  )
}

export default AdLayout