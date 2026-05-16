// import { useState } from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     TextField,
//     Button,
//     Stepper,
//     Step,
//     StepLabel,
//     MenuItem
// } from "@mui/material";
// import {
//     createApplicant,
//     allocateSeat,
//     verifyDocuments,
//     markFeePaid,
//     confirmAdmission,
// } from "../services/applicationService";

// export default function AdmissionFlow() {
//     const [step, setStep] = useState(1);

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         category: "",
//         quota: "",
//         program: "",
//         allotmentNo: "",
//         documents: "Pending",
//         fee: "Pending"
//     });

//     const [admissionNo, setAdmissionNo] = useState("");

//     const [applicantId, setApplicantId] = useState("");
//     const [admissionId, setAdmissionId] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleNext = async () => {
//         if (!form.name || !form.email || !form.quota || !form.program) {
//             alert("⚠️ Please fill all required fields");
//             return;
//         }

//         try {
//             const res = await createApplicant(form);
//             setApplicantId(res.data._id);
//             setStep(2);
//         } catch (err) {
//             alert("Error creating applicant");
//         }
//     };

//     const checkSeat = async () => {
//         try {
//             const res = await allocateSeat({
//                 applicantId,
//                 programId: "64abc123fakeid", // 🔥 TEMP FIX
//                 quota: form.quota,
//             });

//             setAdmissionId(res.data._id);
//             setStep(3);
//         } catch (err) {
//             alert(err.response?.data?.message || "Seat allocation failed");
//         }
//     };

//     const handleVerifyDocs = async () => {
//         try {
//             await verifyDocuments(applicantId);
//             setStep(4);
//         } catch (err) {
//             alert("Document verification failed");
//         }
//     };

//     const handleFeePayment = async () => {
//         try {
//             await markFeePaid(admissionId);
//             alert("✅ Fee marked as paid");

//             setStep(5); // 🔥 MOVE FORWARD
//         } catch (err) {
//             alert("Fee update failed");
//         }
//     };

//     // 🔥 STEP 4: Generate Admission Number
//     const handleConfirmAdmission = async () => {
//         try {
//             const res = await confirmAdmission(admissionId);

//             setAdmissionNo(res.data.admissionNumber);
//             setStep(5);
//         } catch (err) {
//             alert(err.response?.data?.message || "Admission failed");
//         }
//     };

//     const steps = [
//         "Applicant Details",
//         "Seat Allocation",
//         "Document Verification",
//         "Fee Payment",
//         "Confirmation"
//     ];

//     return (
//         <Card sx={{ maxWidth: "1000px", margin: "auto", mt: 4, p: 2 }}>
//             <CardContent>
//                 <Typography variant="h5" gutterBottom>
//                     Admission Process
//                 </Typography>

//                 {/* 🔥 STEPPER */}
//                 <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>

//                 {/* STEP 1 */}
//                 {step === 1 && (
//                     <Grid container spacing={1}>
//                         <Grid item xs={12} md={6}>
//                             <TextField label="Name" name="name" fullWidth onChange={handleChange} />
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                             <TextField label="Email" name="email" fullWidth onChange={handleChange} />
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                             <TextField label="Category" name="category" fullWidth onChange={handleChange} />
//                         </Grid>


//                         <Grid item xs={12} md={6}>
//                             {/* 1. The Label is now fixed above the box */}
//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     mb: 0, // Space between label and box
//                                     fontWeight: '600',
//                                     color: '#1b2a6b', // Navy color
//                                     display: 'block'
//                                 }}
//                             >
//                                 Quota Selection *
//                             </Typography>

//                             <TextField
//                                 select
//                                 name="quota"
//                                 value={form.quota || ""}
//                                 onChange={handleChange}
//                                 fullWidth
//                                 size="small"
//                                 variant="outlined"
//                                 // 🔥 We remove the 'label' prop here to stop the jumping
//                                 SelectProps={{
//                                     displayEmpty: true,
//                                     renderValue: (selected) => {
//                                         if (!selected) {
//                                             return <span style={{ color: "#999" }}>Select Quota</span>;
//                                         }
//                                         return selected;
//                                     },
//                                 }}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root": {
//                                         backgroundColor: "white",
//                                         height: "40px", // Fixed height so it never shifts
//                                     }
//                                 }}
//                             >
//                                 <MenuItem value="" disabled>Select Quota</MenuItem>
//                                 <MenuItem value="KCET">KCET</MenuItem>
//                                 <MenuItem value="COMEDK">COMEDK</MenuItem>
//                                 <MenuItem value="Management">Management</MenuItem>
//                             </TextField>
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                             <TextField label="Program" name="program" fullWidth onChange={handleChange} />
//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                             <TextField label="Allotment No" name="allotmentNo" fullWidth onChange={handleChange} />
//                         </Grid>

//                         <Grid item xs={12} textAlign="right">
//                             <Button variant="contained" onClick={handleNext}>
//                                 Next →
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 )}

//                 {/* STEP 2 */}
//                 {step === 2 && (
//                     <div style={{ textAlign: "center" }}>
//                         <Typography variant="h6" gutterBottom>
//                             Check Seat Availability
//                         </Typography>

//                         <Button
//                             variant="contained"
//                             onClick={checkSeat}
//                             disabled={!applicantId}
//                         >
//                             Allocate Seat
//                         </Button>
//                     </div>
//                 )}

//                 {/* STEP 3 */}
//                 {step === 3 && (
//                     <div style={{ textAlign: "center" }}>
//                         <Typography variant="h6">Document Verification</Typography>

//                         <Button
//                             variant="contained"
//                             onClick={handleVerifyDocs}
//                             disabled={!applicantId}
//                         >
//                             Verify Documents
//                         </Button>
//                     </div>
//                 )}

//                 {/* STEP 4 */}
//                 {step === 4 && (
//                     <div style={{ textAlign: "center" }}>
//                         <Typography variant="h6">Fee Payment</Typography>

//                         <Button
//                             variant="contained"
//                             color="success"
//                             onClick={handleFeePayment}
//                         >
//                             Mark Fee Paid
//                         </Button>

//                         <br /><br />
//                         <Button
//                             variant="contained"
//                             onClick={handleConfirmAdmission}
//                             disabled={!admissionId}
//                         >
//                             Confirm Admission
//                         </Button>
//                     </div>
//                 )}

//                 {/* STEP 5 */}
//                 {step === 5 && (
//                     <div style={{ textAlign: "center" }}>
//                         <Typography variant="h5" color="success.main">
//                             ✅ Admission Confirmed
//                         </Typography>

//                         <Typography variant="h6" sx={{ mt: 2 }}>
//                             Admission No: {admissionNo}
//                         </Typography>
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     );
// }

import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, TextField, Button, Stepper, Step, StepLabel, MenuItem } from "@mui/material";
import { createApplicant, allocateSeat, markFeePaid, confirmAdmission, verifyDocuments } from "../services/applicationService";
import { getDashboard } from "../services/dasboardService";

export default function AdmissionFlow() {
    const [step, setStep] = useState(1);
    const [programs, setPrograms] = useState([]);
    const [applicantId, setApplicantId] = useState("");
    const [admissionId, setAdmissionId] = useState("");
    const [admissionNo, setAdmissionNo] = useState("");

    const [form, setForm] = useState({
        name: "", email: "", category: "", quota: "", programId: "", allotmentNo: ""
    });

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await getDashboard();

                // ✅ LOGIC: Check if the data is nested under programDetails
                // Your backend returns: { summary: {...}, programDetails: [...] }
                const programList = res?.data?.programDetails || res?.programDetails || [];

                console.log("Programs received:", programList); // Check your console!
                setPrograms(programList);
            } catch (err) {
                console.error("Failed to load programs for dropdown", err);
            }
        };
        fetchPrograms();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 STEP 1: SAVE APPLICANT LOGIC
    const handleSaveAndNext = async () => {
        if (!form.name || !form.email || !form.programId || !form.quota) {
            alert("Please fill all required fields! ⚠️");
            return;
        }
        try {
            const res = await createApplicant(form);
            setApplicantId(res.data._id); // Store the ID for the next steps
            setStep(2);
        } catch (err) {
            alert(err.message || "Failed to save applicant");
        }
    };

    const handleAllocate = async () => {
        try {
            const res = await allocateSeat({ applicantId, programId: form.programId, quota: form.quota });
            setAdmissionId(res.data._id);
            setStep(3);
        } catch (err) { alert(err.response?.data?.message || "Allocation failed"); }
    };

  const handleVerifyDocs = async () => {
    // Safety Check
    if (typeof applicantId === 'undefined') {
        console.error("The variable 'applicantId' does not exist in this component.");
        return;
    }

    try {
        // Sending the ID inside an object as requested
        const payload = { id: applicantId }; 
        await verifyDocuments(payload, { status: "Verified" });
        
        setStep(4);
    } catch (err) {
        alert("Verification failed: " + err.message);
    }
};

    const steps = ["Details", "Seat", "Verify", "Fee", "Finish"];

    return (
        <Card sx={{ maxWidth: "1000px", margin: "auto", mt: 4, p: 3, borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
                <Typography variant="h5" sx={{ color: "#1b2a6b", fontWeight: "bold", mb: 3 }}>Admission ERP Flow</Typography>

                <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 5 }}>
                    {steps.map((label) => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
                </Stepper>

                {/* STEP 1: CAPTURE & SAVE */}
                {step === 1 && (
                    <Grid container spacing={3} alignItems="flex-end"> {/* 🔥 Aligns all items to the bottom */}

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Full Name"
                                name="name"
                                fullWidth
                                size="small"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                size="small"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="caption" sx={{ fontWeight: '600', color: '#1b2a6b', ml: 1, mb: 0.5, display: 'block' }}>
                                Program Selection *
                            </Typography>
                            <TextField
                                select
                                name="programId"
                                label="Select Program"
                                value={form.programId || ""}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="" disabled>-- Select Program --</MenuItem>
                                {programs.length > 0 ? (
                                    programs.map((p) => (
                                        <MenuItem key={p._id} value={p._id}>
                                            {p.program} ({p.department})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No programs available</MenuItem>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="caption" sx={{ fontWeight: '600', color: '#1b2a6b', ml: 1, mb: 0.5, display: 'block' }}>
                                Quota Selection *
                            </Typography>
                            <TextField
                                select
                                name="quota"
                                value={form.quota}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                SelectProps={{ displayEmpty: true }}
                            >
                                <MenuItem value="" disabled>Select Quota</MenuItem>
                                <MenuItem value="KCET">KCET</MenuItem>
                                <MenuItem value="COMEDK">COMEDK</MenuItem>
                                <MenuItem value="Management">Management</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: "#1b2a6b",
                                    padding: "10px 24px",
                                    fontWeight: "bold",
                                    "&:hover": { bgcolor: "#152052" }
                                }}
                                onClick={handleSaveAndNext}
                            >
                                SAVE & ALLOCATE SEAT →
                            </Button>
                        </Grid>
                    </Grid>
                )}

                {/* STEP 2: ALLOCATE (Uses saved applicantId) */}
                {step === 2 && (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Typography variant="h6">Applicant Saved: {form.name}</Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>Click below to officially lock a seat in the matrix.</Typography>
                        <Button variant="contained" size="large" onClick={handleAllocate}>Confirm Seat Allocation</Button>
                    </div>
                )}

                {/* STEP 3 & 4: DOCUMENT & FEE */}
                {step === 3 && (
                    <div style={{ textAlign: "center" }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Verify Documents for ID: {applicantId}</Typography>
                        <Button variant="contained" onClick={() => handleVerifyDocs(applicantId).then(() => setStep(4))}>Mark Verified</Button>
                    </div>
                )}

                {step === 4 && (
                    <div style={{ textAlign: "center" }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Pending Fee Payment</Typography>
                        <Button variant="contained" color="success" onClick={() => markFeePaid(admissionId).then(() => alert("Paid!"))}>Confirm Payment</Button>
                        <Button variant="contained" sx={{ ml: 2 }} onClick={() => confirmAdmission(admissionId).then(res => { setAdmissionNo(res.data.admissionNumber); setStep(5); })}>Generate Admission ID</Button>
                    </div>
                )}

                {step === 5 && (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <Typography variant="h4" color="success.main">Admission Confirmed! 🎉</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>Official ID: {admissionNo}</Typography>
                        <Button variant="outlined" sx={{ mt: 3 }} onClick={() => window.location.reload()}>New Admission</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}