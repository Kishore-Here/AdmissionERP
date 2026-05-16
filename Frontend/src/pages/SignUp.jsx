import { useState, useEffect } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [popup, setPopup] = useState({ message: "", type: "" }); // { message: '...', type: 'success' | 'error' }

  // 🔥 Auto-disappear logic
  useEffect(() => {
    if (popup.message) {
      const timer = setTimeout(() => {
        setPopup({ message: "", type: "" });
        // If it was a success, navigate after the popup vanishes
        if (popup.type === "success") navigate("/");
      }, 3000); // 3 seconds is usually enough for a quick "Success"
      return () => clearTimeout(timer);
    }
  }, [popup, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSignup = async () => {
  try {
    await signupUser(form);
    setPopup({ message: "Signup successful! ✅", type: "success" });
  } catch (err) {
    console.error("Caught error:", err.message)
    // ✅ 'err.message' now contains "Email already exists" or whatever the backend sent
    setPopup({ 
      message: err.message || "Signup failed. Please try again ❌", 
      type: "error" 
    });
  }
};

  return (
    <div className="login-container">
      {/* 🔥 THE POPUP UI */}
      {popup.message && (
        <div className={`status-popup ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <div className="login-card">
        <h2>Create Account</h2>
        {/* ... (Your input groups stay exactly the same) ... */}
        
        <div className="input-group">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="officer">Officer</option>
            <option value="management">Management</option>
          </select>
        </div>

        <button className="login-btn" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
}