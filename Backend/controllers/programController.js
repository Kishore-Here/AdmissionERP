// controllers/programController.js
import Program from "../models/program.js";

export const createProgram = async (req, res) => {
  try {
    const { intake, quotas } = req.body;

    const totalQuota =
      quotas.kcet + quotas.comedk + quotas.management;

    if (totalQuota !== intake) {
      return res.status(400).json({ message: "Quota must equal intake" });
    }

    const program = await Program.create(req.body);

    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};