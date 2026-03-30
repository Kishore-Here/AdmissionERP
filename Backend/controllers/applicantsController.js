// // controllers/applicantController.js
// import Applicant from "../models/applicants.js";

// export const createApplicant = async (req, res) => {
//   const applicant = await Applicant.create(req.body);
//   res.json(applicant);
// };

// export const getApplicants = async (req, res) => {
//   const data = await Applicant.find();
//   res.json(data);
// };

// export const verifyDocuments = async (req, res) => {
//   try {
//     const applicant = await Applicant.findByIdAndUpdate(
//       req.params.id,
//       { "documents.status": "Verified" },
//       { new: true }
//     );

//     res.json(applicant);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import Applicant from "../models/applicants.js";
import Admission from "../models/admissions.js";
import Program from "../models/program.js";

// STEP 1: Save Applicant
export const createApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.create(req.body);
    res.status(201).json(applicant);
  } catch (err) {
    res.status(400).json({ message: "Error: Email might already exist." });
  }
};

// controllers/applicationController.js

export const createAndAllocate = async (req, res) => {
  try {
    // 1. Save the Applicant
    const applicant = await Applicant.create(req.body);

    // 2. Logic to check seats immediately
    const program = await Program.findById(req.body.programId);
    const qType = req.body.quota.toLowerCase();

    if (program.quotas[qType] <= 0) {
      return res.status(400).json({ message: "Selected Quota is Full!" });
    }

    // 3. Create the Admission entry
    const admission = await Admission.create({
      applicantId: applicant._id,
      programId: program._id,
      quota: req.body.quota
    });

    res.status(201).json({ applicant, admission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyDocuments = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { "documents.status": "Verified" },
      { new: true }
    );

    res.json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};