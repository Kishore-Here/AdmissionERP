import { useState } from "react";
import API from "../routes";
import AdmissionList from "./AdmissionList";

export default function AllocateSeat() {
  const [data, setData] = useState({});

  const allocate = async () => {
    try {
      await API.post("/admissions/allocate", data);
      alert("Seat Allocated");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Allocate Seat</h2>

      <input placeholder="Applicant ID"
        onChange={e => setData({ ...data, applicantId: e.target.value })} />

      <input placeholder="Program ID"
        onChange={e => setData({ ...data, programId: e.target.value })} />

      <select onChange={e => setData({ ...data, quotaType: e.target.value })}>
        <option>KCET</option>
        <option>COMEDK</option>
        <option>Management</option>
      </select>

      <button onClick={allocate}>Allocate</button>

      <AdmissionList />
    </div>
  );
}