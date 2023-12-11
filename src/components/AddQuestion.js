import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  MenuItem,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import { Quiz } from "./Context";
import axios from "axios";
 
const AddQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    // options: [{optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}],
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswerIndex: "",
  });
  const [questionNumber, setQuestionNumber] = useState(1);
  const { quiz, setQuiz } = useContext(Quiz);
  const { quizName, quizTopic, no_of_questions, total_duration_per_question } =
    quiz;
  const numQues = no_of_questions;
 
  // const handleInputChange = (index, e) => {
  //   const updatedOptions = [...currentQuestion.options];
  //   updatedOptions[index].optionStatement = e.target.value;
  //   updatedOptions[index].optionIndex = Number(index) +1
 
  //   setCurrentQuestion({
  //     ...currentQuestion,
  //     options: updatedOptions,
  //   });
  // };
 
  const handleCorrectOptionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      rightAnswerIndex: Number(e.target.value),
    });
  };
 
  const handleAddQuestion = () => {
    if (
      // currentQuestion.question &&
      // currentQuestion.options.every((option) => JSON.stringify(option) !== '{}') &&
      // currentQuestion.correctOption !== ''
      currentQuestion.questionText !== "" &&
      currentQuestion.option1 !== "" &&
      currentQuestion.option2 !== "" &&
      currentQuestion.option3 !== "" &&
      currentQuestion.option4 !== "" &&
      currentQuestion.rightAnswerIndex !== ""
    ) {
      const updatedQuestions = [...questions];
      if (questionNumber <= questions.length) {
        updatedQuestions[questionNumber - 1] = currentQuestion;
      } else {
        updatedQuestions.push(currentQuestion);
      }
      setQuestions(updatedQuestions);
      // console.log(updatedQuestions);
      setCurrentQuestion({
        questionText: "",
        // options: [{optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}],
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswerIndex: "",
      });
      setQuestionNumber(questionNumber + 1); //Math.min(questionNumber + 1, 2));
    } else {
      alert("Please fill out all fields.");
    }
  };
 
  // useEffect(() => {
  //   setCurrentQuestion(questions[questionNumber - 1]);
  // }, [questionNumber, questions]);
 
  // const handlePreviousQuestion = async() => {
  //   if (questionNumber > 1) {
  //     setQuestionNumber(questionNumber - 1);
  //     // console.log("Previous wala , questonnumber="+ questionNumber);
  //     // setCurrentQuestion(questions[questionNumber - 2]);
  //   }
  // };
 
  // useEffect(()=> {
  //   console.log(quiz);
  // },[]);
 
  useEffect(() => {
    setCurrentQuestion((prevQuestion) => {
      if (questionNumber <= questions.length) {
        return questions[questionNumber - 1];
      } else {
        return {
          questionText: "",
          // options: [{optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}, {optionStatement:'',optionIndex:''}],
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          rightAnswerIndex: "",
        };
      }
    });
  }, [questionNumber, questions]);
 
  const handleClick = () => {
    quiz["questions"] = questions;
    console.log(JSON.stringify(quiz));
    setQuiz(quiz);
    axios.post("quiz/trainer/create-quiz",quiz,{headers: {Authorization:localStorage.getItem("token")}}).then((res)=> {
        console.log(res);
    }).catch((err)=> {
        console.log(err);
    })
  };
 
  const handlePreviousQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
      // setCurrentQuestion(questions[questionNumber - 2]);
    }
  };
 
  const handleNextQuestion = () => {
    if (questionNumber < numQues) {
      setQuestionNumber(Math.min(questionNumber + 1, questions.length + 1));
      // if (questionNumber <= questions.length) {
      //   // setCurrentQuestion(questions[questionNumber - 1]);
      // } else {
      //   setCurrentQuestion({
      //     question: '',
      //     options: ['', '', '', ''],
      //     correctOption: '',
      //   });
      // }
    }
  };
 
  return (
    <div style={{ background: "#f0f7ff", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static" style={{ background: "#2196f3" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Quiz Management
          </Typography>
        </Toolbar>
      </AppBar>
 
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              style={{
                padding: "20px",
                textAlign: "center",
                background: "#ffffff",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              {questionNumber <= numQues && (
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ color: "#2196f3" }}
                >
                  Add Questions (Question {questionNumber})
                </Typography>
              )}
              {questionNumber > numQues && (
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ color: "#2196f3" }}
                >
                  Final Submit
                </Typography>
              )}
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={currentQuestion.questionText}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    questionText: e.target.value,
                  })
                }
                style={{ marginBottom: "20px" }}
                required
              />
              {/* {[0, 1, 2, 3].map((index) => (
                <TextField
                  key={index}
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={currentQuestion.options[index].optionStatement}
                  onChange={(e) => handleInputChange(index, e)}
                  style={{ marginBottom: '10px' }}
                  required
                />
              ))} */}
              <TextField
                // key={index}
                label="Option 1"
                variant="outlined"
                fullWidth
                value={currentQuestion.option1}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    option1: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
                required
              />
              <TextField
                // key={index}
                label="Option 2"
                variant="outlined"
                fullWidth
                value={currentQuestion.option2}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    option2: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
                required
              />
              <TextField
                // key={index}
                label="Option 3"
                variant="outlined"
                fullWidth
                value={currentQuestion.option3}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    option3: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
                required
              />
              <TextField
                // key={index}
                label="Option 4"
                variant="outlined"
                fullWidth
                value={currentQuestion.option4}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    option4: e.target.value,
                  })
                }
                style={{ marginBottom: "10px" }}
                required
              />
              <TextField
                label="Correct Option"
                variant="outlined"
                fullWidth
                select
                value={currentQuestion.rightAnswerIndex}
                onChange={handleCorrectOptionChange}
                style={{ marginBottom: "20px" }}
                required
              >
                {[0, 1, 2, 3].map((index) => (
                  <MenuItem key={index} value={index + 1}>
                    Option {index + 1}
                  </MenuItem>
                ))}
              </TextField>
              {questionNumber > 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePreviousQuestion}
                >
                  Previous Question
                </Button>
              )}
              {questions.length != 0 &&
                !(questionNumber >= numQues) &&
                questionNumber <= questions.length && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextQuestion}
                    style={{ marginLeft: "10px" }}
                  >
                    Next Question
                  </Button>
                )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
                style={{ marginLeft: "10px" }}
                disabled={questionNumber > numQues}
              >
                Add Question
              </Button>
              {(questionNumber > numQues ||
                (questionNumber == questions.length &&
                  questionNumber == numQues)) && (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={handleClick}
                >
                  POST
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
 
export default AddQuestion;