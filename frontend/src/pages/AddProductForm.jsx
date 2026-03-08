import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";

function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await ProductService.addProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });

      setMessage("Product added successfully");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Add New Product</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Stock</label>
              <input
                className="form-control"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={category.id || index} value={category.id}>
                    {category.name || category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-success" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;