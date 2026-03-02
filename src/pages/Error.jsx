import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Error() {
  let navigate=useNavigate()
  return (
    <div>
        <img style={{width:"100%",height:"70%"}} src='https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png'/>
        <div style={{display:"grid",justifyContent:"center"}}>
        <button onClick={() => navigate("/home")} className='btn btn-outline-danger fw-bold border-3' style={{padding: "10px 20px",borderRadius: "8px",cursor: "pointer"}}>Home Page</button>
        <br /><br /><br />
        </div>
    </div>
  )
}
