import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import "./login.css";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ INIT

  const isFormValid =
    email.includes("@") &&
    email.includes(".") &&
    password.length >= 8 &&
    role !== "";

  // 1. AT THE TOP OF YOUR COMPONENT
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]); // Watches 'error' state globally

  // 2. THE LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      const backendRole = res.data.role;

      // 🔥 ROLE VALIDATION
      // If the user selected "Admin" but they are an "Officer" in the database
      if (backendRole !== role) {
        setError("Selected role does not match your account");
        return; // STOP the login process here
      }

      // ✅ Only save and navigate if the role matches
      localStorage.setItem("role", backendRole);
      navigate("/app/dashboard");

    } catch (err) {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="logo">User Login</h2>
        <h3 className="logo">ERP</h3>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Select Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="officer">Admission Officer</option>
            <option value="management">Management</option>
          </select>

          {!role && (
            <span className="error-text">Please select a role</span>
          )}
        </div>

        <button
          className={`login-btn ${!isFormValid ? "btn-disabled" : ""}`}
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          Login Now
        </button>

        {error && (
          <div className="error-popup">
            {error}
          </div>
        )}

        <div className="divider">OR</div>
        <button
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}