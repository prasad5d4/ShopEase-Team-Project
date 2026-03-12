import { useState } from "react";
import { Clock, RefreshCw, Truck, CheckCircle, AlertCircle, Check, Upload, X, Image } from "lucide-react";


export const C = {
  navy:"#0a1628", navyMid:"#112240", navyL:"#1a3a5c",
  accent:"#f4a61f", accentD:"#d4891a",
  teal:"#06b6d4", tealD:"#0891b2",
  white:"#ffffff", offWhite:"#f8fafc",
  gray50:"#f9fafb", gray100:"#f3f4f6", gray200:"#e5e7eb",
  gray400:"#9ca3af", gray600:"#4b5563", gray800:"#1f2937",
  green:"#10b981", greenL:"#d1fae5",
  red:"#ef4444", redL:"#fee2e2",
  amber:"#f59e0b", amberL:"#fef3c7",
  blue:"#3b82f6", blueL:"#dbeafe",
  purple:"#8b5cf6", purpleL:"#ede9fe",
};



export const STATUS_COLOR = { PENDING:C.amber, PROCESSING:C.blue, SHIPPED:C.purple, DELIVERED:C.green };
export const STATUS_BG    = { PENDING:C.amberL, PROCESSING:C.blueL, SHIPPED:C.purpleL, DELIVERED:C.greenL };
export const STATUS_ICON  = {
  PENDING:<Clock size={12}/>,
  PROCESSING:<RefreshCw size={12}/>,
  SHIPPED:<Truck size={12}/>,
  DELIVERED:<CheckCircle size={12}/>,
};

export const StatusBadge = ({ s }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"4px 10px",
    borderRadius:20, fontSize:11, fontWeight:700,
    background:STATUS_BG[s]||C.gray100, color:STATUS_COLOR[s]||C.gray600,
    border:`1px solid ${STATUS_COLOR[s]||C.gray200}` }}>
    {STATUS_ICON[s]} {s}
  </span>
);

export const Btn = ({ children, onClick, variant="primary", size="md", icon, full=false, style={}, disabled=false }) => {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
    border:"none", borderRadius:10, fontWeight:700, cursor: disabled?"not-allowed":"pointer",
    fontFamily:"inherit", transition:"all 0.2s", width:full?"100%":"auto",
    opacity: disabled?0.6:1, ...style };
  const sz = size==="sm"?{padding:"6px 14px",fontSize:12}:size==="lg"?{padding:"14px 28px",fontSize:16}:{padding:"10px 20px",fontSize:14};
  const vs = {
    primary: { background:`linear-gradient(135deg,${C.accent},${C.accentD})`, color:C.navy, boxShadow:`0 4px 15px ${C.accent}40` },
    success: { background:`linear-gradient(135deg,${C.green},#059669)`, color:C.white, boxShadow:`0 4px 15px ${C.green}40` },
    danger:  { background:C.redL, color:C.red },
    ghost:   { background:"transparent", color:C.gray600, border:`1.5px solid ${C.gray200}` },
    teal:    { background:`linear-gradient(135deg,${C.teal},${C.tealD})`, color:C.white, boxShadow:`0 4px 15px ${C.teal}40` },
    navy:    { background:`linear-gradient(135deg,${C.navyMid},${C.navyL})`, color:C.white },
    amber:   { background:C.amberL, color:C.amber },
  };
  return <button onClick={onClick} disabled={disabled} style={{...base,...sz,...vs[variant],...style}}>{icon}{children}</button>;
};

export const Card = ({ children, style={}, hover=false }) => {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
      style={{ background:C.white, borderRadius:16, padding:"1.5rem",
        boxShadow: h?"0 20px 40px rgba(0,0,0,0.12)":"0 2px 16px rgba(0,0,0,0.06)",
        transition:"all 0.25s", transform:h?"translateY(-3px)":"none",
        border:`1px solid ${C.gray100}`, ...style }}>
      {children}
    </div>
  );
};

export const Input = ({ label, type="text", placeholder, value, onChange, required=false, style={} }) => (
  <div style={{ marginBottom:16 }}>
    {label && <label style={{ display:"block", fontSize:13, fontWeight:700, color:C.gray800, marginBottom:6 }}>
      {label}{required&&<span style={{ color:C.red, marginLeft:2 }}>*</span>}
    </label>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ width:"100%", padding:"10px 14px", border:`2px solid ${C.gray200}`, borderRadius:10,
        fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit",
        transition:"border-color 0.2s", background:C.white, ...style }}
      onFocus={e=>e.target.style.borderColor=C.teal}
      onBlur={e=>e.target.style.borderColor=C.gray200} />
  </div>
);

export const Select = ({ label, value, onChange, options, required=false }) => (
  <div style={{ marginBottom:16 }}>
    {label&&<label style={{ display:"block", fontSize:13, fontWeight:700, color:C.gray800, marginBottom:6 }}>
      {label}{required&&<span style={{ color:C.red, marginLeft:2 }}>*</span>}
    </label>}
    <select value={value} onChange={onChange}
      style={{ width:"100%", padding:"10px 14px", border:`2px solid ${C.gray200}`, borderRadius:10,
        fontSize:14, outline:"none", boxSizing:"border-box", background:C.white, fontFamily:"inherit", cursor:"pointer" }}>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  </div>
);

export const Alert = ({ type, children }) => {
  const cfg = {
    success:{ bg:C.greenL, color:C.green, icon:<CheckCircle size={16}/> },
    error:  { bg:C.redL,   color:C.red,   icon:<AlertCircle size={16}/> },
  };
  const { bg, color, icon } = cfg[type]||cfg.error;
  return (
    <div style={{ background:bg, color, borderRadius:12, padding:"12px 18px",
      marginBottom:16, fontWeight:700, display:"flex", alignItems:"center", gap:8, fontSize:14 }}>
      {icon} {children}
    </div>
  );
};

export function ImageUploader({ value, onChange, label="Product Image" }) {
  const ref = require("react").useRef();
  const [drag, setDrag] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:13, fontWeight:700, color:C.gray800, marginBottom:6 }}>{label}</label>
      <div
        onDragOver={e=>{ e.preventDefault(); setDrag(true); }}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{ e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={()=>ref.current.click()}
        style={{ border:`2px dashed ${drag?C.teal:C.gray200}`, borderRadius:12, padding:"1.5rem",
          textAlign:"center", cursor:"pointer", background:drag?`${C.teal}08`:C.gray50,
          transition:"all 0.2s", position:"relative", minHeight:160,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
        {value ? (
          <>
            <img src={value} alt="preview" style={{ maxHeight:130, maxWidth:"100%", borderRadius:8, objectFit:"cover" }} />
            <span style={{ fontSize:12, color:C.teal, fontWeight:600 }}>Click to change image</span>
            <button onClick={e=>{ e.stopPropagation(); onChange(""); }}
              style={{ position:"absolute", top:8, right:8, background:C.red, color:C.white,
                border:"none", borderRadius:"50%", width:26, height:26, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
              <X size={13}/>
            </button>
          </>
        ) : (
          <>
            <div style={{ width:52, height:52, borderRadius:14, background:C.blueL,
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Upload size={24} color={C.blue}/>
            </div>
            <div style={{ fontSize:14, fontWeight:700, color:C.gray600 }}>Drop image here or click to upload</div>
            <div style={{ fontSize:12, color:C.gray400 }}>PNG, JPG, WEBP up to 10MB</div>
          </>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display:"none" }}
        onChange={e=>handleFile(e.target.files[0])}/>
    </div>
  );
}
