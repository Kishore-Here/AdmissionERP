import API from "../routes";

export const loginUser = (data) => API.post("/auth/login", data);

export const signupUser = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    return response.data; 
  } catch (error) {

    const errorMessage = error.response?.data?.message || "Something went wrong";
    throw new Error(errorMessage);
  }
};
