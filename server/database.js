const mongoose = require("mongoose");

const connectionURL =
  "mongodb+srv://admin:NKvalSPuz4pkffng@cluster0.7ffcbvq.mongodb.net/Eklavya";

mongoose.connect(connectionURL);

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
    default: 5,
  },
});

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  expertise: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
    default: 5,
  },
});

const TopicRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentDb", // Refers to the Teacher model
    required: true,
  },
  urgency: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
  },
  status: {
    type: String,
    required: true,
    enum: [
      "Available",
      "Pending",
      "Accepted",
      "InProgress",
      "Completed",
      "Rejected",
      "Deleted",
    ],
    default: "Available",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherDb", // Refers to the Teacher model
    required: false,
  },
});

const TeacherDb = mongoose.model("Teacher", TeacherSchema);
const TopicRequestDb = mongoose.model("TopicRequest", TopicRequestSchema);
const StudentDb = mongoose.model("Student", StudentSchema);

module.exports = { TopicRequestDb, TeacherDb, StudentDb };
