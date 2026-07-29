require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors({
  origin:"*",
  credentials:true,
  methods:["POST","GET","PUT","PATCH","UPDATE","QUERY","DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Static Upload Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/admin", adminRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Service Provider Portal API Running...");
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});