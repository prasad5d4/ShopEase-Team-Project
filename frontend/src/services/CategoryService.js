import http from "./HttpService";

const getAllCategories = async () => {
  const response = await http.get("/api/categories");
  return response.data;
};

const addCategory = async (categoryData) => {
  const response = await http.post("/api/categories", categoryData);
  return response.data;
};

export default {
  getAllCategories,
  addCategory
};