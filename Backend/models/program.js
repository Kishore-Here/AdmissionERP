// models/Program.js
import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  institution: String,
  campus: String,
  department: String,
  program: String,
  academicYear: String,
  courseType: String,
  entryType: String,
  admissionMode: String,
  intake: Number,

  quotas: {
    kcet: Number,
    comedk: Number,
    management: Number
  }
}, { timestamps: true });

export default mongoose.model("Program", programSchema);