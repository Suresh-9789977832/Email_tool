import  { useContext, useState } from 'react'
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
            console.log('helo')
            setloader(true)
            let res = await axios.post(`${env.api_url}/post/email/${token}`, { receiver, subject, htmltemplate })
            console.log(res)
            if (res.status === 200) {
                setloader(false)
                setreceiver('')
                setsubject(" ")
                sethtmltemplate(" ")
                toast.success(res.data.message)
            }
            
        } catch (error) {
            console.log(error)
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
        <div className='mx-80  mt-20 overflow-visible max-3llg:mx-40  max-3md:mx-20 max-3mdd:mx-10 max-3mdd:mt-10 max-3sm:mx-3'>
        <h1 className='text-4xl font-semibold border-b-2 border-black max-3mdd:text-2xl'>Compose</h1>
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Recepiant</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3' onChange={handlechange} value={receiver}/>
                <p className='text-gray-500 text-sm'>Enter email address above seperated by comma <span className='ml-2 font-bold'>Eg:</span>&nbsp;yyyy@gmail.com,xxxx@gmail.com</p>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Subject</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3' onChange={(e)=>setsubject(e.target.value)} value={subject}/>
            </div>
            <div className='flex flex-col gap-2 mt-5'>

                <lable>Content</lable>
                <textarea className='border h-60 outline-none pl-3 rounded-md' type='text' onChange={(e)=>sethtmltemplate(e.target.value)} value={htmltemplate}/>
                <button className='my-10 flex bg-blue-500 justify-center h-8 items-center text-white rounded-xl' onClick={handlesend}>{loader?<Loader/>:"Send"}</button>
            </div>
        </div>
     
    </>
}

export default Compose
