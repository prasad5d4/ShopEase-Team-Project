import http from "./HttpService";

const placeOrder = async (orderData) => {
  const response = await http.post("/api/orders", orderData);
  return response.data;
};

const getMyOrders = async () => {
  const response = await http.get("/api/orders/my");
  return response.data;
};

const getSellerOrders = async () => {
  const response = await http.get("/api/orders/seller");
  return response.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await http.put(`/api/orders/${orderId}/status`, { status });
  return response.data;
};

export default {
  placeOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus
};