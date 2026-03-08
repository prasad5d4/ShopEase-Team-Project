import { useEffect, useMemo, useState } from "react";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";

function PlaceOrderPage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await ProductService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Number(value)
    }));
  };

  const selectedItems = useMemo(() => {
    return products
      .filter((product) => (quantities[product.id] || 0) > 0)
      .map((product) => ({
        productId: product.id,
        quantity: quantities[product.id],
        name: product.name,
        price: product.price,
        subtotal: product.price * quantities[product.id]
      }));
  }, [products, quantities]);

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  }, [selectedItems]);

  const handleSubmitOrder = async () => {
    setError("");
    setMessage("");

    if (selectedItems.length === 0) {
      setError("Please select at least one product");
      return;
    }

    const orderPayload = {
      items: selectedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    try {
      await OrderService.placeOrder(orderPayload);
      setMessage("Order placed successfully");
      setQuantities({});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Place Order</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          {products.map((product) => (
            <div
              key={product.id}
              className="d-flex justify-content-between align-items-center border-bottom py-3"
            >
              <div>
                <h6 className="mb-1">{product.name}</h6>
                <small className="text-muted">
                  ₹{product.price} | Stock: {product.stock}
                </small>
              </div>

              <div style={{ width: "120px" }}>
                <input
                  type="number"
                  min="0"
                  max={product.stock}
                  className="form-control"
                  value={quantities[product.id] || 0}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-4 shadow-sm">
        <div className="card-body">
          <h4>Order Summary</h4>

          {selectedItems.length === 0 ? (
            <p>No items selected</p>
          ) : (
            <>
              {selectedItems.map((item) => (
                <div key={item.productId} className="d-flex justify-content-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.subtotal}</span>
                </div>
              ))}
              <hr />
              <h5>Total: ₹{totalAmount}</h5>
            </>
          )}

          <button className="btn btn-primary mt-3" onClick={handleSubmitOrder}>
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;