import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const getHomePath = () => {
    if (role === "CUSTOMER") return "/customer/products";
    if (role === "SELLER") return "/seller/dashboard";
    if (role === "ADMIN") return "/admin/categories";
    return "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={getHomePath()}>
          ShopEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {role === "CUSTOMER" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/customer/products">
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/customer/place-order">
                        Place Order
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/customer/orders">
                        My Orders
                      </Link>
                    </li>
                  </>
                )}

                {role === "SELLER" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/seller/add-product">
                        Add Product
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/seller/dashboard">
                        Seller Dashboard
                      </Link>
                    </li>
                  </>
                )}

                {role === "ADMIN" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/users">
                        Users
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;