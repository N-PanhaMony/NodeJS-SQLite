import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5001

// Get path helpers
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Middleware
app.use(express.json())

// Serve files from /public
app.use(express.static(path.join(__dirname, '../public')))

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)        // Public
app.use('/todos', todoRoutes)       // Protected inside todoRoutes.js

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
