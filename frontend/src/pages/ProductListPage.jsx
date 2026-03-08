import { useEffect, useMemo, useState } from "react";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productData = await ProductService.getAllProducts();
      const categoryData = await CategoryService.getAllCategories();

      setProducts(Array.isArray(productData) ? productData : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.error("Error loading product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const productCategory = product.category?.name || product.category || "";
      const matchesCategory =
        selectedCategory === "" || productCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const featuredProducts = filteredProducts.slice(0, 4);
  const dealProducts = filteredProducts.slice(4);

  return (
    <div className="ecom-page">
      <div className="container-fluid px-3 px-md-4 py-3">
        {/* Top Offer Strip */}
        <div className="offer-strip mb-3">
          <div className="offer-strip-inner">
            <span>🔥 Big Saving Days</span>
            <span>Free Delivery on Orders Above ₹499</span>
            <span>⚡ New Seller Products Added Daily</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="ecom-hero mb-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="hero-left">
                <span className="hero-small-badge">Top Collection 2026</span>
                <h1 className="hero-main-title">
                  Shop Smart With <span>ShopEase</span>
                </h1>
                <p className="hero-text">
                  Explore premium products, trending styles, electronics,
                  fashion, and daily essentials in one beautiful shopping
                  experience.
                </p>

                <div className="hero-actions">
                  <button className="btn btn-warning btn-lg me-3">
                    Shop Now
                  </button>
                  <button className="btn btn-light btn-lg">
                    Explore Deals
                  </button>
                </div>

                <div className="hero-stats mt-4">
                  <div className="hero-stat-box">
                    <h4>{products.length}+</h4>
                    <p>Products</p>
                  </div>
                  <div className="hero-stat-box">
                    <h4>{categories.length}+</h4>
                    <p>Categories</p>
                  </div>
                  <div className="hero-stat-box">
                    <h4>24/7</h4>
                    <p>Support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-right">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80"
                  alt="ShopEase Banner"
                  className="hero-banner-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-filter-box mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-lg-8">
              <input
                type="text"
                className="form-control ecommerce-search"
                placeholder="Search for mobiles, fashion, electronics, furniture and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-lg-4">
              <select
                className="form-select ecommerce-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat, index) => {
                  const categoryName = cat.name || cat;
                  return (
                    <option key={cat.id || index} value={categoryName}>
                      {categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="dashboard-section mb-5">
          <div className="section-title-row">
            <h3>Shop by Category</h3>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setSelectedCategory("")}
            >
              View All
            </button>
          </div>

          <div className="row g-3">
            {categories.map((cat, index) => {
              const categoryName = cat.name || cat;
              return (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cat.id || index}>
                  <div
                    className="ecom-category-card"
                    onClick={() => setSelectedCategory(categoryName)}
                  >
                    <div className="ecom-category-icon">
                      {categoryName.charAt(0).toUpperCase()}
                    </div>
                    <h6>{categoryName}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Deals */}
        <div className="dashboard-section mb-5">
          <div className="section-title-row">
            <h3>Featured Deals</h3>
            <span className="section-subtitle">Best picks for you</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3">Loading featured products...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="empty-state-box">
              <h5>No featured products available</h5>
              <p>Please add products or change the filter.</p>
            </div>
          ) : (
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div className="col-sm-6 col-lg-3" key={product.id}>
                  <div className="featured-product-card">
                    <div className="featured-image-box">
                      <img
                        src={
                          product.imageUrl ||
                          "https://via.placeholder.com/300x220?text=Product"
                        }
                        alt={product.name}
                        className="featured-product-image"
                      />
                      <span className="featured-tag">Top Deal</span>
                    </div>

                    <div className="featured-card-body">
                      <h5>{product.name}</h5>
                      <p>{product.description || "Premium quality item"}</p>

                      <div className="product-rating-line">
                        <span className="rating-pill">4.3 ★</span>
                        <small>1,240 ratings</small>
                      </div>

                      <div className="price-row">
                        <span className="new-price">₹{product.price}</span>
                        <span className="old-price">
                          ₹{Math.round(product.price * 1.25)}
                        </span>
                        <span className="discount-text">20% off</span>
                      </div>

                      <button className="btn btn-primary w-100 mt-3">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Products */}
        <div className="dashboard-section">
          <div className="section-title-row">
            <h3>Trending Products</h3>
            <span className="section-subtitle">
              {selectedCategory
                ? `Showing ${selectedCategory} products`
                : "Latest shopping collection"}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state-box">
              <h5>No products found</h5>
              <p>Try changing search or category filter.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                  <div className="amazon-card">
                    <div className="amazon-card-image-wrap">
                      <img
                        src={
                          product.imageUrl ||
                          "https://via.placeholder.com/300x220?text=Product"
                        }
                        alt={product.name}
                        className="amazon-card-image"
                      />
                      <span className="mini-badge">New</span>
                    </div>

                    <div className="amazon-card-body">
                      <h5>{product.name}</h5>
                      <p className="amazon-card-desc">
                        {product.description || "Amazing product for daily use"}
                      </p>

                      <div className="rating-line">
                        <span className="rating-badge">4.2 ★</span>
                        <span className="rating-count">(890)</span>
                      </div>

                      <div className="meta-line">
                        <span className="meta-chip">
                          {product.category?.name || product.category || "General"}
                        </span>
                        <span className="meta-chip">
                          Stock: {product.stock ?? 0}
                        </span>
                      </div>

                      <div className="amazon-price-row">
                        <div>
                          <span className="amazon-price">₹{product.price}</span>
                          <span className="amazon-old-price">
                            ₹{Math.round(product.price * 1.18)}
                          </span>
                        </div>
                        <span className="offer-green">18% off</span>
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-warning">Buy Now</button>
                        <button className="btn btn-outline-primary">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;