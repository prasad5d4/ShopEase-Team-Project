import { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      await CategoryService.addCategory({ name: categoryName });
      setMessage("Category added successfully");
      setCategoryName("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Category Management</h2>

      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">Add Category</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleAddCategory}>
          <div className="row">
            <div className="col-md-9 mb-2">
              <input
                className="form-control"
                type="text"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-2">
              <button className="btn btn-success w-100" type="submit">
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card shadow-sm p-4">
        <h4 className="mb-3">All Categories</h4>

        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul className="list-group">
            {categories.map((category, index) => (
              <li className="list-group-item" key={category.id || index}>
                {category.name || category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminCategoriesPage;