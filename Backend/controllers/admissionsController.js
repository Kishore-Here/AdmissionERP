// controllers/admissionController.js
import Admission from "../models/admissions.js";
import Program from "../models/program.js";

export const allocateSeat = async (req, res) => {
  try {
    const { applicantId, programId, quota } = req.body;

    const program = await Program.findById(programId);

    const count = await Admission.countDocuments({
      programId,
      quota
    });

    if (count >= program.quotas[quota]) {
      return res.status(400).json({ message: "Quota Full ❌" });
    }

    const admission = await Admission.create({
      applicantId,
      programId,
      quota
    });

    res.json(admission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markFeePaid = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { feeStatus: "Paid" },
      { new: true }
    );

    res.json(admission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};