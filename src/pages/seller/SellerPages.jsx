// ══════════════════════════════════════════════
// SELLER PAGES — Member 10
// Dashboard, My Products, Orders
// ══════════════════════════════════════════════
import { useState } from "react";
import { BarChart2, Box, ClipboardList, DollarSign, Clock, CheckCircle, ChevronRight,
  Filter, RefreshCw, Plus, Trash2, Edit } from "lucide-react";
import { C, Card, Btn, StatusBadge } from "../../components/UI";
import { STATUS_FLOW } from "../../data/mockData";

// ── SELLER DASHBOARD ──────────────────────────
export function SellerDashboard({ products, orders, onAdvance }) {
  const revenue = products.reduce((s,p)=>s+(p.revenue||0),0);
  const stats = [
    { label:"Total Revenue", val:`₹${(revenue/100000).toFixed(1)}L`, color:C.accent, icon:<DollarSign size={22}/>, trend:"+12%" },
    { label:"Active Products", val:products.filter(p=>p.status==="ACTIVE").length, color:C.teal, icon:<Box size={22}/>, trend:"Listed" },
    { label:"Pending Orders", val:orders.filter(o=>o.status==="PENDING").length, color:C.amber, icon:<Clock size={22}/>, trend:"Action" },
    { label:"Delivered", val:orders.filter(o=>o.status==="DELIVERED").length, color:C.green, icon:<CheckCircle size={22}/>, trend:"Total" },
  ];

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, display:"flex", alignItems:"center", gap:10 }}>
            <BarChart2 size={22} color={C.accent}/> Seller Dashboard
          </h2>
          <Btn variant="ghost" size="sm" icon={<RefreshCw size={13}/>}>Refresh</Btn>
        </div>

        {/* STATS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"2rem" }}>
          {stats.map(s=>(
            <div key={s.label} style={{ background:C.white, borderRadius:16, padding:"1.25rem 1.5rem",
              boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:`1px solid ${C.gray100}`, borderTopColor:s.color, borderTopWidth:3, borderTopStyle:"solid" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${s.color}15`,
                  display:"flex", alignItems:"center", justifyContent:"center", color:s.color }}>
                  {s.icon}
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:C.green, background:C.greenL,
                  padding:"2px 8px", borderRadius:20 }}>{s.trend}</span>
              </div>
              <div style={{ fontSize:"1.8rem", fontWeight:900, color:s.color, marginTop:12 }}>{s.val}</div>
              <div style={{ fontSize:12, color:C.gray400, fontWeight:600, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ORDERS TABLE */}
        <Card style={{ marginBottom:"1.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <h3 style={{ fontWeight:800, color:C.navy, display:"flex", alignItems:"center", gap:8 }}>
              <ClipboardList size={18} color={C.teal}/> Recent Orders — Fulfillment
            </h3>
            <Btn variant="ghost" size="sm" icon={<Filter size={13}/>}>Filter</Btn>
          </div>
          <OrdersTable orders={orders} onAdvance={onAdvance} />
        </Card>

        {/* PRODUCTS MINI */}
        <Card>
          <h3 style={{ fontWeight:800, color:C.navy, marginBottom:"1rem", display:"flex", alignItems:"center", gap:8 }}>
            <Box size={18} color={C.teal}/> My Products Overview
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem" }}>
            {products.map(p=>{
              const sc = p.status==="ACTIVE"?C.green:p.status==="LOW"?C.amber:C.red;
              return (
                <div key={p.id} style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.gray100}`,
                  transition:"box-shadow 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  <img src={p.img} alt={p.name}
                    style={{ width:"100%", height:120, objectFit:"cover", display:"block", background:C.gray100 }}
                    onError={e=>e.target.style.display="none"}/>
                  <div style={{ padding:"0.75rem" }}>
                    <div style={{ fontWeight:800, fontSize:12, color:C.gray800, marginBottom:4 }}>{p.name}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:13, fontWeight:900, color:C.navy }}>₹{p.price.toLocaleString("en-IN")}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:sc, background:`${sc}15`,
                        padding:"2px 8px", borderRadius:20 }}>{p.status}</span>
                    </div>
                    <div style={{ fontSize:11, color:C.gray400, marginTop:4 }}>Stock: {p.stock} · Sales: {p.sales}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── SELLER MY PRODUCTS ────────────────────────
export function SellerProductsPage({ products, onDelete, setPage }) {
  const sc = { ACTIVE:C.green, LOW:C.amber, OUT:C.red };
  const sl = { ACTIVE:"ACTIVE", LOW:"LOW STOCK", OUT:"OUT OF STOCK" };

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, display:"flex", alignItems:"center", gap:10 }}>
            <Box size={22} color={C.accent}/> My Products
            <span style={{ fontSize:14, color:C.gray400, fontWeight:600 }}>({products.length} products)</span>
          </h2>
          <Btn variant="success" icon={<Plus size={15}/>} onClick={()=>setPage("add-product")}>
            Add New Product
          </Btn>
        </div>
        <Card>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})` }}>
                  {["","Product","Category","Price","Stock","Sales","Revenue","Status","Actions"].map(h=>(
                    <th key={h} style={{ padding:"11px 14px", textAlign:"left", color:C.white,
                      fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p,i)=>(
                  <tr key={p.id}
                    style={{ background:i%2===0?C.white:C.gray50, transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=`${C.teal}08`}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.white:C.gray50}>
                    <td style={{ padding:"10px 14px" }}>
                      <img src={p.img} alt={p.name}
                        style={{ width:46, height:46, objectFit:"cover", borderRadius:9, display:"block", background:C.gray100 }}
                        onError={e=>e.target.style.display="none"}/>
                    </td>
                    <td style={{ padding:"10px 14px", fontWeight:800, color:C.navy, fontSize:13 }}>{p.name}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <span style={{ background:C.blueL, color:C.blue, borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{p.cat}</span>
                    </td>
                    <td style={{ padding:"10px 14px", fontWeight:800, fontSize:13 }}>₹{p.price.toLocaleString("en-IN")}</td>
                    <td style={{ padding:"10px 14px", fontWeight:700, color:p.stock<5?C.red:C.gray800 }}>{p.stock}</td>
                    <td style={{ padding:"10px 14px", color:C.green, fontWeight:700 }}>{p.sales}</td>
                    <td style={{ padding:"10px 14px", fontWeight:700 }}>₹{(p.revenue||0).toLocaleString("en-IN")}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <span style={{ fontSize:11, fontWeight:700, color:sc[p.status],
                        background:`${sc[p.status]}15`, padding:"3px 10px", borderRadius:20,
                        border:`1px solid ${sc[p.status]}30` }}>
                        {sl[p.status]||p.status}
                      </span>
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <button style={{ background:C.amberL, border:"none", borderRadius:8, padding:"5px 10px",
                          cursor:"pointer", color:C.amber, display:"flex", alignItems:"center", gap:4,
                          fontSize:12, fontWeight:700, fontFamily:"inherit" }}>
                          <Edit size={12}/> Edit
                        </button>
                        <button onClick={()=>onDelete(p.id)}
                          style={{ background:C.redL, border:"none", borderRadius:8, padding:"5px 10px",
                            cursor:"pointer", color:C.red, display:"flex", alignItems:"center", gap:4,
                            fontSize:12, fontWeight:700, fontFamily:"inherit" }}>
                          <Trash2 size={12}/> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length===0 && (
            <div style={{ textAlign:"center", padding:"3rem", color:C.gray400 }}>
              <Box size={48} color={C.gray200} style={{ marginBottom:12 }}/>
              <p>No products yet. <button onClick={()=>{}} style={{ background:"none",border:"none",color:C.teal,fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>Add your first product</button></p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ── SELLER ORDERS ─────────────────────────────
export function SellerOrdersPage({ orders, onAdvance }) {
  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <ClipboardList size={22} color={C.accent}/> Order Management
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"1.5rem" }}>
          {STATUS_FLOW.map(s=>{
            const colorMap = { PENDING:C.amber,PROCESSING:C.blue,SHIPPED:C.purple,DELIVERED:C.green };
            const bgMap    = { PENDING:C.amberL,PROCESSING:C.blueL,SHIPPED:C.purpleL,DELIVERED:C.greenL };
            return (
              <div key={s} style={{ background:bgMap[s], borderRadius:12, padding:"1rem",
                border:`1px solid ${colorMap[s]}30`, textAlign:"center" }}>
                <div style={{ fontSize:"1.8rem", fontWeight:900, color:colorMap[s] }}>
                  {orders.filter(o=>o.status===s).length}
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:colorMap[s], marginTop:4 }}>{s}</div>
              </div>
            );
          })}
        </div>
        <Card>
          <OrdersTable orders={orders} onAdvance={onAdvance} showCustomer />
        </Card>
      </div>
    </div>
  );
}

// ── SHARED ORDERS TABLE ───────────────────────
function OrdersTable({ orders, onAdvance, showCustomer=true }) {
  const cols = ["Order ID", showCustomer&&"Customer","Date","Items","Total","Status","Action"].filter(Boolean);
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})` }}>
            {cols.map(h=>(
              <th key={h} style={{ padding:"11px 14px", textAlign:"left", color:C.white,
                fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o,i)=>(
            <tr key={o.id} style={{ background:i%2===0?C.white:C.gray50, transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=`${C.teal}08`}
              onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.white:C.gray50}>
              <td style={{ padding:"11px 14px", fontWeight:800, color:C.navy, fontSize:13 }}>{o.id}</td>
              {showCustomer && <td style={{ padding:"11px 14px", color:C.gray600 }}>{o.customer}</td>}
              <td style={{ padding:"11px 14px", color:C.gray400, fontSize:12 }}>{o.date}</td>
              <td style={{ padding:"11px 14px", color:C.gray500, fontSize:12 }}>
                {o.items.map(it=>`${it.name}×${it.qty}`).join(", ")}
              </td>
              <td style={{ padding:"11px 14px", fontWeight:800 }}>₹{o.total.toLocaleString("en-IN")}</td>
              <td style={{ padding:"11px 14px" }}><StatusBadge s={o.status}/></td>
              <td style={{ padding:"11px 14px" }}>
                {STATUS_FLOW.indexOf(o.status)<3 ? (
                  <Btn size="sm" variant="teal" onClick={()=>onAdvance(o.id)} icon={<ChevronRight size={12}/>}>
                    {STATUS_FLOW[STATUS_FLOW.indexOf(o.status)+1]}
                  </Btn>
                ) : <span style={{ fontSize:12, color:C.gray400, fontWeight:600 }}>Completed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length===0 && (
        <div style={{ textAlign:"center", padding:"2.5rem", color:C.gray400 }}>
          <ClipboardList size={40} color={C.gray200} style={{ marginBottom:10 }}/>
          <p>No orders yet</p>
        </div>
      )}
    </div>
  );
}
