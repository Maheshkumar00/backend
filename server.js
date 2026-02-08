const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Test API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working fine ✅" });
});

// Render Port Fix
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(Server started on port ${PORT});
});
