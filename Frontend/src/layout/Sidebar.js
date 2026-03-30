// import { useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import SchoolIcon from "@mui/icons-material/School";

// export default function Sidebar() {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.sidebar}>
//       <h2 style={{ marginBottom: "20px" }}>College ERP</h2>

//       <div style={styles.item} onClick={() => navigate("/app/dashboard")}>
//         <DashboardIcon /> <span>Dashboard</span>
//       </div>

//       <div style={styles.item} onClick={() => navigate("/app/applicants")}>
//         <PeopleIcon /> <span>Applicants</span>
//       </div>

//       <div style={styles.item} onClick={() => navigate("/app/admissions")}>
//         <SchoolIcon /> <span>Admissions</span>
//       </div>
//     </div>
//   );
// }


// const styles = {
//   sidebar: {
//     width: "240px",
//     background: "#1e293b",
//     color: "white",
//     padding: "20px",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px"
//   },
//   item: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     padding: "10px",
//     cursor: "pointer",
//     borderRadius: "5px",
//     background: "#334155"
//   }
// };

import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");


  // 🔥 ROLE BASED MENU
  const menu = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/app/dashboard",
      roles: ["admin", "officer", "management"]
    },
    {
      name: "Admin Setup",
      icon: <SettingsIcon />,
      path: "/app/admin-setup",
      roles: ["admin"]
    },
    {
      name: "Applicants",
      icon: <PeopleIcon />,
      path: "/app/applicants",
      roles: ["officer"]
    },
    {
      name: "Admissions",
      icon: <SchoolIcon />,
      path: "/app/admissionFlow",
      roles: ["officer"]
    }
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={{ marginBottom: "20px" }}>College ERP</h2>

      {menu
        .filter((item) => item.roles.includes(role)) // ✅ FILTER BY ROLE
        .map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.item,
              background:
                location.pathname === item.path
                  ? "#2563eb"
                  : "#334155"
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#1e293b",
    color: "white",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    background: "#334155"
  }
};