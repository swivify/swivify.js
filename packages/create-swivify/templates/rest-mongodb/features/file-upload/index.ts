// Example file upload feature for REST+MongoDB
import { Router } from 'express';
import multer from 'multer';
const router = Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), (req, res) =>
  res.json({ file: req.file }),
);
export default router;
