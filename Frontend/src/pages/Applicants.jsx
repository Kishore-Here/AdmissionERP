import { useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Chip, Paper, TextField, Button
} from "@mui/material";

export default function Applicants() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  const addApplicant = () => {
    if (!name) return;

    setList([
      ...list,
      { name, quota: "KCET", status: "Pending" }
    ]);

    setName("");
  };

  return (
    <div>
      <h2>Applicants</h2>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={addApplicant} variant="contained">
        Add
      </Button>

      <Paper style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quota</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quota}</TableCell>
                <TableCell>
                  <Chip label={row.status} color="warning" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}