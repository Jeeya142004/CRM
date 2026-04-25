import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdViewUser from './AdViewUser';
import Footer from '../Components/Footer';

function AdUser() {
    const [name,  setName] = useState("");
    const [email,  setEmail] = useState("");
    const [num,  setNum] = useState("");
    const [password,  setPassword] = useState("");
    const [role,  setRole] = useState("");
    const [centers, setCenters] = useState([]);   
    const [center, setCenter] = useState("");     
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch centers dynamically
    try {
      const getCenter = async ()=>{
          const res = await axios.get("http://localhost:3000/api/center");
          if(res.data.msg === "Success"){
              const activeCenters = res.data.center.filter(c => c.status === "Active");
              setCenters(activeCenters);
          }
      }
    } catch (error) {
      return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    useEffect(()=>{
        getCenter();
    }, []);

    // Reset form
    const resetForm = ()=>{
        setName(""); setEmail(""); setNum(""); setPassword("");
        setRole(""); setCenter(""); setEditMode(false); setEditId(null);
    }

    // Create or Update user
    try {
      const AdUserCode = async (e)=>{
          e.preventDefault();
          const user = { name, email, num, role, password,'centers':center };
  
          let res;
          if(editMode){
              // ✅ Update existing user
              res = await axios.put(`http://localhost:3000/api/user/${editId}`, user);
          } else {
              // ✅ Create new user
              res = await axios.post('http://localhost:3000/api/user', user);
          }
  
          console.log(res);
          if(res.data.msg === "User Added" || res.data.msg === "Update SUCCESS"){
              window.alert(editMode ? "User Updated Successfully" : "User Created Successfully");
              resetForm();
          } else {
              window.alert("Something Went Wrong");
          }
      }
    } catch (error) {
      return res.json({"msg": "Something Went Wrong!", "error": error});
    }

    // Function to load user data into form for editing
    const handleEditUser = (user)=>{
        setName(user.name);
        setEmail(user.email);
        setNum(user.num);
        setPassword(user.password || ""); // optional
        setRole(user.role);
        setCenter(user.centers);
        setEditMode(true);
        setEditId(user._id);
    }

  return (
    <>
     <div className="userdash-container">
        {/* Create/Edit User Form */}
        <div className="userdash-card">
            <h4 className="userdash-title">{editMode ? "Edit User" : "Create New User"}</h4>
            <form onSubmit={AdUserCode} className="row g-3">
                
                {/* Full Name & Email */}
                <div className="col-md-3">
                    <label className="userdash-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="userdash-input w-100" 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)} 
                      placeholder="Enter full name" 
                    />
                </div>

                <div className="col-md-3">
                    <label className="userdash-label">Email *</label>
                    <input 
                      type="email" 
                      className="userdash-input w-100" 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)} 
                      placeholder="Enter email" 
                    />
                </div>

                {/* Mobile & Password */}
                <div className="col-md-2">
                    <label className="userdash-label">Mobile *</label>
                    <input 
                      type="text" 
                      className="userdash-input w-100" 
                      value={num} 
                      onChange={(e)=>setNum(e.target.value)} 
                      placeholder="Enter mobile number" 
                    />
                </div>

                <div className="col-md-2">
                    <label className="userdash-label">Password *</label>
                    <input 
                      type="password" 
                      className="userdash-input w-100" 
                      value={password} 
                      onChange={(e)=>setPassword(e.target.value)} 
                      placeholder="Enter password" 
                    />
                </div>

                {/* Role */}
                <div className="col-md-2">
                    <label className="userdash-label">Role *</label>
                    <select 
                      className="userdash-input w-100" 
                      value={role} 
                      onChange={(e)=>setRole(e.target.value)}
                    >
                      <option value="">--Select Role--</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Counselor">Counselor</option>
                    </select>
                </div>

                {/* Assign Center (Checkboxes, single select) */}
                <div className="col-md-12">
                    <label className="userdash-label">Assign Center</label>
                    <div className="userdash-checkboxes d-flex flex-wrap">
                      {centers.map((c)=>(
                        <div key={c._id} className="form-check me-4">
                          <input 
                            type="radio" 
                            className="form-check-input" 
                            value={c.name}
                            name='center'
                            onClick={()=>setCenter(c.name)} 
                          />
                          <label className="form-check-label">{c.name}</label>
                        </div>
                      ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-md-12 d-flex justify-content-end">
                    <button type="submit" className="userdash-btn">
                      {editMode ? "Update User" : "Create User"}
                    </button>
                    {editMode && (
                      <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                        Cancel
                      </button>
                    )}
                </div>
            </form>
        </div>

        {/* Existing Users Table */}
        <AdViewUser onEdit={handleEditUser} />
     </div>
     <Footer />
    </>
  )
}

export default AdUser;
















// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import AdViewUser from './AdViewUser';
// import Footer from '../Components/Footer';
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import "../datatable.css";

// function AdUser() {
//     const [name,  setName] = useState("");
//     const [email,  setEmail] = useState("");
//     const [num,  setNum] = useState("");
//     const [role,  setRole] = useState("");
//     const [centers, setCenters] = useState([]);       // dynamic centers from backend
//     const [selectedCenters, setSelectedCenters] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [showColumnMenu, setShowColumnMenu] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [visibleColumns, setVisibleColumns] = useState({
//         name: true,
//         email: true,
//         num: true,
//         role: true,
//         center: true,
//       });

//     const [selectedRow, setSelectedRow] = useState(null);

//     const getUsers = async () => {
//         const res = await axios.get("http://localhost:3000/api/user");
//         if (res.data.msg === "Success") setUsers(res.data.user);
//     };

//     // Fetch centers dynamically
//     const getCenter = async ()=>{
//         const res = await axios.get("http://localhost:3000/api/center");
//         if(res.data.msg == "Success"){
//             setCenters(res.data.center.filter((c) => c.status === "Active"));      
//         }

//       }
            
//         useEffect(() => {
//             getUsers();
//             getCenter();
//         }, []);

//     // ================= CRUD =================
//   const resetForm = () => {
//     setName("");
//     setEmail("");
//     setnum("");
//     setRole("");
//     setPassword("");
//     setSelectedCenters([]);
//     setEditId(null);
//   };

//     // Create new user
//     const AdUserCode = async (e)=>{
//         e.preventDefault();
//         const user = {name, email, num, role,"centers":selectedCenters };
//         const res = await axios.post('http://localhost:3000/api/user', user);
//         console.log(res);
//         if(res.data.msg == "User Added"){
//             window.alert("User Created Successfully");
//             resetForm();
//             getUsers();
//         }
//         else{
//             window.alert("Something Went Wrong");
//             setRole("");
//             setCenters("");
//         }
//     };


//     const updateUser = async (e) => {
//         e.preventDefault();
//         const user = { name, email, num, role, center: selectedCenters };
//         const res = await axios.put(`http://localhost:5000/api/user/${editId}`, user);
//         if (res.data.msg === "Success") {
//           alert("Updated");
//           resetForm();
//           getUsers();
//         }
//     };
    
//     const deleteUser = async (id) => {
//       if (!window.confirm("Delete?")) return;
//       await axios.delete(`http://localhost:5000/api/user/${id}`);
//       getUsers();
//     };
    
//     const handleEdit = (u) => {
//       setName(u.name);
//       setEmail(u.email);
//       setNum(u.num);
//       setRole(u.role);
//       setSelectedCenters(u.center || []);
//       setEditId(u._id);
//     };

//     // ================= SEARCH =================
//     const filteredUsers = users.filter((u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase()) ||
//       u.num.toLowerCase().includes(search.toLowerCase())
//     );

//     // ================= PAGINATION =================
//     const indexLast = currentPage * rowsPerPage;
//     const indexFirst = indexLast - rowsPerPage;
//     const currentUsers = filteredUsers.slice(indexFirst, indexLast);
//     const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

//     // ================= EXPORT =================
//     const exportExcel = () => {
//       const ws = XLSX.utils.json_to_sheet(filteredUsers);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Users");
//       const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//       saveAs(new Blob([buf]), "users.xlsx");
//     };

//     const exportPDF = () => {
//       const doc = new jsPDF();
//       autoTable(doc, {
//         head: [["Name", "Email", "Mobile", "Role"]],
//         body: filteredUsers.map((u) => [u.name, u.email, u.num, u.role]),
//       });
//       doc.save("users.pdf");
//     };

//     const copyData = () => {
//       const text = filteredUsers.map((u) => `${u.name} | ${u.email}`).join("\n");
//       navigator.clipboard.writeText(text);
//       alert("Copied!");
//     };

//     // ================= COLUMN =================
//     const toggleColumn = (col) => {
//       setVisibleColumns({ ...visibleColumns, [col]: !visibleColumns[col] });
//     };

//     // ================= CENTER =================
//     const handleCenterCheckbox = (e) => {
//       const { value, checked } = e.target;
//       if (checked) setSelectedCenters([...selectedCenters, value]);
//       else setSelectedCenters(selectedCenters.filter((c) => c !== value));
//     };

//   return (
//     <>
//      <div className="userdash-container">
//         {/* Create User Form */}
//         <div className="userdash-card">
//             <h4 className="userdash-title">Create New User</h4>
//             <form onSubmit={editId ? updateUser : AdUserCode} className="row g-3">
//                 {/* Full Name & Email (col-3 each) */}
//                 <div className="col-md-3">
//                     <label className="userdash-label">Full Name *</label>
//                     <input 
//                     type="text" 
//                     className="userdash-input w-100" 
//                     value={name} 
//                     onChange={(e)=>setName(e.target.value)} 
//                     placeholder="Enter full name" 
//                     />
//                 </div>

//                 <div className="col-md-3">
//                     <label className="userdash-label">Email *</label>
//                     <input 
//                     type="email" 
//                     className="userdash-input w-100" 
//                     value={email} 
//                     onChange={(e)=>setEmail(e.target.value)} 
//                     placeholder="Enter email" 
//                     />
//                 </div>

//                 {/* Mobile & Password (col-2 each) */}
//                 <div className="col-md-2">
//                     <label className="userdash-label">Mobile *</label>
//                     <input type="text" className="userdash-input w-100" value={num} onChange={(e)=>setNum(e.target.value)} placeholder="Enter mobile number"/>
//                 </div>

//                 {/* Role (col-2) */}
//                 <div className="col-md-2">
//                     <label className="userdash-label">Role *</label>
//                     <select className="userdash-input w-100" value={role} onChange={(e)=>setRole(e.target.value)}>
//                     <option value="">--Select Role--</option>
//                     <option value="Admin">Admin</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Counselor">Counselor</option>
//                     </select>
//                 </div>

//                 {/* Assign Centers (col-12 full width) */}
//                 <div className="col-md-12">
//                     <label className="userdash-label">Assign Centers</label>
//                     <div className="userdash-checkboxes d-flex flex-wrap">
//                       {centers.map((c)=>(
//                         <div key={c._id} className="form-check me-4">
//                             <input type="checkbox" value={c.name} checked={selectedCenters.includes(c.name)} onChange={handleCenterCheckbox} />
//                             <label className="form-check-label">{c.name}</label>
//                         </div>
//                     ))}
//                     </div>                    
//                 </div>

//                 {/* Submit Button (col-12 full width) */}
//                 <div className="col-md-12 d-flex justify-content-end">
//                     <button type="submit" className="userdash-btn"> {editId ? "Update" : "Create"} </button>
//                 </div>
//             </form>

//         </div>

//         {/* Existing Users Table */}
//         {/* TOP BAR */}
//         <div className="d-flex justify-content-between mb-3">
//             <div className="d-flex gap-2">
//             <button className="dt-btn" onClick={copyData}>Copy</button>
//             <button className="dt-btn" onClick={exportExcel}>Excel</button>
//             <button className="dt-btn" onClick={exportPDF}>PDF</button>

//             <div className="column-dropdown">
//     <button
//         className="dt-btn"
//         onClick={() => setShowColumnMenu(!showColumnMenu)}
//     >
//         Column Visibility ▼
//     </button>

//     {showColumnMenu && (
//         <div className="column-menu">
//         {Object.keys(visibleColumns).map((col) => (
//             <label key={col}>
//             <input
//                 type="checkbox"
//                 checked={visibleColumns[col]}
//                 onChange={() => toggleColumn(col)}
//             />
//             {col.toUpperCase()}
//             </label>
//         ))}
//         </div>
//     )}
//     </div>

//             <select onChange={(e) => setRowsPerPage(Number(e.target.value))} className="dt-select">
//                 <option value={10}>10 rows</option>
//                 <option value={25}>25 rows</option>
//             </select>
//             </div>

//             <div>
//             Search:
//             <input className="dt-search" value={search} onChange={(e) => setSearch(e.target.value)} />
//             </div>
//         </div>

//         {/* TABLE */}
//         <table className="custom-table">
//             <thead>
//             <tr>
//                 <th>Sr</th>
//                 {visibleColumns.name && <th>Name</th>}
//                 {visibleColumns.email && <th>Email</th>}
//                 {visibleColumns.number && <th>Mobile</th>}
//                 {visibleColumns.role && <th>Role</th>}
//                 {visibleColumns.center && <th>Center</th>}
//                 <th>Action</th>
//             </tr>
//             </thead>

//             <tbody>
//             {currentUsers.map((u, i) => (
//                 <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" key={u._id}
//                 className={selectedRow === i ? "active-row" : ""}
//                 onClick={() => setSelectedRow(i)}
//                 >
//                 <td>{i + 1}</td>

//                 {visibleColumns.name && <td>{u.name}</td>}
//                 {visibleColumns.email && <td>{u.email}</td>}
//                 {visibleColumns.number && <td>{u.number}</td>}
//                 {visibleColumns.role && <td>{u.role}</td>}
//                 {visibleColumns.center && <td>{u.center?.join(", ")}</td>}

//                 <td>
//                     <button onClick={() => handleEdit(u)}>Edit</button>
//                     <button onClick={() => deleteUser(u._id)}>Delete</button>
//                 </td>
//                 </tr>
//             ))}


//                     <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
//                     <div class="offcanvas-header">
//                         <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                     </div>
//                     <div class="offcanvas-body">
//                         ...
//                     </div>
//                     </div>



//             </tbody>
//         </table>

//         {/* PAGINATION */}
//         <div className="d-flex justify-content-between mt-3">
//             <div>
//             Showing {indexFirst + 1} to {Math.min(indexLast, filteredUsers.length)} of {filteredUsers.length}
//             </div>

//             <div>
//             <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
//             <span className="mx-2">{currentPage}</span>
//             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//             </div>
//         </div>
      
//         <AdViewUser />
//      </div>

//     <Footer />
//     </>
//   )
// }

// export default AdUser;