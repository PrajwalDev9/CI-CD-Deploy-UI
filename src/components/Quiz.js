import React, { useEffect, useState } from "react";
// import { Questions } from "./Questions"
// import { Questions } from '../Data/QuizData'
import QuizResult from "./QuizResult";
import "./Quiz.css";
// import Navbar from './Navbar';
import Navbar1 from "./Navbar2";
import axios from "axios";
import { useParams } from "react-router-dom";
// import HamburgerMenu from './HamburgerMenu';
// import "./Hamburger.css"
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState();
  const [ansIndex, setansIndex] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [resTime, setResTime] = useState(0);
  const numQues = 10;
  const params = useParams();
  const [totalTime, setTotalTime] = useState(0);
  const [Marks, setmarks] = useState([0]);
  const [hamburger, setHamburger] = useState(true);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/quiz/student/questionPaper/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setQuestions(res.data.questions);
        // setTimer(res.data.quizDuration*60)
        setTimer(res.data.quizDuration * 60);
        setTotalTime(res.data.quizDuration * 60);
        console.log(res.data);
        setClickedOption(Array(res.data.questions.length).fill(0));
        setansIndex(Array(res.data.questions.length).fill(0));
        //   setTrainerData(res.data);
      });
  }, []);

  useEffect(() => {

      const interval = setInterval(() => {

         timer>0 && setTimer((prevTimer) => {
              setResTime(prevTimer);
              return prevTimer - 1;

          });
      }, 1000);

      return () => clearInterval(interval);
  }, [timer]);
  useEffect(() => {
    // if(timer==0) {
    //
    // }

    if (timer == 0) {
      // setTimer(0);
      // setResTime(totalTime)
      setFlag(true);
      handleSubmit();
      setShowResult(true);
    }
  }, [timer]);

  // useEffect(()=>{
  //     alert("Welcome to quiz management");
  // },[]);
  const changeQuestion = () => {
    //updateScore();
    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // setClickedOption(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const previousquestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

 
  const handleClick = (i, currentQuestion) => {
    const updatedClickedOption = [...clickedOption];
    updatedClickedOption[currentQuestion] = i + 1;
    setClickedOption(updatedClickedOption);
    const updatedAnsIndex = [...ansIndex];
    updatedAnsIndex[currentQuestion] = i + 1;
    setansIndex(updatedAnsIndex);
  };
  const handleSubmit = () => {
    
    if (timer > 0) {
      var data = {
        quizId: params.id,
        selectedOption: ansIndex,
        totalTimeDuration: totalTime - resTime,
      };
    } else {
      var data = {
        quizId: params.id,
        selectedOption: ansIndex,
        totalTimeDuration: 0,
      };
    }

    axios
      .post("http://localhost:8080/quiz/student/calculateResult", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setmarks(res.data.marks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="Navbar1">
        <Navbar1 />
      </div>
      {hamburger ? (
        <aside className="hamburger-menu">
          <ul className="list9">
            {ansIndex.map((q, index) => (
              <li
                key={index}
                onClick={() => setCurrentQuestion(index)}
                style={{ cursor: "pointer", background: q ? "#00cc66" : "" }}
              >
                <div>{index + 1}</div>
              </li>
            ))}
          </ul>
        </aside>
      ) : (
        <></>
      )}

      
      {!showResult && (
        <div className="timer1">
          Time left: {Math.floor(timer / 60)}:
          {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </div>
      )}
      {showResult && <div className="timer1">Your Test is Over !!</div>}

      {!showResult && <p className="heading-txt">Take Your Quiz</p>}
      <div className="container2">
        {showResult ? (
          <QuizResult
            result={Marks}
            setHamburger={setHamburger}
            // score={score} totalScore={Questions.length} tryAgain={resetAll}
          />
        ) : (
          <>
            {currentQuestion < Questions.length && (
              <>
                <div className="question">
                  <span id="question-number">{currentQuestion + 1}. </span>
                  <span id="question-txt">
                    {Questions[currentQuestion].questionText}
                  </span>
                </div>
                <div className="option-container">
                  {[`option1`, `option2`, `option3`, `option4`].map(
                    (optionKey, i) => {
                      const option = Questions[currentQuestion][optionKey];

                      return (
                        <button
                          className={`option-btn ${
                            clickedOption[currentQuestion] === i + 1
                              ? "checked"
                              : ""
                          }`}
                          key={i}
                          onClick={() => handleClick(i, currentQuestion)}
                          style={{cursor:"pointer"}}
                        >
                          {option}
                        </button>
                      );
                    }
                  )}
                </div>
              </>
            )}
            {currentQuestion >= Questions.length && (
              <>
                <div className="show-score">
                  <h1 className="submitType">Are you sure want to submit?</h1>
                </div>

                <input
                  type="button"
                  value="Submit"
                  id="submit-button"
                  onClick={() => {
                    console.log(ansIndex);
                    setShowResult(true);
                    handleSubmit();
                  }}
                  style={{cursor:"pointer"}}
                />
              </>
            )}
            {currentQuestion < Questions.length && (
              <div className="buttons1">
                {currentQuestion>0 && <button className="button1" onClick={previousquestion} style={{cursor:"pointer"}}>
                  Previous
                </button>}
                <button className="button1" onClick={changeQuestion} style={{cursor:"pointer"}}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    // </div>
  );
}

export default Quiz;
