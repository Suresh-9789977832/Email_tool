import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { Usercontext } from '../Context/Context';
import { CiLogout } from "react-icons/ci";



function Navbar() {
    const token = localStorage.getItem('token')
    const { logout, userdata } = useContext(Usercontext)
    const [active, setactive] = useState('compose')
    const navigate=useNavigate()

    const handleClick = (link) => {
        setactive(link);
    };

    useEffect(() => {
        if (token) {
            active=='compose'?navigate('/compose'):""   
        }
    },[active])
    

    return <>
        <div className='w-full h-16 bg-slate-800 flex items-center gap-2 justify-between'>
            <div className='flex text-white'>
                <Link to={'/compose'} className='flex items-center pl-40 pr-10 text-white max-3mdd:p-2 max-3sm:pl-1 max-3lg:pl-5'>
                <AiOutlineMail  className=' text-red-500 text-2xl max-3ssm:text-sm'/>&nbsp;
                <h2 className='h2'>EmailTools</h2>
                </Link>
                {token ? <Link to={'/compose'} className={ active== 'compose' ? 'active' : ""?"":"nav"} onClick={()=>handleClick('compose')} >Compose</Link>:""}
                {token?<Link to={'/bulk'} className={active == 'bulkemail' ? 'active' : ""?"":"nav" } onClick={()=>handleClick('bulkemail')}>BulkEmail</Link>:""}
                {token?<Link to={'/schedule'} className={active == 'scheduleemail' ? 'active' : ""?"":"nav" } onClick={()=>handleClick('scheduleemail')}>ScheduleEmail</Link>:""}
            </div>
            {token?<h1 className='ml-96 bg-orange-100 p-2 rounded-lg flex my-2  max-3llg:ml-20 max-3llg:p-1 max-3md:ml-12 max-3mdd:ml-0 max-3mdd:hidden'><span><img src='./images/wave.png' className='w-8 h-8 pr-2 max-3mdd:hidden'/></span>hi {userdata.username} !</h1>:""}
            {token ? <button className='mr-40 text-white bg-gray-500 p-2 rounded-lg flex justify-center hover:bg-red-500 max-3mdd:mr-10 max-3sm:mr-5 max-3lg:mr-10 max-3llg:m-5 max-3mdd:m-0 max-3mdd:p-2 text-sm max-3sm:hidden' onClick={logout}>Logout</button>:""}
            {token ? <CiLogout className='hidden max-3sm:block my-2 mx-3 text-2xl p-1 text-white bg-slate-500 max-3ssm:my-0 max-3ssm:mx-1' onClick={logout} />:""}
        </div>
    </>
}

export default Navbar
