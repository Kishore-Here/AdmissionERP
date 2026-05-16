import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard";
import Applicants from "./pages/Applicants";
import Admissions from "./pages/Admissions";
import AdminSetup from "./pages/AdminSetup";
import Login from "./pages/login";
import AdmissionFlow from "./pages/AdmissionFlow";
import Signup from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />

        {/* ERP Layout */}
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="admin-setup" element={<AdminSetup />} />
          <Route path="admissionFlow" element={<AdmissionFlow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}