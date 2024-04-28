import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { env } from './Env'
import { Usercontext } from '../Context/Context'

function Emailtable() {

  const [emaildata, setemaildata] = useState([])
  const { logout, userdata } = useContext(Usercontext)

  useEffect(() => {
    const getschedulemail = async () => {
      try {
        let id=userdata?.id || userdata?._id
        let res = await axios.get(`${env.api_url}/post/getschedule/${id}`)
        if (res.status == 200) {
          setemaildata(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getschedulemail()
  }, [])
    

  return <>

    {emaildata.length <= 0 ? <h1 className="flex justify-center">No data found</h1>
     
      :

      <div className=" mx-60 overflow-auto max-3llg:mx-40 max-3md:mx-20 max-3mdd:mx-0">
      <table className="table ">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Sender</th>
            <th >Title</th>
            <th>Date&Time</th>
          </tr>
        </thead>
        <tbody>
          {
            emaildata.map((e, i) => (
              <tr key={e._id}>
                <th >{i + 1}</th>
                <td>{String(e.receiver).split(" ").join("\n")}</td>
                <td >{e.title}</td>
                <td>{`${e.day}-${e.month} & ${e.hour}:${e.minute}`}</td>
              </tr>
            ))
          }
     
        </tbody>
      </table>
    </div>
    }
    
   
  </>
}

export default Emailtable
