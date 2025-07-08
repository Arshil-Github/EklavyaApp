const mongoose = require("mongoose");

const connectionURL =
   "mongodb+srv://anantarora2005:HekDVrv36gCCOyJl@cluster0.peyiv0g.mongodb.net/Eklavya";

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
  date: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  langauge: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentDb", // Refers to the Teacher model
    required: true,
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
