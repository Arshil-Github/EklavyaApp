const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./authorization");
const studentRouter = require("./student");
const requestRouter = require("./requests");
const ratingRouter = require("./rating");
const teacherRouter = require("./teacher");

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/request", requestRouter);
router.use("/rating", ratingRouter);
router.use("/teacher", teacherRouter);

module.exports = router;
