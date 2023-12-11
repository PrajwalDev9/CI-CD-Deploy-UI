import React from "react";
import Navbar from "./Navbar";
import image from "../images/photo-1543269664-7eef42226a21.png";
import image1 from "../images/photo-1477281765962-ef34e8bb0967.png";
import cloud from "../images/clouds.png";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import Footer from "./Footer";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${cloud})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppBar
        position="static"
        sx={{
          // background: '#2196f3'
          backgroundImage: "linear-gradient(to right,#2196f3, #01579b)",
        }}
      >
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1, marginLeft: "33px",cursor:'pointer' }}>
            QuizMaster
          </Typography>

          <Button
            className="login-button"
            color="inherit"
            sx={{
              marginRight: "33px",
              fontSize: "15px",
              padding: "2px 9px",
              border: "1px solid white",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="hero">
        <div className="dashboard-main">
          <div className="image">
            <img src={image} alt="" />
            <p className="image-text">Make Interactive Quizes</p>
          </div>
          <div className="btn">
            <button
              className="button"
              onClick={() => {
                navigate("/quiz");
              }}
              style={{cursor:"pointer"}}
            >
              Create quiz
            </button>
          </div>
        </div>
        <div className="dashboard-main1">
          <div className="btn1">
            <button
              className="button1"
              onClick={() => {
                navigate(`/quizlist`);
              }}
              style={{cursor:"pointer"}}
            >
              Show Quiz
            </button>
          </div>
          <div className="image1">
            <img src={image1} alt="" />
            <p className="image-text1">List Quizes</p>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="image">
            <img src={image} alt="" />
            <p className="image-text2">Leaderboard</p>
          </div>
          <div className="btn2">
            <button
              className="button3"
              onClick={() => {
                navigate("/leaderboard");
              }}
              style={{cursor:"pointer"}}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
