import { useState } from "react";
import { MenuItem } from "@mui/material";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import { createProgram } from "../services/programService";

export default function AdminSetup() {
    const [form, setForm] = useState({
        institution: "",
        campus: "",
        department: "",
        program: "",
        academicYear: "",
        courseType: "UG",
        entryType: "Regular",
        admissionMode: "Government",
        intake: "",
        kcet: "",
        comedk: "",
        management: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const totalQuota =
            Number(form.kcet) +
            Number(form.comedk) +
            Number(form.management);

        if (totalQuota !== Number(form.intake)) {
            alert("❌ Quota total must equal intake");
            return;
        }

        try {
            // 🔥 Prepare backend payload (NO UI CHANGE)
            const payload = {
                ...form,
                intake: Number(form.intake),
                quotas: {
                    kcet: Number(form.kcet),
                    comedk: Number(form.comedk),
                    management: Number(form.management)
                }
            };

            const res = await createProgram(payload);

            console.log("✅ Saved to DB:", res.data);
            alert("✅ Setup Saved Successfully!");

        } catch (err) {
            console.error(err);
            alert("❌ Error saving data");
        }
    };

    return (
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Admin Setup
                </Typography>

                {/* SECTION 1: INSTITUTION */}
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Institution Details
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField label="Institution" name="institution" fullWidth onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField label="Campus" name="campus" fullWidth onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField label="Department" name="department" fullWidth onChange={handleChange} />
                    </Grid>
                </Grid>

                {/* SECTION 2: PROGRAM */}
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                    Program Details
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField label="Program" name="program" fullWidth onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField label="Academic Year" name="academicYear" fullWidth onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            label="Course Type"
                            name="courseType"
                            value={form.courseType || ""}   // ✅ IMPORTANT
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            InputLabelProps={{ shrink: true }} // ✅ FIX LABEL ISSUE
                        >
                            <MenuItem value="UG">UG</MenuItem>
                            <MenuItem value="PG">PG</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                {/* SECTION 3: ADMISSION CONFIG */}
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                    Admission Configuration
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            label="Entry Type"
                            name="entryType"
                            value={form.entryType || ""}
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            InputLabelProps={{ shrink: true }}
                        >
                            <MenuItem value="Regular">Regular</MenuItem>
                            <MenuItem value="Lateral">Lateral</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            label="Admission Mode"
                            name="admissionMode"
                            value={form.admissionMode || ""}
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            InputLabelProps={{ shrink: true }}
                        >
                            <MenuItem value="Government">Government</MenuItem>
                            <MenuItem value="Management">Management</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Total Intake"
                            name="intake"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                {/* SECTION 4: QUOTAS */}
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                    Quota Distribution
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField label="KCET" name="kcet" type="number" fullWidth onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField label="COMEDK" name="comedk" type="number" fullWidth onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField label="Management" name="management" type="number" fullWidth onChange={handleChange} />
                    </Grid>
                </Grid>

                {/* SUBMIT */}
                <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        Save Configuration
                    </Button>
                </Grid>
            </CardContent>
        </Card>

    );
}