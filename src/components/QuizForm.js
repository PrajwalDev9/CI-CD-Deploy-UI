import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  OutlinedInput
} from "@mui/material";
import { useNavigate } from "react-router";
import { Quiz } from "./Context";
import e from "cors";
 
const QuizForm = () => {
  const [quizName, setQuizName] = useState("");
  const [quizTopic, setTopic] = useState("");
  const [numQues, setNumQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const { quiz, setQuiz } = useContext(Quiz);
  const navigate = useNavigate();
  const [space, setSpace] = useState(false);
 
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        marginTop:'30px',
        paddingLeft: "10px",
        paddingRight: "10px",
        width: "400",
        background: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9AXZtr16Le_BX78Z0VeRpsIiN-4jeQbwvmnGE4CLbGiDgDoEEc2QIRVi3yJKPUPsqcI&usqp=CAU) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <AppBar
        position="fixed"
        style={{
          background: "linear-gradient(to right, #4fc3f7, #01579b)",
          width: "100%",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{
            flexGrow: 1,
            cursor: "pointer",
          }
          }
            onClick={() => {
              navigate("/trainer");
            }} >QuizMaster</Typography>
          <Button color="inherit" style={{ border: "1px solid white", cursor: "pointer" }} onClick={() => {
 
            navigate("/trainer");
          }}>Back</Button>
        </Toolbar>
      </AppBar>
      <Grid item xs={10} sm={8} md={6} lg={3}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: 3,
            // background: 'white',
            borderRadius: "20px",
            width: "400",
            background: "linear-gradient(to right, #4fc3f7, #01579b)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            height: "450px"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold", // Make the text bold
            }}
          >
            Add Quiz
          </Typography>
          <TextField
            // label="Quiz Name"
            placeholder="Quiz Name*"
            variant="outlined"
            value={quizName}
            onChange={(e) => {
              setQuizName(e.target.value);
            }}
            required
            sx={{ backgroundColor: "white", marginBottom: 0 }}
          />
          <FormControl
            sx={{ m: 1, minWidth: 222, background: "white" }}
            required
 
          >
            <Select
              // multiple
              displayEmpty
              value={quizTopic}
              onChange={(e) => setTopic(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Topic*</em>;
                }
 
                return selected;
              }}
              // MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              
              <MenuItem value={"React"}>React</MenuItem>
              <MenuItem value={"Node"}>Node</MenuItem>
              <MenuItem value={"OOPS"}>OOPS</MenuItem>
              <MenuItem value={"Java"}>Java</MenuItem>
              <MenuItem value={"Python"}>Python</MenuItem>
             
            </Select>
          </FormControl>
          <TextField
            // label="Number of Questions"
            placeholder="Number Of Questions*"
            variant="outlined"
            type="number"
            value={numQues}
            onChange={(e) => setNumQuestions(Math.max(1,e.target.value))}
            required
            sx={{ backgroundColor: "white", marginBottom: 1 }}
          />
          <TextField
            // label="Duration Per Question(minutes)"
            placeholder="Duration Per Questions*"
            variant="outlined"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Math.max(1,e.target.value))}
            required
            sx={{ backgroundColor: "white", marginBottom: 0.9 }}
          />
          {(quizName.trim() === "") || (numQues === "0" || duration === "0") || (quizName === "" || quizTopic === "" || numQues === "" || duration === "") ?
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled
              onClick={() => {
 
                const no_of_questions = Number(numQues);
                const total_duration_per_question = Number(duration);
                setQuiz({
                  quizName,
                  quizTopic,
                  no_of_questions,
                  total_duration_per_question,
                  questions: [],
                });
                navigate("/ques");
              }}
              sx={{
                background: "linear-gradient(to right,#01579b, #01579b)", // Blue gradient for button
                borderRadius: "5px",
                transition: "0.3s",
                fontSize: "1.2rem", // Increase font size
 
                "&:hover": {
                  background: "white", // Change background to white on hover
                  color: "#01579b", // Change text color to #01579b on hover
                  transitionDelay: "0.1s", // Delay the hover effect slightly
                },
              }}
            >
              Add Question
            </Button> :
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={(e) => {
 
                const no_of_questions = Number(numQues);
                const total_duration_per_question = Number(duration);
                setQuiz({
                  quizName,
                  quizTopic,
                  no_of_questions,
                  total_duration_per_question,
                  questions: [],
                });
                navigate("/ques");
 
 
              }}
              sx={{
                background: "linear-gradient(to right,#01579b, #01579b)", // Blue gradient for button
                borderRadius: "5px",
                transition: "0.3s",
                fontSize: "1.2rem", // Increase font size
                "&:hover": {
                  background: "white", // Change background to white on hover
                  color: "#01579b", // Change text color to #01579b on hover
                  transitionDelay: "0.1s", // Delay the hover effect slightly
                },
              }}
            >
              Add Question
            </Button>
          }
        </Box>
      </Grid>
    </Grid>
  );
};
 
export default QuizForm;