const express = require("express");
const database = require("../database");
const studentRouter = express.Router();

const getStudentInfo = async (req, res) => {
  //take request id from the request body
  //fetch the student information from the database
  //scan the request database for a matching student id and return that students relevant information

  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).send("Student ID is required");
  }

  try {
    const student = await database.StudentDb.findOne({
      _id: studentId,
    });
    console.log(studentId);
    return res.status(200).send(student);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting student information");
  }
};
const getStudentRequests = async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).send("Student ID is required");
  }

  try {
    const requests = await database.TopicRequestDb.find({
      student: studentId,
    });
    return res.status(200).send(requests);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting requests");
  }
};

studentRouter.post("/getStudentInfo", getStudentInfo);
studentRouter.post("/getStudentRequests", getStudentRequests);

module.exports = studentRouter;
