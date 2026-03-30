import admissions from "../models/admissions.js";

export const confirmAdmission = async (req, res) => {
  try {
    const { id } = req.params;

    const admission = await admissions.findById(id).populate("programId");

    if (admission.feeStatus !== "Paid") {
      return res.status(400).json({ message: "Fee not paid" });
    }

    admission.admissionNumber =
      `INST/2026/${admission.programId.courseType}/${admission.programId.program}/${admission.quota}/` +
      Math.floor(1000 + Math.random() * 9000);

    await admission.save();

    res.json(admission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};