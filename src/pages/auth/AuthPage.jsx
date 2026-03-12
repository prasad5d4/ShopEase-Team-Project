import { useState } from "react";
import { ShoppingBag, AlertCircle, Check, TrendingUp, Users, Award } from "lucide-react";
import { C, Input, Select, Alert } from "../../components/UI";
import AuthService from "../../services/AuthService";

export default function AuthPage({ mode, setMode, onLogin }) {
  const [form, setForm] = useState({ username:"", email:"", password:"", role:"CUSTOMER" });
  const [err, setErr] = useState("");
  const [ok, setOk]   = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const DEMOS = [
    { label:"Customer", user:"customer1", pass:"pass123", role:"CUSTOMER", color:C.blue },
    { label:"Seller",   user:"seller1",   pass:"pass123", role:"SELLER",   color:C.accent },
    { label:"Admin",    user:"admin1",    pass:"pass123", role:"ADMIN",    color:C.red },
  ];

  const submit = async () => {
    setLoading(true); setErr("");
    if (mode === "login") {
      const res = await AuthService.login(form.username, form.password);
      if (res.success) onLogin(res.user);
      else setErr(res.message);
    } else {
      if (!form.username||!form.email||!form.password) { setErr("Fill all required fields."); setLoading(false); return; }
      const res = await AuthService.register(form.username, form.email, form.password, form.role);
      if (res.success) { setOk(true); setTimeout(()=>{ setMode("login"); setOk(false); }, 1500); }
      else setErr(res.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"inherit",
      background:`linear-gradient(135deg,${C.navy} 0%,${C.navyMid} 40%,${C.navyL} 100%)` }}>
      {/* LEFT BRANDING */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center",
        padding:"3rem 3rem 3rem 4rem" }}>
        <div style={{ maxWidth:440 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"3rem" }}>
            <div style={{ width:46, height:46, borderRadius:14,
              background:`linear-gradient(135deg,${C.accent},${C.teal})`,
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <ShoppingBag size={22} color={C.navy}/>
            </div>
            <span style={{ fontSize:"1.6rem", fontWeight:900, color:C.white }}>
              Shop<span style={{ color:C.accent }}>Ease</span>
            </span>
          </div>
          <h1 style={{ fontSize:"3rem", fontWeight:900, color:C.white, lineHeight:1.15, marginBottom:"1rem" }}>
            Your Premium<br/>
            <span style={{ background:`linear-gradient(90deg,${C.accent},${C.teal})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Shopping Hub
            </span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"1rem", lineHeight:1.7, marginBottom:"2.5rem" }}>
            Discover thousands of products from trusted sellers. Shop smarter with intelligent recommendations.
          </p>
          <div style={{ display:"flex", gap:"2rem" }}>
            {[["10K+","Products",<TrendingUp size={18} color={C.accent}/>],
              ["5K+","Customers",<Users size={18} color={C.teal}/>],
              ["500+","Sellers",<Award size={18} color={C.green}/>]].map(([n,l,icon])=>(
              <div key={l}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  {icon}
                  <span style={{ fontSize:"1.4rem", fontWeight:900, color:C.white }}>{n}</span>
                </div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div style={{ width:480, display:"flex", alignItems:"center", justifyContent:"center",
        padding:"2rem", background:"rgba(255,255,255,0.03)",
        backdropFilter:"blur(20px)", borderLeft:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ width:"100%", background:C.white, borderRadius:24, padding:"2.5rem",
          boxShadow:"0 40px 80px rgba(0,0,0,0.4)" }}>
          {/* TAB TOGGLE */}
          <div style={{ display:"flex", gap:4, background:C.gray100, borderRadius:12, padding:4, marginBottom:"2rem" }}>
            {["login","register"].map(m=>(
              <button key={m} onClick={()=>{ setMode(m); setErr(""); setOk(false); }}
                style={{ flex:1, padding:"9px", borderRadius:9, border:"none", fontWeight:700,
                  fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s",
                  background:mode===m?C.white:"transparent",
                  color:mode===m?C.navy:C.gray400,
                  boxShadow:mode===m?"0 2px 8px rgba(0,0,0,0.1)":"none" }}>
                {m==="login"?"Sign In":"Create Account"}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize:"1.4rem", fontWeight:900, color:C.navy, marginBottom:"0.25rem" }}>
            {mode==="login"?"Welcome back!":"Join ShopEase"}
          </h2>
          <p style={{ color:C.gray400, fontSize:"0.88rem", marginBottom:"1.5rem" }}>
            {mode==="login"?"Sign in to continue shopping":"Create your free account today"}
          </p>

          {err && <Alert type="error">{err}</Alert>}
          {ok  && <Alert type="success">Account created! Redirecting to login...</Alert>}

          <Input label="Username" placeholder="Enter your username" value={form.username}
            onChange={e=>set("username",e.target.value)} required />
          {mode==="register" && (
            <Input label="Email" type="email" placeholder="your@email.com" value={form.email}
              onChange={e=>set("email",e.target.value)} required />
          )}
          <Input label="Password" type="password" placeholder="••••••••" value={form.password}
            onChange={e=>set("password",e.target.value)} required />
          {mode==="register" && (
            <Select label="Select Role" value={form.role} onChange={e=>set("role",e.target.value)}
              options={[
                {value:"CUSTOMER",label:"Customer — Shop products"},
                {value:"SELLER",  label:"Seller — Sell products"},
                {value:"ADMIN",   label:"Admin — Manage platform"},
              ]} required />
          )}

          <button onClick={submit} disabled={loading}
            style={{ width:"100%", padding:"14px", background:`linear-gradient(135deg,${C.green},#059669)`,
              color:C.white, border:"none", borderRadius:12, fontWeight:800, fontSize:16,
              cursor:"pointer", fontFamily:"inherit", marginBottom:16, opacity:loading?0.7:1 }}>
            {loading?"Loading...":(mode==="login"?"Sign In":"Create Account")}
          </button>

          {mode==="login" && (
            <div style={{ borderTop:`1px solid ${C.gray100}`, paddingTop:16 }}>
              <p style={{ fontSize:11, fontWeight:700, color:C.gray400, textAlign:"center",
                marginBottom:10, textTransform:"uppercase", letterSpacing:1 }}>Quick Demo Login</p>
              <div style={{ display:"flex", gap:8 }}>
                {DEMOS.map(d=>(
                  <button key={d.role} onClick={()=>{ set("username",d.user); set("password",d.pass); setErr(""); }}
                    style={{ flex:1, padding:"8px 4px", border:`2px solid ${d.color}20`, borderRadius:10,
                      background:`${d.color}08`, color:d.color, fontWeight:700, fontSize:11,
                      cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                    {d.role==="CUSTOMER"?"🛍️":d.role==="SELLER"?"🏪":"🛠️"} {d.label}
                  </button>
                ))}
              </div>
              <p style={{ fontSize:12, color:C.gray400, textAlign:"center", marginTop:12 }}>
                Click a role above to auto-fill, then press <strong>Sign In</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
