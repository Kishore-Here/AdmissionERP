import {
  Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Paper
} from "@mui/material";

const data = [
  { name: "Rahul", fee: "Paid", status: "Confirmed" },
  { name: "Anita", fee: "Pending", status: "Provisional" }
];

export default function Admissions() {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.name}</TableCell>

              <TableCell>
                <Chip
                  label={row.fee}
                  color={row.fee === "Paid" ? "success" : "error"}
                />
              </TableCell>

              <TableCell>
                <Chip label={row.status} />
              </TableCell>

              <TableCell>
                <Button variant="contained">Confirms</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}