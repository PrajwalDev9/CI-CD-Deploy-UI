import React, { useEffect, useRef, useState } from 'react'
import "./Navbar1.css"
import { ArrowBack, ArrowDropDown, BackHand, Person, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
 
function AppBar(props) {
 
  const ref=useRef()
  const [open,setOpen] = useState(false)
  const navigate = useNavigate();
 
  return (
    <div>
    <div className="nav1">
        <p className='header2'>QuizMaster</p>
        <div className='search-bar1'>
         
            <select ref={ref} onChange={() => props.setTopic(ref.current.value)}>
              <option value="SelectBelow">Select Below</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Object-Oriented Programming (OOP)">OOPS</option>
              <option value="Nodejs">Node js</option>
              <option value="Java">Java</option>
            </select>
        </div>
        <div>
          <button className='nav-button' onClick={() => navigate('/leaderboard')}>Leaderboard</button>
        </div>
       
        <div className='profile-name1'>
            <div className='profile-icon1'><Person className='icon1'/></div>
            <p className='profile-text1'>Hi! {props.name}</p>
            <div><ArrowDropDown  onClick={() => setOpen(!open)}/></div>
        </div>
    
    
    </div>
        {
            open && <div className='dropDown' style={{display:'flex',justifyContent:'end'}} onClick={() => navigate("/")}> <ul className='list3'>
              <li onClick={()=> {
                localStorage.removeItem("token");
                navigate("/");
              }}><a href="">Logout</a></li>
            </ul>
            </div>
        }
        </div>
  )
}
 
export default AppBar