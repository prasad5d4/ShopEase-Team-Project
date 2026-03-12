import { useState } from "react";
import { Settings, Users, Tag, Package, Store, PieChart, Plus,
  Trash2, Eye, CheckCircle } from "lucide-react";
import { C, Card, Btn, Input, StatusBadge, Alert } from "../../components/UI";

export function AdminDashboard({ users, cats, orders }) {
  const stats = [
    { label:"Total Users",    val:users.length, color:C.blue,   icon:<Users size={22}/>,   sub:`${users.filter(u=>u.role==="CUSTOMER").length} customers` },
    { label:"Active Sellers", val:users.filter(u=>u.role==="SELLER").length, color:C.accent,icon:<Store size={22}/>,sub:"Verified sellers" },
    { label:"Categories",     val:cats.length,  color:C.teal,   icon:<Tag size={22}/>,     sub:`${cats.reduce((s,c)=>s+c.products,0)} products` },
    { label:"Total Orders",   val:orders.length,color:C.green,  icon:<Package size={22}/>, sub:`${orders.filter(o=>o.status==="DELIVERED").length} delivered` },
  ];

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <Settings size={22} color={C.accent}/> Admin Dashboard
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"2rem" }}>
          {stats.map(s=>(
            <div key={s.label} style={{ background:C.white, borderRadius:16, padding:"1.5rem",
              boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:`1px solid ${C.gray100}`, borderLeftColor:s.color, borderLeftWidth:4 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:`${s.color}12`,
                display:"flex", alignItems:"center", justifyContent:"center", color:s.color, marginBottom:12 }}>
                {s.icon}
              </div>
              <div style={{ fontSize:"2rem", fontWeight:900, color:s.color }}>{s.val}</div>
              <div style={{ fontWeight:700, color:C.gray800, fontSize:13 }}>{s.label}</div>
              <div style={{ fontSize:11, color:C.gray400, marginTop:2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
          <Card>
            <h3 style={{ fontWeight:800, color:C.navy, marginBottom:"1rem",
              display:"flex", alignItems:"center", gap:8 }}>
              <Users size={16} color={C.teal}/> Recent Users
            </h3>
            {users.slice(0,5).map(u=>(
              <div key={u.id} style={{ display:"flex", alignItems:"center", gap:12,
                padding:"8px 0", borderBottom:`1px solid ${C.gray100}` }}>
                <div style={{ width:36, height:36, borderRadius:"50%",
                  background:`linear-gradient(135deg,${C.teal},${C.blue})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:800, color:C.white, flexShrink:0 }}>
                  {u.avatar}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:C.gray800, fontSize:13 }}>{u.name}</div>
                  <div style={{ color:C.gray400, fontSize:11 }}>{u.email}</div>
                </div>
                <RoleBadge role={u.role}/>
              </div>
            ))}
          </Card>
          <Card>
            <h3 style={{ fontWeight:800, color:C.navy, marginBottom:"1rem",
              display:"flex", alignItems:"center", gap:8 }}>
              <Tag size={16} color={C.teal}/> Categories Overview
            </h3>
            {cats.map(c=>(
              <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12,
                padding:"8px 0", borderBottom:`1px solid ${C.gray100}` }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${c.color}20`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Tag size={16} color={c.color}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:C.gray800, fontSize:13 }}>{c.name}</div>
                  <div style={{ color:C.gray400, fontSize:11 }}>{c.desc}</div>
                </div>
                <span style={{ fontSize:12, fontWeight:800, color:c.color, background:`${c.color}15`,
                  padding:"3px 10px", borderRadius:20 }}>{c.products}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN CATEGORIES ──────────────────────────
export function AdminCatsPage({ cats, onAdd }) {
  const [form, setForm] = useState({ name:"", desc:"" });
  const [ok, setOk] = useState(false);

  const submit = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, id:Date.now(), products:0, color:C.teal });
    setForm({ name:"", desc:"" }); setOk(true);
    setTimeout(()=>setOk(false),2000);
  };

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <Tag size={22} color={C.accent}/> Category Management
        </h2>
        <Card style={{ marginBottom:"1.5rem" }}>
          <h3 style={{ fontWeight:800, color:C.navy, marginBottom:"1rem",
            display:"flex", alignItems:"center", gap:8 }}>
            <Plus size={16} color={C.teal}/> Create New Category — POST /api/admin/category
          </h3>
          {ok && <Alert type="success">Category created successfully!</Alert>}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:12, alignItems:"flex-end" }}>
            <Input label="Category Name" placeholder="e.g. Toys & Games" value={form.name}
              onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
            <Input label="Description" placeholder="Short description..."
              value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} />
            <div style={{ marginBottom:16 }}>
              <Btn variant="success" onClick={submit} icon={<Plus size={14}/>}>Create</Btn>
            </div>
          </div>
        </Card>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1rem" }}>
          {cats.map(c=>(
            <div key={c.id} style={{ background:C.white, borderRadius:16, overflow:"hidden",
              boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:`1px solid ${C.gray100}`,
              transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)"; }}>
              <div style={{ height:5, background:`linear-gradient(90deg,${c.color},${c.color}80)` }}/>
              <div style={{ padding:"1.25rem" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${c.color}15`,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                  <Tag size={20} color={c.color}/>
                </div>
                <div style={{ fontWeight:800, fontSize:"1rem", color:C.gray800 }}>{c.name}</div>
                <div style={{ color:C.gray400, fontSize:12, margin:"4px 0 12px" }}>{c.desc}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, fontWeight:800, color:c.color, background:`${c.color}15`,
                    padding:"3px 12px", borderRadius:20 }}>{c.products} products</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ADMIN USERS ───────────────────────────────
export function AdminUsersPage({ users, onDelete }) {
  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, display:"flex", alignItems:"center", gap:10 }}>
            <Users size={22} color={C.accent}/> User Management
            <span style={{ fontSize:14, color:C.gray400, fontWeight:600 }}>({users.length} users)</span>
          </h2>
          <div style={{ display:"flex", gap:8 }}>
            {["CUSTOMER","SELLER","ADMIN"].map(r=>(
              <span key={r} style={{ padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700,
                background:r==="ADMIN"?C.redL:r==="SELLER"?C.amberL:C.blueL,
                color:r==="ADMIN"?C.red:r==="SELLER"?C.amber:C.blue,
                border:`1px solid ${r==="ADMIN"?C.red:r==="SELLER"?C.amber:C.blue}30` }}>
                {users.filter(u=>u.role===r).length} {r}s
              </span>
            ))}
          </div>
        </div>
        <Card>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})` }}>
                  {["","User","Email","Role","Joined","Orders","Actions"].map(h=>(
                    <th key={h} style={{ padding:"11px 14px", textAlign:"left", color:C.white,
                      fontSize:11, fontWeight:700, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u,i)=>(
                  <tr key={u.id} style={{ background:i%2===0?C.white:C.gray50, transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=`${C.teal}08`}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.white:C.gray50}>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ width:36, height:36, borderRadius:"50%",
                        background:`linear-gradient(135deg,${C.teal},${C.blue})`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:12, fontWeight:800, color:C.white }}>
                        {u.avatar}
                      </div>
                    </td>
                    <td style={{ padding:"10px 14px", fontWeight:800, color:C.navy, fontSize:13 }}>{u.name}</td>
                    <td style={{ padding:"10px 14px", color:C.gray400, fontSize:12 }}>{u.email}</td>
                    <td style={{ padding:"10px 14px" }}><RoleBadge role={u.role}/></td>
                    <td style={{ padding:"10px 14px", color:C.gray400, fontSize:12 }}>{u.joined}</td>
                    <td style={{ padding:"10px 14px", fontWeight:700, color:C.navy }}>{u.orders}</td>
                    <td style={{ padding:"10px 14px" }}>
                      {u.role!=="ADMIN" ? (
                        <div style={{ display:"flex", gap:6 }}>
                          <button style={{ background:C.amberL, border:"none", borderRadius:8, padding:"5px 10px",
                            cursor:"pointer", color:C.amber, display:"flex", alignItems:"center", gap:4,
                            fontSize:12, fontWeight:700, fontFamily:"inherit" }}>
                            <Eye size={12}/> View
                          </button>
                          <button onClick={()=>onDelete(u.id)}
                            style={{ background:C.redL, border:"none", borderRadius:8, padding:"5px 10px",
                              cursor:"pointer", color:C.red, display:"flex", alignItems:"center", gap:4,
                              fontSize:12, fontWeight:700, fontFamily:"inherit" }}>
                            <Trash2 size={12}/> Delete
                          </button>
                        </div>
                      ) : (
                        <span style={{ display:"flex", alignItems:"center", gap:4, color:C.gray400, fontSize:12 }}>
                          <Settings size={12}/> Protected
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── ADMIN ALL ORDERS ──────────────────────────
export function AdminOrdersPage({ orders }) {
  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <Package size={22} color={C.accent}/> All Orders
          <span style={{ fontSize:14, color:C.gray400, fontWeight:600 }}>({orders.length})</span>
        </h2>
        <Card>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})` }}>
                  {["Order ID","Customer","Date","Items","Total","Status"].map(h=>(
                    <th key={h} style={{ padding:"11px 14px", textAlign:"left", color:C.white,
                      fontSize:11, fontWeight:700, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o,i)=>(
                  <tr key={o.id} style={{ background:i%2===0?C.white:C.gray50 }}>
                    <td style={{ padding:"11px 14px", fontWeight:800, color:C.navy, fontSize:13 }}>{o.id}</td>
                    <td style={{ padding:"11px 14px", color:C.gray600 }}>{o.customer||"Customer"}</td>
                    <td style={{ padding:"11px 14px", color:C.gray400, fontSize:12 }}>{o.date}</td>
                    <td style={{ padding:"11px 14px", color:C.gray500, fontSize:12 }}>{o.items.map(it=>it.name).join(", ")}</td>
                    <td style={{ padding:"11px 14px", fontWeight:800 }}>₹{o.total.toLocaleString("en-IN")}</td>
                    <td style={{ padding:"11px 14px" }}><StatusBadge s={o.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── SHARED: ROLE BADGE ────────────────────────
function RoleBadge({ role }) {
  const color = role==="ADMIN"?C.red:role==="SELLER"?C.amber:C.blue;
  const bg    = role==="ADMIN"?C.redL:role==="SELLER"?C.amberL:C.blueL;
  return (
    <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background:bg, color }}>
      {role}
    </span>
  );
}
