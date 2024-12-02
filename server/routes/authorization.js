const express = require("express");
const database = require("../database");

const authRouter = express.Router();

// Signin function
authRouter.post("/studentSignIn", async (req, res) => {
  const { name, phoneNumber, region, languages, password } = req.body;

  if (!name || !phoneNumber || !region || !languages || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existingTeacher = await database.TeacherDb.findOne({ phoneNumber });
    const existingStudent = await database.StudentDb.findOne({ phoneNumber });
    if (existingStudent) {
      return res.status(400).send("Student already exists");
    }
    if (existingTeacher) {
      return res.status(400).send("Registered as a teacher");
    }
  } catch (err) {
    return res.status(500).send("Error creating request");
  }

  const newRequest = new database.StudentDb({
    name,
    phoneNumber,
    region,
    languages,
    password,
  });

  try {
    const success = await newRequest.save();
    return res.status(201).send(success);
  } catch (err) {
    return res.status(500).send("Error creating request");
  }
});

authRouter.post("/teacherSignIn", async (req, res) => {
  const { name, phoneNumber, region, languages, expertise, password } =
    req.body;

  if (
    !name ||
    !phoneNumber ||
    !region ||
    !languages ||
    !expertise ||
    !password
  ) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existingTeacher = await database.TeacherDb.findOne({ phoneNumber });
    const existingStudent = await database.StudentDb.findOne({ phoneNumber });
    if (existingTeacher) {
      return res.status(400).send("Teacher already exists");
    }
    if (existingStudent) {
      return res.status(400).send("Registered as student");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error creating request");
  }

  const newRequest = new database.TeacherDb({
    name,
    phoneNumber,
    region,
    languages,
    expertise,
    password,
  });

  try {
    const success = await newRequest.save();
    return res.status(201).send(success);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error creating request");
  }
});

// Login function
authRouter.post("/login", async (req, res) => {
  // Your login logic here
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existingTeacher = await database.TeacherDb.findOne({
      phoneNumber: id,
      password,
    });
    const existingStudent = await database.StudentDb.findOne({
      phoneNumber: id,
      password,
    });

    if (existingTeacher) {
      return res.status(200).send(existingTeacher);
    }
    if (existingStudent) {
      return res.status(200).send(existingStudent);
    } else {
      return res.status(400).send("User not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error creating request");
  }
});

module.exports = authRouter;
