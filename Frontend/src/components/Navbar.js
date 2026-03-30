import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#34495e", padding: "10px" }}>
      <Link to="/" style={link}>Dashboard</Link>
      <Link to="/applicant" style={link}>Applicant</Link>
      <Link to="/allocate" style={link}>Allocate</Link>
    </nav>
  );
}

const link = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none"
};