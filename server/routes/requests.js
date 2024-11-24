const express = require("express");
const database = require("../database");

const requestRouter = express.Router();

const createRequest = async (req, res) => {
  const { name, date, urgency, studentId } = req.body;

  if (!name || !date || !urgency || !urgency) {
    return res.status(400).send("All fields are required");
  }

  const newRequest = new database.RequestDb({
    name,
    date,
    urgency,
    studentId,
  });

  try {
    const success = await newRequest.save();
    return res.status(201).send(success);
  } catch (err) {
    return res.status(500).send("Error creating request");
  }
};

const getAllAvailableRequests = async (req, res) => {
  // Implementation done
  try {
    const requests = await database.RequestDb.findAll({ status: "Available" });
    return res.status(200).send(requests);
  } catch (err) {
    return res.status(500).send("Error getting requests");
  }

  res.send("All available requests");
};

const updateRequest = (req, res) => {
  // get request id from req.body
  // get new status from req.body
  // update the request with the new status
  res.send("Request updated");
};
const acceptRequest = (req, res) => {
  // get request id from req.body
  // get teacher id from req.body
  // update the request with the teacher id
  // update the request status to "Accepted"
  res.send("Request accepted");
};

requestRouter.post("/createRequest", createRequest);
requestRouter.get("/getAllAvailableRequests", getAllAvailableRequests);
requestRouter.put("/updateRequest", updateRequest);
requestRouter.post("/acceptRequest", acceptRequest);

module.exports = requestRouter;
