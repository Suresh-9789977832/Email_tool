import React, { useContext, useEffect, useState } from 'react'
import BasicDateTimePicker from '../Components/Timepicker'
import { Usercontext } from '../Context/Context'
import { ExcelRenderer } from "react-excel-renderer";
import BasicModal from '../Components/Modal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { env } from '../Components/Env';
import Emailtable from '../Components/Emailtable';


function Schedule() {

    const [content, setcontent] = useState('')
    const [subject,setsubject]=useState('')
    const [error, seterror] = useState(false)
    const [flag, setflag] = useState(false)


    const handleShow = () => setShow(true);


    const token = localStorage.getItem('token')
    const { setShow, show, setfinal, final,getdatetime,setgetdatetime } = useContext(Usercontext)

    useEffect(() => {
        if (error.length == 0) {
          toast.error('Please select only excel file types')
        }
    }, [error])
    
    const handleschedule = async () => {
        try {
            if (getdatetime) {
                const newEvent = {
                  subject: subject,
                  content:content,
                  receiver: final,
                  minute: getdatetime.minute,
                  hour: getdatetime.hour,
                  day: getdatetime.days,
                  month:getdatetime.month,
                }
          let res = await axios.post(`${env.api_url}/post/schdeule`, {newEvent })
                if (res.status == 200) {
                  toast.success('email schuduled successfully')
                    setgetdatetime(" ")
                    setsubject(" ")
                    setcontent(" ")
                }
              }
      
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('Fill all the field')
            }
        }
      }

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
                    setfinal(secontfilter)
              }
            });
          } else {
            toast.error("Please select only Excel file types");
          }
      }
    return <>

        <div className='flex  my-10 mx-14 max-3mdd:mx-10 max-3sm:mx-6 max-3ssm:mx-2'>
            <button className={`bg-red-500 w-[200px] h-10 border text-white shadow-2xl max-3sm:text-sm max-3sm:w-[150px] ${flag?"":"border-2 border-red-700 rounded-md"}`} onClick={()=>setflag(false)}>Scheduled Email</button>
            <button className={` bg-green-500 w-[200px] h-10 border text-white shadow-2xl max-3sm:text-sm max-3sm:w-[150px] ${flag?"border-2 border-green-700 rounded-md":""}`}  onClick={()=>setflag(true)}>Scheduled EmailTable</button>
        </div>

        {
            flag ? <Emailtable/>
                :
                <>                <BasicModal/>
        <div className=' mx-80  my-10 overflow-visible  max-3md:mx-20 max-3mdd:mx-10 max-3mdd:mt-10 max-3sm:mx-3' >
            <h2 className='flex justify-center text-2xl mb-4'>Scheduled Email</h2>
          <BasicDateTimePicker />
          <p className=' text-gray-500 pl-1 pb-6'>For schedule your mail select date and time</p>

          <div className=' overflow-visible '> 
            <div className='flex flex-col gap-2 mt-3'>
                <lable>Recepiant</lable>
        <input type='file' className={error.length==0?'border border-red-500':""?'w-full outline-none border h-8 rounded-sm':"w-full outline-none border h-8 rounded-sm"}  onChange={handleChange} id='file' name='file'/>
                <p className='text-gray-500 text-sm pb-2'>Select the Excel file which contain only email's in first column one by one</p>
      </div>
      <div className='flex gap-2 mb-10'>
        <button className={`${final.length>0?'':"hidden"} border p-2 rounded-md border-gray-400 hover:bg-gray-300`} onClick={handleShow}>View Recepiant details</button>
            </div>
            <div className='flex flex-col gap-2'>
                <lable>Subject</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3' id='subject' onChange={(e)=>setsubject(e.target.value)} value={subject}/>
            </div>
            <div className='flex flex-col gap-2 mt-10'>

                    <lable>Content</lable>
                        <textarea  className='border h-60 outline-none pl-3 rounded-md' type='text' value={content} onChange={(e)=>setcontent(e.target.value)}/>
                        <button className=' mt-8 my-10 flex justify-center bg-red-500 text-white rounded-xl  items-center cursor-pointer p-1' onClick={handleschedule}>Save</button>
            </div>
        </div> 
        <div>
    </div>
                    </div>
                    </>
        }
        

    </>
}

export default Schedule
