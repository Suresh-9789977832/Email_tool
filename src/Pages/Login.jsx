import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { env } from '../Components/Env'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../Components/Loader'
import { Usercontext } from '../Context/Context'

function Login() {

  const [state, setstate] = useState({
    email: "",
    password:""
  })
  const [loader, setloader] = useState(false)
  const [check, setcheck] = useState(false)
  const navigate = useNavigate()
  const {setuserdata}=useContext(Usercontext)

  function handlecheck(e){
    if (e.target.checked === true) {
      setcheck(true) 
    }
    else {
      setcheck(false) 
    }
  }

  const handlelogin =async () => {
    try {
      setloader(true)
      let res = await axios.post(`${env.api_url}/user/login`, state)
      if (res.status === 200) {
        toast.success(res.data.message)
        localStorage.setItem('token',res.data.token)
        setuserdata(res.data.data)
        setloader(false)
        setstate(state.email = "")
        setstate(state.password = "")
        navigate('/compose')
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        setloader(false)
        toast.error(error.response.data)
        console.log(error)
      }
    }
  }
  

  function handlechange(e) {
    const { name, value } = e.target
    setstate({
      ...state,
      [name]:value
    })
  }

  return <>

    <div className=' flex items-center pt-12 flex-col bg-slate-200 h-screen max-3md:pt-10'>
    <h1 className='flex justify-center mb-5 text-2xl font-semibold text-gray-600 '>Login</h1>
 
      <div className=' h_w grid grid-cols-2 shadow-2xl max-3md:grid-cols-none'>
        <div className=' flex justify-center max-3md:hidden'>
          <img src='./images/img1.avif'/>
        </div>
        <div className='flex flex-col justify-center p-10 max-3sm:px-5  bg-red-300 gap-5'>
          <div className="flex flex-col gap-1">
          <label>Email address</label> 
          <input type='email' placeholder='Enter your email' className='pl-2 h-8 rounded-md outline-none' onChange={handlechange} name='email' value={state.email}/>
          </div>
          <div className="flex flex-col gap-1">
          <label>Password</label>
            <input type={check?"text":"password"} placeholder='Enter your Password' className='pl-2 h-8 rounded-md outline-none' onChange={handlechange} name='password' value={state.password}/>
          </div>
          <div className='flex items-center gap-1'>
          <input type='checkbox' className='checkbox' onChange={handlecheck}/>
          <label>Show password</label>
          </div>
          <button className='bg-darkblue text-white rounded-md py-1 flex justify-center' onClick={handlelogin}>{loader?<Loader/>:"Login"}</button>
          <p className='border-blue-300 text-darkblue underline cursor-pointer'>Forgot password?</p>

          <div>
            <span>Demo Email:</span><span> Suresh@gmail.com</span><br/>
            <span>Demo password:</span><span> Suresh</span>
          </div>

          <span>You don't have an Account? <Link to={'/signup'} className='text-darkblue underline cursor-pointer'>Signup</Link></span>
        </div>
      </div>
      </div>
    

  

  </>
}

export default Login
