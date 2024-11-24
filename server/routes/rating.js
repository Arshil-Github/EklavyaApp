const express = require("express");

const ratingRouter = express.Router();

const updateStudentRating = (req, res) => {
  //take feedback and requestid from the request body
  //the feedback will contain rating number out of 10
  //from the request id, find the student and get their current rating
  //take the average of the current rating and the new rating
  //update the student rating in the database
  res.send("Update Student Rating");
};
const updateTeacherRating = (req, res) => {
  //same but get the teacher from teacher id using the requestid in request body
  res.send("Update Teacher Rating");
};

ratingRouter.post("/updateStudentRating", updateStudentRating);
ratingRouter.post("/updateTeacherRating", updateTeacherRating);

module.exports = ratingRouter;
