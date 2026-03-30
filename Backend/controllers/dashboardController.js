// controllers/dashboardController.js
import Program from "../models/program.js";
import Admission from "../models/admissions.js";
import Applicant from "../models/applicants.js";

// export const getDashboard = async (req, res) => 
//   const programs = await Program.find();

//   const totalIntake = programs.reduce((sum, p) => sum + p.intake, 0);

//   const admitted = await Admission.countDocuments();

//   const pendingDocs = await Applicant.countDocuments({
//     "documents.status": "Pending"
//   });

//   res.json({
//     intake: totalIntake,
//     admitted,
//     remaining: totalIntake - admitted,
//     pendingDocs
//   });
// };
export const getDashboard = async (req, res) => {
  try {
    // 1. Fetch all program documents
    const programs = await Program.find();

    // 2. Summary Statistics
    const totalIntake = programs.reduce((sum, p) => sum + p.intake, 0);
    
    // Note: Ensure Admission and Applicant models are imported in this file
    const admitted = await Admission.countDocuments();
    const pendingDocs = await Applicant.countDocuments({
      "documents.status": "Pending"
    });

    // 3. Return both the Summary AND the detailed list
    res.json({
      summary: {
        intake: totalIntake,
        admitted,
        remaining: totalIntake - admitted,
        pendingDocs
      },
      programDetails: programs // 🔥 This allows you to display all items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};