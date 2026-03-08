import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProductListPage from "./pages/ProductListPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AddProductForm from "./pages/AddProductForm";
import SellerDashboard from "./pages/SellerDashboard";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import AdminUsersPage from "./pages/AdminUsersPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route
          path="/customer/products"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <ProductListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/place-order"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <PlaceOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/orders"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute allowedRoles={["SELLER"]}>
              <AddProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={["SELLER"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminCategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h3 className="text-center mt-5">Page Not Found</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;