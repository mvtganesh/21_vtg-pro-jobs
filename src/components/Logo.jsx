import React from 'react'
import logo from "../assets/01.png";
export default function Logo() {
  return (
    <div>
      <img src={logo} alt="123" style={{objectFit:"contain",width:"100%",height:"auto"}} />
    </div>
  )
}
