const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect (creates login.db if not exists)
const db = new sqlite3.Database("login.db", (err) => {
  if (err) console.error("❌ DB connection error:", err.message);
  else console.log("✅ Connected to SQLite (login.db)");
});

// Create table if not exists
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);

// ✅ Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "⚠️ Username and password required" });

  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hash],
    function (err) {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({ message: "⚠️ Username already exists" });
        }
        console.error("DB insert error:", err);
        return res.status(500).json({ message: "❌ Server error during registration" });
      }
      res.status(201).json({ message: "✅ Registration successful", id: this.lastID });
    }
  );
});

// ✅ Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT password_hash FROM users WHERE username = ?",
    [username],
    async (err, row) => {
      if (err) return res.status(500).json({ message: "❌ Server error" });
      if (!row) return res.status(401).json({ message: "❌ Invalid username or password" });

      const match = await bcrypt.compare(password, row.password_hash);
      if (match) res.json({ message: "✅ Login successful" });
      else res.status(401).json({ message: "❌ Invalid username or password" });
    }
  );
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://127.0.0.1:${PORT}`));