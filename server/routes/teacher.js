const express = require("express");
const database = require("../database");

const teacherRouter = express.Router();

// Define your routes here
teacherRouter.post("/getAllRequests", async (req, res) => {
  const { teacherId } = req.body;

  if (!teacherId) {
    return res.status(400).send("Teacher ID is required");
  }

  try {
    const requests = await database.TopicRequestDb.find({
      teacher: teacherId,
    });
    return res.status(200).send(requests);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting requests");
  }
});
teacherRouter.post("/getTeacherInfo", async (req, res) => {
  const { teacherId } = req.body;

  if (!teacherId) {
    return res.status(400).send("Teacher ID is required");
  }

  try {
    const teacher = await database.TeacherDb.findOne({
      _id: teacherId,
    });
    return res.status(200).send(teacher);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting teacher information");
  }
});
teacherRouter.get("/getTeacherLeaderboard", async (req, res) => {
  try {
    const teachers = await database.TeacherDb.find().sort({ rating: -1 });
    return res.status(200).send(teachers);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting teacher leaderboard");
  }
});
teacherRouter.get("/", (req, res) => {
  res.send("Hello from teacher");
});

module.exports = teacherRouter;
