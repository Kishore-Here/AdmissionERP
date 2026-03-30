
import { Card, CardContent, Typography, Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getDashboard } from "../services/dasboardService";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    intake: 0,
    admitted: 0,
    remaining: 0,
    pendingDocs: 0,
    feePending: 0,
    programs: [] // 🔥 Added to hold the list of all programs
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      const data = res?.data || res;

      setStats({
        intake: data?.summary?.intake || 0,
        admitted: data?.summary?.admitted || 0,
        remaining: data?.summary?.remaining || 0,
        pendingDocs: data?.summary?.pendingDocs || 0,
        feePending: data?.summary?.feePending || 0,
        programs: data?.programDetails || [] // 🔥 Mapping the detailed list from backend
      });

    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading dashboard...</h3>;

  return (
    <div>
      <h2>
        Dashboard
        <Chip label={role?.toUpperCase()} color="primary" style={{ marginLeft: "10px" }} />
      </h2>

      {/* 1. TOP STATS CARDS */}
      <Grid container spacing={3}>
        <StatCard title="Total Intake" value={stats.intake} />
        <StatCard title="Admitted" value={stats.admitted} />
        <StatCard title="Remaining Seats" value={stats.remaining} />
        <StatCard title="Pending Documents" value={stats.pendingDocs} />
      </Grid>

      {/* 2. PROGRAM-WISE SEAT MATRIX TABLE */}
      <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>Program-wise Seat Matrix</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Program & Dept</b></TableCell>
              <TableCell align="center"><b>Total Intake</b></TableCell>
              <TableCell align="center"><b>KCET</b></TableCell>
              <TableCell align="center"><b>COMEDK</b></TableCell>
              <TableCell align="center"><b>MGMT</b></TableCell>
              <TableCell align="center"><b>Year</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.programs.length > 0 ? (
              stats.programs.map((prog) => (
                <TableRow key={prog._id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight="500">{prog.program}</Typography>
                    <Typography variant="caption" color="textSecondary">{prog.department} | {prog.campus}</Typography>
                  </TableCell>
                  <TableCell align="center">{prog.intake}</TableCell>
                  <TableCell align="center">{prog.quotas?.kcet || 0}</TableCell>
                  <TableCell align="center">{prog.quotas?.comedk || 0}</TableCell>
                  <TableCell align="center">{prog.quotas?.management || 0}</TableCell>
                  <TableCell align="center">{prog.academicYear}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No programs found. Set them up in Admin Setup.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 3. MANAGEMENT VIEW (Conditional) */}
      {role === "management" && (
        <div style={{ marginTop: "40px" }}>
          <Typography variant="h6" color="secondary">Management Insights</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
             <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#fffde7' }}>
                   <CardContent>
                      <Typography variant="subtitle2">Financial Risk</Typography>
                      <Typography variant="h5" color="error">Pending Fees: {stats.feePending}</Typography>
                   </CardContent>
                </Card>
             </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ borderRadius: 3, textAlign: 'center', p: 1 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
          <Typography variant="h4" fontWeight="bold">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}