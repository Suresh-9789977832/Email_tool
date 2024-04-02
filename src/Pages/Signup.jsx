import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import axios from 'axios'
import { env } from '../Components/Env'
import toast from 'react-hot-toast'

function Signup() {

  const [state, setstate] =useState({
    email: "",
    password: "",
    confirmpassword: "",
    username:""
  }) 
  const [loader, setloader] = useState(false)
  const [check,setcheck]=useState(false)
  const navigate = useNavigate()

  
  function handlechange(e) {
    const { name, value } = e.target
    setstate({
      ...state,
      [name]:value
    })
  }


  const handlesignup =async () => {
    try {
      setloader(true)
      let res = await axios.post(`${env.api_url}/user/Signup`, state)
      if (res.status === 201) {
        toast.success(res.data)
        setloader(false)
        setstate(state.email = "")
        setstate(state.password = "")
        setstate(state.confirmpassword = "")
        navigate('/login')
      }
    } catch (error) {
      if (error.response.status == 400) {
        setloader(false)
        toast.error(error.response.data)
        console.log(error)
      }
    }
  }

  function handlecheck(e){
    if (e.target.checked === true) {
      setcheck(true) 
    }
    else {
      setcheck(false) 
    }
  }


  
  return <>
     <div className='h-screen flex items-center pt-10 flex-col bg-slate-200 max-3md:pt-10'>
    <h1 className='flex justify-center mb-6 text-2xl font-semibold text-gray-600 '>Signup</h1>
 
      <div className=' h_w grid grid-cols-2  shadow-2xl  max-3md:grid-cols-none'>
        <div className=' flex justify-center max-3md:hidden'>
          <img src='./images/blue.avif'/>
        </div>
        <div className='flex flex-col justify-center p-10  bg-blue-300 gap-5 max-3sm:px-5'>
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input type='email' placeholder='Enter your Username' className='pl-2 h-8 rounded-md outline-none' name='username' onChange={handlechange} />
          </div>
          <div className="flex flex-col gap-1">
          <label>Email address</label>
          <input type='email' placeholder='Enter your email' className='pl-2 h-8 rounded-md outline-none' name='email' onChange={handlechange} />
          </div>
          <div className="flex flex-col gap-1">
          <label>Password</label>
            <input type={ check?"text":'password'} placeholder='Enter your Password' className='pl-2 h-8 rounded-md outline-none' name='password' onChange={handlechange}/>
          </div>
          <div className="flex flex-col gap-1">
          <label>Confirm Password</label>
          <input type={ check?"text":'password'} placeholder='Enter your Password' className='pl-2 h-8 rounded-md outline-none' name='confirmpassword' onChange={handlechange}/>
          </div>
          <div className='flex items-center gap-1'>
          <input type='checkbox' className='checkbox' onChange={handlecheck}/>
          <label>Show password</label>
          </div>
          <button className='bg-darkblue text-white rounded-md py-1 flex justify-center' onClick={handlesignup}>{loader?<Loader/>:"Signup"}</button>

          <span>Already have an Account? <Link to={'/'} className='text-darkblue underline cursor-pointer'>Login</Link></span>
        </div>
      </div>
      </div>
  
  </>
}

export default Signup
