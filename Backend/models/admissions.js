// models/Admission.js
import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant" },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },

  quota: String,

  admissionNumber: String,

  feeStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Admission", admissionSchema);