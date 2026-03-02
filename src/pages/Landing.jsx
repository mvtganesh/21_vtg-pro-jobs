import React from 'react'
import img2 from "../assets/03.png"
import { useNavigate } from 'react-router-dom'
export default function Landing() {
    let navigate=useNavigate()
  return (
    <div>

        <div className='d-flex fw-bold text-light' style={{background: "linear-gradient(135deg, #4e73df, #1cc88a)",justifyContent:"space-around",height:"10vh",alignItems:"center"}} >
            <div><button onClick={()=>navigate('/about')} className='btn btn-outline-light border-2'>About</button> </div>
            <div><button onClick={()=>navigate('/home')} className='btn btn-outline-light border-2'>Home</button> </div>
            <div><button onClick={()=>navigate('/loginregister')} className='btn btn-outline-light border-2'>Login / Register</button> </div>
        </div>
        <div style={{objectFit:"contain",width:"100%",overflow:"hidden"}}>
        <img src={img2} class="d-block w-100"alt=""/>
        <img class="d-block w-100" src="https://pwonlyias.com/wp-content/uploads/2024/04/employment-trends-in-india-addressing-challenges-and-solutions-for-job-creation-661e70a341022.webp" />
         <img src="https://www.naukri.com/blog/content/images/2018/10/annual_salary4.jpg" class="d-block w-100"alt=""/>
        </div>
    </div>
  )
}
