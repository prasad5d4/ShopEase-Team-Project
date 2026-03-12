import { useState } from "react";
import { Search, Heart, ShoppingCart, Star, TrendingUp, ChevronRight, Award, Users } from "lucide-react";
import { C } from "../../components/UI";
import { CATEGORIES } from "../../data/mockData";

export default function ProductsPage({ products, cart, setCart }) {
  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const filtered = products.filter(p =>
    (cat==="All" || p.cat===cat) && p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCart = p => setCart(c => {
    const ex = c.find(i=>i.id===p.id);
    return ex ? c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i) : [...c,{...p,qty:1}];
  });
  const toggleWish = id => setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const badgeColor = { "Hot":C.red,"Top Deal":C.accent,"Best Seller":C.green,"New":C.blue };

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh" }}>
      {/* HERO BANNER */}
      <div style={{ background:`linear-gradient(135deg,${C.navy} 0%,${C.navyL} 55%,${C.teal} 100%)`,
        padding:"3.5rem 2.5rem", display:"flex", alignItems:"center",
        justifyContent:"space-between", gap:"2rem", flexWrap:"wrap", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:0, top:0, width:400, height:"100%",
          background:"rgba(255,255,255,0.03)", clipPath:"polygon(30% 0,100% 0,100% 100%,0 100%)" }}/>
        <div style={{ maxWidth:560, position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6,
            background:"rgba(255,255,255,0.1)", color:C.white, borderRadius:20,
            padding:"5px 14px", fontSize:12, fontWeight:700, marginBottom:"1rem" }}>
            <Award size={13}/> Top Collection 2026
          </div>
          <h1 style={{ fontSize:"3rem", fontWeight:900, color:C.white, margin:"0 0 0.75rem", lineHeight:1.1 }}>
            Shop Smart With <span style={{ color:C.accent }}>ShopEase</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"1rem", marginBottom:"1.75rem", lineHeight:1.7 }}>
            Explore premium products, trending styles, electronics, fashion, and daily essentials.
          </p>
          <div style={{ display:"flex", gap:"1rem" }}>
            <button style={{ padding:"13px 28px", background:`linear-gradient(135deg,${C.accent},${C.accentD})`,
              color:C.navy, border:"none", borderRadius:10, fontWeight:800, fontSize:15,
              cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
              <ShoppingCart size={16}/> Shop Now
            </button>
            <button style={{ padding:"13px 28px", background:"transparent", color:C.white,
              border:`2px solid rgba(255,255,255,0.4)`, borderRadius:10, fontWeight:700,
              fontSize:15, cursor:"pointer", fontFamily:"inherit" }}>
              Explore Deals
            </button>
          </div>
        </div>
        <div style={{ display:"flex", gap:"1rem", position:"relative", zIndex:2 }}>
          {[{icon:<TrendingUp size={20} color={C.accent}/>,val:"₹499+",sub:"Free Delivery"},
            {icon:<Award size={20} color={C.teal}/>,val:"10K+",sub:"Products"},
            {icon:<Users size={20} color={C.green}/>,val:"5K+",sub:"Customers"}].map(s=>(
            <div key={s.sub} style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(10px)",
              borderRadius:14, padding:"1rem 1.25rem", textAlign:"center",
              border:"1px solid rgba(255,255,255,0.12)" }}>
              {s.icon}
              <div style={{ color:C.white, fontWeight:900, fontSize:"1.1rem", marginTop:4 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div style={{ background:C.navyMid, display:"flex", justifyContent:"space-between", padding:"8px 2.5rem" }}>
        {[["🔥","Big Saving Days",C.accent],["🚚","Free Delivery on Orders Above ₹499","rgba(255,255,255,0.7)"],["⚡","New Products Added Daily",C.teal]].map(([e,t,c])=>(
          <span key={t} style={{ color:c, fontSize:12, fontWeight:600 }}>{e} {t}</span>
        ))}
      </div>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"2rem 2.5rem" }}>
        {/* SEARCH BAR */}
        <div style={{ background:C.white, borderRadius:16, padding:"1rem 1.5rem",
          display:"flex", gap:"1rem", alignItems:"center", marginBottom:"2rem",
          boxShadow:"0 4px 20px rgba(0,0,0,0.06)", border:`1px solid ${C.gray100}` }}>
          <Search size={18} color={C.gray400}/>
          <input style={{ flex:1, border:"none", outline:"none", fontSize:14, fontFamily:"inherit", color:C.gray800 }}
            placeholder="Search for mobiles, fashion, electronics, furniture and more..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATEGORIES.slice(0,5).map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                style={{ padding:"5px 14px", borderRadius:20, border:"none",
                  background:cat===c?`linear-gradient(135deg,${C.teal},${C.tealD})`:C.gray100,
                  color:cat===c?C.white:C.gray600,
                  fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                {c}
              </button>
            ))}
            <select value={cat} onChange={e=>setCat(e.target.value)}
              style={{ padding:"5px 14px", borderRadius:20, border:`1px solid ${C.gray200}`,
                background:C.white, fontFamily:"inherit", fontSize:12, cursor:"pointer" }}>
              <option value="All">All Categories</option>
              {CATEGORIES.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* SECTION HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
          <h2 style={{ fontWeight:900, fontSize:"1.3rem", color:C.gray800,
            display:"flex", alignItems:"center", gap:8 }}>
            <TrendingUp size={20} color={C.accent}/> {cat==="All"?"Featured Products":`${cat} Products`}
            <span style={{ fontSize:14, color:C.gray400, fontWeight:600 }}>({filtered.length})</span>
          </h2>
          <span style={{ color:C.teal, fontSize:13, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", gap:4 }}>
            View All <ChevronRight size={14}/>
          </span>
        </div>

        {/* PRODUCT GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1.25rem" }}>
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onAdd={addCart}
              wishlisted={wishlist.includes(p.id)} onWishlist={()=>toggleWish(p.id)}
              badgeColor={badgeColor} />
          ))}
        </div>
        {filtered.length===0 && (
          <div style={{ textAlign:"center", padding:"4rem", color:C.gray400 }}>
            <Search size={48} color={C.gray200} style={{ marginBottom:16 }}/>
            <p style={{ fontSize:"1.1rem" }}>No products found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd, wishlisted, onWishlist, badgeColor }) {
  const [hov, setHov] = useState(false);
  const disc = Math.round((1-p.price/p.origPrice)*100);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:C.white, borderRadius:18, overflow:"hidden",
        boxShadow:hov?"0 16px 40px rgba(0,0,0,0.12)":"0 2px 16px rgba(0,0,0,0.07)",
        border:`1px solid ${C.gray100}`, transition:"all 0.25s",
        transform:hov?"translateY(-4px)":"none" }}>
      <div style={{ position:"relative", overflow:"hidden" }}>
        <img src={p.img} alt={p.name}
          style={{ width:"100%", height:200, objectFit:"cover", display:"block",
            transition:"transform 0.35s", transform:hov?"scale(1.06)":"scale(1)" }}
          onError={e=>{ e.target.style.background=C.gray100; e.target.src=""; }}/>
        {p.badge && (
          <span style={{ position:"absolute", top:12, left:12,
            background:badgeColor[p.badge]||C.accent, color:C.white,
            borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:800 }}>
            {p.badge}
          </span>
        )}
        <button onClick={onWishlist}
          style={{ position:"absolute", top:10, right:10, background:C.white, border:"none",
            borderRadius:"50%", width:34, height:34, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
          <Heart size={16} color={wishlisted?C.red:C.gray400} fill={wishlisted?C.red:"none"}/>
        </button>
      </div>
      <div style={{ padding:"1.1rem" }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.teal, textTransform:"uppercase",
          letterSpacing:0.5, marginBottom:4 }}>{p.cat}</div>
        <h3 style={{ fontWeight:800, fontSize:"0.95rem", color:C.gray800, margin:"0 0 5px", lineHeight:1.3 }}>{p.name}</h3>
        <p style={{ color:C.gray400, fontSize:12, margin:"0 0 10px", lineHeight:1.5 }}>{p.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <span style={{ background:C.green, color:C.white, borderRadius:6, padding:"2px 7px",
            fontSize:11, fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
            <Star size={10} fill={C.white}/> {p.rating}
          </span>
          <span style={{ color:C.gray400, fontSize:11 }}>({p.reviews.toLocaleString()})</span>
          <span style={{ background:C.gray100, color:C.gray600, borderRadius:6,
            padding:"2px 7px", fontSize:11, fontWeight:600, marginLeft:"auto" }}>
            Stock: {p.stock}
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:12 }}>
          <span style={{ fontSize:"1.2rem", fontWeight:900, color:C.navy }}>₹{p.price.toLocaleString("en-IN")}</span>
          <span style={{ fontSize:12, color:C.gray400, textDecoration:"line-through" }}>₹{p.origPrice.toLocaleString("en-IN")}</span>
          <span style={{ fontSize:12, color:C.green, fontWeight:700 }}>{disc}% off</span>
        </div>
        <button onClick={()=>onAdd(p)} disabled={p.stock===0}
          style={{ width:"100%", padding:"10px", border:"none", borderRadius:10,
            background:p.stock===0?C.gray100:`linear-gradient(135deg,${C.accent},${C.teal})`,
            color:p.stock===0?C.gray400:C.white, fontWeight:800, fontSize:13,
            cursor:p.stock===0?"not-allowed":"pointer", fontFamily:"inherit",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <ShoppingCart size={14}/> {p.stock===0?"Out of Stock":"Add to Cart"}
        </button>
      </div>
    </div>
  );
}
