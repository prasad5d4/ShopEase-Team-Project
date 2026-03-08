import http from "./HttpService";

const getAllUsers = async () => {
  const response = await http.get("/api/admin/users");
  return response.data;
};

export default {
  getAllUsers
};