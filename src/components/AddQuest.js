
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
  Drawer,
  List,
  ListItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import { Quiz } from "./Context";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const AddQuest = () => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",

    option1: "",

    option2: "",

    option3: "",

    option4: "",

    rightAnswerIndex: "",
  });

  const [questionCount, setquestionCount] = useState(0);

  const navigate = useNavigate();

  const [questionNumber, setQuestionNumber] = useState(1);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { quiz, setQuiz } = useContext(Quiz);

  const { quizName, quizTopic, no_of_questions, total_duration_per_question } =
    quiz;

  var numQues = no_of_questions;

  useEffect(() => {

    var arr = [];
    var emptyQuestion = {
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      rightAnswerIndex: "",
    };
    for (var i = 0; i < no_of_questions; i++) {
      arr.push(emptyQuestion);
    }
    setQuestions(arr);
  }, []);

  useEffect(() => {
    if (questionNumber > numQues) {
      setCurrentQuestion({
        questionText: "",
        option1: "",

        option2: "",

        option3: "",

        option4: "",

        rightAnswerIndex: "",
      });
    } else if (questions.length > 0) {
      setCurrentQuestion(questions[questionNumber - 1]);

      console.log(
        "From questionnumber change use-effect " + JSON.stringify(questions)
      );
    }
  }, [questionNumber, questions]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);

    navigate("/trainer");
  };

  const isAnyFieldEmpty =
    currentQuestion.questionText.trim() === "" ||
    currentQuestion.option1.trim() === "" ||
    currentQuestion.option2.trim() === "" ||
    currentQuestion.option3.trim() === "" ||
    currentQuestion.option4.trim() === "" ||
    currentQuestion.rightAnswerIndex === "";

  const areFieldsOnlySpaces =
    currentQuestion.questionText.trim() === "" ||
    currentQuestion.option1.trim() === "" ||
    currentQuestion.option2.trim() === "" ||
    currentQuestion.option3.trim() === "" ||
    currentQuestion.option4.trim() === "";

  const handleCorrectOptionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,

      rightAnswerIndex: Number(e.target.value),
    });
  };

  const handleAddQuestion = (e) => {
    const isDuplicate = questions.some(
      (q) =>
        q.questionText === currentQuestion.questionText &&
        q.option1 === currentQuestion.option1 &&
        q.option2 === currentQuestion.option2 &&
        q.option3 === currentQuestion.option3 &&
        q.option4 === currentQuestion.option4 &&
        q.rightAnswerIndex === currentQuestion.rightAnswerIndex
    );
   
    if (isDuplicate) {
      alert("Duplicate question and answer combination!");
      return;
    }
    if (
      currentQuestion.questionText == "" ||
      currentQuestion.option1 == "" ||
      currentQuestion.option2 == "" ||
      currentQuestion.option3 == "" ||
      currentQuestion.option4 == ""
    ) {
      console.log(currentQuestion);

      alert("You have not filled all the fields.");
    } else {
      const updatedQuestions = [...questions];

      

      updatedQuestions[questionNumber - 1] = currentQuestion;

      

      setquestionCount(questionCount + 1);

      setQuestions(updatedQuestions);


      setQuestionNumber(questionNumber + 1); //Math.min(questionNumber + 1, 2));
    }
  };

  const handleClick = () => {
    if (questionCount < numQues) {
      alert("Please fill all the questions!!!");
    } else {
      setSnackbarOpen(true);

      quiz["questions"] = questions;

      console.log(JSON.stringify(quiz));

      setQuiz(quiz);

      axios
        .post(
          "http://localhost:8080/quiz/trainer/create-quiz",
          quiz,

          {
            headers: {
              "Content-Type": "application/json",

              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  const handlePreviousQuestion = () => {
    if (questionNumber > 1) {
      // setCurrentQuestion(questions[questionNumber - 2]);

      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleNextQuestion = () => {
    // if (questionNumber < numQues) {

    // setCurrentQuestion(questions[questionNumber - 2]);

    // setQuestionNumber(Math.min(questionNumber + 1, questions.length + 1));

    setQuestionNumber(questionNumber + 1);

    // }
  };

  // ... rest of your code

  return (
    <div style={{ background: "#f0f7ff", minHeight: "100vh" }}>
      {/* ... other components */}

      <CssBaseline />

      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to right, #4fc3f7, #01579b)",

          paddingLeft: isDrawerOpen ? "100px" : "0",

          transition: "padding-left 0.2s",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ mr: 2, ...(isDrawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            style={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate("/trainer");
            }}
          >
            QuizMaster
          </Typography>

          <Button
            color="inherit"
            style={{ border: "1px solid white", cursor: "pointer" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        variant="persistent"
        sx={{
          width: "240px",

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            // width: "240px",

            background: "#01579b",

            color: "white",
          },
        }}
      >
        <List>
          {[...Array(numQues)].map((_, index) => (
            <ListItem
              button
              key={index + 1}
              onClick={() => {
                setQuestionNumber(index + 1);

                setIsDrawerOpen(false);
              }}
              sx={{ border: "1px solid white" }}
            >
              Question {index + 1}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ... rest of your components */}

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
                  Add Question (Question {questionNumber})
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

              {questionNumber <= numQues && (
                <TextField
                  label="Question"
                  variant="outlined"
                  fullWidth
                  value={currentQuestion.questionText}
                  inputProps={{ maxLength: 500 }}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,

                      questionText: e.target.value,
                    })
                  }
                  style={{ marginBottom: "20px" }}
                  required
                />
              )}

              {questionNumber > numQues && (
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
                  disabled
                />
              )}

              {questionNumber <= numQues && (
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
                  disabled={currentQuestion.questionText.trim() === ""}
                />
              )}

              {questionNumber > numQues && (
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
                  disabled
                />
              )}

              {questionNumber <= numQues && (
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
                  disabled={currentQuestion.option1.trim() === ""}
                />
              )}

              {questionNumber > numQues && (
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
                  disabled
                />
              )}

              {questionNumber <= numQues && (
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
                  disabled={
                    currentQuestion.option1.trim() === "" ||
                    currentQuestion.option2.trim() === ""
                  }
                />
              )}

              {questionNumber > numQues && (
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
                  disabled
                />
              )}

              {questionNumber <= numQues && (
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
                  disabled={
                    currentQuestion.option1.trim() === "" ||
                    currentQuestion.option2.trim() === "" ||
                    currentQuestion.option3.trim() === ""
                  }
                />
              )}

              {questionNumber > numQues && (
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
                  disabled
                />
              )}

              {questionNumber <= numQues && (
                <TextField
                  label="Correct Option"
                  variant="outlined"
                  fullWidth
                  select
                  value={currentQuestion.rightAnswerIndex}
                  onChange={handleCorrectOptionChange}
                  style={{ marginBottom: "20px" }}
                  required
                  disabled={areFieldsOnlySpaces}
                >
                  {[0, 1, 2, 3].map((index) => (
                    <MenuItem key={index} value={index + 1}>
                      Option {index + 1}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {questionNumber > numQues && (
                <TextField
                  label="Correct Option"
                  variant="outlined"
                  fullWidth
                  select
                  value={currentQuestion.rightAnswerIndex}
                  onChange={handleCorrectOptionChange}
                  style={{ marginBottom: "20px" }}
                  required
                  disabled
                >
                  {[0, 1, 2, 3].map((index) => (
                    <MenuItem key={index} value={index + 1}>
                      Option {index + 1}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {questionNumber > 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePreviousQuestion}
                >
                  Previous 
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
                style={{ marginLeft: "10px" }}
                disabled={
                  questionNumber > numQues ||
                  isAnyFieldEmpty ||
                  areFieldsOnlySpaces
                }
              >
                Save Question
              </Button>


              {questionNumber <= questions.length && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextQuestion}
                  style={{ marginLeft: "10px" }}
                  disabled = {isAnyFieldEmpty}
                >
                  Next 
                </Button>
              )}

              {questionNumber > numQues && (
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

        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar}
          // message="User created successfully!"

          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}

            severity="success"
            sx={{ width: "100%" }}
          >
            Questions submitted successfully!!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default AddQuest;