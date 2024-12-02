const express = require("express");
const database = require("../database");

const requestRouter = express.Router();

const createRequest = async (req, res) => {
  const { name, field, studentId } = req.body;

  if (!name || !field || !studentId) {
    return res.status(400).send("All fields are required");
  }

  const date = new Date().toDateString();

  let langauge = "",
    region = "";
  try {
    const getStudent = await database.StudentDb.findById(studentId);
    langauge = getStudent.languages[0];
    region = getStudent.region;
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting student");
  }

  const newRequest = new database.TopicRequestDb({
    name,
    date,
    field,
    langauge,
    region,
    student: studentId,
  });

  try {
    const success = await newRequest.save();
    return res.status(201).send(success);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error creating request");
  }
};

const getAllAvailableRequests = async (req, res) => {
  // Implementation done
  try {
    const requests = await database.TopicRequestDb.find({
      status: "Available",
    });
    return res.status(200).send(requests);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting requests");
  }

  res.send("All available requests");
};

const updateRequest = async (req, res) => {
  // get request id from req.body
  // get new status from req.body
  // update the request with the new status

  const { requestId, newStatus } = req.body;

  if (!requestId || !newStatus) {
    return res.status(400).send("All fields are required");
  }

  try {
    const request = await database.TopicRequestDb.findById(requestId);

    await request.updateOne({ status: newStatus });

    if (newStatus == "Accepted") {
      const teacherId = req.body.teacherId;
      console.log("Hello");
      await request.updateOne({ teacher: teacherId });
    }

    return res.status(200).send(request);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error updating request");
  }
};
const acceptRequest = (req, res) => {
  // get request id from req.body
  // get teacher id from req.body
  // update the request with the teacher id
  // update the request status to "Accepted"
  res.send("Request accepted");
};
const getRequest = async (req, res) => {
  const { requestId } = req.body;

  if (!requestId) {
    return res.status(400).send("Request ID is required");
  }

  try {
    const request = await database.TopicRequestDb.findById(requestId);
    return res.status(200).send(request);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error getting request");
  }
};

requestRouter.post("/createRequest", createRequest);
requestRouter.get("/getAllAvailableRequests", getAllAvailableRequests);
requestRouter.put("/updateRequest", updateRequest);
requestRouter.post("/acceptRequest", acceptRequest);
requestRouter.post("/getRequest", getRequest);

module.exports = requestRouter;
