import { useEffect, useState } from "react";
import API from "../routes";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper
} from "@mui/material";

export default function ApplicantList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/applicants").then(res => setList(res.data));
  }, []);

  return (
    <Paper style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Quota</TableCell>
            <TableCell>Docs</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map(a => (
            <TableRow key={a._id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.email}</TableCell>
              <TableCell>{a.quotaType}</TableCell>
              <TableCell>{a.documents?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}