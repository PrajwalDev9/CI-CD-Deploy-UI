import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuizList.css";
import logo from "../images/OIP.jfif";
import { useNavigate, useParams } from "react-router-dom";
function Grid1(props) {
  const navigate = useNavigate();
  const { topic } = useParams();
  console.log(props.quiz)


  return (
    <Grid container spacing={4} sx={{ marginTop:'-150px',padding:'130px',justifyContent: "center"}}>
      {props.quiz
        .filter((option) => {
          if (props.topic === "SelectBelow") return props.oldData;
          else if (props.topic === option.quizTopic) return props.quiz;
        })
        .map((e, i) => {
          return (
            <Grid item key={i} xs={8} sm={7} md={4} onClick={() => navigate(`/ins/${e.id}`)}>
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
                  <span
                    style={{ display: "flex", borderBottom: "2px solid black" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        width: "100%",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {e.quizTopic}
                    </Typography>
                  </span>

                  <Typography style={{ lineHeight: "30px" }}>
                  Topic - {e.quizName}
                  </Typography>

                  <Typography style={{ lineHeight: "30px" }}>
                    No. of questions - {e.no_of_questions}
                  </Typography>

                  <Typography style={{ lineHeight: "30px" }}>
                    Quiz Duration - {e.quizDuration}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Grid1;
