import express from 'express';
import path from 'path';

const app = express();
const root = path.resolve(__dirname, '../client');

app.use(express.static(root));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Swivify Fullstack API!' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Fullstack server running on port', process.env.PORT || 3000);
});
