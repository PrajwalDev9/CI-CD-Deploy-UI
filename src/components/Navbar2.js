import React, { useEffect, useRef, useState } from 'react'
import "./Navbar2.css"
import { Cancel, CancelOutlined, CropSquareSharp, Person, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

 
function Navbar1(props) {
 
  const ref=useRef()
  const navigate=useNavigate()
 
  return (
    <div className='navbar'>
        <p className='quizmaster'>QuizMaster</p>
        
        <div className='profile-name'>
            <div className='profile-icon'><CancelOutlined className='icon' onClick={() => {
              let flag = window.confirm("Are you sure you want to cancel the quiz?");
              if(!flag) return;
              else navigate("/studentDashboard1");
            }}/></div>
            
        </div>
 
 
    </div>
  )
}
 
export default Navbar1