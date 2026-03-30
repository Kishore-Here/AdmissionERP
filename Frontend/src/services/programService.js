import API from "../routes";

export const createProgram = async (data) => {
  const res = await API.post("/programs", data);
  return res.data;
};