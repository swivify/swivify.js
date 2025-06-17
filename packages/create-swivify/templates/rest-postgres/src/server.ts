import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import authRoutes from './routes/auth.js';
import fileUploadRoutes from './routes/file-upload.js';

const app = express();
app.use(express.json());

const client = new Client({ connectionString: process.env.DATABASE_URL });
const db = drizzle(client);

// Example: users table (assume already migrated)
// You would normally use drizzle's schema and migration system

app.use('/auth', authRoutes);
app.use('/file', fileUploadRoutes);

app.get('/users', async (req, res) => {
  const result = await db.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const result = await db.query(
    'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
    [email, name],
  );
  res.json(result.rows[0]);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
});
