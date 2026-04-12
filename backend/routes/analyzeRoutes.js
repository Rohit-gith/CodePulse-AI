const express = require('express')
const router = express.Router()
const { 
  analyzeCode, 
  getHistory,
  getStats 
} = require('../controllers/analyzeController')
const { protect } = require('../middleware/authMiddleware')

// Code analyze — login zaroori
router.post('/analyze', protect, analyzeCode)

// History — login zaroori
router.get('/history', protect, getHistory)

// Stats — login zaroori
router.get('/stats', protect, getStats)

module.exports = router