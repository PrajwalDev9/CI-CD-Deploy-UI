import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import "./QuizList.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../images/OIP.jfif";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { User } from "./Context";
import { Alert,Snackbar } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  const [trainerData, setTrainerData] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [duration, setDuration] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Select Topic");
  const {user,setUser} = useContext(User);
  const [isSnackbarOpen1, setSnackbarOpen1] = useState(false);

  const handleCloseSnackbar1 = ()=> {
    setSnackbarOpen1(false);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/quiz/trainer/getAll", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setQuizList(res.data);
        setTrainerData(res.data);
      });
  }, []);

  const handleClick = () => {
    if (duration === "") {
      // alert("Please enter the duration first!");
      setSnackbarOpen1(true);
      return;
    }

    const selectedQuiz = trainerData.filter((user) => {
      return selectedTopic === "Select Topic"
        ? user.quizDuration >= duration
        : user.quizDuration >= duration && user.quizTopic === selectedTopic;
    });

    setQuizList(selectedQuiz);
  };

  useEffect(() => {
    if (selectedTopic === "Select Topic") {
      setQuizList(trainerData);
      return;
    }

    const selectedQuiz = trainerData.filter((user) => {
      return duration === ""
        ? user.quizTopic === selectedTopic
        : user.quizTopic === selectedTopic && user.quizDuration >= duration;
    });

    setQuizList(selectedQuiz);
  }, [selectedTopic]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <AppBar position="absolute">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
            onClick={() => {
              navigate("/trainer");
            }}
          >
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
            Back
          </Button>

          <div>
            <select
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="dropDownBtn"
            >
              <option>Select Topic</option>

              <option>Java</option>

              <option>JavaScript</option>

              <option>React</option>

              <option>Node.js</option>
              <option value="Object-Oriented Programming (OOP)">OOPS</option>
              <option>Python</option>
            </select>

            <input
              className="inputBox"
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Filter quizzes by duration..."
            />

            <button className="searchButton" onClick={handleClick}>
              Search
            </button>
          </div>
        </Toolbar>
      </AppBar>

      <main style={{ backgroundColor: "#e8eded" }}>
        {/* Hero unit */}

        <Box
          sx={{
            pt: 8,

            pb: 6,
          }}
        >
          <Container
            className="body1"
            style={{
              display: "flex",

              justifyContent: "center",

              marginTop: "50px",
            }}
          >
            <Paper
              className="paper"
              sx={{
                width: "80%",

                overflow: "hidden",

                display: "flex",

                justifyContent: "center",

                flexDirection: "column",

                background: "transparent",

                border: "none",

                boxShadow: "none",
              }}
            >
              <Typography
                className="big-font"
                variant="h3"
                sx={{ textAlign: "center" }}
                gutterBottom
              >
                Welcome {user.name}
              </Typography>

              <Typography
                className="small-font"
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Here is the list of all quizzes created by you.
              </Typography>
            </Paper>
          </Container>
        </Box>

        <Container
          sx={{ py: 2 }}
          maxWidth="md"
          style={{ justifyContent: "center" }}
        >
          {/* End hero unit */}

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {(quizList.length === 0) ? (
              <h1>No Quiz Available....</h1>
            ) : (
              quizList.map((card, idx) => (
                <Grid className="item" item key={idx} xs={8} sm={7} md={4}>
                  <Card
                    sx={{
                      height: "100%",

                      display: "flex",

                      flexDirection: "column",
                    }}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                    className="card"
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "56.25%",
                      }}
                      image={logo}
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      <span style={{ display: "flex", borderBottom: "2px solid black" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          sx={{ width: "100%", fontSize:"18px", fontWeight: "bold" }}
                        >
                          {card.quizName}
                        </Typography>
                      </span>

                      <Typography style={{ lineHeight: "30px" }}>
                        Topic - {card.quizTopic}
                      </Typography>

                      <Typography style={{ lineHeight: "30px" }}>
                        No. of questions - {card.totalQuestions}
                      </Typography>

                      <Typography style={{ lineHeight: "30px" }}>
                        Quiz Duration - {card.quizDuration}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          <Snackbar
          open={isSnackbarOpen1}
          autoHideDuration={2000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar1}
          message="User created successfully!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please enter the duration first !!!
          </Alert>
        </Snackbar>
        </Container>
      </main>
    </ThemeProvider>
  );
}
