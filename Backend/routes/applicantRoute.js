import express from "express";
import {
  createApplicant,
createAndAllocate,
verifyDocuments
} from "../controllers/applicantsController.js";

const router = express.Router();

// Step 1: Create a basic applicant profile
router.post("/", createApplicant);

// Alternative: Combined flow (Save and Allocate in one go)
router.post("/full-admission", createAndAllocate);

router.post("/verifyDocument/:id", verifyDocuments);
export default router;