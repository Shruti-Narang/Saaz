const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tasks',
  port: 5432,
});

const VECTOR_SERVICE_URL = process.env.VECTOR_SERVICE_URL || 'http://localhost:5001';

// Create a task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Call vector-service to get embedding
    const embeddingResponse = await axios.post(`${VECTOR_SERVICE_URL}/embed`, {
      text: title + ' ' + description,
    });

    const embedding = embeddingResponse.data.embedding;

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, embedding) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, status || 'todo', embedding]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search tasks using vector similarity
app.get('/tasks/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    // Get embedding for the query from vector-service
    const embeddingResponse = await axios.post(`${VECTOR_SERVICE_URL}/embed`, { text: q });
    const queryEmbedding = embeddingResponse.data.embedding;

    // Use pgvector's <=> operator to find similarity (closest vectors)
    const result = await pool.query(
      `SELECT *, embedding <=> $1 AS distance FROM tasks ORDER BY distance LIMIT 10`,
      [queryEmbedding]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
