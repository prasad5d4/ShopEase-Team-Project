import { useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import StatusBadge from "../components/StatusBadge";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await OrderService.getMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div className="card mb-4 shadow-sm" key={order.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between flex-wrap">
                <div>
                  <h5>Order #{order.id}</h5>
                  <p className="mb-1">
                    <strong>Date:</strong>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Total:</strong> ₹{order.totalAmount || 0}
                  </p>
                </div>

                <div>
                  <StatusBadge status={order.status || "PENDING"} />
                </div>
              </div>

              <hr />

              <h6>Items</h6>
              {order.items && order.items.length > 0 ? (
                <ul className="list-group">
                  {order.items.map((item, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={item.id || index}
                    >
                      <span>
                        {item.productName || item.product?.name || "Product"} x{" "}
                        {item.quantity}
                      </span>
                      <span>₹{item.price || item.product?.price || 0}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No item breakdown available</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrdersPage;