import react from 'react'
import './App.css'
import './datatable.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import AdDash from './Admin/AdDash'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdViewEnq from './Admin/AdViewEnq'
import AdLayout from './Admin/AdLayout'
import Center from './Admin/Center'
import AdViewVisitors from './Admin/AdViewVisitors'
import AdUser from './Admin/AdUser'
import AdADDEnq from './Admin/AdADDEnq'
import ManDash from './Manager/ManDash'
import CDash from './Counselor/CDash'
import ManLayout from './Manager/ManLayout'
import ManViewEnq from './Manager/ManViewEnq'
import ManAddEnq from './Manager/ManAddEnq'
import ManVisitorEnq from './Manager/ManVisitorEnq'
import CLayout from './Counselor/CLayout'
import CAddEnq from './Counselor/CAddEnq'
import CVisitorEnq from './Counselor/CVisitorEnq'
import CViewEnq from './Counselor/CViewEnq'
import { ToastContainer } from 'react-toastify'
import CChPass from './Counselor/CChPass'
import CProfile from './Counselor/CProfile'
import ForgetPass from './Pages/ForgetPass'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/log' element={<Login/>}/>
        <Route path='/forget-password' element={<ForgetPass/>}/>

        <Route path='/admin-dash/' element={<AdLayout/>}>
          <Route path='' element={<AdDash/>}/>
          <Route path='center' element={<Center/>}/>
          <Route path='user' element={<AdUser/>}/>
          <Route path='viewEnq' element={<AdViewEnq/>}/>
          <Route path='visitor' element={<AdViewVisitors/>}/>
          <Route path='addEnq' element={<AdADDEnq/>}/>
        </Route>

        <Route path='/man-dash/' element={<ManLayout/>}>
          <Route path='' element={<ManDash/>}/>
          <Route path='viewEnq' element={<ManViewEnq/>}/>
          <Route path='visitorEnq' element={<ManVisitorEnq/>}/>
          <Route path='addEnq' element={<ManAddEnq/>}/>
        </Route> 

        <Route path='/coun/' element={<CLayout/>}>
          <Route path='' element={<CDash/>}/>
          <Route path='changePass' element={<CChPass/>}/>
          <Route path='viewEnq' element={<CViewEnq/>}/>
          <Route path='myProfile' element={<CProfile/>}/>
          <Route path='visitorEnq' element={<CVisitorEnq/>}/>
          <Route path='addEnq' element={<CAddEnq/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
