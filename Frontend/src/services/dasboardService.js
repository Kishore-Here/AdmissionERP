import API from "../routes";

export const getDashboard = async () => {
  const res = await API.get("/dashboard");
  return res.data;
};