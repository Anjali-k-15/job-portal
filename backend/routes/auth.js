const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role],
    (err, result) => {
      if (err) return res.send(err);
      res.send({
        message: "User Registered",
        userId: result.insertId
      });
    }
  );
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) return res.send("User not found");

    const user = result[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send("Wrong password");

    const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET
);

    res.json({ token, user });
  });
});

module.exports = router;