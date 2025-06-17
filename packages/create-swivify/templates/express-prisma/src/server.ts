import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import fileUploadRoutes from './routes/file-upload.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/file', fileUploadRoutes);

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({ data: { email, name } });
  res.json(user);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
