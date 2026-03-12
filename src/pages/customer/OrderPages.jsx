import { useState } from "react";
import { ShoppingCart, Trash2, CheckCircle, Package } from "lucide-react";
import { C, Card, Btn, StatusBadge, STATUS_ICON } from "../../components/UI";
import { STATUS_FLOW, STATUS_COLOR } from "../../data/mockData";
import { Check } from "lucide-react";

export function PlaceOrderPage({ cart, setCart, onOrderPlaced }) {
  const [done, setDone] = useState(false);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const chg = (id,d) => setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const rem = id => setCart(c=>c.filter(i=>i.id!==id));
  const place = () => {
    setDone(true);
    setTimeout(()=>{ onOrderPlaced(cart); setCart([]); setDone(false); },1500);
  };

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <ShoppingCart size={22} color={C.accent}/> Your Cart
        </h2>
        {done && (
          <div style={{ background:C.greenL, color:C.green, borderRadius:12, padding:"12px 18px",
            marginBottom:16, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
            <CheckCircle size={18}/> Order placed successfully! Redirecting to My Orders...
          </div>
        )}
        <Card>
          {cart.length===0 ? (
            <div style={{ textAlign:"center", padding:"4rem", color:C.gray400 }}>
              <ShoppingCart size={52} color={C.gray200} style={{ marginBottom:16 }}/>
              <p style={{ fontSize:"1.1rem", fontWeight:600 }}>Your cart is empty</p>
              <p style={{ fontSize:13, marginTop:8 }}>Add products from the Products page</p>
            </div>
          ) : (
            <>
              {cart.map(item=>(
                <div key={item.id} style={{ display:"flex", alignItems:"center", gap:"1rem",
                  padding:"1rem 0", borderBottom:`1px solid ${C.gray100}` }}>
                  <img src={item.img} alt={item.name}
                    style={{ width:72, height:72, objectFit:"cover", borderRadius:12, background:C.gray100 }}
                    onError={e=>e.target.src=""}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, color:C.gray800, fontSize:14 }}>{item.name}</div>
                    <div style={{ color:C.gray400, fontSize:12, marginTop:2 }}>₹{item.price.toLocaleString("en-IN")} each</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <button onClick={()=>chg(item.id,-1)}
                      style={{ width:30,height:30,borderRadius:"50%",border:`2px solid ${C.gray200}`,
                        background:C.white,cursor:"pointer",fontWeight:800,fontSize:16,
                        display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>−</button>
                    <span style={{ fontWeight:800, minWidth:24, textAlign:"center" }}>{item.qty}</span>
                    <button onClick={()=>chg(item.id,+1)}
                      style={{ width:30,height:30,borderRadius:"50%",border:`2px solid ${C.gray200}`,
                        background:C.white,cursor:"pointer",fontWeight:800,fontSize:16,
                        display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>+</button>
                  </div>
                  <div style={{ fontWeight:900, color:C.navy, minWidth:110, textAlign:"right", fontSize:15 }}>
                    ₹{(item.price*item.qty).toLocaleString("en-IN")}
                  </div>
                  <button onClick={()=>rem(item.id)}
                    style={{ background:C.redL, border:"none", borderRadius:8, padding:8,
                      cursor:"pointer", color:C.red, display:"flex", alignItems:"center" }}>
                    <Trash2 size={14}/>
                  </button>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                marginTop:"1.5rem", padding:"1.25rem 1.5rem",
                background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14 }}>
                <span style={{ color:C.white, fontWeight:700, fontSize:"1.1rem" }}>Total Amount</span>
                <span style={{ color:C.accent, fontWeight:900, fontSize:"1.6rem" }}>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display:"flex", gap:12, marginTop:"1.25rem" }}>
                <Btn full variant="success" size="lg" onClick={place} icon={<CheckCircle size={16}/>}>
                  Confirm & Place Order
                </Btn>
                <Btn variant="danger" icon={<Trash2 size={14}/>} onClick={()=>setCart([])}>Clear Cart</Btn>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// CUSTOMER: MY ORDERS — Member 9
// GET /api/customer/orders?customerId=
// ══════════════════════════════════════════════
export function MyOrdersPage({ orders }) {
  const STATUS_COLOR_LOCAL = { PENDING:"#f59e0b", PROCESSING:"#3b82f6", SHIPPED:"#8b5cf6", DELIVERED:"#10b981" };
  const statusFlow = ["PENDING","PROCESSING","SHIPPED","DELIVERED"];

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <Package size={22} color={C.accent}/> My Orders
          <span style={{ fontSize:14, color:C.gray400, fontWeight:600 }}>({orders.length} orders)</span>
        </h2>
        {orders.length===0 && (
          <Card>
            <div style={{ textAlign:"center", padding:"4rem", color:C.gray400 }}>
              <Package size={52} color={C.gray200} style={{ marginBottom:16 }}/>
              <p style={{ fontSize:"1.1rem", fontWeight:600 }}>No orders yet</p>
            </div>
          </Card>
        )}
        {orders.map(o=>(
          <div key={o.id} style={{ background:C.white, borderRadius:18, marginBottom:"1.25rem",
            boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:`1px solid ${C.gray100}`, overflow:"hidden" }}>
            <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})`,
              padding:"1rem 1.5rem", display:"flex", justifyContent:"space-between",
              alignItems:"center", flexWrap:"wrap", gap:8 }}>
              <div>
                <div style={{ color:C.white, fontWeight:800, fontSize:"0.95rem" }}>{o.id}</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:2 }}>Ordered on {o.date}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                <StatusBadge s={o.status}/>
                <span style={{ color:C.accent, fontWeight:900, fontSize:"1.1rem" }}>₹{o.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div style={{ padding:"1.25rem 1.5rem" }}>
              {o.items.map((it,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
                  padding:"8px 0", borderBottom:i<o.items.length-1?`1px solid ${C.gray100}`:"none" }}>
                  <img src={it.img||""} alt={it.name}
                    style={{ width:48, height:48, objectFit:"cover", borderRadius:10, background:C.gray100 }}
                    onError={e=>{ e.target.style.display="none"; }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:C.gray800, fontSize:13 }}>{it.name}</div>
                    <div style={{ color:C.gray400, fontSize:12 }}>Qty: {it.qty} × ₹{it.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
              ))}
              {/* STATUS PROGRESS */}
              <div style={{ display:"flex", alignItems:"center", marginTop:14 }}>
                {statusFlow.map((st,i)=>{
                  const done = statusFlow.indexOf(o.status)>=i;
                  return (
                    <div key={st} style={{ display:"flex", alignItems:"center", flex:i<3?1:"auto" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%",
                          border:`2px solid ${done?STATUS_COLOR_LOCAL[st]:C.gray200}`,
                          background:done?STATUS_COLOR_LOCAL[st]:"transparent",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:done?C.white:C.gray300, transition:"all 0.3s" }}>
                          {done?<Check size={12}/>:STATUS_ICON[st]}
                        </div>
                        <span style={{ fontSize:9, fontWeight:700, whiteSpace:"nowrap",
                          color:done?STATUS_COLOR_LOCAL[st]:C.gray300 }}>{st}</span>
                      </div>
                      {i<3 && <div style={{ flex:1, height:2, margin:"0 4px", marginBottom:14,
                        background:done?STATUS_COLOR_LOCAL[statusFlow[Math.min(i+1,3)]]:C.gray100 }}/>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
