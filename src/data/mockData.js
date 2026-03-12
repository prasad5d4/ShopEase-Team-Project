export const CATEGORIES = ["All","Electronics","Fashion","Mobiles","Furniture","Books","Sports","Appliances","Beauty"];

export const INITIAL_PRODUCTS = [
  { id:1, name:"iPhone 15 Pro Max", cat:"Mobiles", price:134999, origPrice:149999, desc:"Apple A17 Pro chip, titanium design, 48MP camera.", stock:12, seller:"AppleStore", rating:4.8, reviews:3240, img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80", badge:"Hot" },
  { id:2, name:"Samsung Galaxy S24 Ultra", cat:"Mobiles", price:109999, origPrice:129999, desc:"200MP camera, S Pen, AI features, Snapdragon 8 Gen 3.", stock:8, seller:"Samsung", rating:4.7, reviews:2180, img:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", badge:"Top Deal" },
  { id:3, name:"Sony WH-1000XM5", cat:"Electronics", price:26999, origPrice:34999, desc:"Industry-leading noise cancellation, 30hr battery.", stock:25, seller:"SonyHub", rating:4.9, reviews:5600, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", badge:"Best Seller" },
  { id:4, name:"Apple Watch Ultra 2", cat:"Electronics", price:76999, origPrice:89999, desc:"Rugged design, precision GPS, 60hr battery life.", stock:6, seller:"AppleStore", rating:4.7, reviews:890, img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", badge:"New" },
  { id:5, name:'Samsung QLED 65" 4K', cat:"Electronics", price:89999, origPrice:119999, desc:"Quantum dot display, 120Hz, Dolby Atmos sound.", stock:4, seller:"Samsung", rating:4.6, reviews:1200, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500&q=80", badge:"Top Deal" },
  { id:6, name:"Nike Air Jordan 1 Retro", cat:"Fashion", price:12499, origPrice:15999, desc:"Classic high-top silhouette, premium leather upper.", stock:30, seller:"NikeStore", rating:4.5, reviews:4100, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", badge:"New" },
  { id:7, name:'MacBook Pro 14" M3', cat:"Electronics", price:179999, origPrice:199999, desc:"M3 chip, 18hr battery, Liquid Retina XDR display.", stock:5, seller:"AppleStore", rating:4.9, reviews:2300, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", badge:"Hot" },
  { id:8, name:"Ergonomic Office Chair", cat:"Furniture", price:18999, origPrice:24999, desc:"Lumbar support, breathable mesh, adjustable armrests.", stock:15, seller:"WorkDesk", rating:4.4, reviews:760, img:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80", badge:null },
];



export const INITIAL_ORDERS = [
  { id:"ORD-5001", date:"2026-03-08", status:"DELIVERED", total:134999, customer:"Arjun Mehta", items:[{name:"iPhone 15 Pro Max",qty:1,price:134999,img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80"}] },
  { id:"ORD-5002", date:"2026-03-09", status:"SHIPPED",   total:136998, customer:"Sneha Rao", items:[{name:"Samsung Galaxy S24 Ultra",qty:1,price:109999,img:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80"},{name:"Sony WH-1000XM5",qty:1,price:26999,img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80"}] },
  { id:"ORD-5003", date:"2026-03-10", status:"PROCESSING",total:76999,  customer:"Dev Sharma", items:[{name:"Apple Watch Ultra 2",qty:1,price:76999,img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80"}] },
  { id:"ORD-5004", date:"2026-03-10", status:"PENDING",   total:26999,  customer:"Priya Nair", items:[{name:"Sony WH-1000XM5",qty:1,price:26999,img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80"}] },
];

export const SELLER_PRODUCTS_INIT = [
  { id:1, name:"iPhone 15 Pro Max", cat:"Mobiles", price:134999, stock:12, sales:45, revenue:6074955, status:"ACTIVE", img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120" },
  { id:2, name:"Apple Watch Ultra 2", cat:"Electronics", price:76999, stock:6, sales:28, revenue:2155972, status:"ACTIVE", img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=120" },
  { id:3, name:"Sony WH-1000XM5", cat:"Electronics", price:26999, stock:2, sales:67, revenue:1808933, status:"LOW", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120" },
  { id:4, name:'MacBook Pro 14"', cat:"Electronics", price:179999, stock:0, sales:12, revenue:2159988, status:"OUT", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120" },
];

export const ADMIN_USERS_INIT = [
  { id:1, name:"Arjun Mehta",   email:"arjun@gmail.com",   role:"CUSTOMER", joined:"2026-01-15", orders:5,  avatar:"AM" },
  { id:2, name:"TechZone Store",email:"techzone@shop.com", role:"SELLER",   joined:"2025-11-20", orders:0,  avatar:"TZ" },
  { id:3, name:"Sneha Rao",     email:"sneha@gmail.com",   role:"CUSTOMER", joined:"2026-02-10", orders:3,  avatar:"SR" },
  { id:4, name:"SportFit Hub",  email:"sports@sell.com",   role:"SELLER",   joined:"2025-12-05", orders:0,  avatar:"SF" },
  { id:5, name:"Super Admin",   email:"admin@shopease.com",role:"ADMIN",    joined:"2025-10-01", orders:0,  avatar:"SA" },
  { id:6, name:"Dev Sharma",    email:"dev@gmail.com",     role:"CUSTOMER", joined:"2026-03-01", orders:2,  avatar:"DS" },
];

export const ADMIN_CATS_INIT = [
  { id:1, name:"Electronics", desc:"Gadgets & devices",   products:45,  color:"#06b6d4" },
  { id:2, name:"Fashion",     desc:"Clothing & footwear", products:132, color:"#ec4899" },
  { id:3, name:"Mobiles",     desc:"Smartphones & more",  products:67,  color:"#8b5cf6" },
  { id:4, name:"Furniture",   desc:"Home & office",       products:28,  color:"#f59e0b" },
  { id:5, name:"Books",       desc:"All genres",          products:89,  color:"#10b981" },
  { id:6, name:"Sports",      desc:"Fitness equipment",   products:54,  color:"#ef4444" },
];

export const STATUS_FLOW  = ["PENDING","PROCESSING","SHIPPED","DELIVERED"];
export const STATUS_COLOR = { PENDING:"#f59e0b", PROCESSING:"#3b82f6", SHIPPED:"#8b5cf6", DELIVERED:"#10b981" };
export const STATUS_BG    = { PENDING:"#fef3c7", PROCESSING:"#dbeafe", SHIPPED:"#ede9fe", DELIVERED:"#d1fae5" };

export const DEMO_ACCOUNTS = [
  { label:"Customer", username:"customer1", password:"pass123", role:"CUSTOMER" },
  { label:"Seller",   username:"seller1",   password:"pass123", role:"SELLER"   },
  { label:"Admin",    username:"admin1",    password:"pass123", role:"ADMIN"    },
];
