const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "videostream",
  password: "1",
  port: 5432,
});

// Define the route
router.post("/loginCheck", async (req, res) => {
  try {
    const data = req.body; // Parse the request body
    const name = data.name;
    const password = data.password;
    const id = data.id;

    // Check if the data exists in the 'broadcaster' table
    const query =
      "SELECT * FROM broadcaster WHERE name = $1 AND password = $2 AND id = $3";
    const result = await pool.query(query, [name, password, id]);

    if (result.rowCount > 0) {
      res.json({ message: "Data exists in the broadcaster table." });
    } else {
      res.json({ message: "Data does not exist in the broadcaster table." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
