const express = require('express');
const db = require('../config/db');

const router = express.Router();

// APPLY JOB
router.post('/', (req, res) => {
  const { user_id, job_id, resume } = req.body;

  db.query(
    "SELECT * FROM applications WHERE user_id=? AND job_id=?",
    [user_id, job_id],
    (err, result) => {

      if (err) return res.send(err);

      if (result.length > 0) {
        return res.send("Already Applied");
      }

      db.query(
        "INSERT INTO applications (user_id, job_id, resume, status) VALUES (?, ?, ?, 'applied')",
        [user_id, job_id, resume],
        (err, result) => {

          if (err) return res.send(err);

          res.send("Applied Successfully");
        }
      );
    }
  );
});
module.exports = router;