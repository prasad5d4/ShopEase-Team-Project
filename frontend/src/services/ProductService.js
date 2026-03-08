import http from "./HttpService";

const getAllProducts = async () => {
  const response = await http.get("/api/products");
  return response.data;
};

const addProduct = async (productData) => {
  const response = await http.post("/api/products", productData);
  return response.data;
};

const getSellerProducts = async () => {
  const response = await http.get("/api/products/seller");
  return response.data;
};

export default {
  getAllProducts,
  addProduct,
  getSellerProducts
};