import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import toast from 'react-hot-toast'
import axios from 'axios'
import { env } from '../Components/Env'
import { ExcelRenderer } from "react-excel-renderer";
import { Usercontext } from '../Context/Context'
import BasicModal from '../Components/Modal'


function Bulkemail() {

  const [loader, setloader] = useState('')
  const [content,setcontent]=useState('')
  const [subject,setsubject]=useState('')
  const [error, seterror] = useState(false)
  const token = localStorage.getItem('token')
  const { setShow, show,setfinal,final } = useContext(Usercontext)
  

  const handleShow = () => setShow(true);

  function handleChange(e) {
    let data = (e.target.value.split('.'))
    let final = data.map((e) => e == 'xlsx' ? 'true' : "false")
    let falseortrue=final.filter((e)=>e=="true")
    seterror(falseortrue)
    let selectedFile = e.target.files[0];
      if (selectedFile) {
        ExcelRenderer(selectedFile, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let val = res.rows.map((e) => e[0])
            var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            let firstfilter = val.filter(e => e.match(mailformat))
            let secontfilter = firstfilter.filter((e, i) => firstfilter.indexOf(e) == i)
            console.log(secontfilter)
          setfinal(secontfilter)
          }
        });
      } else {
        toast.error("Please select only Excel file types");
      }
  }


  useEffect(() => {
    if (error.length == 0) {
      toast.error('Please select only excel file types')
    }
  }, [error])
  
  function handlesubject(e) {
      setsubject(e.target.value)
    }

  const handlefile = async() => {
    try {
      setloader(true)
      let res = await axios.post(`${env.api_url}/post/postfile/${token}`, { content, subject, final })
      if (res.status === 200) {
        setloader(false)
        setsubject(" ")
        setcontent(" ")
        toast.success(res.data.message)
        console.log(res.data)
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
    <BasicModal/>
            <div className='mx-80  mt-20 overflow-visible max-3llg:mx-40  max-3md:mx-20 max-3mdd:mx-10 max-3mdd:mt-10 max-3sm:mx-3'>
        <h1 className='text-4xl font-semibold border-b-2 border-black max-3mdd:text-2xl'>BulkEmail</h1>
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Recepiant</lable>
        <input type='file' className={error.length==0?'border border-red-500':""?'w-full outline-none border h-8 rounded-sm':"w-full outline-none border h-8 rounded-sm"} multiple onChange={handleChange} id='file' name='file'/>
                <p className='text-gray-500 text-sm '>Select the Excel file which contain only email's in first column one by one</p>
      </div>
      <div className='flex gap-2 mt-5'>
        <button className={`${final.length>0?'':"hidden"} border p-2 rounded-md border-gray-400 hover:bg-gray-300`} onClick={handleShow}>View Recepiant details</button>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Subject</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3'onChange={handlesubject} id='subject' value={subject}/>
            </div>
            <div className='flex flex-col gap-2 mt-5'>

                <lable>Content</lable>
        <textarea className='border h-60 outline-none pl-3 rounded-md' onChange={(e)=>setcontent(e.target.value)} value={content}/>
        <button className='my-10 flex bg-blue-500 justify-center h-8 items-center text-white rounded-xl' onClick={error.length>0?handlefile:""}>{loader?<Loader/>:"Send"}</button>
            </div>
        </div>
        <div>
    </div>
  </>
}

export default Bulkemail
