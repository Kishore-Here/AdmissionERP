import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, background: "#f4f6f9", minHeight: "100vh" }}>
        <Header />

        <div style={{ padding: "20px" }}>
          {/* 🔥 THIS FIXES EVERYTHING */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}