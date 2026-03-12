// ══════════════════════════════════════════════
// SHOPEASE — MAIN APP
// Online Product & Order Management System
// React (Frontend) | Spring Boot (Backend) | MySQL
//
// Member 8:  Auth & Shared Services (AuthPage, AuthService, HttpService)
// Member 9:  Customer Shopping UI   (Products, PlaceOrder, MyOrders)
// Member 10: Seller & Admin UI      (SellerDash, AddProduct, Admin*)
// ══════════════════════════════════════════════
import { useState } from "react";
import Navbar    from "./components/Navbar";
import AuthPage  from "./pages/auth/AuthPage";
import ProductsPage  from "./pages/customer/ProductsPage";
import { PlaceOrderPage, MyOrdersPage } from "./pages/customer/OrderPages";
import AddProductPage from "./pages/seller/AddProductPage";
import { SellerDashboard, SellerProductsPage, SellerOrdersPage } from "./pages/seller/SellerPages";
import { AdminDashboard, AdminCatsPage, AdminUsersPage, AdminOrdersPage } from "./pages/admin/AdminPages";
import {
  INITIAL_PRODUCTS, INITIAL_ORDERS,
  SELLER_PRODUCTS_INIT, ADMIN_USERS_INIT, ADMIN_CATS_INIT,
  STATUS_FLOW,
} from "./data/mockData";

export default function App() {
  // ── AUTH STATE ──────────────────────────────
  const [screen,   setScreen]   = useState("auth"); // "auth" | "app"
  const [authMode, setAuthMode] = useState("login");
  const [user,     setUser]     = useState(null);
  const [page,     setPage]     = useState("products");

  // ── DATA STATE ──────────────────────────────
  const [allProducts,  setAllProducts]  = useState(INITIAL_PRODUCTS);
  const [cart,         setCart]         = useState([]);
  const [myOrders,     setMyOrders]     = useState(INITIAL_ORDERS);
  const [sellerProds,  setSellerProds]  = useState(SELLER_PRODUCTS_INIT);
  const [sellerOrders, setSellerOrders] = useState(INITIAL_ORDERS);
  const [adminUsers,   setAdminUsers]   = useState(ADMIN_USERS_INIT);
  const [adminCats,    setAdminCats]    = useState(ADMIN_CATS_INIT);

  // ── AUTH HANDLERS ───────────────────────────
  const handleLogin = (u) => {
    setUser(u);
    setScreen("app");
    setPage(
      u.role==="CUSTOMER" ? "products"   :
      u.role==="SELLER"   ? "seller-dash" : "admin-dash"
    );
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("auth");
    setPage("products");
    setCart([]);
  };

  // ── CUSTOMER HANDLERS ────────────────────────
  const handleOrderPlaced = (items) => {
    const newOrder = {
      id:       `ORD-${5000 + myOrders.length + 1}`,
      date:     new Date().toISOString().split("T")[0],
      status:   "PENDING",
      total:    items.reduce((s,i)=>s+i.price*i.qty, 0),
      customer: user?.username,
      items:    items.map(i=>({ name:i.name, qty:i.qty, price:i.price, img:i.img })),
    };
    setMyOrders(prev=>[newOrder,...prev]);
    setPage("my-orders");
  };

  // ── SELLER HANDLERS ──────────────────────────
  const advanceOrder = (id) => {
    setSellerOrders(prev=>prev.map(o=>{
      if (o.id!==id) return o;
      const idx = STATUS_FLOW.indexOf(o.status);
      return { ...o, status: STATUS_FLOW[Math.min(idx+1, 3)] };
    }));
  };

  const addSellerProduct = (product) => {
    // Add to both seller inventory and public catalog
    setSellerProds(prev=>[...prev, product]);
    setAllProducts(prev=>[...prev, { ...product, badge:"New", seller:user?.username||"Seller" }]);
  };

  // ── AUTH SCREEN ─────────────────────────────
  if (screen !== "app") {
    return <AuthPage mode={authMode} setMode={setAuthMode} onLogin={handleLogin} />;
  }

  // ── APP SCREEN ───────────────────────────────
  return (
    <div>
      <Navbar
        page={page} setPage={setPage}
        user={user} onLogout={handleLogout}
        cartCount={cart.length}
      />

      {/* ── CUSTOMER PAGES ── */}
      {user?.role==="CUSTOMER" && page==="products"    && (
        <ProductsPage products={allProducts} cart={cart} setCart={setCart} />
      )}
      {user?.role==="CUSTOMER" && page==="place-order" && (
        <PlaceOrderPage cart={cart} setCart={setCart} onOrderPlaced={handleOrderPlaced} />
      )}
      {user?.role==="CUSTOMER" && page==="my-orders"   && (
        <MyOrdersPage orders={myOrders} />
      )}

      {/* ── SELLER PAGES ── */}
      {user?.role==="SELLER" && page==="seller-dash"     && (
        <SellerDashboard products={sellerProds} orders={sellerOrders} onAdvance={advanceOrder} />
      )}
      {user?.role==="SELLER" && page==="seller-products" && (
        <SellerProductsPage
          products={sellerProds}
          onDelete={id=>setSellerProds(p=>p.filter(x=>x.id!==id))}
          setPage={setPage}
        />
      )}
      {user?.role==="SELLER" && page==="seller-orders"   && (
        <SellerOrdersPage orders={sellerOrders} onAdvance={advanceOrder} />
      )}
      {user?.role==="SELLER" && page==="add-product"     && (
        <AddProductPage onAdd={addSellerProduct} />
      )}

      {/* ── ADMIN PAGES ── */}
      {user?.role==="ADMIN" && page==="admin-dash"   && (
        <AdminDashboard users={adminUsers} cats={adminCats} orders={myOrders} />
      )}
      {user?.role==="ADMIN" && page==="admin-cats"   && (
        <AdminCatsPage cats={adminCats} onAdd={c=>setAdminCats(p=>[...p,c])} />
      )}
      {user?.role==="ADMIN" && page==="admin-users"  && (
        <AdminUsersPage users={adminUsers} onDelete={id=>setAdminUsers(u=>u.filter(x=>x.id!==id))} />
      )}
      {user?.role==="ADMIN" && page==="admin-orders" && (
        <AdminOrdersPage orders={myOrders} />
      )}
    </div>
  );
}
