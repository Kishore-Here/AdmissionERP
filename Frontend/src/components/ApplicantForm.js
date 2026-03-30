import { useState } from "react";
import API from "../routes";
import ApplicantList from "./ApplicantList";

export default function ApplicantForm() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await API.post("/applicants", form);
    alert("Applicant Created");
    window.location.reload();
  };

  return (
    <div>
      <h2>Create Applicant</h2>

      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Phone"
        onChange={e => setForm({ ...form, phone: e.target.value })} />

      <select onChange={e => setForm({ ...form, quotaType: e.target.value })}>
        <option value="">Select Quota</option>
        <option>KCET</option>
        <option>COMEDK</option>
        <option>Management</option>
      </select>

      <button onClick={submit}>Save</button>

      <ApplicantList />
    </div>
  );
}