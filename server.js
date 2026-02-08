const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authroute");
const userRoutes = require("./routes/userroute");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Contact Routes (optional)
try {
  const contactRoutes = require("./routes/contactRoutes");
  app.use("/api", contactRoutes);
} catch (error) {
  console.log("Contact route file missing, skipping...");
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server with DB connection
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected Successfully ✅");

    app.listen(PORT, () => {
      console.log(Server running on port ${PORT} 🚀);
    });
  } catch (error) {
    console.log("MongoDB Connection Failed ❌", error.message);
    process.exit(1);
  }
};

startServer();
