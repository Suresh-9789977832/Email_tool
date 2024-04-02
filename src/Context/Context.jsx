import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { env } from "../Components/Env";


export const Usercontext = createContext()

function Usercontextprovider({ children }) {
    const [userdata, setuserdata] = useState({})
    const [show, setShow] = useState();
    const [final, setfinal] = useState([])
    const [getdatetime,setgetdatetime]=useState([])


    const navigate = useNavigate()
    const token =localStorage.getItem("token")

    function logout() {
        localStorage.removeItem('token')
        setuserdata(null)
        navigate('/')
    }

    useEffect(() => {
        const refreshuser = async() => {
           try {
            let res = await axios.get(`${env.api_url}/user/refreshuser/${token}`)
            setuserdata(res.data)
           } catch (error) {
            if (error?.response?.status == 401) {
                logout()    
              }
              if (error?.response?.status === 500) {
                  logout()
              }if (error?.response?.status == 498) {
                  logout()
                }
           }
        }
        refreshuser()
        
    },[])



    return <Usercontext.Provider value={{setShow,show,logout,setuserdata,userdata,setfinal,final,getdatetime,setgetdatetime}}>
            {children}
    </Usercontext.Provider>
}


export default Usercontextprovider