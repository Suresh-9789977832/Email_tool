import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { env } from './Env'

function Emailtable() {

    const [emaildata,setemaildata]=useState([])
        
  useEffect(() => {
    const getschedulemail = async () => {
      try {
        let res = await axios.get(`${env.api_url}/post/getschedule`)
        if (res.status == 200) {
          setemaildata(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getschedulemail()
  }, [])
    

    return (
        <div className=" mx-60 overflow-auto max-3llg:mx-40 max-3md:mx-20 max-3mdd:mx-0">
  <table className="table ">
    <thead>
                    <tr>
                        <th>S.NO</th>
        <th>Sender</th>
        <th >Content</th>
        <th>Date&Time</th>
      </tr>
    </thead>
 <tbody>
                    {
                        emaildata.map((e,i) => (
                            <tr key={e._id}>
                                <th >{i+1}</th>
                                <td>{String(e.receiver).split(" ").join("\n")}</td>
                                <td >{e.title}</td>
                                <td>{`${e.day}-${e.month} & ${e.hour}:${e.minute}`}</td>
                          </tr>
                        ))
                    }
     
    </tbody>
  </table>
</div>
    )
}

export default Emailtable
