
import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  AppBar,
  Toolbar,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import "./admin.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isSnackbarOpen1, setSnackbarOpen1] = useState(false);
  const [isSnackbarOpen2, setSnackbarOpen2] = useState(false);
  const [isSnackbarOpen3, setSnackbarOpen3] = useState(false);

  const handleCLick = (e) => {
    e.preventDefault();
    const data = {
      username: userName,
      email: email,
      role: role,
    };
    console.log(data);
    
    
    if(userName.trim()===""||email.trim()===""||role.trim()===""){
      // alert("Please provide all the fields");
      setSnackbarOpen3(true);
    }
    else {
      axios.post("http://localhost:8080/auth/addNewUser", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then((res) => {
          
            setSnackbarOpen(true);
          
          
        
      }).catch((err) => {
          console.log(err.response.data);
          if(err.response.data==="User already exists"){
            setSnackbarOpen1(true);
          }
          else{
            setSnackbarOpen2(true);
          }
          
      })

    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setShowForm(false);
    setEmail("");
    setRole("");
    setuserName("");
  };
 
  const handleCloseSnackbar1 = () => {
   setSnackbarOpen1(false);
  };
  const handleCloseSnackbar2 = () => {
    setSnackbarOpen2(false);
   };
   const handleCloseSnackbar3 = () => {
    setSnackbarOpen3(false);
   };
const navigate  = useNavigate();
  return (
    <>
      {!showForm && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{
            minHeight: "100vh",
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
              <Typography variant="h6" style={{ flexGrow: 1 }}>QuizMaster</Typography>
              <Button color="inherit" style={{border: "1px solid white"}} onClick={()=> {
                localStorage.removeItem("token");
                navigate("/");
              }}>Logout</Button>
            </Toolbar>
          </AppBar>

          <Grid
            container
            item
            xs={12}
            sm={6}
            md={3}
            justifyContent="center"
            alignItems="center"
            style={{
              // Set opacity to 1 if showForm is true, else set it to 0
              transition: "opacity 2s ease-in", // Transition opacity over 3 seconds with ease-in timing function
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              backgroundImage: `url('https://www.itprotoday.com/sites/itprotoday.com/files/styles/article_featured_retina/public/blue_gears_11.jpg?itok=99sijjNd')`,
              backgroundSize: "cover",
              minHeight: "50vh",
              position: "relative",
            }}
          >
            <div
              className="typewriter"
              style={{ position: "absolute", top: "80px" }}
            >
              Want to add a new user
              <span className="blinking-question-mark"> ?</span>
            </div>
            <Button
              variant="outlined"
              //   color="primary"
              onClick={() => setShowForm(true)}
              style={{
                // backgroundColor: "#4fc3f7",
                borderColor: "#42daf5",
                color: "#42daf5",
                marginTop: "20px",
              }}
            >
              Create User
            </Button>
          </Grid>

          
        </Grid>
      )}

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
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
              <Typography variant="h6" style={{ flexGrow: 1 }}>QuizMaster</Typography>
              <Button color="inherit" style={{border: "1px solid white"}} onClick={()=> {
                localStorage.removeItem("token");
                navigate("/");
              }}>Logout</Button>
            </Toolbar>
          </AppBar>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={3}
          justifyContent="center"
          alignItems="center"
          style={{
            opacity: showForm ? 1 : 0, // Set opacity to 1 if showForm is true, else set it to 0
            transition: "opacity 2s ease-in", // Transition opacity over 3 seconds with ease-in timing function
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            backgroundImage: `url('https://www.itprotoday.com/sites/itprotoday.com/files/styles/article_featured_retina/public/blue_gears_11.jpg?itok=99sijjNd')`,
            backgroundSize: "cover",
            minHeight: "50vh",
          }}
        >
          {showForm ? (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "20px",
                borderRadius: "10px",
                opacity: 1,
                // transition: "opacity 1s ease-in", // Fade-in transition effect
                border: "1px solid #01579b",
              }}
            >
              <h2 style={{ color: "#01579b" }}>Create User</h2>
              <form
             
              >
                <TextField
                id="userName"
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  value={userName}
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                />
                <TextField
                id="email"
                  label="Email"
                  variant="outlined"
                 name="email"
                  fullWidth
                  margin="normal"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    label="Role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <MenuItem value="trainer">Trainer</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  style={{ marginTop: "10px" }}
                  onClick={handleCLick}
                >
                  Create
                </Button>
              </form>
            </div>
          ) : null}
        </Grid>

       
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar}
          message="User created successfully!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            User Created Succssfully!!
          </Alert>
        </Snackbar>
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
            User already exists !!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isSnackbarOpen2}
          autoHideDuration={2000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar2}
          message="User created successfully!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please provide valid Email !!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isSnackbarOpen3}
          autoHideDuration={2000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar3}
          message="User created successfully!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Invalid Credentials !!!
          </Alert>
        </Snackbar>

       
      </Grid>
    </>
  );
}

export default Admin;