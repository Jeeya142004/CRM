import React from 'react'

function ManSidebar() {
  return (
    <>
     <div className="col-3">
        <div className="">
            <div className="ps-3">
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
      </div> 
    </>
  )
}

export default ManSidebar