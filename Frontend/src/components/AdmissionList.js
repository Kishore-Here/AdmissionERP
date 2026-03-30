import { useEffect, useState } from "react";
import API from "../routes";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Button
} from "@mui/material";

export default function AdmissionList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/admissions").then(res => setList(res.data));
  }, []);

  const confirm = async (id) => {
    await API.post(`/admissions/confirm/${id}`);
    alert("Admission Confirmed");
    window.location.reload();
  };

  return (
    <Paper style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Applicant</TableCell>
            <TableCell>Quota</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map(a => (
            <TableRow key={a._id}>
              <TableCell>{a.applicantId}</TableCell>
              <TableCell>{a.quotaType}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>{a.feeStatus}</TableCell>
              <TableCell>
                <Button onClick={() => confirm(a._id)}>
                  Confirm
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}