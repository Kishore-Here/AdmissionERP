import API from "../routes";

export const createApplicant = async (data) => {
    return await API.post("/applicants", data);
};

export const allocateSeat = async (data) => {
    // This matches the router.post("/allocate-seat") above
    return await API.post("/admissions/allocate", data);
};

// Use this if you want to skip Step 1 and 2 and do it in one click
export const quickAdmission = async (data) => {
    return await API.post("/applicants/full-admission", data);
};

export const markFeePaid= async (data) => {
    return await API.post("/admissions/fee/:id", data);
};

export const confirmAdmission = async (data) => {
    return await API.post("/admissions/confirm/:id", data);
};

export const verifyDocuments = async (data) => {
   return await API.put(`/admission/verify-docs/${id}`, data);
};