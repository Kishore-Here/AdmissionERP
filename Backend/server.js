import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import programRoutes from "./routes/programRoute.js";
import applicantRoutes from "./routes/applicantRoute.js";
import admissionRoutes from "./routes/admissionRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/programs", programRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);