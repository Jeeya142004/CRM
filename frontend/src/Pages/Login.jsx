import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    const logCode = async (e)=>{
        e.preventDefault();  //form ko submit hone k baad refresh hone se rokta h
        const admin = {email, password};
        console.log(admin);
        const response = await axios.post('https://crm-1backend-p8ur.onrender.com/api/admin/log', admin);
        console.log(response);
        
        if(response.data.msg == "Success"){
            toast.success("Login Success");
            // window.alert("Login Success");
            localStorage.setItem(response.data.role, response.data.id);
            setEmail("");
            setPass("");
            if( response.data.role == "admin"){
                navigate("/admin-dash");
            }
             else if( response.data.role == "Manager"){
                navigate("/man-dash");
            }
            else{
                navigate("/coun");
            }
        }
        else{
            // window.alert(response.data.msg);
            toast.error(response.data.msg)
            setPass("");
        }
    }

    function showPass(){
        console.log(eye);
        const t = document.querySelector('input[name=password]');
        if(t.type == "password"){
            t.type = 'text';
            eye.className = "fa fa-eye";
        }
        else{
            t.type = 'password';
            eye.className = "fa fa-eye-slash";
        }
    }

    const validate = ()=>{
        if(localStorage.getItem("admin")){
            localStorage.removeItem("admin");
        };

        if(localStorage.getItem("manager")){
            localStorage.removeItem("manager");
        };

        if(localStorage.getItem("Counselor")){
            localStorage.removeItem("Counselor");
        }
        // teeno "if" hone se same prsn k laptop se teeno role se logout ho jaayenge agr logout kia to
    }

    useEffect(()=>{
        validate();
    }, []);

  return (
    <>
      <div className="login-wrapper">
        <div className="row">
          <div className="login-card">
              <div className="card-body text-center">
                <img src="src/assets/spi.png" alt="CRM Logo" className='rounded rounded-circle mt-4 logo-img' width={"100px"}/>
                <h2 className="brand">CRM</h2>
                <h3 className="login-card-title text-start pt-3 .orng">Welcome Back 👋</h3>
                <p className="card-text text-start pb-3">Sign in to continue</p>
                
                <form method='post' onSubmit={logCode}>
                    <div className="form-group">
                        <label className='fw-bold'>Username *</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter username" required />
                    </div>

                    <div className="form-group password-group">
                        <label className='fw-bold'>Password *</label>
                        <input type="password" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Enter password" name="password" required />
                        <span onClick={showPass}><i id='eye' className="fa fa-eye"></i></span>
                    </div>

                    <small><Link to="/forget-password" className="nav-link text-primary">Forget Password?</Link></small>

                    <button type="submit" className="btn-login rounded-4">
                        <i className="fa fa-sign-in-alt"></i> Sign In
                    </button>

                </form>

                <div className="footer rounded-3 my-3 p-2">
                    Designed & Developed By <b>Softpro India Computer Technologies (P). Ltd.</b>
                </div>

              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login