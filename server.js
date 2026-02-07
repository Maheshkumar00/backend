const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authroute"); 
const userRoutes = require("./routes/userroute"); 
// Correctly import BOTH notFound and errorHandler
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', 
    credentials: true,
}));

// Middleware to parse JSON and urlencoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- API Routes ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount the authentication and user routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Mount contact routes
try {
  const contactRoutes = require("./routes/contactRoutes");
  app.use("/api", contactRoutes);
} catch (error) {
  console.error("Error mounting contact routes:", error.message);
}

// --- Error Handling Middleware ---
// This must be placed AFTER your API routes
app.use(notFound);
app.use(errorHandler);   

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});