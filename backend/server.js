const express = require('express');
const cors = require('cors');

const app = express();

// ✅ ADD HERE (top level)
console.log("File is loading...");

app.use(cors());
app.use(express.json());

// ✅ MODIFY YOUR EXISTING ROUTE
app.get("/", (req, res) => {
  console.log("Home route hit");  // ✅ ADD THIS
  res.send("Server is running successfully 🚀");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applications", require("./routes/applications"));

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});