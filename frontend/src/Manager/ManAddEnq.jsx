import React from 'react'
import Footer from "../Components/Footer"

function ManAddEnq() {
    
  return (
    <>
     <div className="container my-4 w-50">
      <div className="card p-3 shadow-lg rounded-4">
        <div className="card-header text-center">
          <h4 className="mb-0">Student Enquiry</h4>
        </div>
        <div className="card-body">
          <form className="row g-3">
            
            {/* Location */}
            <div className="col-md-6">
              <label className="form-label">Location *</label>
              <select 
                className="form-select" 
                name="location">
                <option value="">-- Select Center --</option>
                <option value="Noida">Softpro Noida Office</option>
                <option value="Lucknow">Softpro Tower, Lucknow</option>
              </select>
            </div>

            {/* Source */}
            <div className="col-md-6">
              <label className="form-label">Source</label>
              <select 
                className="form-select" 
                name="source">
                <option value="Walk-in">Walk-in</option>
                <option value="Referral">Referral</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                placeholder="Enter full name" />
            </div>

            {/* College */}
            <div className="col-md-6">
              <label className="form-label">College</label>
              <input 
                type="text" 
                className="form-control" 
                name="college"
                placeholder="Enter college name" />
            </div>

            {/* Course */}
            <div className="col-md-6">
              <label className="form-label">Course</label>
              <input 
                type="text" 
                className="form-control" 
                name="course" 
                placeholder="Enter course" />
            </div>

            {/* Branch */}
            <div className="col-md-6">
              <label className="form-label">Branch</label>
              <input 
                type="text" 
                className="form-control" 
                name="branch"
                placeholder="Enter branch" />
            </div>

            {/* Year */}
            <div className="col-md-6">
              <label className="form-label">Year</label>
              <input 
                type="text" 
                className="form-control" 
                name="year"
                placeholder="Enter year" />
            </div>

            {/* Contact Number */}
            <div className="col-md-6">
              <label className="form-label">Contact Number *</label>
              <input 
                type="text" 
                className="form-control" 
                name="contact"
                placeholder="Enter contact number" />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                name="email" 
                placeholder="Enter email" />
            </div>

            {/* Program */}
            <div className="col-md-6">
              <label className="form-label">Program</label>
              <select 
                className="form-select" 
                name="program">
                <option value="">-- Select Program --</option>
                <option value="Full Stack">Full Stack Development</option>
                <option value="AI ML">AI & ML</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-primary px-4">Save Enquiry</button>
            </div>
          </form>
        </div>
      </div>
    </div>

     <Footer/>
    </>
  );
}

export default ManAddEnq