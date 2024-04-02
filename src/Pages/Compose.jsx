import React, { useContext, useState } from 'react'
import { MyComponent } from '../Components/Composequill'
import axios from 'axios'
import { env } from '../Components/Env'
import { Usercontext } from '../Context/Context'
import toast from 'react-hot-toast'
import Loader from '../Components/Loader'



function Compose() {

    const [receiver, setreceiver] = useState([])
    const [subject, setsubject] = useState('')
    const [loader,setloader]=useState(false)
    const [htmltemplate, sethtmltemplate] = useState('')
    
    const token = localStorage.getItem('token')
    const {logout}=useContext(Usercontext)

    function handlechange(e) {
        let data = (e.target.value.split(','))
        setreceiver(data)
    }

    const handlesend =async () => {
        try {
            setloader(true)
            let res = await axios.post(`${env.api_url}/post/email/${token}`, { receiver, subject, htmltemplate })
            if (res.status === 200) {
                setloader(false)
                setreceiver('')
                setsubject(null)
                sethtmltemplate(" ")
                toast.success(res.data.message)
            }
            
        } catch (error) {
            if (error.response.status == 400) {
                setloader(false)
                toast.error(error.response.data)
            }
            if (error.response.status == 500) {
                setloader(false)
                toast.error(error.response.data)
                logout()
            }
            if (error.response.status == 401) {
                setloader(false)
                toast.error(error.response.data)
                logout()
            }
            if (error.response.status == 498) {
                setloader(false)
                toast.error(error.response.data)
                logout()
            }
        }
    }




    return <>
        <div className='mx-80  mt-20 overflow-visible max-3llg:mx-40  max-3md:mx-20 max-3mdd:mx-10 max-3mdd:mt-10'>
        <h1 className='text-4xl font-semibold border-b-2 border-black max-3mdd:text-2xl'>Compose</h1>
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Recepiant</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3' onChange={handlechange}/>
                <p className='text-gray-500 text-sm'>Enter email address above seperated by comma <span className='ml-2 font-bold'>Eg:</span>&nbsp;yyyy@gmail.com,xxxx@gmail.com</p>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Subject</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3' onChange={(e)=>setsubject(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-2 mt-5'>

                <lable>Content</lable>
                <div><MyComponent sethtmltemplate={sethtmltemplate} htmltemplate={htmltemplate} /></div>
            </div>
        </div>
        <div>
        <button className='mt-20 my-8 flex justify-center bg-blue-500 text-white rounded-xl mx-80 h-8 items-center cursor-pointer p-6 text-lg max-3llg:mx-40 max-3md:mx-20 max-3mdd:my-28 max-3mdd:mx-10 max-3sm:my-32 max-3ssm:my-44' onClick={handlesend}>{loader?<Loader/>:"Send"}</button>


    </div>
    </>
}

export default Compose
