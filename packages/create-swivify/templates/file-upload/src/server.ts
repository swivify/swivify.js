import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('File upload server running on port', process.env.PORT || 3000);
});
