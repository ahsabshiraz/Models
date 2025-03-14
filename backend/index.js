const express = require('express')
const cors = require('cors')
const modelRoutes = require('./routes/modelRoutes')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

//  Routes
app.use('/', modelRoutes) // Prefix API routes with `/api`

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`))
