import { ShoppingBag, ShoppingCart, Package, BarChart2, Box, ClipboardList, Plus, PieChart, Tag, Users, Bell, LogOut, Home } from "lucide-react";
import { C } from "./UI";

export default function Navbar({ page, setPage, user, onLogout, cartCount }) {
  const links = user?.role === "CUSTOMER"
    ? [[<Home size={15}/>, "Products", "products"],
       [<ShoppingCart size={15}/>, `Cart${cartCount>0?` (${cartCount})`:""}`,"place-order"],
       [<Package size={15}/>, "My Orders", "my-orders"]]
    : user?.role === "SELLER"
    ? [[<BarChart2 size={15}/>, "Dashboard", "seller-dash"],
       [<Box size={15}/>, "My Products", "seller-products"],
       [<ClipboardList size={15}/>, "Orders", "seller-orders"],
       [<Plus size={15}/>, "Add Product", "add-product"]]
    : [[<PieChart size={15}/>, "Dashboard", "admin-dash"],
       [<Tag size={15}/>, "Categories", "admin-cats"],
       [<Users size={15}/>, "Users", "admin-users"],
       [<Package size={15}/>, "All Orders", "admin-orders"]];

  return (
    <nav style={{ background:C.navy, height:64, display:"flex", alignItems:"center",
      justifyContent:"space-between", padding:"0 2rem", position:"sticky", top:0, zIndex:300,
      boxShadow:"0 4px 30px rgba(0,0,0,0.4)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
        onClick={()=>setPage(links[0][2])}>
        <div style={{ width:36, height:36, borderRadius:10,
          background:`linear-gradient(135deg,${C.accent},${C.teal})`,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <ShoppingBag size={18} color={C.navy} strokeWidth={2.5}/>
        </div>
        <span style={{ fontSize:"1.25rem", fontWeight:900, color:C.white, letterSpacing:"-0.5px" }}>
          Shop<span style={{ color:C.accent }}>Ease</span>
        </span>
      </div>
      <div style={{ display:"flex", gap:4, alignItems:"center" }}>
        {links.map(([icon,label,p])=>(
          <button key={p} onClick={()=>setPage(p)}
            style={{ display:"flex", alignItems:"center", gap:6,
              background: page===p?"rgba(255,255,255,0.12)":"transparent",
              color: page===p?C.accent:C.white,
              border: page===p?"1px solid rgba(255,255,255,0.15)":"1px solid transparent",
              borderRadius:10, padding:"7px 14px", fontWeight:page===p?700:400,
              fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
            {icon} {label}
          </button>
        ))}
        <div style={{ width:1, height:24, background:"rgba(255,255,255,0.15)", margin:"0 4px" }}/>
        <button style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.6)", padding:8 }}>
          <Bell size={18}/>
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px",
          background:"rgba(255,255,255,0.08)", borderRadius:10 }}>
          <div style={{ width:28, height:28, borderRadius:"50%",
            background:`linear-gradient(135deg,${C.accent},${C.teal})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:800, color:C.navy }}>
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <span style={{ color:C.white, fontSize:13, fontWeight:600 }}>{user?.username}</span>
        </div>
        <button onClick={onLogout}
          style={{ display:"flex", alignItems:"center", gap:6, background:C.red, color:C.white,
            border:"none", borderRadius:10, padding:"8px 14px", fontWeight:700, fontSize:13,
            cursor:"pointer", marginLeft:4, fontFamily:"inherit" }}>
          <LogOut size={14}/> Logout
        </button>
      </div>
    </nav>
  );
}
