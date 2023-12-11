import  AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button' ;
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useRef, useState } from 'react';
import "./Navbar3.css"
import { ArrowBack, ArrowBackIos, ArrowDropDown, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { User } from './Context'
 
export default function Navbar3(props) {
    const ref=useRef()
    const navigate=useNavigate()
    const [open,setOpen] = useState(false)
    const {user,setUser} = useContext(User);
  return (
 
   
    <div>
    <div className='navbar'>
        <p className='quizmaster' style={{cursor:'pointer',color:'white'}} onClick={()=>{navigate("/studentDashboard1")}}>QuizMaster</p>
        <div className='search-bar'>
         
            <select ref={ref} onChange={() => props.setTopics(ref.current.value)}>
              <option value="SelectBelow">Select Below</option>
              <option value="React">React</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Object-Oriented Programming (OOP)">OOPS</option>
              <option value="Node.js">Node js</option>
            </select>
        </div>
       
        <div className='profile-name3'>
            <div className='profile-icon3'><Person className='icon3'/></div>
            <p className='profile-text3'>Hi! {user.name}</p>
            <div><ArrowDropDown  onClick={() => setOpen(!open)}/></div>
           
        </div>
       
    </div>
     {
      open &&<div className='dropDown' style={{display:'flex',justifyContent:'end'}} onClick={() => navigate("/")}> <ul className='list1'>
        <li><a href="/">Logout</a></li>
      </ul>
      </div>
  }
  </div>
  )
 
}