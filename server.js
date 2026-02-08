const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authroute");
const userRoutes = require("./routes/userroute");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Contact Route (optional)
try {
  const contactRoutes = require("./routes/contactRoutes");
  app.use("/api", contactRoutes);
} catch (error) {
  console.log("Contact routes not found, skipping...");
}

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(Server running on port ${PORT} 🚀);
});
