import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";
import StatusBadge from "../components/StatusBadge";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productData = await ProductService.getSellerProducts();
      const orderData = await OrderService.getSellerOrders();

      setProducts(Array.isArray(productData) ? productData : []);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      console.error("Error loading seller dashboard", err);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await OrderService.updateOrderStatus(orderId, status);
      fetchData();
    } catch (err) {
      console.error("Error updating order status", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Seller Dashboard</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">My Product Inventory</h4>

          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.category?.name || product.category || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Incoming Orders</h4>

          {orders.length === 0 ? (
            <p>No incoming orders</p>
          ) : (
            orders.map((order) => (
              <div className="border rounded p-3 mb-3" key={order.id}>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h5>Order #{order.id}</h5>
                    <p className="mb-1">
                      <strong>Total:</strong> ₹{order.totalAmount || 0}
                    </p>
                  </div>
                  <StatusBadge status={order.status || "PENDING"} />
                </div>

                <div className="mt-3 d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-info"
                    onClick={() => handleUpdateStatus(order.id, "CONFIRMED")}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateStatus(order.id, "SHIPPED")}
                  >
                    Ship
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
                  >
                    Deliver
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;