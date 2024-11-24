const express = require("express");
const database = require("../database");

const requestRouter = express.Router();

const createRequest = async (req, res) => {
  const { name, creationDate, student, urgency } = req.body;

  if (!name || !creationDate || !student || !urgency) {
    return res.status(400).send("All fields are required");
  }

  const newRequest = new database.TopicRequestDb({
    name,
    creationDate,
    student,
    urgency,
  });

  try {
    const success = await newRequest.save();
    return res.status(201).send(success);
  } catch (err) {
    return res.status(500).send("Error creating request");
  }
};

const getAllAvailableRequests = (req, res) => {
  // Logic for getting all available requests
  res.send("All available requests");
};

const updateRequest = (req, res) => {
  // Logic for updating a request
  res.send("Request updated");
};

const confirmRequest = (req, res) => {
  // Logic for confirming a request
  res.send("Request confirmed");
};

requestRouter.post("/createRequest", createRequest);
requestRouter.get("/getAllAvailableRequests", getAllAvailableRequests);
requestRouter.put("/updateRequest", updateRequest);
requestRouter.post("/confirmRequest", confirmRequest);

module.exports = requestRouter;
