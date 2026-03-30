import express from "express";
import { createProgram } from "../controllers/programController.js";

const router = express.Router();

router.post("/", createProgram);

export default router;