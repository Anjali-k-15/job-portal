const express = require('express');
const db = require('../config/db');

const router = express.Router();

// ✅ TEST ROUTE (VERY IMPORTANT)
router.get('/test', (req, res) => {
  res.send("Jobs route is working 🚀");
});

// ✅ GET JOBS
router.get('/', (req, res) => {
  console.log("GET /api/jobs hit"); // debug

  db.query("SELECT * FROM jobs", (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).send("Database error");
    }
    res.json(result); // better than res.send
  });
});

// ✅ ADD JOB
router.post('/', (req, res) => {
  const { title, company, description, location } = req.body;

  if (!title || !company) {
    return res.status(400).send("Title and company required");
  }

  db.query(
    "INSERT INTO jobs (title, company, description, location) VALUES (?, ?, ?, ?)",
    [title, company, description, location],
    (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).send("Error adding job");
      }
      res.send("Job Added ✅");
    }
  );
});

module.exports = router;