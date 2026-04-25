import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid header">
        <div className="row d-flex align-items-center py-5">
          <div className="col-md-2">
            <img src="/spi.png" className='navLogo' alt="Logo"/>
          </div>

          <div className="col-md-4">
            <h5 className='text-white d-flex justify-content-start align-items-center fw-bold'>
              Softpro India Computer Technologies (P) Ltd.
            </h5>
          </div>

          <div className="col-md-5 text-center">
            <span className="text-white p-2 ms-5 fw-bold" style={{border: "2px dotted white"}}>
              A Company Founded by Technocrats from IIT & IET
            </span>
          </div>

          <div className="col-md-1">
            <button className="btn btn-primary rounded-pill" onClick={() => navigate('/log')}>
              Login
            </button>
          </div>

        </div>
      </div>  
    </>
  )
}

export default Navbar
