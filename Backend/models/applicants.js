import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  category: String,
  quota: String,
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  allotmentNo: String,
  status: { type: String, default: "Applied" }
}, { timestamps: true });

export default mongoose.model("Applicant", applicantSchema);