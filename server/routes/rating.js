const express = require("express");

const ratingRouter = express.Router();

const updateStudentRating = (req, res) => {
  res.send("Update Student Rating");
};
const updateTeacherRating = (req, res) => {
  res.send("Update Teacher Rating");
};

ratingRouter.post("/updateStudentRating", updateStudentRating);
ratingRouter.post("/updateTeacherRating", updateTeacherRating);

module.exports = ratingRouter;
