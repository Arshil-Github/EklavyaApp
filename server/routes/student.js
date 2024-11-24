const express = require("express");

const studentRouter = express.Router();

const getStudentInfo = (req, res) => {
  res.send("Return Student Information");
};

studentRouter.post("/getStudentInfo", getStudentInfo);

module.exports = studentRouter;
