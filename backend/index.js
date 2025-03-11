const express = require('express')
const multer = require('multer')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// SQLite Database Setup
const db = new sqlite3.Database('./database.db', err => {
  if (err) console.error('Database error:', err)
  console.log('Connected to SQLite database')
})

// Create Table
db.run(
  `CREATE TABLE IF NOT EXISTS models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
   filename TEXT, 
   filepath TEXT,
  model_info TEXT)`
)
// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})

const upload = multer({ storage })

// API: Upload GLB File
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

  const { filename } = req.file // name for the path
  const filepath = `/uploads/${filename}` // path
  const { name, model_info } = req.body // this name is user filled name and info
  if (!name) name = req.body.originalname

  db.run(
    `INSERT INTO models (filename, filepath,model_info) VALUES (?, ?, ?)`,
    [name, filepath, model_info],
    err => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json({ filename, filepath })
    }
  )
})

// API: Fetch GLB Files
app.get('/models', (req, res) => {
  db.all(`SELECT * FROM models`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(rows)
  })
})

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
