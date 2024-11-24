const express = require("express");

const studentRouter = express.Router();

const getStudentInfo = (req, res) => {
  //take request id from the request body
  //fetch the student information from the database
  //scan the request database for a matching student id and return that students relevant information
  res.send("Return Student Information");
};

studentRouter.post("/getStudentInfo", getStudentInfo);

module.exports = studentRouter;
