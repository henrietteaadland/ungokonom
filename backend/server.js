const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);


const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "127.0.0.1",
  port: 5433,
  user: "ungokonom",
  password: "ungokonom",
  database: "ungokonom"
});

//registrerer brukeren
app.post("/api/register", async (req, res) => {
  try {
    const body = req.body || {};
    const username = (body.username || "").trim();
    const password = (body.password || "").trim();

    if (!username || !password) {
      return res.status(400).json({ error: "Vennligst fyll inn alle felt." });
    }

    // sjekk om brukernavn finnes
    const exists = await pool.query(
      "SELECT 1 FROM users WHERE username = $1",
      [username]
    );

    if (exists.rowCount > 0) {
      return res.status(409).json({ error: "Brukernavnet er allerede tatt." });
    }

    // hash passord og lagre
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
      [username, passwordHash]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Noe gikk galt på serveren." });
  }
});

// Logg inn
app.post("/api/login", async (req, res) => {
  try {
    const body = req.body || {};
    const username = (body.username || "").trim();
    const password = (body.password || "").trim();

    if (!username || !password) {
      return res.status(400).json({ error: "Vennligst fyll inn alle felt." });
    }

    const result = await pool.query(
      "SELECT password_hash FROM users WHERE username = $1",
      [username]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Feil brukernavn eller passord." });
    }

    const ok = await bcrypt.compare(password, result.rows[0].password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Feil brukernavn eller passord." });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Noe gikk galt på serveren." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend kjører på http://localhost:${port}`));
