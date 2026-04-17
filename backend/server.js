const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://codepulse-ai.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}))

app.use(express.json())

const analyzeRoutes = require('./routes/analyzeRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/api', analyzeRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'CodePulse AI Backend Live! 🚀',
    status: 'success'
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server port ${PORT} pe chal raha hai!`)
})