import React, { useContext, useEffect, useState } from 'react'
// import Navbar from './Navbar1'
import pimg from "../images/MicrosoftTeams-image (7).png"
import "./StudentDashboard.css"
import Grid1 from "./Grid"
// import data from "./db.json"
import axios from 'axios'
import { User } from './Context'
import AppBar from './Navbar1'
import Footer from "./Footer"
 
 
const StudentDashboard1 = () => {
    const {user,setUser} = useContext(User);
    
    const [selectTopic,setSelectTopic] = useState("SelectBelow")
    const [quizList,setQuizList] = useState([])
    const [oldData,setOldData]=useState([])
    // useEffect(() => {
    //     setQuiz(data.get)
    // },[])

    useEffect(() => {
        axios
        .get("http://localhost:8080/quiz/student/getAll", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setQuizList(res.data);
          setOldData(quizList)
          console.log(res.data);
        //   setTrainerData(res.data);
        });
    },[])
   
  return (
    <div>
        <AppBar quiz={quizList} setQuiz={setQuizList} topic={selectTopic} setTopic={setSelectTopic} name={user.name}/>
        <div style={{padding:'45px',display:'flex',justifyContent:'center'}}>
        <div className='profile'>
            <div className='profile-pic'>
           <img src={pimg} alt="" />
           </div>
            <div className='profile-details'>
                <div className='details' >
                    <label>Name: {user.name}</label>
                   
                </div>
                <div className='details' >
                    <label>Email: {user.email}</label>
                    
                </div>
               
            </div>
        </div>
        </div>
        <div>
            <p className='banner-text1'>Quiz</p>
        </div>
        <div style={{padding:'50px',cursor:"pointer"}}>
        <Grid1 oldData={oldData} quiz={quizList} topic={selectTopic} />
        </div>
       <Footer />
    </div>
  )
}
 
export default StudentDashboard1