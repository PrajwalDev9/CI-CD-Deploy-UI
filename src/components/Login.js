import React, { useContext, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from '@mui/icons-material/Person';
// import cors from "cors"
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "./Context";
// import Cookies from "js-cookie";

const Login = () => {
  const {user,setUser} = useContext(User);
  const navigate = useNavigate();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isSnackbarOpen1, setSnackbarOpen1] = useState(false);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleCloseSnackbar1 = () => {
    setSnackbarOpen1(false);
  };
  function handleClick(e) {
    // e.preventDefault();
    const userData = {
      username: userName,
      password: password
    }

    console.log(userData);
   
    if (userName === "" || password === "") {
      // alert("Please fill all the fields !!");
      setSnackbarOpen1(true);
      return;
    }
    axios.post("http://localhost:8080/auth/login", userData).then((res) => {

      console.log(res.data);
     
      const token = res.data.jwtToken

      if (res.status===403) {
        alert("Please provide valid credentials");
      }
      else {
       
        localStorage.setItem("token", token);
        setUser({
          name: res.data.username,
          email: res.data.email
        })
        if (res.data.role === 'ROLE_ADMIN') {
          navigate("/admin");
        }
        else if (res.data.role === 'ROLE_TRAINER') {
          navigate("/trainer");
        }
        else if(res.data.role=== "ROLE_STUDENT") {
          navigate("/studentDashboard1");
        }

      }
    }).catch((err) => {
      // alert("Invalid User");
      setSnackbarOpen(true);
    })
  }
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9AXZtr16Le_BX78Z0VeRpsIiN-4jeQbwvmnGE4CLbGiDgDoEEc2QIRVi3yJKPUPsqcI&usqp=CAU')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          // backgroundColor: 'white',
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
          minHeight: "62vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.3s", // Apply transition effect to the entire container
          transform: "translateZ(0)", // Reset the transform property
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateZ(20px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateZ(0)";
        }}
      >
        <Grid container spacing={1} >
          {/* Left Part with Image */}

          <Grid item xs={12} md={6}>
            <Box
              style={{
                width: "100%",

                height: "100%",

                objectFit: "cover",
              }}
            >
              <img
                src="https://img.freepik.com/premium-photo/back-school-concept-top-view-photo-yellow-blue-school-supplies-plastic-alphabet-letters-notebooks-ruler-pens-blue-pencilcase-bicolor-white-blue-background-with-empty-space_352249-9026.jpg"
                alt="School"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>

          {/* Right Part with Login Form */}

          <Grid item xs={12} md={6}>
            <Box
              p={2}
              display="flex"
              flexDirection="column"
              boxShadow={2}
              style={{
                backgroundImage: "linear-gradient(to right, #4fc3f7, #01579b)",
                padding: "20px",
                color: "white",
              }}
            >
              <Typography variant="h4" mb={2} style={{ alignSelf: "center" }}>
                Login
              </Typography>

              <TextField
                // label="Email"
                variant="outlined"
                margin="normal"
                placeholder="Enter Username"
                fullWidth
                mb={1}
                InputProps={{
                  startAdornment: <PersonIcon></PersonIcon>,
                }}
                style={{
                  background: "white"
                }}
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />

              <TextField
                // label="Password"
                placeholder="Enter Password"
                variant="outlined"
                type="password"
                margin="normal"
                fullWidth
                mb={1}
                InputProps={{
                  startAdornment: <LockIcon></LockIcon>,
                }}
                style={{ background: "white" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                style={{
                  background: "linear-gradient(#01579b, #003366)",

                  color: "white",

                  width: "100%", // Button takes full width

                  borderRadius: 5,

                  transition: "0.3s",

                  transform: "translateZ(0)", // Reset the transform property

                  fontSize: "14px", // Set the font size

                  padding: "8px 24px", // Set padding for a smaller button

                  textAlign: "center", // Center text inside the button
                  marginTop: 14
                }}
                onClick={handleClick}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={4000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar}
          message="User created successfully!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Invalid credentials!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isSnackbarOpen1}
          autoHideDuration={4000} // Set the duration you want the Snackbar to be visible
          onClose={handleCloseSnackbar1}
          message="User created successfully!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            // onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please provied all the details !!!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Login;