const db = require('../database')

const uploadModel = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

  const { filename } = req.file
  const filepath = `/uploads/${filename}`
  const { name, model_info } = req.body

  const modelName = name || req.file.originalname // Default to original filename if no name is provided

  db.run(
    `INSERT INTO models (filename, filepath, model_info) VALUES (?, ?, ?)`,
    [modelName, filepath, model_info],
    err => {
      if (err) return res.status(500).json({ message: 'Database error' })
      res.json({ filename: modelName, filepath })
    }
  )
}

const fetchModels = (req, res) => {
  db.all(`SELECT * FROM models`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(rows)
  })
}

module.exports = { uploadModel, fetchModels }
