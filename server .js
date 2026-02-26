const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- REGISTER ----------------
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hash });
        res.json({ message: "User registered", user });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ---------------- LOGIN ----------------
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secret123");
        res.json({ message: "Login success", token, user });
    } catch(err){ res.status(500).json({ error: err.message }); }
});

// ---------------- ADD PRODUCT ----------------
app.post("/api/product", async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.json(product);
    } catch(err){ res.status(500).json({error:err.message}); }
});

// ---------------- GET PRODUCTS ----------------
app.get("/api/products", async (req,res)=>{
    const products = await Product.find();
    res.json(products);
});

// ---------------- PLACE ORDER ----------------
app.post("/api/order", async(req,res)=>{
    const { userId, products, total } = req.body;
    const order = await Order.create({ userId, products, total });
    res.json({ message:"Order placed", order });
});

app.listen(5000, ()=>console.log("Server running on http://localhost:5000"));
