import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import fileUploadRoutes from './routes/file-upload.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/file', fileUploadRoutes);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
});
const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const user = await User.create({ email, name });
  res.json(user);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/swivify';

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
});
