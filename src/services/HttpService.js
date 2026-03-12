// ══════════════════════════════════════════════
// HTTP SERVICE — Member 8
// Axios wrapper that attaches JWT to every request
// ══════════════════════════════════════════════

import axios from "axios";
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const HttpService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ── REQUEST INTERCEPTOR: attach JWT token ──
HttpService.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR: handle 401 ──
HttpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default HttpService;

// ── API ENDPOINT HELPERS ────────────────────────
export const API = {
  // AUTH (Member 1 Backend)
  login:    (data) => HttpService.post("/api/user/login", data),
  register: (data) => HttpService.post("/api/user/register", data),

  // CUSTOMER (Members 2, 4, 5 Backend)
  getProducts:   (params) => HttpService.get("/api/customer/products", { params }),
  placeOrder:    (data)   => HttpService.post("/api/customer/order", data),
  getMyOrders:   (customerId) => HttpService.get(`/api/customer/orders?customerId=${customerId}`),

  // SELLER (Members 3, 6 Backend)
  addProduct:    (data) => HttpService.post("/api/seller/product", data),
  updateProduct: (id, data) => HttpService.put(`/api/seller/product/${id}`, data),
  getSellerOrders: () => HttpService.get("/api/seller/orders"),
  updateOrderStatus: (orderId, status) => HttpService.put(`/api/seller/order/${orderId}?status=${status}`),

  // ADMIN (Member 7 Backend)
  getCategories:  () => HttpService.get("/api/admin/categories"),
  createCategory: (data) => HttpService.post("/api/admin/category", data),
  getUsers:       () => HttpService.get("/api/admin/users"),
  deleteUser:     (id) => HttpService.delete(`/api/admin/users/${id}`),
};
