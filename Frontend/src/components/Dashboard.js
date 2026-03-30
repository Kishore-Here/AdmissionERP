// import { useEffect, useState } from "react";
// import API from "../routes";
// import { Card, CardContent, Typography, Grid } from "@mui/material";

// export default function Dashboard() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     API.get("/dashboard").then(res => setData(res.data));
//   }, []);

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={4}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">Total Intake</Typography>
//             <Typography variant="h4">{data.intake || 0}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={4}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">Admitted</Typography>
//             <Typography variant="h4">{data.admitted || 0}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={4}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">Remaining</Typography>
//             <Typography variant="h4">{data.remaining || 0}</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }