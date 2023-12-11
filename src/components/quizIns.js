import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Quiz from './Quiz';
import './quizIns.css'
export default function QuizIns() {
    const navigate = useNavigate();
    const params=useParams()
    const {quiztopic}= useParams();
    const [isChecked, setIsChecked] = useState(false);
const handleCheckboxChange = () => {
setIsChecked(!isChecked);
};
const handleSubmit = () => {
if (isChecked) {
// Perform the submit action
navigate(`/quiz/student/questionPaper/${params.id}`);
} else {
// Display an error message or handle as needed
alert('Please check the checkbox before submitting.');
}
};
const handlecancel=()=>{
   navigate(-1)
}
  return (
    <div>
        <div className='header'>
        <p className='h-text' align='center'>Instruction for quiz component</p>
 
            <div className='box'>
                <p className='content-box'>1. The quizzes consist of questions carefully designed to help you self assess your comprehension of the information presented on the
                    topics covered in the module.
                </p>
            </div>
            <div className='box'>
                <p className='content-box'>2. Each question in the quiz is of multiple-choice format. Read each question carefully,
                and click on the correct option.                                        
                </p>
            </div>
            <div className='box'>
                <p className='content-box'>3. After responding to a question,click on the next button at the bottom to go to the next question and to go to the previous question
                click to the previous button.                                        
                </p>
            </div>
            <div className='box'>
                <p className='content-box'>4. After responding to the last question click on the "Submit" button to complete the test.                                        
                </p>
            </div>
            <div className='box'>
                <p className='content-box'>5. If the time is over then the test will be autosubmitted.                                        
                </p>
            </div>
            <div className='box'>
                <p className='content-box'>6. The total score of the quiz is based on your responses to all questions.                                      
                </p>
            </div>
            <div className='checkbox'>
                <p className='text' style={{marginLeft: "3px"}}><input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} style={{marginBottom:1}}/>I read the above information and I agree with that.</p>
            </div>
            <div className='button'>
               <button className='cancel' onClick={handlecancel} style={{cursor:"pointer"}}>Cancel</button>
               <button onClick={handleSubmit} disabled={!isChecked} className='submit' style={{cursor:"pointer"}}>Start</button>
            </div>
        </div>
    </div>
  )
}
