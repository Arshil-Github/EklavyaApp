const express = require("express");
const database = require("../database");

const requestRouter = express.Router();

const createRequest = async (req, res) => {
  //here
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

requestRouter.post("/createRequest", createRequest);
requestRouter.get("/getAllAvailableRequests", getAllAvailableRequests);
requestRouter.put("/updateRequest", updateRequest);
requestRouter.post("/confirmRequest", confirmRequest);

module.exports = requestRouter;
