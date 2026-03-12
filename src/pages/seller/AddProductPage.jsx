
import { useState } from "react";
import { Plus, Box, Image, AlertCircle, Check, Upload, CheckCircle } from "lucide-react";
import { C, Card, Btn, Input, Select, ImageUploader, Alert } from "../../components/UI";
import { CATEGORIES } from "../../data/mockData";

export default function AddProductPage({ onAdd }) {
  const [form, setForm] = useState({
    name:"", desc:"", price:"", origPrice:"", stock:"", cat:"Electronics", img:""
  });
  const [ok, setOk]   = useState(false);
  const [err, setErr] = useState("");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = () => {
    if (!form.name||!form.price||!form.stock) { setErr("Product name, price and stock are required."); return; }
    const op = form.origPrice ? parseInt(form.origPrice) : Math.round(parseInt(form.price)*1.2);
    onAdd({
      id: Date.now(), name:form.name, desc:form.desc, cat:form.cat,
      price:parseInt(form.price), origPrice:op,
      stock:parseInt(form.stock), seller:"MyStore",
      rating:0, reviews:0, badge:"New",
      img: form.img || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80`,
      status:"ACTIVE", sales:0, revenue:0,
    });
    setForm({ name:"", desc:"", price:"", origPrice:"", stock:"", cat:"Electronics", img:"" });
    setErr(""); setOk(true);
    setTimeout(()=>setOk(false),3500);
  };

  return (
    <div style={{ background:C.offWhite, minHeight:"100vh", padding:"2rem" }}>
      <div style={{ maxWidth:820, margin:"0 auto" }}>
        <h2 style={{ fontWeight:900, fontSize:"1.5rem", color:C.navy, marginBottom:"1.5rem",
          display:"flex", alignItems:"center", gap:10 }}>
          <Plus size={22} color={C.accent}/> Add New Product
        </h2>

        {ok  && <Alert type="success">Product listed successfully! Now visible to all customers on ShopEase.</Alert>}
        {err && <Alert type="error">{err}</Alert>}

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
          {/* PRODUCT DETAILS */}
          <Card>
            <h3 style={{ fontWeight:800, color:C.navy, marginBottom:"1.25rem", fontSize:"1rem",
              display:"flex", alignItems:"center", gap:8 }}>
              <Box size={16} color={C.teal}/> Product Details
            </h3>
            <Input label="Product Name" placeholder="e.g. Samsung Galaxy S25 Ultra"
              value={form.name} onChange={e=>set("name",e.target.value)} required />
            <Select label="Category" value={form.cat} onChange={e=>set("cat",e.target.value)} required
              options={CATEGORIES.filter(c=>c!=="All")} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <Input label="Selling Price (₹)" type="number" placeholder="89999"
                value={form.price} onChange={e=>set("price",e.target.value)} required />
              <Input label="Original Price (₹)" type="number" placeholder="109999"
                value={form.origPrice} onChange={e=>set("origPrice",e.target.value)} />
            </div>
            <Input label="Stock Quantity" type="number" placeholder="50"
              value={form.stock} onChange={e=>set("stock",e.target.value)} required />
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:700, color:C.gray800, marginBottom:6 }}>Description</label>
              <textarea placeholder="Describe your product features, specifications, and benefits..."
                value={form.desc} onChange={e=>set("desc",e.target.value)}
                style={{ width:"100%", padding:"10px 14px", border:`2px solid ${C.gray200}`, borderRadius:10,
                  fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit",
                  minHeight:96, resize:"vertical" }}
                onFocus={e=>e.target.style.borderColor=C.teal}
                onBlur={e=>e.target.style.borderColor=C.gray200}/>
            </div>
          </Card>

          {/* IMAGE UPLOAD */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <Card>
              <h3 style={{ fontWeight:800, color:C.navy, marginBottom:"1.25rem", fontSize:"1rem",
                display:"flex", alignItems:"center", gap:8 }}>
                <Image size={16} color={C.teal}/> Product Image
              </h3>
              <ImageUploader value={form.img} onChange={v=>set("img",v)} />
              {form.img && (
                <div style={{ background:C.greenL, borderRadius:10, padding:"8px 12px",
                  display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
                  <CheckCircle size={15} color={C.green}/>
                  <span style={{ fontSize:12, fontWeight:700, color:C.green }}>Image ready to upload</span>
                </div>
              )}
            </Card>
            <Card style={{ background:`${C.blue}06`, border:`1px solid ${C.blue}20` }}>
              <h4 style={{ fontWeight:800, fontSize:13, color:C.blue, marginBottom:10,
                display:"flex", alignItems:"center", gap:6 }}>
                <AlertCircle size={14}/> Image Tips for Better Sales
              </h4>
              {["Use high-quality images (min 800×800px)",
                "White or neutral background works best",
                "Show product from multiple angles",
                "PNG or JPG format recommended",
                "File size under 10MB"].map(t=>(
                <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:5 }}>
                  <Check size={11} color={C.green} style={{ marginTop:2, flexShrink:0 }}/>
                  <span style={{ fontSize:12, color:C.gray600 }}>{t}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* SUBMIT */}
          <div style={{ gridColumn:"1/-1" }}>
            <Btn full variant="success" size="lg" onClick={submit} icon={<Upload size={16}/>}>
              List Product on ShopEase → POST /api/seller/product
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
