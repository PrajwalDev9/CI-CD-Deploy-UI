import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
import "./Leaderboard.css"
import  Card  from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ArrowBackIos, RoundedCorner } from '@mui/icons-material'

import Navbar3 from './Navbar3'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import data from "./toppers.json"
 
function Leaderboard() {
    const [selectTopic,setSelectTopic] = useState("SelectBelow")
    const [topics,setTopics] = useState([])
    const [visible,setVisible] = useState(true)
    const [flag,setFlag] = useState(true)
    var oldData=[]
    oldData=topics
    var oldData1;
    const navigate=useNavigate()

    useEffect(() => {
        
        axios.get(`http://localhost:8080/quiz/student/leaderboards`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then(res => {
            setTopics(res.data)
            
            
          })
    },[])
   console.log(topics);
  return (
    <div>
        <Navbar3 setTopics={setSelectTopic}/>
       
        <div className='container'>
          
          <ArrowBackIos onClick={() => navigate(-1)} style={{cursor:"pointer"}}/>
            <p className="leaderboard" style={{textAlign:'center'}}>Leaderboard</p>
        
           {topics.filter(element=>{
            if(selectTopic==='SelectBelow')
                return oldData
            else if(selectTopic===element.quizTopic)
                return topics
            
           }).map((element,index) => {
         
            return (
               <fieldset key={index}>
            <legend>{element.quizTopic}</legend>
            {element.quizInfo.map((element,index) => {
                return (
                    element.toppers.length!==0 ? <div className="card" key={index}>
           <Card sx={{p:3,boxShadow: '0px 4px 20px rgba(0,0,0,0.2)'}}>
                <Typography variant="h5">{element.quizName}</Typography>
                <CardContent>
                    <ul style={{listStyle:'none'}}>
                        {element.toppers.map((element,index) => {
                            return (
                                <li style={{borderLeft:0,borderRight:0,borderTop:0,borderBottom:'1px solid gray',display:'flex'}}><img className='png' src="https://img.freepik.com/free-vector/golden-medal-design_1166-34.jpg?t=st=1700223705~exp=1700224305~hmac=4efab1be33ccba7bb4b4ac339bd9ebd4bbd5ceac8f899f1ae3799b0e17b9bd10" alt=""/>{element.username}{element.marks}</li>
                         ) 
                    }
                )  
            }
                    </ul>
                </CardContent>
            </Card>
            </div>:<div>No Toppers</div>
                )
            })}
           
           
        </fieldset>
            )
           })}
       
        </div>
    
    </div>
  )
}
 
export default Leaderboard