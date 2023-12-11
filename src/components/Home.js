import React from 'react'
import "./Home.css"
import image from "../images/brooke-cagle-g1Kr4Ozfoac-unsplash.png"
import background from "../images/quiz4.png"
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
 
function Home() {
    const navigate = useNavigate();
  return (
    <div className="container1" style={{background:`url(${background})`}}>
        <Navbar />
    <div className='home'>
        <div className='banner-text'>
            <p>Take your learning and teaching experience to next level</p>
            <button className='button'
            onClick={()=> {
                navigate('/Login');
            }}
            >Explore</button>
        </div>
        <div className='banner-image'>
            <img className="image" src={image} alt="" />
        </div>
    </div>
    <div className='text-body'>
       
        <p className='text-header'>Welcome to Quiz Master App !</p>
<p className='text-content'>
    Manage and take quizzes with ease. Join us to enhance your knowledge
</p>
 
    </div>
    <Footer />
    </div>
  )
}
 
export default Home;