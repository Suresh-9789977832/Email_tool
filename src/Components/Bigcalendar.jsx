import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { env } from './Env';
import { useEffect } from 'react';
import BasicDateTimePicker from './Timepicker';
import { Usercontext } from '../Context/Context';
import { ExcelRenderer } from "react-excel-renderer";
import BasicModal from './Modal';
import toast from 'react-hot-toast';


const localizer = momentLocalizer(moment)

export const MyCalendar=()=>{
  const [events, setevents] = useState([])
  const [showmodal, setshowmodal] = useState(false)
  const [selectDate, setselectDate] = useState(null)
  const [quillcontent, setquillcontent] = useState('')
  const [subject,setsubject]=useState('')
  const [error, seterror] = useState(false)
  const [flag, setflag] = useState(false)
  const token = localStorage.getItem('token')
  const { setShow, show, setfinal, final,getdatetime } = useContext(Usercontext)
  

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
            let secontfilter=firstfilter.filter((e,i)=>firstfilter.indexOf(e)==i)
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

  const handleselectslot=(slotInfo)=>{
    setshowmodal(true)
    setselectDate(slotInfo.start)
  }


  useEffect(() => {
    const getschedulemail = async () => {
      try {
        let res = await axios.get(`${env.api_url}/post/getschedule`)
        if (res.status == 200) {
          setevents(res.data)
          setflag(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getschedulemail()
  }, [flag==true?events:''])




  const handleClose = () => setshowmodal(false)
  
  const saveEvent = async() => {
    if (selectDate) {
      const newEvent = {
        subject: subject,
        content:quillcontent,
        start: selectDate,
        receiver: final,
        minute: getdatetime.minute,
        hour: getdatetime.hour,
        day: getdatetime.days,
        month:getdatetime.month,
        end: moment(selectDate).add(1, 'minutes').toDate()
      }
let res = await axios.post(`${env.api_url}/post/schdeule`, {newEvent })
      if (res.status == 200) {
        setflag(true)

      }
      setshowmodal(false)      
    }
  }


  const style = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    maxHeight: 'calc(100vh - 80px)',
    overflowY: 'auto',

  };
  
  

  return (
    <div style={{height:"500px"}}>
      <Calendar
        events={events}
      localizer={localizer}
      startAccessor="start"
        endAccessor="end"
        selectable={true} 
        onSelectSlot={handleselectslot}
      />
      {showmodal && <Modal
      open={showmodal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"  
      >
            {/* <BasicModal/> */}
  <Box sx={style}>
          <h2 className='flex justify-center text-2xl mb-4'>Scheduled Email</h2>
          <BasicDateTimePicker />
          <p className=' text-gray-500 pl-1'>For schedule your mail select date and time</p>

          <BasicModal/>
          <div className=' overflow-visible'> 
            <div className='flex flex-col gap-2 mt-5'>
                <lable>Recepiant</lable>
        <input type='file' className={error.length==0?'border border-red-500':""?'w-full outline-none border h-8 rounded-sm':"w-full outline-none border h-8 rounded-sm"}  onChange={handleChange} id='file' name='file'/>
                <p className='text-gray-500 text-sm '>Select the Excel file which contain only email's in first column one by one</p>
      </div>
      <div className='flex gap-2 mt-5'>
        <button className={`${final.length>0?'':"hidden"} border p-2 rounded-md border-gray-400 hover:bg-gray-300`} onClick={handleShow}>View Recepiant details</button>
            </div>
            <div className='flex flex-col gap-2 mt-2'>
                <lable>Subject</lable>
                <input type='text' className='w-full outline-none border h-8 rounded-md pl-3'onChange={handlesubject} id='subject'/>
            </div>
            <div className='flex flex-col gap-2 mt-5'>

                <lable>Content</lable>
        <div><Bulkemailquill setquillcontent={setquillcontent} quillcontent={quillcontent}/></div>
            </div>
        </div> 
        <div>

        <div className='flex justify-center'>
          <button className=' mt-28 my-10 flex justify-center bg-red-500 text-white rounded-xl  h-8  px-20 items-center cursor-pointer p-5 max-3mdd:my-44' onClick={saveEvent}>Save</button>
          </div>  
    </div>
  </Box>
</Modal>}
      




    </div>
  )
}