const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working fine ✅" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(Server started on port ${PORT});
});
