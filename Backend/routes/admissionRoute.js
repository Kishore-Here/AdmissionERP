import express from "express";
import {
  allocateSeat,
  markFeePaid
} from "../controllers/admissionsController.js";
import { confirmAdmission } from "../controllers/cnfAdmission.js";
const router = express.Router();

router.post("/allocate", allocateSeat);
router.put("/fee/:id", markFeePaid);
router.put("/confirm/:id", confirmAdmission);

export default router;