const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadModel, fetchModels } = require('../controllers/modelController');

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), uploadModel);
router.get('/models', fetchModels);

module.exports = router;
