import React, { useEffect } from 'react'

 import './Quiz.css'
 import './QuizResult.css'
import { useNavigate } from 'react-router-dom'

function QuizResult(props) {
    useEffect(()=>{
        props.setHamburger(false)
    },[])
    const navigate=useNavigate()
  return (
    <>
   
    <div className='show-score'>
      <p className='submitType'>Your Score is {props.result}</p>
       
    </div>
    <div  style={{marginTop:'100px'}}>
      <button className='dashboard-button' onClick={() => navigate("/studentDashboard1")} style={{cursor:"pointer"}}>Back To Dashboard</button>
    </div>
                    
    </>
  )
}
 
export default QuizResult;
