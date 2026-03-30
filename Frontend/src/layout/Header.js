import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate(); // ✅ INSIDE COMPONENT

  const handleLogout = () => {
    localStorage.removeItem("role"); // clear role
    navigate("/"); // redirect to login
  };

  const role = localStorage.getItem("role"); // show role

  return (
    <div style={styles.header}>
      <h3>Admission Management System</h3>

      <div>{role?.toUpperCase()}</div>

      <div style={styles.logout} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

const styles = {
  header: {
    background: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  logout: {
    padding: "8px 12px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px"
  }
};